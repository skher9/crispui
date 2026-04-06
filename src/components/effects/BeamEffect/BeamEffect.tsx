import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface BeamEffectProps extends HTMLAttributes<HTMLDivElement> {
  beamCount?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

function Beam({ color, duration, delay, index }: { color: string; duration: number; delay: number; index: number }) {
  const left = 10 + index * (80 / 5);
  const rotate = -45 + index * 5;
  return (
    <motion.div
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: [0, 0.15, 0.08, 0], y: ['−100%', '200%'] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4 + 2,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: 0,
        width: 2,
        height: '60%',
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'top center',
        filter: 'blur(1px)',
      }}
    />
  );
}

export function BeamEffect({
  beamCount = 6,
  color = '#818cf8',
  duration = 4,
  delay = 0,
  className,
  children,
  ...props
}: BeamEffectProps) {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: beamCount }, (_, i) => (
          <Beam
            key={i}
            index={i}
            color={color}
            duration={duration + i * 0.5}
            delay={delay + i * 0.8}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
