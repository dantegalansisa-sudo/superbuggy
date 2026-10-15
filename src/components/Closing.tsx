import { MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import Logo from './Logo';
import { useLang } from '../i18n';
import { CONFIG, waLink } from '../config';
import { EXPERIENCES, TOURS } from '../data';

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
            <li><a href="#videos">{t.nav.videos}</a></li>
            <li><a href="#reservar">{t.nav.book}</a></li>
          </ul>
        </div>
        <div>
          <h4>{f.adventures}</h4>
          <ul>
            {[...TOURS.slice(0, 3), ...EXPERIENCES.slice(0, 3)].map((x) => (
              <li key={x.id}><a href={TOURS.some((tour) => tour.id === x.id) ? '#tours' : '#experiencias'}>{x.name}</a></li>
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
