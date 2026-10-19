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
import { useSearchParams } from 'react-router-dom';

export default function PaymentsPage() {
  const { t } = useLang();
  const p = t.payments;
  const { book } = useBooking();
  // Viene del checkout al elegir transferencia: ?reserva=SB-XXXX&monto=198#transferencia
  const [search] = useSearchParams();
  const code = search.get('reserva')?.slice(0, 20) || undefined;
  const monto = Number(search.get('monto'));
  const amount = monto > 0 ? `US$${monto.toLocaleString('en-US')}` : undefined;
  useSeo({
    title: `${p.pageTitle} · Super Buggies`,
    description: t.seo.paymentsDesc,
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

        <PaymentMethods code={code} amount={amount} />

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
