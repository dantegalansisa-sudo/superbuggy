import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { CUSTOMER_VIDEOS, type CustomerVideo } from '../content/reviews';

function Clip({ v }: { v: CustomerVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  // Solo se reproduce el video que está a la vista
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);
  return (
    <figure className="cv__item">
      <video ref={ref} src={v.src} poster={v.poster} muted loop playsInline preload="none" />
      <figcaption>
        <span><Play size={12} fill="currentColor" /> {v.name}</span>
        {v.caption && <small>{v.caption}</small>}
      </figcaption>
    </figure>
  );
}

// Videos de clientes en un carrusel deslizable. Si no hay videos cargados, la sección no aparece.
export default function CustomerVideos() {
  const { t } = useLang();
  const track = useRef<HTMLDivElement>(null);
  if (!CUSTOMER_VIDEOS.length) return null;
  const move = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <section className="section cv" id="videos-clientes">
      <div className="container">
        <SectionHead
          eyebrow={t.customerVideos.eyebrow}
          title={t.customerVideos.title}
          accent={t.customerVideos.titleAccent}
          aside={
            <div className="cv__nav">
              <button onClick={() => move(-1)} aria-label={t.ui.prev}><ChevronLeft size={20} /></button>
              <button onClick={() => move(1)} aria-label={t.ui.next}><ChevronRight size={20} /></button>
            </div>
          }
        />
      </div>
      <motion.div ref={track} className="cv__track" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {CUSTOMER_VIDEOS.map((v) => <Clip key={v.src} v={v} />)}
      </motion.div>
    </section>
  );
}
