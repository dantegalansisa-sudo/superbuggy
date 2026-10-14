import { motion } from 'framer-motion';
import { CalendarCheck, Home, Map } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { waLink } from '../config';

export default function FloatingActions() {
  const { t } = useLang();
  const { book } = useBooking();
  const wa = waLink(t.booking.waIntro);
  return (
    <>
      {/* Escritorio: botón flotante de WhatsApp */}
      <motion.a
        className="wa-float"
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        <WhatsAppIcon size={28} />
        <span className="wa-float__pulse" />
      </motion.a>

      {/* Móvil: barra inferior con accesos rápidos */}
      <nav className="mbar" aria-label="Accesos rápidos">
        <a href="#inicio"><Home size={20} /><span>{t.mobileBar.home}</span></a>
        <a href="#tours"><Map size={20} /><span>{t.mobileBar.tours}</span></a>
        <button className="mbar__book" onClick={() => book()}><CalendarCheck size={22} /><span>{t.mobileBar.book}</span></button>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="mbar__wa"><WhatsAppIcon size={20} /><span>{t.mobileBar.wa}</span></a>
      </nav>
    </>
  );
}
