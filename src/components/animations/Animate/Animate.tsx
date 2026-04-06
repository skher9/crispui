import { motion, type Variants } from 'framer-motion';
import type { HTMLAttributes } from 'react';

export type AnimateType =
  | 'fadeIn' | 'fadeOut'
  | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'
  | 'zoomIn' | 'zoomOut'
  | 'bounceIn'
  | 'flipX' | 'flipY';

export interface AnimateProps extends HTMLAttributes<HTMLDivElement> {
  type?: AnimateType;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: React.ElementType;
}

const variants: Record<AnimateType, Variants> = {
  fadeIn:     { hidden: { opacity: 0 },                        visible: { opacity: 1 } },
  fadeOut:    { hidden: { opacity: 1 },                        visible: { opacity: 0 } },
  slideUp:    { hidden: { opacity: 0, y: 28 },                 visible: { opacity: 1, y: 0 } },
  slideDown:  { hidden: { opacity: 0, y: -28 },                visible: { opacity: 1, y: 0 } },
  slideLeft:  { hidden: { opacity: 0, x: 28 },                 visible: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: -28 },                visible: { opacity: 1, x: 0 } },
  zoomIn:     { hidden: { opacity: 0, scale: 0.85 },           visible: { opacity: 1, scale: 1 } },
  zoomOut:    { hidden: { opacity: 0, scale: 1.15 },           visible: { opacity: 1, scale: 1 } },
  bounceIn: {
    hidden:  { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 14 } },
  },
  flipX: {
    hidden:  { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  flipY: {
    hidden:  { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 },
  },
};

export function Animate({
  type = 'fadeIn',
  delay = 0,
  duration = 0.4,
  once = true,
  as: Tag = 'div',
  children,
  style,
  ...props
}: AnimateProps) {
  const MotionTag = motion(Tag as React.ElementType);

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants[type]}
      transition={{ duration, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ perspective: 800, ...style }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
