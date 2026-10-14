import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASINGS } from '../utils/easings';

type Props = {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animateOnMount?: boolean;
};

export default function RevealText({ children, className = '', delay = 0, tag: Tag = 'h2', animateOnMount }: Props) {
  // Se observa el contenedor: las palabras empiezan ocultas dentro de su máscara y no son visibles para el observer
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = animateOnMount || inView;
  const words = children.split(' ');
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="reveal__mask" aria-hidden="true">
          <motion.span
            className="reveal__word"
            initial={{ y: '110%', rotate: 2 }}
            animate={show ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 0.85, delay: delay + i * 0.07, ease: EASINGS.premium }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
