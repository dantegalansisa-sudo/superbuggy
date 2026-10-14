import { motion } from 'framer-motion';
import { CalendarCheck, MapPinned, PartyPopper } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { cardVariants, containerVariants } from '../utils/easings';

const ICONS = [MapPinned, CalendarCheck, PartyPopper];

export default function Steps() {
  const { t } = useLang();
  return (
    <section className="section section--tight">
      <div className="container steps">
        <SectionHead eyebrow={t.steps.eyebrow} title={t.steps.title} accent={t.steps.titleAccent} />
        <motion.ol className="steps__list" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {t.steps.items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li key={s.title} variants={cardVariants}>
                <span className="steps__num">{i + 1}</span>
                <Icon size={26} className="steps__icon" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
