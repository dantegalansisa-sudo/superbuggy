import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import RevealText from './RevealText';

type Props = { eyebrow: string; title: string; accent: string; text?: string; aside?: ReactNode; light?: boolean; center?: boolean };

export default function SectionHead({ eyebrow, title, accent, text, aside, light, center }: Props) {
  return (
    <div className={`shead${light ? ' shead--light' : ''}${center ? ' shead--center' : ''}`}>
      <div>
        <motion.p className="eyebrow" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {eyebrow}
        </motion.p>
        <h2 className="shead__title">
          <RevealText tag="span" className="shead__line">{title}</RevealText>
          <RevealText tag="span" className="shead__line shead__accent" delay={0.15}>{accent}</RevealText>
        </h2>
      </div>
      {(text || aside) && (
        <motion.div className="shead__aside" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          {text && <p>{text}</p>}
          {aside}
        </motion.div>
      )}
    </div>
  );
}
