import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { CONFIG } from '../config';
import { EASINGS } from '../utils/easings';

const MotionLink = motion.create(Link);

export default function Navbar() {
  const { t } = useLang();
  const { book } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  // Fuera del inicio el menú va siempre sólido para leerse sobre las fotos
  const solid = useLocation().pathname !== '/';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const links = [
    ['#inicio', t.nav.home],
    ['#tours', t.nav.tours],
    ['#experiencias', t.nav.experiences],
    ['#videos', t.nav.videos],
    ['#galeria', t.nav.gallery],
    ['#reservar', t.nav.contact],
  ];

  return (
    <motion.header
      className={`nav${scrolled || solid ? ' nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASINGS.premium }}
    >
      <div className="nav__inner container">
        <Logo />
        <nav className="nav__links" aria-label="Principal">
          {links.map(([href, label]) => (
            <Link key={href} to={`/${href}`}>{label}</Link>
          ))}
        </nav>
        <div className="nav__actions">
          <LangSwitch />
          <button className="btn btn--primary btn--sm nav__cta" onClick={() => book()}>
            {t.nav.book} <ArrowRight size={16} />
          </button>
          <button className="nav__burger" onClick={() => setOpen(true)} aria-label={t.nav.openMenu}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASINGS.premium }}
          >
            <div className="menu__top container">
              <Logo light />
              <button className="nav__burger nav__burger--light" onClick={() => setOpen(false)} aria-label={t.nav.closeMenu}>
                <X size={26} />
              </button>
            </div>
            <nav className="menu__links container">
              {links.map(([href, label], i) => (
                <MotionLink
                  key={href}
                  to={`/${href}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  {label}
                </MotionLink>
              ))}
            </nav>
            <div className="menu__bottom container">
              <button className="btn btn--primary" onClick={() => { setOpen(false); book(); }}>
                {t.nav.book} <ArrowRight size={18} />
              </button>
              <a className="menu__phone" href={CONFIG.phoneHref}><Phone size={18} /> {CONFIG.phoneDisplay}</a>
              <LangSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
