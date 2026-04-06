import { forwardRef, createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

interface CollapsibleCtx { open: boolean; toggle: () => void; }
const CollapsibleContext = createContext<CollapsibleCtx | null>(null);
const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error('Collapsible compound components must be used inside <Collapsible>');
  return ctx;
};

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open: controlledOpen, defaultOpen = false, onOpenChange, className, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const open = controlledOpen ?? internalOpen;
    const toggle = () => {
      const next = !open;
      setInternalOpen(next);
      onOpenChange?.(next);
    };
    return (
      <CollapsibleContext.Provider value={{ open, toggle }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);
Collapsible.displayName = 'Collapsible';

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, onClick, children, ...props }, ref) => {
    const { toggle } = useCollapsible();
    return (
      <button
        ref={ref}
        type="button"
        onClick={e => { toggle(); onClick?.(e); }}
        className={cn('flex w-full items-center justify-between', className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export const CollapsibleContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsible();
    return (
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div ref={ref} className={cn('pt-1', className)} {...props}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
CollapsibleContent.displayName = 'CollapsibleContent';
