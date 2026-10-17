import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Checkout from './Checkout';
import { useBooking } from '../booking';
import { useLang } from '../i18n';

// Ventana de reserva + pago que se abre encima de cualquier página
export default function CheckoutModal() {
  const { open, close, prefill } = useBooking();
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="com" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div
            className="com__panel"
            role="dialog"
            aria-modal="true"
            aria-label={t.checkout.title}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="com__head">
              <h2>{t.checkout.title}</h2>
              <button onClick={close} aria-label={t.checkout.close}><X size={22} /></button>
            </div>
            <Checkout prefill={prefill} onClose={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
