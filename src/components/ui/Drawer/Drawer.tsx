import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: DrawerSide;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  className?: string;
}

import type { TargetAndTransition } from 'framer-motion';

const sideAnimations: Record<DrawerSide, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  right:  { hidden: { x: '100%' }, visible: { x: 0 } },
  left:   { hidden: { x: '-100%' }, visible: { x: 0 } },
  top:    { hidden: { y: '-100%' }, visible: { y: 0 } },
  bottom: { hidden: { y: '100%' }, visible: { y: 0 } },
};

const sidePositions: Record<DrawerSide, string> = {
  right:  'right-0 top-0 bottom-0',
  left:   'left-0 top-0 bottom-0',
  top:    'top-0 left-0 right-0',
  bottom: 'bottom-0 left-0 right-0',
};

const sideSizes: Record<DrawerSide, Record<string, string>> = {
  right:  { sm: 'w-72', md: 'w-80', lg: 'w-96', xl: 'w-[480px]', full: 'w-screen' },
  left:   { sm: 'w-72', md: 'w-80', lg: 'w-96', xl: 'w-[480px]', full: 'w-screen' },
  top:    { sm: 'h-48', md: 'h-64', lg: 'h-80', xl: 'h-96', full: 'h-screen' },
  bottom: { sm: 'h-48', md: 'h-64', lg: 'h-80', xl: 'h-96', full: 'h-screen' },
};

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
  size = 'md',
  closeOnBackdrop = true,
  className,
}: DrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  const { hidden, visible } = sideAnimations[side];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              'absolute bg-white flex flex-col shadow-2xl shadow-gray-900/20 overflow-hidden',
              sidePositions[side],
              sideSizes[side][size],
              className,
            )}
            initial={hidden}
            animate={visible}
            exit={hidden}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export interface DrawerHeaderProps { children: React.ReactNode; onClose?: () => void; className?: string; }
export function DrawerHeader({ children, onClose, className }: DrawerHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0', className)}>
      <div className="flex-1 min-w-0">{children}</div>
      {onClose && (
        <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export interface DrawerBodyProps { children: React.ReactNode; className?: string; }
export function DrawerBody({ children, className }: DrawerBodyProps) {
  return <div className={cn('flex-1 overflow-y-auto px-5 py-4', className)}>{children}</div>;
}

export interface DrawerFooterProps { children: React.ReactNode; className?: string; }
export function DrawerFooter({ children, className }: DrawerFooterProps) {
  return (
    <div className={cn('px-5 py-4 border-t border-gray-100 flex items-center gap-3 flex-shrink-0 bg-gray-50/50', className)}>
      {children}
    </div>
  );
}
