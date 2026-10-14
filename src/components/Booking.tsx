import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import SectionHead from './SectionHead';
import MagneticButton from './MagneticButton';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { BOOKING_OPTIONS } from '../data';
import { CONFIG, waLink } from '../config';

type Form = { name: string; email: string; phone: string; tour: string; date: string; people: string; pickup: string; message: string };
const EMPTY: Form = { name: '', email: '', phone: '', tour: '', date: '', people: '2', pickup: '', message: '' };

const today = () => new Date().toISOString().slice(0, 10);

export default function Booking() {
  const { t } = useLang();
  const b = t.booking;
  const { prefill } = useBooking();
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [hint, setHint] = useState('');

  // Datos enviados desde el hero o desde una tarjeta de tour
  useEffect(() => {
    if (!prefill.nonce) return;
    setStatus('idle');
    setForm((f) => ({
      ...f,
      tour: prefill.tour ?? f.tour,
      date: prefill.date || f.date,
      people: prefill.people ?? f.people,
    }));
  }, [prefill]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const summary = () => {
    const rows: [string, string][] = [
      [b.name, form.name],
      [b.email, form.email],
      [b.phone, form.phone],
      [b.tour, form.tour || b.tourAny],
      [b.date, form.date],
      [b.people, form.people],
      [b.pickup, form.pickup],
      [b.message, form.message],
    ];
    return [b.waIntro, '', ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `• ${k}: ${v}`)].join('\n');
  };

  const valid = () => form.name.trim() && (form.email.trim() || form.phone.trim());

  const sendWhatsApp = () => window.open(waLink(summary()), '_blank', 'noopener');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid()) {
      setHint(b.required);
      return;
    }
    setHint('');
    // Sin correo configurado: la reserva se envía por WhatsApp
    if (!CONFIG.bookingEmail) {
      sendWhatsApp();
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONFIG.bookingEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nueva reserva web: ${form.tour || 'Consulta'} — ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          Nombre: form.name,
          Correo: form.email,
          Telefono: form.phone,
          Experiencia: form.tour || b.tourAny,
          Fecha: form.date,
          Personas: form.people,
          Recogida: form.pickup,
          Mensaje: form.message,
          ...(form.email ? { _replyto: form.email } : {}),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section booking" id="reservar">
      <div className="booking__bg" aria-hidden="true">
        <img src="/images/cascada-grupo.webp" alt="" loading="lazy" />
      </div>
      <div className="container booking__grid">
        <div className="booking__info">
          <SectionHead eyebrow={b.eyebrow} title={b.title} accent={b.titleAccent} light />
          <p className="booking__text">{b.text}</p>
          <h3 className="booking__ctitle">{b.contactTitle}</h3>
          <ul className="booking__contact">
            <li>
              <a href={waLink(b.waIntro)} target="_blank" rel="noopener noreferrer">
                <span className="booking__ic booking__ic--wa"><WhatsAppIcon size={20} /></span>
                <span><small>{b.whatsapp}</small>{CONFIG.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={CONFIG.phoneHref}>
                <span className="booking__ic"><Phone size={20} /></span>
                <span><small>{b.call}</small>{CONFIG.phoneDisplay}</span>
              </a>
            </li>
            {CONFIG.bookingEmail && (
              <li>
                <a href={`mailto:${CONFIG.bookingEmail}`}>
                  <span className="booking__ic"><Mail size={20} /></span>
                  <span><small>Email</small>{CONFIG.bookingEmail}</span>
                </a>
              </li>
            )}
            <li>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapQuery)}`} target="_blank" rel="noopener noreferrer">
                <span className="booking__ic"><MapPin size={20} /></span>
                <span><small>{b.visit}</small>{CONFIG.address}</span>
              </a>
            </li>
          </ul>
        </div>

        <motion.div
          className="booking__card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="ok" className="booking__ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <CheckCircle2 size={56} />
                <h3>{b.successTitle}</h3>
                <p>{CONFIG.bookingEmail ? b.successText : b.successWaText}</p>
                {CONFIG.bookingEmail && (
                  <button className="btn btn--wa" onClick={sendWhatsApp}><WhatsAppIcon size={18} /> {b.successWa}</button>
                )}
                <button className="btn btn--link" onClick={() => { setForm(EMPTY); setStatus('idle'); }}>{b.again}</button>
              </motion.div>
            ) : (
              <motion.form key="form" className="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} noValidate>
                <label className="form__f form__f--full">
                  <span>{b.name} *</span>
                  <input required autoComplete="name" value={form.name} onChange={set('name')} />
                </label>
                <label className="form__f">
                  <span>{b.email}</span>
                  <input type="email" autoComplete="email" value={form.email} onChange={set('email')} />
                </label>
                <label className="form__f">
                  <span>{b.phone}</span>
                  <input type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
                </label>
                <label className="form__f form__f--full">
                  <span>{b.tour}</span>
                  <select value={form.tour} onChange={set('tour')}>
                    <option value="">{b.tourAny}</option>
                    {BOOKING_OPTIONS.map((o) => <option key={o}>{o}</option>)}
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
                  <span>{b.pickup}</span>
                  <input value={form.pickup} onChange={set('pickup')} />
                </label>
                <label className="form__f form__f--full">
                  <span>{b.message}</span>
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
        </motion.div>
      </div>
    </section>
  );
}
