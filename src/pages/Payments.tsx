import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import RevealText from '../components/RevealText';
import PaymentMethods from '../components/PaymentMethods';
import MagneticButton from '../components/MagneticButton';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useSeo } from '../hooks/useSeo';
import { waLink } from '../config';

export default function PaymentsPage() {
  const { t } = useLang();
  const p = t.payments;
  const { book } = useBooking();
  useSeo({
    title: 'Formas de pago · Super Buggies',
    description: 'Paga tu excursión con PayPal, tarjeta o transferencia a Banco Popular. Reserva primero y te confirmamos por WhatsApp.',
    path: '/formas-de-pago',
  });
  return (
    <section className="page">
      <div className="container">
        <p className="eyebrow">{p.eyebrow}</p>
        <RevealText tag="h1" className="page__title" animateOnMount>{`${p.title} ${p.titleAccent}`}</RevealText>
        <p className="page__lead">{p.text}</p>

        <ol className="steps-row">
          {p.steps.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
              <span>{i + 1}</span>{s}
            </motion.li>
          ))}
        </ol>

        <PaymentMethods />

        <div className="page__ctas">
          <MagneticButton className="btn btn--primary btn--lg" onClick={() => book()}>
            {t.nav.book} <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton className="btn btn--wa btn--lg" href={waLink(t.booking.waIntro)} target="_blank">
            <WhatsAppIcon size={18} /> WhatsApp
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
