import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, Mountain, ShieldCheck, Users } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { BOOKING_OPTIONS } from '../data';
import { EASINGS } from '../utils/easings';

const today = () => new Date().toISOString().slice(0, 10);

export default function Hero() {
  const { t } = useLang();
  const { book } = useBooking();
  const [tour, setTour] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('2');

  const { scrollY } = useScroll();
  const imgScale = useTransform(scrollY, [0, 700], [1, 1.12]);
  const imgY = useTransform(scrollY, [0, 700], [0, 90]);
  const cardsY = useTransform(scrollY, [0, 700], [0, -70]);

  const cards = [
    { src: '/images/playa-grupo.webp', label: t.hero.cards[0], rot: -6 },
    { src: '/images/cascada-tobogan.webp', label: t.hero.cards[1], rot: 3 },
    { src: '/images/catamaran.webp', label: t.hero.cards[2], rot: -2 },
  ];
  const statIcons = [Mountain, ShieldCheck, Users];

  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {t.hero.eyebrow.join('  ·  ')}
          </motion.p>
          <h1 className="hero__title">
            <RevealText tag="span" className="hero__line" delay={0.35} animateOnMount>{t.hero.title1}</RevealText>
            <RevealText tag="span" className="hero__line" delay={0.5} animateOnMount>{t.hero.title2}</RevealText>
            <RevealText tag="span" className="hero__line hero__line--accent" delay={0.65} animateOnMount>{t.hero.title3}</RevealText>
          </h1>
          <motion.p
            className="hero__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: EASINGS.smooth }}
          >
            {t.hero.text}
          </motion.p>
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: EASINGS.smooth }}
          >
            <MagneticButton className="btn btn--primary btn--lg" onClick={() => book()}>
              {t.hero.ctaBook} <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton className="btn btn--ghost btn--lg" href="#tours">
              {t.hero.ctaExplore} <ArrowRight size={18} />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="hero__visual">
          {/* Silueta ondulada del hero (coordenadas relativas 0–1 a la caja de la imagen) */}
          <svg width="0" height="0" className="sr-only" aria-hidden="true">
            <clipPath id="hero-wave" clipPathUnits="objectBoundingBox">
              <path d="M0.05,0.36 C0.09,0.17 0.24,0.05 0.42,0.06 C0.56,0.07 0.63,0.15 0.76,0.08 C0.86,0.03 0.95,0.02 1,0.06 L1,0.6 C0.95,0.67 0.89,0.64 0.82,0.71 C0.75,0.78 0.72,0.9 0.58,0.96 C0.45,1.01 0.27,0.97 0.15,0.86 C0.04,0.76 0.01,0.55 0.05,0.36 Z" />
            </clipPath>
          </svg>
          <motion.div
            className="hero__blob"
            initial={{ opacity: 0, x: 80, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASINGS.cinematic }}
          >
            <motion.img
              src="/images/hero.webp"
              alt="Pareja manejando un buggy por un sendero con vista al mar Caribe"
              style={{ scale: imgScale, y: imgY }}
              fetchPriority="high"
            />
          </motion.div>
          <motion.p
            className="hero__script"
            initial={{ opacity: 0, rotate: -12, y: 10 }}
            animate={{ opacity: 1, rotate: -8, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            {t.hero.script}
            <svg viewBox="0 0 200 20" aria-hidden="true"><path d="M4 14 C60 4, 140 4, 196 10" /></svg>
          </motion.p>
          <motion.div
            className="hero__chip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6, ease: EASINGS.bounce }}
          >
            <MapPin size={20} />
            <span><strong>{t.hero.location}</strong>{t.hero.country}</span>
          </motion.div>
          <motion.div className="hero__cards" style={{ y: cardsY }}>
            {cards.map((c, i) => (
              <motion.a
                href="#experiencias"
                key={c.src}
                className="polaroid"
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: c.rot }}
                whileHover={{ y: -10, rotate: 0, scale: 1.05 }}
                transition={{ delay: 1.5 + i * 0.12, duration: 0.7, ease: EASINGS.smooth }}
              >
                <img src={c.src} alt="" loading="lazy" />
                <span>{c.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container">
        <motion.form
          className="quick"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.8, ease: EASINGS.smooth }}
          onSubmit={(e) => {
            e.preventDefault();
            book({ tour, date, people });
          }}
        >
          <label className="quick__field">
            <Mountain size={20} />
            <span>
              <small>{t.quick.experience}</small>
              <select value={tour} onChange={(e) => setTour(e.target.value)}>
                <option value="">{t.quick.choose}</option>
                {BOOKING_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </span>
          </label>
          <label className="quick__field">
            <CalendarDays size={20} />
            <span>
              <small>{t.quick.date}</small>
              <input type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} />
            </span>
          </label>
          <label className="quick__field">
            <Users size={20} />
            <span>
              <small>{t.quick.people}</small>
              <select value={people} onChange={(e) => setPeople(e.target.value)}>
                {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
                  <option key={n} value={n}>{n} {n === '1' ? t.quick.person : t.quick.persons}</option>
                ))}
                <option value="13+">13+ {t.quick.persons}</option>
              </select>
            </span>
          </label>
          <button type="submit" className="btn btn--primary quick__submit">
            {t.quick.submit} <ArrowRight size={18} />
          </button>
        </motion.form>

        <div className="stats">
          {t.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div
                key={s.label}
                className="stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Icon size={26} />
                <div>
                  <strong><AnimatedCounter target={s.value} suffix={s.suffix} /></strong>
                  <span>{s.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
