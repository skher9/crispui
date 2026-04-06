import { Children } from 'react';
import { motion } from 'framer-motion';

export interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  childClassName?: string;
  type?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn';
}

const childVariants = {
  fadeIn:   { hidden: { opacity: 0 },             visible: { opacity: 1 } },
  slideUp:  { hidden: { opacity: 0, y: 24 },       visible: { opacity: 1, y: 0 } },
  slideLeft:{ hidden: { opacity: 0, x: 20 },       visible: { opacity: 1, x: 0 } },
  zoomIn:   { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
};

export function Stagger({
  children,
  delay = 80,
  duration = 0.35,
  once = true,
  className,
  childClassName,
  type = 'slideUp',
}: StaggerProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
    >
      {Children.map(children, (child) => (
        <motion.div
          className={childClassName}
          variants={childVariants[type]}
          transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
