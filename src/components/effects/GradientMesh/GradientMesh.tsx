import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface GradientMeshProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  speed?: 'slow' | 'medium' | 'fast';
  opacity?: number;
}

const speedMap = { slow: 20, medium: 12, fast: 6 };

const POSITIONS = [
  { top: '0%', left: '0%' },
  { top: '0%', right: '0%' },
  { bottom: '0%', left: '0%' },
  { bottom: '0%', right: '0%' },
  { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
];

const MOVES = [
  { x: [0, 80, -40, 0], y: [0, 40, -60, 0] },
  { x: [0, -60, 30, 0], y: [0, 60, -30, 0] },
  { x: [0, 50, -80, 0], y: [0, -50, 30, 0] },
  { x: [0, -40, 60, 0], y: [0, -40, 50, 0] },
  { x: [0, 30, -30, 0], y: [0, 30, -30, 0] },
];

export function GradientMesh({
  colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
  speed = 'medium',
  opacity = 0.5,
  className,
  children,
  ...props
}: GradientMeshProps) {
  const dur = speedMap[speed];

  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div className="absolute inset-0 -z-10">
        {colors.slice(0, 5).map((color, i) => (
          <motion.div
            key={i}
            animate={MOVES[i]}
            transition={{ duration: dur + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              ...POSITIONS[i],
              width: '50%',
              height: '50%',
              borderRadius: '50%',
              background: color,
              filter: 'blur(80px)',
              opacity: opacity / colors.length * 2,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
