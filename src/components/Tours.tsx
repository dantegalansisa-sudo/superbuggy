import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { TOURS } from '../data';
import { cardVariants, containerVariants } from '../utils/easings';

export default function Tours() {
  const { t } = useLang();
  const { book } = useBooking();
  return (
    <section className="section" id="tours">
      <div className="container">
        <SectionHead
          eyebrow={t.tours.eyebrow}
          title={t.tours.title}
          accent={t.tours.titleAccent}
          text={t.tours.text}
          aside={<button className="btn btn--outline btn--sm" onClick={() => book()}>{t.nav.book} <ArrowRight size={16} /></button>}
        />
        <motion.div className="tours" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {TOURS.map((tour) => (
            <motion.article key={tour.id} className="tour" variants={cardVariants} whileHover={{ y: -8 }} data-cursor>
              <div className="tour__img">
                <img src={tour.image} alt={tour.name} loading="lazy" />
                {tour.featured && <span className="tour__badge"><Flame size={14} /> {t.tours.tag}</span>}
              </div>
              <div className="tour__body">
                <h3>{tour.name}</h3>
                <ul className="tour__tags">
                  {tour.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <p>{tour.text}</p>
                <button className="tour__cta" onClick={() => book({ tour: tour.name })}>
                  {t.tours.details} <span><ArrowRight size={16} /></span>
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
