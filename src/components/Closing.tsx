import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import RevealText from './RevealText';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useParallax } from '../hooks/useParallax';
import { CONFIG, waLink } from '../config';
import { excursionPath } from '../data';
import { useCatalog } from '../content/catalog';

// Banda corta de llamada a la acción entre secciones
export function CtaBand() {
  const { t } = useLang();
  const { book } = useBooking();
  const { ref, y } = useParallax(60);
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
  const { all } = useCatalog();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__tag">{f.tagline}</p>
          <a className="btn btn--wa btn--sm footer__wa" href={waLink(t.booking.waIntro)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={16} /> {t.nav.book}
          </a>
        </div>
        <div>
          <h4>{f.adventures}</h4>
          <ul>
            {all.map((x) => (
              <li key={x.slug}><Link to={excursionPath(x.slug)}>{x.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{f.links}</h4>
          <ul>
            <li><Link to="/#tours">{t.nav.tours}</Link></li>
            <li><Link to="/#videos">{t.nav.videos}</Link></li>
            <li><Link to="/#galeria">{t.nav.gallery}</Link></li>
            <li><Link to="/#reservar">{t.nav.book}</Link></li>
          </ul>
          <h4 className="footer__h-gap">{f.legalTitle}</h4>
          <ul>
            <li><Link to="/formas-de-pago">{t.legal.payments}</Link></li>
            <li><Link to="/terminos">{t.legal.terms}</Link></li>
            <li><Link to="/privacidad">{t.legal.privacy}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{f.contact}</h4>
          <ul className="footer__contact">
            <li><a href={waLink(t.booking.waIntro)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> WhatsApp {CONFIG.phoneDisplay}</a></li>
            <li><a href={CONFIG.phoneHref}><Phone size={16} /> {CONFIG.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONFIG.email}`}><Mail size={16} /> {CONFIG.email}</a></li>
            <li><MapPin size={16} /> {CONFIG.address}</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {CONFIG.legalName} · RNC {CONFIG.rnc}. {f.rights}</span>
        <span className="footer__links">
          <Link to="/terminos">{t.legal.terms}</Link>
          <Link to="/privacidad">{t.legal.privacy}</Link>
        </span>
        <span className="footer__slogan">{f.slogan}</span>
      </div>
    </footer>
  );
}
