import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import SectionHead from './SectionHead';
import MagneticButton from './MagneticButton';
import { useLang } from '../i18n';
import { useBooking } from '../booking';
import { useParallax } from '../hooks/useParallax';

function Reel({ n, offset }: { n: number; offset: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(video, { amount: 0.3 });
  const { ref, y } = useParallax(offset);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <div ref={ref} className="reel-wrap">
      <motion.div className="reel" style={{ y }}>
        <video ref={video} src={`/videos/reel-${n}.mp4`} poster={`/videos/reel-${n}.jpg`} muted loop playsInline preload="none" />
        <span className="reel__tag"><Play size={12} fill="currentColor" /> Super Buggies</span>
      </motion.div>
    </div>
  );
}

export default function Reels() {
  const { t } = useLang();
  const { book } = useBooking();
  return (
    <section className="section reels">
      <div className="container reels__grid">
        <div className="reels__copy">
          <SectionHead eyebrow={t.reels.eyebrow} title={t.reels.title} accent={t.reels.titleAccent} light />
          <p className="reels__text">{t.reels.text}</p>
          <MagneticButton className="btn btn--primary btn--lg" onClick={() => book()}>
            {t.reels.cta} <ArrowRight size={18} />
          </MagneticButton>
        </div>
        <div className="reels__videos">
          <Reel n={1} offset={30} />
          <Reel n={2} offset={-40} />
          <Reel n={3} offset={50} />
        </div>
      </div>
    </section>
  );
}
