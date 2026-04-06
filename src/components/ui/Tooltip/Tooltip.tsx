import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  className?: string;
}

const placementStyles: Record<TooltipPlacement, { container: string; initial: object }> = {
  top:    { container: 'bottom-full left-1/2 -translate-x-1/2 mb-2', initial: { opacity: 0, y: 6, x: '-50%' } },
  bottom: { container: 'top-full left-1/2 -translate-x-1/2 mt-2',  initial: { opacity: 0, y: -6, x: '-50%' } },
  left:   { container: 'right-full top-1/2 -translate-y-1/2 mr-2', initial: { opacity: 0, x: 6, y: '-50%' } },
  right:  { container: 'left-full top-1/2 -translate-y-1/2 ml-2',  initial: { opacity: 0, x: -6, y: '-50%' } },
};

export function Tooltip({ content, children, placement = 'top', delay = 120, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timer.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  };

  const { container, initial } = placementStyles[placement];

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            className={cn('absolute z-50 whitespace-nowrap pointer-events-none', container)}
            initial={initial as Record<string, number>}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
          >
            <div className={cn(
              'px-2.5 py-1.5 rounded-lg text-xs font-medium text-white bg-gray-900/95 shadow-lg backdrop-blur-sm max-w-xs text-center',
              className,
            )}>
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
