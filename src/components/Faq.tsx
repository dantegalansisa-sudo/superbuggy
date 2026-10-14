import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { waLink } from '../config';

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section section--sand" id="faq">
      <div className="container faq">
        <div>
          <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} accent={t.faq.titleAccent} />
          <motion.div className="faq__help" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img src="/images/monos-3.webp" alt="" loading="lazy" />
            <div>
              <h3>{t.faq.help}</h3>
              <p>{t.faq.helpText}</p>
              <a className="btn btn--wa btn--sm" href={waLink(t.booking.waIntro)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} /> {t.faq.helpCta}
              </a>
            </div>
          </motion.div>
        </div>
        <ul className="faq__list">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                className={isOpen ? 'is-open' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  {f.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }}><Plus size={20} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
