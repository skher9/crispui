import { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { cn } from '../../../utils/cn';

export type IconAnimation =
  | 'bounce' | 'spin' | 'pulse' | 'shake'
  | 'float' | 'wobble' | 'heartbeat' | 'tada'
  | 'swing' | 'rubberBand' | 'jello' | 'flash' | 'ping';

export type IconTrigger = 'hover' | 'click' | 'loop' | 'none';

export interface AnimatedIconProps {
  animation: IconAnimation;
  trigger?: IconTrigger;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  loop?: boolean;
  delay?: number;
  speed?: number;
}

const sizeMap = { xs: 'text-sm', sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl', xl: 'text-4xl', '2xl': 'text-5xl' };

// Variants for each animation type
const animationVariants: Record<IconAnimation, { animate: TargetAndTransition; transition?: object }> = {
  bounce: {
    animate: { y: [0, -12, 0] },
    transition: { duration: 0.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 },
  },
  spin: {
    animate: { rotate: [0, 360] },
    transition: { duration: 1.2, ease: 'linear', repeat: Infinity },
  },
  pulse: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 },
  },
  shake: {
    animate: { x: [0, -6, 6, -6, 6, -3, 3, 0] },
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  float: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 2.5, ease: 'easeInOut', repeat: Infinity },
  },
  wobble: {
    animate: { rotate: [0, -12, 10, -8, 6, -4, 3, -2, 0], x: [0, -6, 6, -4, 4, -2, 2, 0] },
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
  heartbeat: {
    animate: { scale: [1, 1.18, 1, 1.18, 1] },
    transition: { duration: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 },
  },
  tada: {
    animate: {
      scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 0],
    },
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
  swing: {
    animate: { rotate: [0, 20, -16, 12, -8, 6, -4, 0] },
    transition: { duration: 0.9, ease: 'easeInOut', transformOrigin: 'top center' },
  },
  rubberBand: {
    animate: { scaleX: [1, 1.25, 0.75, 1.15, 0.92, 1.05, 0.98, 1], scaleY: [1, 0.75, 1.25, 0.88, 1.07, 0.96, 1.02, 1] },
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
  jello: {
    animate: { skewX: [0, -12, 10, -8, 6, -4, 2, -1, 0] },
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
  flash: {
    animate: { opacity: [1, 0, 1, 0, 1] },
    transition: { duration: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 },
  },
  ping: {
    animate: { scale: [1, 1.4, 1], opacity: [1, 0, 1] },
    transition: { duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.3 },
  },
};

export function AnimatedIcon({
  animation,
  trigger = 'hover',
  children,
  size = 'md',
  className,
  delay = 0,
}: AnimatedIconProps) {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const loopRef = useRef(trigger === 'loop');

  const { animate, transition = {} } = animationVariants[animation];

  // For loop triggers, we always animate
  const handleTrigger = async () => {
    if (trigger === 'loop' || isAnimating) return;
    setIsAnimating(true);
    await controls.start({
      ...animate,
      transition: { ...transition, delay: delay / 1000 },
    } as TargetAndTransition);
    controls.stop();
    setIsAnimating(false);
  };

  if (loopRef.current) {
    return (
      <motion.span
        className={cn(
          'inline-flex items-center justify-center cursor-default select-none',
          sizeMap[size],
          className,
        )}
        animate={animate}
        transition={{ ...(transition as object), delay: delay / 1000 }}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn(
        'inline-flex items-center justify-center cursor-default select-none',
        sizeMap[size],
        trigger !== 'none' && 'cursor-pointer',
        className,
      )}
      animate={controls}
      onHoverStart={trigger === 'hover' ? handleTrigger : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </motion.span>
  );
}
