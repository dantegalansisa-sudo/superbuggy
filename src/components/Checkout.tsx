import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Banknote, Building2, CalendarDays, CheckCircle2, Clock, Copy, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useToast } from './Toast';
import QtyPicker from './QtyPicker';
import { useLang } from '../i18n';
import { useCatalog } from '../content/catalog';
import { CONFIG, PAYMENTS, paypalLink, waLink } from '../config';
import { EXCURSIONS } from '../data';
import type { Prefill } from '../booking';
import { countsLabel, defaultCounts, fmt, priceLines, totalOf, type Counts } from '../content/pricing';

type Method = 'paypal' | 'bank' | 'cash';

const today = () => new Date().toISOString().slice(0, 10);
// Código corto para identificar la reserva en el pago y en WhatsApp
const newCode = () => 'SB-' + Math.random().toString(36).slice(2, 7).toUpperCase();

export default function Checkout({ prefill, onClose }: { prefill?: Prefill; onClose?: () => void }) {
  const { t, lang } = useLang();
  const c = t.checkout;
  const toast = useToast();
  const { all } = useCatalog();

  // La excursión llega como slug o como nombre (en cualquier idioma)
  const resolve = (v?: string) => (v ? all.find((e) => e.slug === v || e.name === v)?.slug ?? '' : '');

  const [step, setStep] = useState(1);
  const [slug, setSlug] = useState(() => resolve(prefill?.tour));
  const [date, setDate] = useState(prefill?.date ?? '');
  const [counts, setCounts] = useState<Counts>(() => prefill?.counts ?? defaultCounts(all.find((e) => e.slug === resolve(prefill?.tour)), prefill?.people));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState('');
  const [mode, setMode] = useState<'full' | 'deposit'>('full');
  const [method, setMethod] = useState<Method>('paypal');
  const [hint, setHint] = useState('');
  const [code, setCode] = useState(newCode);
  const [done, setDone] = useState(false);
  const [lastVia, setLastVia] = useState('');

  // Cada vez que se abre desde un botón "Reservar" se reinicia con los datos que trae
  useEffect(() => {
    if (!prefill?.nonce) return;
    setStep(1);
    setDone(false);
    setHint('');
    const s = prefill.tour ? resolve(prefill.tour) : slug;
    if (prefill.tour) setSlug(s);
    if (prefill.date) setDate(prefill.date);
    setCounts(prefill.counts ?? defaultCounts(all.find((e) => e.slug === s), prefill.people));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill?.nonce]);

  const ex = all.find((e) => e.slug === slug);
  const lines = priceLines(ex, t);
  const total = totalOf(lines, counts);
  const pct = PAYMENTS.depositPercent;
  const payAmount = total ? (mode === 'deposit' ? Math.ceil((total * pct) / 100) : total) : undefined;
  const amountLabel = payAmount ? fmt(payAmount) : '';
  const qtyLabel = countsLabel(lines, counts, t);
  // Al cambiar de excursión se reinician las cantidades
  const pickTour = (s: string) => {
    setSlug(s);
    setCounts(defaultCounts(all.find((e) => e.slug === s)));
  };

  const waMessage = (via: string) => {
    const w = c.wa;
    const rows: [string, string][] = [
      [w.code, code],
      [w.excursion, ex?.name ?? ''],
      [w.date, date],
      [w.qty, qtyLabel],
      [w.total, total ? fmt(total) : c.priceAsk],
      [w.pay, via],
      [w.name, name],
      [w.phone, phone],
      [w.pickup, pickup],
    ];
    return [w.hello, '', ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `• ${k}: ${v}`)].join('\n');
  };

  // Al confirmar se envía la reserva por correo a la empresa y una copia al cliente
  // (función /api/booking con Resend; la clave vive solo en Vercel).
  const sendEmail = (status: string, payment: string) => {
    fetch(CONFIG.bookingEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        type: 'booking',
        code,
        status,
        payment,
        excursion: EXCURSIONS.find((e) => e.slug === slug)?.name ?? ex?.name, // la empresa lo recibe en español
        date,
        quantity: qtyLabel,
        total: total ? fmt(total) : 'A confirmar',
        name,
        phone,
        email,
        pickup,
        lang,
      }),
    }).catch(() => {});
  };

  const goStep2 = () => {
    if (!slug || !date) return setHint(c.required1);
    setHint('');
    setStep(2);
  };
  const goStep3 = () => {
    if (!name.trim() || !phone.trim()) return setHint(c.required2);
    setHint('');
    setStep(3);
  };

  // PayPal y transferencia: correo + WhatsApp para enviar el comprobante.
  // Efectivo: solo correo; WhatsApp queda como opción en la pantalla final.
  const finish = (m: Method) => {
    const amount = amountLabel || c.priceAsk;
    const via = m === 'paypal' ? c.wa.viaPaypal(amount) : m === 'bank' ? c.wa.viaBank(amount) : c.wa.viaCash;
    const status = m === 'cash' ? 'Confirmada · paga en efectivo el día del tour' : 'Pago enviado · verificar comprobante';
    const payment = m === 'paypal' ? `PayPal ${amount}` : m === 'bank' ? `Transferencia Banco Popular ${amount}` : `Efectivo el día del tour (${total ? fmt(total) : 'a confirmar'})`;
    sendEmail(status, payment);
    setLastVia(via);
    if (m !== 'cash') window.open(waLink(waMessage(via)), '_blank', 'noopener');
    setDone(true);
  };

  const restart = () => {
    setCode(newCode());
    setStep(1);
    setDone(false);
    setName('');
    setPhone('');
    setEmail('');
    setPickup('');
  };

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast(t.payments.copied);
    } catch {
      toast(value);
    }
  };

  const options = useMemo(() => all.map((e) => ({ value: e.slug, label: e.priceUSD ? `${e.name} · ${fmt(e.priceUSD)}` : e.name })), [all]);

  if (done) {
    return (
      <motion.div className="co co__done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <CheckCircle2 size={60} />
        <h3>{c.doneTitle}</h3>
        <p>{c.doneText(code)}{/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? ` ${c.doneCopy}` : ''}</p>
        <a className="btn btn--wa" href={waLink(waMessage(lastVia))} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> {c.waAlso}</a>
        <div className="co__actions co__actions--center">
          <button className="btn btn--outline btn--sm" onClick={restart}>{c.doneAgain}</button>
          {onClose && <button className="btn btn--link" onClick={onClose}>{c.close}</button>}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="co">
      <ol className="co__progress" aria-label={c.stepOf(step)}>
        {c.steps.map((s, i) => (
          <li key={s} className={i + 1 === step ? 'is-active' : i + 1 < step ? 'is-done' : undefined}>
            <span>{i + 1 < step ? <CheckCircle2 size={16} /> : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" className="co__step" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <label className="co__field">
              <span>{c.excursion}</span>
              <select value={slug} onChange={(e) => pickTour(e.target.value)}>
                <option value="">{c.choose}</option>
                {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
            <label className="co__field">
              <span><CalendarDays size={14} /> {c.date}</span>
              <input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            {ex && (
              <div className="co__field">
                <span>{ex.options?.length ? c.vehicles : c.people}</span>
                <QtyPicker lines={lines} counts={counts} onChange={setCounts} />
              </div>
            )}

            <div className="co__total">
              {total ? (
                <>
                  <div>
                    {lines.filter((l) => counts[l.id]).map((l) => (
                      <small key={l.id}>{counts[l.id]} × {l.label} · {fmt(l.price! * counts[l.id])}</small>
                    ))}
                    {ex?.duration && <small><Clock size={12} /> {ex.duration}</small>}
                  </div>
                  <p><span>{c.total}</span> {fmt(total)}</p>
                </>
              ) : (
                <p className="co__ask">{ex ? c.priceAsk : c.choose}</p>
              )}
            </div>

            {hint && <p className="co__err" role="alert">{hint}</p>}
            <div className="co__actions">
              <button className="btn btn--primary btn--lg co__next" onClick={goStep2}>{c.next} <ArrowRight size={18} /></button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" className="co__step" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div className="co__row">
              <label className="co__field">
                <span>{c.name} *</span>
                <input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="co__field">
                <span>{c.phone} *</span>
                <input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>
            </div>
            <div className="co__row">
              <label className="co__field">
                <span>{c.email}</span>
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="co__field">
                <span>{c.pickup}</span>
                <input value={pickup} onChange={(e) => setPickup(e.target.value)} />
              </label>
            </div>
            <div className="co__mini">
              <strong>{ex?.name}</strong> · {date} · {qtyLabel}
              {total && <b>{fmt(total)}</b>}
            </div>
            {hint && <p className="co__err" role="alert">{hint}</p>}
            <div className="co__actions">
              <button className="btn btn--link" onClick={() => setStep(1)}><ArrowLeft size={16} /> {c.back}</button>
              <button className="btn btn--primary btn--lg co__next" onClick={goStep3}><Lock size={16} /> {c.toPay}</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" className="co__step" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div className="co__summary">
              <div className="co__summary-head">
                <span>{c.summary}</span>
                <span className="co__code">{c.code}: <strong>{code}</strong></span>
              </div>
              <p><strong>{ex?.name}</strong></p>
              <p>{date} · {qtyLabel}</p>
              <p className="co__summary-total"><span>{c.total}</span> {total ? fmt(total) : c.priceAsk}</p>
            </div>

            {total && method !== 'cash' && (
              <div className="co__modes" role="radiogroup" aria-label={c.payNow}>
                <button role="radio" aria-checked={mode === 'full'} className={mode === 'full' ? 'is-on' : undefined} onClick={() => setMode('full')}>
                  <span>{c.full}</span><strong>{fmt(total)}</strong>
                </button>
                <button role="radio" aria-checked={mode === 'deposit'} className={mode === 'deposit' ? 'is-on' : undefined} onClick={() => setMode('deposit')}>
                  <span>{c.deposit(pct)}</span><strong>{fmt(Math.ceil((total * pct) / 100))}</strong>
                </button>
              </div>
            )}
            {total && method !== 'cash' && mode === 'deposit' && <p className="co__hint">{c.depositHint(pct)}</p>}

            <p className="co__label">{c.method}</p>
            <div className="co__methods" role="radiogroup" aria-label={c.method}>
              {([
                ['paypal', CreditCard, c.paypal, c.paypalDesc],
                ['bank', Building2, c.bank, c.bankDesc],
                ['cash', Banknote, c.cash, c.cashDesc],
              ] as const).map(([m, Icon, title, desc]) => (
                <button key={m} role="radio" aria-checked={method === m} className={`co__method${method === m ? ' is-on' : ''}`} onClick={() => setMethod(m)}>
                  <span className={`co__micon co__micon--${m}`}><Icon size={20} /></span>
                  <span><strong>{title}</strong><small>{desc}</small></span>
                </button>
              ))}
            </div>

            <div className="co__pay">
              {method === 'paypal' && (
                <>
                  <a className="btn btn--paypal btn--lg" href={paypalLink(payAmount) || waLink(t.payments.paypalWa)} target="_blank" rel="noopener noreferrer">
                    {payAmount ? c.paypalBtn(amountLabel) : t.payments.paypalCta}
                  </a>
                  <p className="co__hint">{c.paypalSteps(code)}</p>
                  {PAYMENTS.paypalName && <p className="co__hint">{t.payments.paypalNote(PAYMENTS.paypalName)}</p>}
                  <button className="btn btn--wa" onClick={() => finish('paypal')}><WhatsAppIcon size={16} /> {c.paid}</button>
                </>
              )}
              {method === 'bank' && (
                <>
                  <p className="co__hint">{payAmount ? c.bankAmount(amountLabel) : t.payments.bankText}</p>
                  <ul className="pay__accounts">
                    {PAYMENTS.bank.accounts.map((a) => (
                      <li key={a.number}>
                        <div><small>{a.label}</small><strong>{a.number}</strong></div>
                        <button onClick={() => copy(a.number)}><Copy size={16} /> {t.payments.copy}</button>
                      </li>
                    ))}
                  </ul>
                  <p className="co__hint">{PAYMENTS.bank.name} · {PAYMENTS.bank.holder} · RNC {PAYMENTS.bank.rnc}<br />{c.bankFx}</p>
                  <button className="btn btn--wa" onClick={() => finish('bank')}><WhatsAppIcon size={16} /> {c.transferred}</button>
                </>
              )}
              {method === 'cash' && (
                <>
                  <p className="co__hint">{c.cashNote}</p>
                  {total && <p className="co__cash"><span>{c.total}</span> {fmt(total)}</p>}
                  <button className="btn btn--primary btn--lg" onClick={() => finish('cash')}><CheckCircle2 size={18} /> {c.cashBtn}</button>
                </>
              )}
            </div>

            <p className="co__secure"><ShieldCheck size={16} /> {c.secure}</p>
            <p className="co__terms">{c.terms} <Link to="/terminos" onClick={onClose}>{c.termsLink}</Link>.</p>
            <div className="co__actions">
              <button className="btn btn--link" onClick={() => setStep(2)}><ArrowLeft size={16} /> {c.back}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
