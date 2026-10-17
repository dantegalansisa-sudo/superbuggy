import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Flame } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { excursionPath, type Excursion } from '../data';
import { useCatalog } from '../content/catalog';
import { cardVariants, containerVariants } from '../utils/easings';

export function PriceTag({ ex, unit = false }: { ex: Excursion; unit?: boolean }) {
  const { t } = useLang();
  return ex.priceUSD ? (
    <span className="price">
      <small>{t.tours.priceFrom}</small> US${ex.priceUSD}
      {unit && <em className="price__unit">{ex.priceUnit ?? t.excursion.perPerson}</em>}
    </span>
  ) : (
    <span className="price price--ask">{t.tours.priceAsk}</span>
  );
}

export function TourCard({ tour }: { tour: Excursion }) {
  const { t } = useLang();
  const { book } = useBooking();
  return (
    <motion.article className="tour" variants={cardVariants} whileHover={{ y: -8 }}>
      <Link to={excursionPath(tour.slug)} className="tour__img" aria-label={`${t.tours.details}: ${tour.name}`}>
        <img src={tour.image} alt={tour.name} loading="lazy" />
        {tour.featured && <span className="tour__badge"><Flame size={14} /> {t.tours.tag}</span>}
      </Link>
      <div className="tour__body">
        <h3><Link to={excursionPath(tour.slug)}>{tour.name}</Link></h3>
        <ul className="tour__tags">
          {tour.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <p>{tour.short}</p>
        <div className="tour__meta">
          <PriceTag ex={tour} unit />
          {tour.duration && <span><Clock size={14} /> {tour.duration}</span>}
        </div>
        <div className="tour__actions">
          <button className="btn btn--primary btn--sm" onClick={() => book({ tour: tour.name })}>
            {t.tours.book}
          </button>
          <Link to={excursionPath(tour.slug)} className="tour__cta">
            {t.tours.details} <span><ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Tours() {
  const { t } = useLang();
  const { book } = useBooking();
  const { tours } = useCatalog();
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
          {tours.map((tour) => <TourCard key={tour.slug} tour={tour} />)}
        </motion.div>
      </div>
    </section>
  );
}
