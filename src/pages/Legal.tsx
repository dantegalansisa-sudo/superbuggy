import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useSeo } from '../hooks/useSeo';
import { PRIVACY, TERMS } from '../content/legal';
import { PRIVACY_EN, TERMS_EN } from '../content/legal.en';
import { CONFIG, waLink } from '../config';

export default function LegalPage({ doc }: { doc: 'privacy' | 'terms' }) {
  const { t, lang } = useLang();
  const d = lang === 'en' ? (doc === 'privacy' ? PRIVACY_EN : TERMS_EN) : doc === 'privacy' ? PRIVACY : TERMS;
  const { book } = useBooking();
  useSeo({
    title: `${d.title} · ${CONFIG.brand}`,
    description: d.intro.slice(0, 155),
    path: doc === 'privacy' ? '/privacidad' : '/terminos',
  });
  return (
    <section className="page">
      <div className="container legal">
        <aside className="legal__nav">
          <Link to="/terminos" className={doc === 'terms' ? 'is-active' : undefined}>{t.legal.terms}</Link>
          <Link to="/privacidad" className={doc === 'privacy' ? 'is-active' : undefined}>{t.legal.privacy}</Link>
          <Link to="/formas-de-pago">{t.legal.payments}</Link>
          <div className="legal__cta">
            <button className="btn btn--primary btn--sm" onClick={() => book()}>{t.nav.book} <ArrowRight size={16} /></button>
            <a className="btn btn--wa btn--sm" href={waLink(t.booking.waIntro)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={16} /> WhatsApp</a>
          </div>
        </aside>
        <motion.article className="legal__doc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="page__title">{d.title}</h1>
          <p className="legal__updated">{t.legal.updated}: {d.updated}</p>
          <p className="legal__intro">{d.intro}</p>
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </section>
          ))}
        </motion.article>
      </div>
    </section>
  );
}
