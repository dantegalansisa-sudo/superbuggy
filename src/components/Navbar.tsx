import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { CONFIG } from '../config';
import { EASINGS } from '../utils/easings';

export default function Navbar() {
  const { t } = useLang();
  const { book } = useBooking();
  const [scrolled, setScrolled] = useState(false);
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
    ['#galeria', t.nav.gallery],
    ['#faq', t.nav.faq],
    ['#reservar', t.nav.contact],
  ];

  return (
    <motion.header
      className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASINGS.premium }}
    >
      <div className="nav__inner container">
        <Logo />
        <nav className="nav__links" aria-label="Principal">
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <LangSwitch />
          <button className="btn btn--primary btn--sm nav__cta" onClick={() => book()}>
            {t.nav.book} <ArrowRight size={16} />
          </button>
          <button className="nav__burger" onClick={() => setOpen(true)} aria-label="Abrir menú">
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
              <button className="nav__burger nav__burger--light" onClick={() => setOpen(false)} aria-label="Cerrar menú">
                <X size={26} />
              </button>
            </div>
            <nav className="menu__links container">
              {links.map(([href, label], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  {label}
                </motion.a>
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
