import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { EXPERIENCES } from '../data';
import { cardVariants, containerVariants } from '../utils/easings';

export default function Experiences() {
  const { t } = useLang();
  const { book } = useBooking();
  return (
    <section className="section section--sand" id="experiencias">
      <div className="container">
        <SectionHead eyebrow={t.experiences.eyebrow} title={t.experiences.title} accent={t.experiences.titleAccent} text={t.experiences.text} />
        <motion.div className="exps" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {EXPERIENCES.map((e) => (
            <motion.button key={e.id} className="exp" variants={cardVariants} onClick={() => book({ tour: e.name })} aria-label={`${t.experiences.ask}: ${e.name}`}>
              <img src={e.image} alt="" loading="lazy" />
              <span className="exp__shade" />
              <span className="exp__label">
                {e.name}
                <span className="exp__go"><ArrowUpRight size={18} /></span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
