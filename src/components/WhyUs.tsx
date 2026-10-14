import { motion, useInView } from 'framer-motion';
import { CalendarCheck, Compass, HeartHandshake, ShieldCheck, Truck, Users } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { useParallax } from '../hooks/useParallax';
import { cardVariants, containerVariants } from '../utils/easings';

const ICONS = [ShieldCheck, Truck, Compass, Users, CalendarCheck, HeartHandshake];

export default function WhyUs() {
  const { t } = useLang();
  const { ref, y } = useParallax(50);
  // El clip-path oculta la imagen, así que se observa el contenedor
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <section className="section why">
      <div className="container why__grid">
        <div className="why__media" ref={ref}>
          <motion.div
            className="why__img"
            initial={{ clipPath: 'inset(0 100% 0 0 round 32px)' }}
            animate={inView ? { clipPath: 'inset(0 0% 0 0 round 32px)' } : undefined}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img src="/images/buggy-crucero-2.webp" alt="Buggy de Super Buggies con un crucero de fondo en Puerto Plata" style={{ y, scale: 1.18 }} loading="lazy" />
          </motion.div>
          <motion.div className="why__float" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.7 }}>
            <img src="/images/buggy-naranja.webp" alt="" loading="lazy" />
          </motion.div>
          <motion.div className="why__badge" initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: -8 }} viewport={{ once: true }} transition={{ delay: 0.8, type: 'spring', stiffness: 160 }}>
            <strong>Full</strong>insurance
          </motion.div>
        </div>
        <div>
          <SectionHead eyebrow={t.why.eyebrow} title={t.why.title} accent={t.why.titleAccent} />
          <p className="why__text">{t.why.text}</p>
          <motion.ul className="why__list" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {t.why.items.map((it, i) => {
              const Icon = ICONS[i];
              return (
                <motion.li key={it.title} variants={cardVariants}>
                  <span className="why__icon"><Icon size={22} /></span>
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
