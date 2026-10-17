import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import MagneticButton from './MagneticButton';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useCatalog } from '../content/catalog';
import { CONFIG, waLink } from '../config';
import { EXCURSIONS } from '../data';

// Formulario de solicitud (sin pago): el cliente deja sus datos y la empresa lo contacta.
// Se envía por correo a la empresa y una copia al cliente (función /api/booking con Resend).
type Form = { name: string; phone: string; email: string; tour: string; date: string; people: string; pickup: string; message: string };
const EMPTY: Form = { name: '', phone: '', email: '', tour: '', date: '', people: '2', pickup: '', message: '' };

const today = () => new Date().toISOString().slice(0, 10);
const newCode = () => 'SB-' + Math.random().toString(36).slice(2, 7).toUpperCase();

export default function RequestForm() {
  const { t, lang } = useLang();
  const b = t.booking;
  const { prefill } = useBooking();
  const { all } = useCatalog();
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [hint, setHint] = useState('');
  const [code, setCode] = useState(newCode);

  // Datos que llegan desde el hero o desde una tarjeta de tour
  useEffect(() => {
    if (!prefill.nonce) return;
    setStatus('idle');
    setForm((f) => ({
      ...f,
      tour: prefill.tour ? all.find((e) => e.slug === prefill.tour || e.name === prefill.tour)?.slug ?? f.tour : f.tour,
      date: prefill.date || f.date,
      people: prefill.people ?? f.people,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill.nonce]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const tourName = all.find((e) => e.slug === form.tour)?.name ?? b.tourAny;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const waSummary = () => {
    const rows: [string, string][] = [
      [t.checkout.wa.code, code],
      [b.name, form.name],
      [b.phone, form.phone],
      [b.email, form.email],
      [b.tour, tourName],
      [b.date, form.date],
      [b.people, form.people],
      [b.pickup, form.pickup],
      [b.message, form.message],
    ];
    return [b.waIntro, '', ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `• ${k}: ${v}`)].join('\n');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return setHint(b.required);
    setHint('');
    setStatus('sending');
    try {
      const res = await fetch(CONFIG.bookingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'request',
          code,
          status: 'Solicitud (sin pago)',
          excursion: EXCURSIONS.find((x) => x.slug === form.tour)?.name ?? 'Aún no sabe, quiere recomendaciones',
          date: form.date,
          quantity: form.people,
          total: '',
          name: form.name,
          phone: form.phone,
          email: form.email,
          pickup: form.pickup,
          message: form.message,
          lang,
          website: (e.currentTarget as HTMLFormElement).website?.value ?? '',
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div key="ok" className="booking__ok" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
          <CheckCircle2 size={56} />
          <h3>{b.successTitle}</h3>
          <p>{b.successText}{validEmail ? ` ${b.successCopy}` : ''}</p>
          <a className="btn btn--wa" href={waLink(waSummary())} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> {b.successWa}
          </a>
          <button className="btn btn--link" onClick={() => { setForm(EMPTY); setCode(newCode()); setStatus('idle'); }}>{b.again}</button>
        </motion.div>
      ) : (
        <motion.form key="form" className="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate>
          {/* Campo trampa anti-spam: oculto para personas */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="form__trap" aria-hidden="true" />
          <label className="form__f">
            <span>{b.name} *</span>
            <input autoComplete="name" value={form.name} onChange={set('name')} />
          </label>
          <label className="form__f">
            <span>{b.phone} *</span>
            <input type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
          </label>
          <label className="form__f form__f--full">
            <span>{b.email} <em>({b.optional})</em></span>
            <input type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder={b.emailHint} />
          </label>
          <label className="form__f form__f--full">
            <span>{b.tour}</span>
            <select value={form.tour} onChange={set('tour')}>
              <option value="">{b.tourAny}</option>
              {all.map((o) => <option key={o.slug} value={o.slug}>{o.name}</option>)}
            </select>
          </label>
          <label className="form__f">
            <span>{b.date}</span>
            <input type="date" min={today()} value={form.date} onChange={set('date')} />
          </label>
          <label className="form__f">
            <span>{b.people}</span>
            <select value={form.people} onChange={set('people')}>
              {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => <option key={n}>{n}</option>)}
              <option>13+</option>
            </select>
          </label>
          <label className="form__f form__f--full">
            <span>{b.pickup} <em>({b.optional})</em></span>
            <input value={form.pickup} onChange={set('pickup')} />
          </label>
          <label className="form__f form__f--full">
            <span>{b.message} <em>({b.optional})</em></span>
            <textarea rows={3} placeholder={b.messagePh} value={form.message} onChange={set('message')} />
          </label>
          {(hint || status === 'error') && <p className="form__hint" role="alert">{hint || b.error}</p>}
          <div className="form__actions">
            <MagneticButton type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'} strength={0.2}>
              <Send size={18} /> {status === 'sending' ? b.sending : b.submit}
            </MagneticButton>
            <a className="btn btn--wa btn--lg" href={waLink(b.waIntro)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> {b.viaWa}
            </a>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
