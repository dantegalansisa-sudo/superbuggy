import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { REVIEWS, REVIEW_SUMMARY, type Review } from '../content/reviews';

// "Hace 2 meses" → "2 months ago" cuando la web está en inglés
const whenEn = (w: string) =>
  w
    .replace(/^Hace un año$/, '1 year ago')
    .replace(/^Hace un mes$/, '1 month ago')
    .replace(/^Hace (\d+) años$/, '$1 years ago')
    .replace(/^Hace (\d+) meses$/, '$1 months ago');

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span className="rv__stars" aria-label={`${n}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill={i < Math.round(n) ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

function Card({ r }: { r: Review }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const long = r.text.length > 170;
  return (
    <article className={`rv__card${open ? ' is-open' : ''}`}>
      <header>
        <span className="rv__avatar" aria-hidden="true">{r.name.trim()[0]?.toUpperCase()}</span>
        <div>
          <strong>{r.name}</strong>
          <small>{lang === 'en' ? whenEn(r.when) : r.when} · Google</small>
        </div>
        <Stars n={r.stars} />
      </header>
      <p lang={r.lang}>{r.text}</p>
      {long && (
        <button className="rv__more" onClick={() => setOpen((o) => !o)}>
          {open ? t.reviews.less : t.reviews.more}
        </button>
      )}
    </article>
  );
}

// Dos filas que se desplazan solas en sentidos opuestos (se pausan al pasar el mouse).
// En móvil se deslizan con el dedo. Solo se muestra una selección de las opiniones.
export default function Reviews() {
  const { t } = useLang();
  const half = Math.ceil(REVIEWS.length / 2);
  const rows = [REVIEWS.slice(0, half), REVIEWS.slice(half)];
  return (
    <section className="section rv" id="opiniones">
      <div className="container">
        <SectionHead
          eyebrow={t.reviews.eyebrow}
          title={t.reviews.title}
          accent={t.reviews.titleAccent}
          aside={
            <motion.div className="rv__summary" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <span className="rv__g" aria-hidden="true">G</span>
              <div>
                <strong>{REVIEW_SUMMARY.rating.toFixed(1)}</strong>
                <Stars n={REVIEW_SUMMARY.rating} size={16} />
                <small>{t.reviews.count(REVIEW_SUMMARY.count)}</small>
              </div>
            </motion.div>
          }
        />
      </div>
      <div className="rv__rows">
        {rows.map((row, i) => (
          <div key={i} className={`rv__track${i === 1 ? ' rv__track--rev' : ''}`}>
            {/* Se duplica la fila para que el desplazamiento sea continuo */}
            <div className="rv__belt">
              {[...row, ...row].map((r, j) => (
                <div key={`${r.name}-${j}`} className="rv__item" aria-hidden={j >= row.length ? true : undefined}>
                  <Card r={r} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
