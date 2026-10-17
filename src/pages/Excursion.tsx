import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Backpack, Check, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import WhatsAppIcon from '../components/WhatsAppIcon';
import Booking from '../components/Booking';
import PaymentStrip from '../components/PaymentStrip';
import SectionHead from '../components/SectionHead';
import { PriceTag, TourCard } from '../components/Tours';
import NotFound from './NotFound';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useSeo } from '../hooks/useSeo';
import { useParallax } from '../hooks/useParallax';
import { excursionPath, type Excursion } from '../data';
import { useCatalog } from '../content/catalog';
import { CONFIG, paypalLink, waLink } from '../config';
import { cardVariants, containerVariants, EASINGS } from '../utils/easings';

// Datos estructurados para Google (TouristTrip)
function useJsonLd(ex: Excursion | undefined) {
  useEffect(() => {
    if (!ex) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: ex.name,
      description: ex.description,
      image: ex.gallery.map((g) => CONFIG.siteUrl + g),
      url: CONFIG.siteUrl + excursionPath(ex.slug),
      touristType: ex.tags,
      provider: { '@type': 'TravelAgency', name: CONFIG.brand, telephone: '+1' + CONFIG.whatsapp.slice(1), url: CONFIG.siteUrl },
      ...(ex.priceUSD ? { offers: { '@type': 'Offer', price: ex.priceUSD, priceCurrency: 'USD' } } : {}),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, [ex]);
}

export default function ExcursionPage() {
  const { slug } = useParams();
  const { all, find } = useCatalog();
  const ex = find(slug);
  const { t } = useLang();
  const x = t.excursion;
  const { book } = useBooking();
  const { ref, y } = useParallax(60);

  useSeo({
    title: ex ? t.seo.excursionTitle(ex.name) : t.seo.notFoundTitle,
    description: ex ? `${ex.description.slice(0, 150)}…` : x.notFound,
    path: ex ? excursionPath(ex.slug) : '/404',
    image: ex?.image,
  });
  useJsonLd(ex);

  if (!ex) return <NotFound />;

  const others = all.filter((e) => e.slug !== ex.slug).sort((a, b) => Number(b.category === ex.category) - Number(a.category === ex.category)).slice(0, 3);
  const wa = waLink(x.waText(ex.name));

  return (
    <>
      <section className="xhero" ref={ref}>
        <motion.img className="xhero__img" src={ex.gallery[0]} alt={ex.name} style={{ y, scale: 1.15 }} />
        <div className="xhero__shade" />
        <div className="container xhero__inner">
          <Link to="/#tours" className="xhero__back"><ArrowLeft size={16} /> {x.back}</Link>
          <ul className="tour__tags xhero__tags">
            {ex.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <RevealText tag="h1" className="xhero__title" animateOnMount delay={0.2}>{ex.name}</RevealText>
          <motion.p className="xhero__lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>{ex.short}</motion.p>
          <motion.div className="xhero__ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <MagneticButton className="btn btn--primary btn--lg" onClick={() => book({ tour: ex.name })}>
              {x.book} <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton className="btn btn--wa btn--lg" href={wa} target="_blank">
              <WhatsAppIcon size={18} /> WhatsApp
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container xbody">
          <div className="xbody__main">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASINGS.smooth }}>
              <p className="eyebrow">{x.about}</p>
              <p className="xbody__desc">{ex.description}</p>
              {ex.note && <p className="xnote">{ex.note}</p>}
            </motion.div>

            <h2 className="xbody__h"><Sparkles size={20} /> {x.highlights}</h2>
            <motion.ul className="xhl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              {ex.highlights.map((h) => <motion.li key={h} variants={cardVariants}>{h}</motion.li>)}
            </motion.ul>

            <div className="xlists">
              <div>
                <h2 className="xbody__h"><Check size={20} /> {x.includes}</h2>
                <ul className="xlist">
                  {ex.includes.map((i) => <li key={i}><Check size={16} /> {i}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="xbody__h"><Backpack size={20} /> {x.bring}</h2>
                <ul className="xlist xlist--muted">
                  {ex.bring.map((i) => <li key={i}><Check size={16} /> {i}</li>)}
                </ul>
              </div>
            </div>

            {ex.gallery.length > 1 && (
              <div className={`xgallery xgallery--${Math.min(ex.gallery.length - 1, 4)}`}>
                {ex.gallery.slice(1).map((g, i) => (
                  <motion.img
                    key={g}
                    src={g}
                    alt={`${ex.name} ${i + 2}`}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="xcard">
            <div className="xcard__price">
              <PriceTag ex={ex} />
              {ex.priceUSD && <small>{ex.priceUnit ?? x.perPerson}</small>}
            </div>
            <p className="xcard__row"><Clock size={18} /> {x.duration}: <strong>{ex.duration ?? x.durationAsk}</strong></p>
            <button className="btn btn--primary btn--lg xcard__btn" onClick={() => book({ tour: ex.name })}>
              {x.book} <ArrowRight size={18} />
            </button>
            <a className="btn btn--wa btn--lg xcard__btn" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> {x.wa}
            </a>
            {ex.priceUSD && paypalLink(ex.priceUSD) && (
              <div className="xcard__pay">
                <a className="btn btn--paypal btn--sm" href={paypalLink(ex.priceUSD)} target="_blank" rel="noopener noreferrer">{x.payNow(ex.priceUSD)}</a>
                <small>{x.payHint}</small>
              </div>
            )}
            <ul className="xcard__trust">
              {x.trust.map((tr) => <li key={tr}><ShieldCheck size={16} /> {tr}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <Booking defaultTour={ex.name} />
      <PaymentStrip />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={t.experiences.eyebrow} title={x.more} accent={x.moreAccent} />
          <motion.div className="tours tours--3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
            {others.map((o) => <TourCard key={o.slug} tour={o} />)}
          </motion.div>
        </div>
      </section>
    </>
  );
}
