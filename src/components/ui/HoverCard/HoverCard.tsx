import { forwardRef, createContext, useContext, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

interface HoverCardCtx { open: boolean; }
const HoverCardContext = createContext<HoverCardCtx>({ open: false });

export interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  openDelay?: number;
  closeDelay?: number;
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  ({ openDelay = 200, closeDelay = 100, className, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const openTimer = useRef<ReturnType<typeof setTimeout>>();
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();

    const handleOpen = useCallback(() => {
      clearTimeout(closeTimer.current);
      openTimer.current = setTimeout(() => setOpen(true), openDelay);
    }, [openDelay]);

    const handleClose = useCallback(() => {
      clearTimeout(openTimer.current);
      closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
    }, [closeDelay]);

    return (
      <HoverCardContext.Provider value={{ open }}>
        <div
          ref={ref}
          className={cn('relative inline-block', className)}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          {...props}
        >
          {children}
        </div>
      </HoverCardContext.Provider>
    );
  },
);
HoverCard.displayName = 'HoverCard';

export const HoverCardTrigger = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('inline-block cursor-pointer', className)} {...props} />
  ),
);
HoverCardTrigger.displayName = 'HoverCardTrigger';

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const sideStyles: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const sideMotion: Record<string, object> = {
  top:    { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 } },
  bottom: { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
  left:   { initial: { opacity: 0, x: 4 }, animate: { opacity: 1, x: 0 } },
  right:  { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 } },
};

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ side = 'bottom', className, children, ...props }, ref) => {
    const { open } = useContext(HoverCardContext);
    const motion_props = sideMotion[side];
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            {...motion_props}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 w-64',
              sideStyles[side],
            )}
          >
            <div
              ref={ref}
              className={cn(
                'rounded-xl border border-gray-700 bg-gray-900 p-4 shadow-xl shadow-black/30',
                className,
              )}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
HoverCardContent.displayName = 'HoverCardContent';
