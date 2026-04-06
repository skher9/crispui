import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  colors?: [string, string, string];
  speed?: 'slow' | 'medium' | 'fast';
  blur?: number;
  opacity?: number;
}

const speedMap = { slow: 25, medium: 15, fast: 8 };

export function AuroraBackground({
  colors = ['#6366f1', '#8b5cf6', '#06b6d4'],
  speed = 'medium',
  blur = 100,
  opacity = 0.35,
  className,
  children,
  ...props
}: AuroraBackgroundProps) {
  const dur = speedMap[speed];

  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, -60, 0], y: [0, -80, 50, 0], scale: [1, 1.3, 0.85, 1] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '15%',
            width: '45%', height: '60%',
            borderRadius: '50%',
            background: colors[0],
            filter: `blur(${blur}px)`,
            opacity,
          }}
        />
        <motion.div
          animate={{ x: [0, -100, 70, 0], y: [0, 60, -40, 0], scale: [1, 0.8, 1.25, 1] }}
          transition={{ duration: dur * 1.3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '40%', right: '10%',
            width: '40%', height: '50%',
            borderRadius: '50%',
            background: colors[1],
            filter: `blur(${blur}px)`,
            opacity,
          }}
        />
        <motion.div
          animate={{ x: [0, 70, -40, 0], y: [0, -50, 80, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: dur * 0.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '5%', left: '30%',
            width: '35%', height: '45%',
            borderRadius: '50%',
            background: colors[2],
            filter: `blur(${blur}px)`,
            opacity,
          }}
        />
      </div>
      {children}
    </div>
  );
}
