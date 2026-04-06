import { createContext, forwardRef, useContext, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

// ── Context ────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  multiple: boolean;
  variant: 'default' | 'bordered' | 'flush';
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<{ id: string; isOpen: boolean } | null>(null);

// ── Accordion ──────────────────────────────────────────────────────────────

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  defaultOpen?: string | string[];
  variant?: 'default' | 'bordered' | 'flush';
}

export function Accordion({
  multiple = false,
  defaultOpen,
  variant = 'default',
  children,
  className,
  ...props
}: AccordionProps) {
  const initial = new Set(
    defaultOpen ? (Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]) : [],
  );
  const [openItems, setOpenItems] = useState<Set<string>>(initial);

  const toggle = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle, multiple, variant }}>
      <div
        className={cn(
          variant === 'bordered' && 'border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100',
          variant === 'default' && 'space-y-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ── AccordionItem ──────────────────────────────────────────────────────────

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
}

export function AccordionItem({ id: externalId, children, className, ...props }: AccordionItemProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const ctx = useContext(AccordionContext)!;
  const isOpen = ctx.openItems.has(id);

  return (
    <AccordionItemContext.Provider value={{ id, isOpen }}>
      <div
        className={cn(
          ctx.variant === 'default' && 'rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm',
          ctx.variant === 'flush' && 'border-b border-gray-200 last:border-b-0',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// ── AccordionTrigger ───────────────────────────────────────────────────────

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(AccordionContext)!;
    const itemCtx = useContext(AccordionItemContext)!;
    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={itemCtx.isOpen}
        onClick={() => ctx.toggle(itemCtx.id)}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-gray-800',
          'hover:bg-gray-50 transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-crisp-500',
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <motion.span
          animate={{ rotate: itemCtx.isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 flex-shrink-0 ml-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ── AccordionContent ───────────────────────────────────────────────────────

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const itemCtx = useContext(AccordionItemContext)!;
    return (
      <AnimatePresence initial={false}>
        {itemCtx.isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              ref={ref}
              className={cn('px-4 pb-4 text-sm text-gray-600 leading-relaxed', className)}
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
AccordionContent.displayName = 'AccordionContent';
