import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import RevealText from './RevealText';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useParallax } from '../hooks/useParallax';
import { CONFIG, waLink } from '../config';
import { EXPERIENCES, TOURS } from '../data';

export function CtaBand() {
  const { t } = useLang();
  const { book } = useBooking();
  const { ref, y } = useParallax(70);
  return (
    <section className="cta" ref={ref}>
      <motion.img src="/images/barco-proa.webp" alt="" className="cta__img" style={{ y, scale: 1.25 }} loading="lazy" />
      <div className="cta__shade" />
      <div className="container cta__inner">
        <p className="eyebrow eyebrow--light">{t.cta.eyebrow}</p>
        <RevealText tag="h2" className="cta__title">{t.cta.title}</RevealText>
        <p className="cta__text">{t.cta.text}</p>
        <div className="cta__btns">
          <MagneticButton className="btn btn--primary btn--lg" onClick={() => book()}>
            {t.cta.book} <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton className="btn btn--wa btn--lg" href={waLink(t.booking.waIntro)} target="_blank">
            <WhatsAppIcon size={18} /> {t.cta.wa}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__tag">{f.tagline}</p>
        </div>
        <div>
          <h4>{f.links}</h4>
          <ul>
            <li><a href="#inicio">{t.nav.home}</a></li>
            <li><a href="#tours">{t.nav.tours}</a></li>
            <li><a href="#experiencias">{t.nav.experiences}</a></li>
            <li><a href="#galeria">{t.nav.gallery}</a></li>
            <li><a href="#faq">{t.nav.faq}</a></li>
            <li><a href="#reservar">{t.nav.book}</a></li>
          </ul>
        </div>
        <div>
          <h4>{f.adventures}</h4>
          <ul>
            {[...TOURS.slice(0, 3), ...EXPERIENCES.slice(0, 3)].map((x) => (
              <li key={x.id}><a href="#tours">{x.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{f.contact}</h4>
          <ul className="footer__contact">
            <li><a href={waLink(t.booking.waIntro)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> WhatsApp {CONFIG.phoneDisplay}</a></li>
            <li><a href={CONFIG.phoneHref}><Phone size={16} /> {CONFIG.phoneDisplay}</a></li>
            <li><MapPin size={16} /> {CONFIG.address}</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {CONFIG.brand}. {f.rights}</span>
        <span className="footer__slogan">{f.slogan}</span>
      </div>
    </footer>
  );
}
