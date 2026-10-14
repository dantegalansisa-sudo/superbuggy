import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { GALLERY } from '../data';

export default function Gallery() {
  const { t } = useLang();
  const [idx, setIdx] = useState<number | null>(null);
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx]);

  return (
    <section className="section" id="galeria">
      <div className="container">
        <SectionHead eyebrow={t.gallery.eyebrow} title={t.gallery.title} accent={t.gallery.titleAccent} text={t.gallery.text} />
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.src}
              className={`gallery__item${g.tall ? ' gallery__item--tall' : ''}`}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
              aria-label={g.alt}
            >
              <img src={g.src} alt={g.alt} loading="lazy" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)} role="dialog" aria-modal="true">
            <button className="lightbox__close" aria-label="Cerrar"><X size={28} /></button>
            <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior"><ChevronLeft size={30} /></button>
            <motion.img
              key={idx}
              src={GALLERY[idx].src}
              alt={GALLERY[idx].alt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Siguiente"><ChevronRight size={30} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
