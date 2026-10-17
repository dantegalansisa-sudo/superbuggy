import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import SectionHead from './SectionHead';
import Checkout from './Checkout';
import RequestForm from './RequestForm';
import { useLang } from '../i18n';
import { CONFIG, waLink } from '../config';

// Sección de reservas con datos de contacto.
// mode="request": formulario de solicitud sin pago (inicio).
// mode="checkout": reserva y pago en 3 pasos (página de cada excursión).
export default function Booking({ mode = 'request', defaultTour = '' }: { mode?: 'request' | 'checkout'; defaultTour?: string }) {
  const { t } = useLang();
  const b = t.booking;
  const pay = mode === 'checkout';
  return (
    <section className="section booking" id="reservar">
      <div className="booking__bg" aria-hidden="true">
        <img src="/images/cascada-grupo.webp" alt="" loading="lazy" />
      </div>
      <div className="container booking__grid">
        <div className="booking__info">
          <SectionHead eyebrow={b.eyebrow} title={pay ? b.payTitle : b.title} accent={pay ? b.payAccent : b.titleAccent} light />
          <p className="booking__text">{pay ? b.payText : b.text}</p>
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
            {CONFIG.email && (
              <li>
                <a href={`mailto:${CONFIG.email}`}>
                  <span className="booking__ic"><Mail size={20} /></span>
                  <span><small>Email</small>{CONFIG.email}</span>
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
          {pay ? <Checkout key={defaultTour} prefill={{ tour: defaultTour, nonce: 0 }} /> : <RequestForm />}
        </motion.div>
      </div>
    </section>
  );
}
