import { motion } from 'framer-motion';

export interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  duration?: number;
  delay?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export function Reveal({
  children,
  direction = 'up',
  threshold = 0.15,
  duration = 0.5,
  delay = 0,
  distance = 30,
  once = true,
  className,
}: RevealProps) {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === 'up')    initial.y = distance;
  if (direction === 'down')  initial.y = -distance;
  if (direction === 'left')  initial.x = distance;
  if (direction === 'right') initial.x = -distance;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
