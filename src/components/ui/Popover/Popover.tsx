import { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  placement?: PopoverPlacement;
  className?: string;
  offset?: number;
  closeOnClickOutside?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const placementClasses: Record<PopoverPlacement, string> = {
  top:           'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom:        'top-full left-1/2 -translate-x-1/2 mt-2',
  left:          'right-full top-1/2 -translate-y-1/2 mr-2',
  right:         'left-full top-1/2 -translate-y-1/2 ml-2',
  'top-start':   'bottom-full left-0 mb-2',
  'top-end':     'bottom-full right-0 mb-2',
  'bottom-start':'top-full left-0 mt-2',
  'bottom-end':  'top-full right-0 mt-2',
};

const placementAnimation: Record<PopoverPlacement, object> = {
  top:           { y: 6 }, bottom:        { y: -6 },
  left:          { x: 6 }, right:         { x: -6 },
  'top-start':   { y: 6 }, 'top-end':     { y: 6 },
  'bottom-start':{ y: -6 }, 'bottom-end': { y: -6 },
};

export function Popover({
  trigger,
  children,
  placement = 'bottom-start',
  className,
  closeOnClickOutside = true,
  open: controlled,
  onOpenChange,
}: PopoverProps) {
  const [local, setLocal] = useState(false);
  const isOpen = controlled ?? local;
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !isOpen;
    setLocal(next);
    onOpenChange?.(next);
  };
  const close = () => { setLocal(false); onOpenChange?.(false); };

  useEffect(() => {
    if (!closeOnClickOutside) return;
    const h = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [closeOnClickOutside, isOpen]);

  const { y = 0, x = 0 } = placementAnimation[placement] as { y?: number; x?: number };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <span onClick={toggle} className="inline-flex cursor-pointer">
        {trigger}
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn('absolute z-50 min-w-[200px]', placementClasses[placement])}
            initial={{ opacity: 0, y, x }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y, x }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className={cn(
              'bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-900/10 overflow-hidden',
              className,
            )}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── PopoverContent helpers ─────────────────────────────────────────────────

export const PopoverHeader = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-4 py-3 border-b border-gray-100 text-sm font-semibold text-gray-800', className)}>
      {children}
    </div>
  ),
);
PopoverHeader.displayName = 'PopoverHeader';

export const PopoverBody = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('px-4 py-3', className)}>{children}</div>
  ),
);
PopoverBody.displayName = 'PopoverBody';
