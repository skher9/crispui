import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

export type GlowColor = 'crisp' | 'emerald' | 'rose' | 'amber' | 'sky' | 'violet';

export interface GlowPulseProps {
  children: React.ReactNode;
  color?: GlowColor;
  size?: 'sm' | 'md' | 'lg';
  speed?: number;
  className?: string;
}

const glowColors: Record<GlowColor, string> = {
  crisp:   'shadow-crisp-400/60',
  emerald: 'shadow-emerald-400/60',
  rose:    'shadow-rose-400/60',
  amber:   'shadow-amber-400/60',
  sky:     'shadow-sky-400/60',
  violet:  'shadow-violet-400/60',
};

const glowSizes = {
  sm: 'shadow-[0_0_8px_2px]',
  md: 'shadow-[0_0_16px_4px]',
  lg: 'shadow-[0_0_28px_8px]',
};

export function GlowPulse({ children, color = 'crisp', size = 'md', speed = 2, className }: GlowPulseProps) {
  return (
    <motion.span
      className={cn('inline-flex', glowSizes[size], glowColors[color], className)}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: speed, ease: 'easeInOut', repeat: Infinity }}
      style={{ display: 'inline-flex', borderRadius: 'inherit' }}
    >
      {children}
    </motion.span>
  );
}
