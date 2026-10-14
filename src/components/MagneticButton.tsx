import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  strength?: number;
};

export default function MagneticButton({ children, href, onClick, className = '', target, type = 'button', disabled, strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  };

  return (
    <div ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <motion.div animate={pos} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
        {href ? (
          <a href={href} className={className} onClick={onClick} target={target} rel={target ? 'noopener noreferrer' : undefined}>
            {children}
          </a>
        ) : (
          <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}
