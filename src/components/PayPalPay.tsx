import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLang } from '../i18n';
import type { Counts } from '../content/pricing';

// Pasarela de PayPal empresarial: botones oficiales de PayPal (cuenta PayPal o tarjeta de crédito/débito).
// El monto lo calcula el servidor (/api/paypal/create-order); el cobro se confirma en /api/paypal/capture-order.
// Si la pasarela aún no está configurada en Vercel, avisa con onUnavailable() para mostrar la alternativa.

type PayPalNamespace = {
  Buttons: (opts: {
    style?: Record<string, unknown>;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError?: (err: unknown) => void;
    onCancel?: () => void;
  }) => { render: (el: HTMLElement) => Promise<void>; close?: () => Promise<void> };
};
declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

type Config = { enabled: boolean; clientId?: string; env?: string };
let configPromise: Promise<Config> | null = null;
const loadConfig = () =>
  (configPromise ??= fetch('/api/paypal/config')
    .then((r) => (r.ok ? r.json() : { enabled: false }))
    .catch(() => ({ enabled: false })));

let sdkPromise: Promise<void> | null = null;
let sdkLocale = '';
function loadSdk(clientId: string, locale: string) {
  if (sdkPromise && sdkLocale === locale) return sdkPromise;
  document.getElementById('paypal-sdk')?.remove();
  sdkLocale = locale;
  sdkPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.id = 'paypal-sdk';
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons&locale=${locale}`;
    s.onload = () => resolve();
    s.onerror = () => {
      sdkPromise = null;
      reject(new Error('sdk'));
    };
    document.head.appendChild(s);
  });
  return sdkPromise;
}

type Props = {
  slug: string;
  counts: Counts;
  mode: 'full' | 'deposit';
  code: string;
  excursion: string;
  booking: Record<string, unknown>; // datos para el correo de confirmación
  onPaid: (amount: string, captureId: string) => void;
  onUnavailable: () => void;
};

export default function PayPalPay({ slug, counts, mode, code, excursion, booking, onPaid, onUnavailable }: Props) {
  const { t, lang } = useLang();
  const c = t.checkout;
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sandbox, setSandbox] = useState(false);
  // Siempre la versión más reciente de los datos dentro de los callbacks de PayPal
  const latest = useRef({ slug, counts, mode, code, excursion, booking, onPaid });
  latest.current = { slug, counts, mode, code, excursion, booking, onPaid };

  useEffect(() => {
    let cancelled = false;
    let buttons: ReturnType<PayPalNamespace['Buttons']> | null = null;
    setState('loading');
    (async () => {
      const cfg = await loadConfig();
      if (cancelled) return;
      if (!cfg.enabled || !cfg.clientId) return onUnavailable();
      setSandbox(cfg.env !== 'live');
      try {
        await loadSdk(cfg.clientId, lang === 'en' ? 'en_US' : 'es_ES');
      } catch {
        if (!cancelled) onUnavailable();
        return;
      }
      if (cancelled || !box.current || !window.paypal) return;
      box.current.innerHTML = '';
      buttons = window.paypal.Buttons({
        style: { layout: 'vertical', shape: 'pill', label: 'pay', height: 48 },
        createOrder: async () => {
          const d = latest.current;
          const res = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: d.slug, counts: d.counts, mode: d.mode, code: d.code, excursion: d.excursion }),
          });
          const json = await res.json();
          if (!res.ok || !json.id) throw new Error(json.error ?? 'create');
          return json.id as string;
        },
        onApprove: async ({ orderID }) => {
          const d = latest.current;
          const res = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID, booking: d.booking }),
          });
          const json = await res.json();
          if (!res.ok || !json.ok) {
            setState('error');
            return;
          }
          d.onPaid(json.amount, json.captureId);
        },
        onError: () => setState('error'),
      });
      await buttons.render(box.current);
      if (!cancelled) setState('ready');
    })();
    return () => {
      cancelled = true;
      buttons?.close?.().catch(() => {});
    };
    // Se vuelve a dibujar si cambia el idioma o el monto (total / depósito)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, mode]);

  return (
    <div className="pp">
      {state === 'loading' && <p className="pp__loading"><Loader2 size={18} className="pp__spin" /> {c.payLoading}</p>}
      {state === 'error' && <p className="co__err" role="alert">{c.payError}</p>}
      {sandbox && state !== 'loading' && <p className="pp__sandbox">{c.payTest}</p>}
      <div ref={box} className="pp__buttons" />
    </div>
  );
}
