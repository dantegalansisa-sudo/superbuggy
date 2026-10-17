import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CalendarCheck, CreditCard, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useLang } from '../i18n';
import { useBooking } from '../booking';

// Franja corta que explica cómo se paga y lleva a /formas-de-pago
export default function PaymentStrip() {
  const { t } = useLang();
  const p = t.payments;
  const { book } = useBooking();
  const icons = [CalendarCheck, WhatsAppIcon, CreditCard, ShieldCheck];
  return (
    <section className="pstrip">
      <div className="container pstrip__inner">
        <div className="pstrip__head">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2>{p.title} <em>{p.titleAccent}</em></h2>
        </div>
        <ol className="pstrip__steps">
          {p.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <motion.li key={s} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <span><Icon size={18} /></span>
                {s}
              </motion.li>
            );
          })}
        </ol>
        <div className="pstrip__methods">
          <span><CreditCard size={16} /> PayPal</span>
          <span><Building2 size={16} /> Banco Popular</span>
          <Link to="/formas-de-pago" className="btn btn--link">{p.more}</Link>
          <button className="btn btn--primary btn--sm" onClick={() => book()}>{t.excursion.book} <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
