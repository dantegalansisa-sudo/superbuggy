import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 250 });
  const springY = useSpring(y, { damping: 25, stiffness: 250 });
  const [hover, setHover] = useState(false);
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    // Delegación: detecta cualquier elemento interactivo, incluso los que se montan después
    const over = (e: MouseEvent) => {
      const el = e.target as Element | null;
      setHover(Boolean(el?.closest('a, button, select, input, textarea, label, [data-cursor]')));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring${hover ? ' cursor--hover' : ''}`} style={{ x: springX, y: springY }} />
    </>
  );
}
