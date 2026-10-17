import { motion } from 'framer-motion';
import { Building2, Copy, CreditCard, ExternalLink } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useLang } from '../i18n';
import { useToast } from './Toast';
import { PAYMENTS, paypalLink, waLink } from '../config';
import { cardVariants, containerVariants } from '../utils/easings';

// Tarjetas de pago: PayPal (enlace PayPal.me) y transferencia a Banco Popular
export default function PaymentMethods() {
  const { t } = useLang();
  const p = t.payments;
  const toast = useToast();
  const paypal = paypalLink();

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast(p.copied);
    } catch {
      toast(value);
    }
  };

  return (
    <motion.div className="pay" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <motion.article className="pay__card" variants={cardVariants}>
        <span className="pay__icon pay__icon--paypal"><CreditCard size={24} /></span>
        <h3>{p.paypal}</h3>
        <p>{p.paypalText}</p>
        <div className="pay__brands" aria-hidden="true">
          <span>PayPal</span><span>Visa</span><span>Mastercard</span>
        </div>
        {paypal ? (
          <a className="btn btn--paypal" href={paypal} target="_blank" rel="noopener noreferrer">
            {p.paypalCta} <ExternalLink size={16} />
          </a>
        ) : (
          <a className="btn btn--paypal" href={waLink(p.paypalWa)} target="_blank" rel="noopener noreferrer">
            {p.paypalAsk} <WhatsAppIcon size={16} />
          </a>
        )}
      </motion.article>

      <motion.article className="pay__card" variants={cardVariants}>
        <span className="pay__icon"><Building2 size={24} /></span>
        <h3>{p.bank}</h3>
        <p>{p.bankText}</p>
        <ul className="pay__accounts">
          {PAYMENTS.bank.accounts.map((a) => (
            <li key={a.number}>
              <div>
                <small>{a.label}</small>
                <strong>{a.number}</strong>
              </div>
              <button onClick={() => copy(a.number)} aria-label={`${p.copy} ${a.number}`}><Copy size={16} /> {p.copy}</button>
            </li>
          ))}
        </ul>
        <dl className="pay__holder">
          <div><dt>{PAYMENTS.bank.name}</dt></div>
          <div><dt>{p.holder}</dt><dd>{PAYMENTS.bank.holder}</dd></div>
          <div><dt>{p.rnc}</dt><dd>{PAYMENTS.bank.rnc}</dd></div>
        </dl>
        <a className="btn btn--wa" href={waLink(p.receiptWa)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={16} /> {p.receipt}
        </a>
      </motion.article>
    </motion.div>
  );
}
