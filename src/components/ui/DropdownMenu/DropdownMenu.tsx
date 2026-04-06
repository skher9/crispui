import { forwardRef, createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

interface DropdownCtx { open: boolean; close: () => void; }
const DropdownContext = createContext<DropdownCtx>({ open: false, close: () => {} });

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ open: controlled, onOpenChange, className, children, ...props }, ref) => {
    const [internal, setInternal] = useState(false);
    const open = controlled ?? internal;
    const containerRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => { setInternal(false); onOpenChange?.(false); }, [onOpenChange]);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) close();
      };
      if (open) document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, close]);

    return (
      <DropdownContext.Provider value={{ open, close }}>
        <div ref={el => { (ref as React.RefCallback<HTMLDivElement>)?.(el); (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}
          className={cn('relative inline-block', className)} {...props}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  },
);
DropdownMenu.displayName = 'DropdownMenu';

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, onClick, children, ...props }, ref) => {
    const { open } = useContext(DropdownContext);
    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onClick}
        className={cn('', className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const alignMap = { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' };
const sideMap: Record<string, string> = {
  bottom: 'top-full mt-1',
  top: 'bottom-full mb-1',
  left: 'right-full mr-1 top-0',
  right: 'left-full ml-1 top-0',
};

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ side = 'bottom', align = 'start', className, children, ...props }, ref) => {
    const { open } = useContext(DropdownContext);
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: side === 'bottom' ? -4 : side === 'top' ? 4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className={cn('absolute z-50 min-w-[180px]', sideMap[side], alignMap[align])}
          >
            <div
              ref={ref}
              role="menu"
              className={cn('rounded-xl border border-gray-700 bg-gray-900 shadow-xl shadow-black/30 p-1 overflow-hidden', className)}
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
DropdownMenuContent.displayName = 'DropdownMenuContent';

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, destructive, icon, shortcut, children, onClick, ...props }, ref) => {
    const { close } = useContext(DropdownContext);
    return (
      <button
        ref={ref}
        role="menuitem"
        type="button"
        onClick={e => { onClick?.(e); close(); }}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors focus:outline-none',
          destructive ? 'text-rose-400 hover:bg-rose-500/10' : 'text-gray-200 hover:bg-gray-800',
          inset && 'pl-8',
          className,
        )}
        {...props}
      >
        {icon && <span className="w-4 h-4 shrink-0 text-gray-400">{icon}</span>}
        <span className="flex-1 text-left">{children}</span>
        {shortcut && <span className="text-xs text-gray-500 ml-auto">{shortcut}</span>}
      </button>
    );
  },
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-widest', className)} {...props} />
  ),
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('my-1 h-px bg-gray-800', className)} {...props} />
  ),
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export interface DropdownMenuCheckboxItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export const DropdownMenuCheckboxItem = forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(
  ({ className, checked, onCheckedChange, children, ...props }, ref) => (
    <button
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn('w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors text-gray-200 hover:bg-gray-800 focus:outline-none', className)}
      {...props}
    >
      <span className={cn('w-4 h-4 rounded border flex items-center justify-center shrink-0', checked ? 'bg-crisp-600 border-crisp-600' : 'border-gray-600')}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </span>
      {children}
    </button>
  ),
);
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

// Simple usable DropdownMenu with internal state (trigger-based)
export function SimpleDropdownMenu({
  trigger,
  children,
  align = 'start',
  side = 'bottom',
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, close: () => setOpen(false) }}>
      <div ref={ref} className="relative inline-block">
        <div onClick={() => setOpen(o => !o)} className="cursor-pointer">{trigger}</div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              className={cn('absolute z-50 min-w-[180px]', sideMap[side], alignMap[align])}
            >
              <div role="menu" className="rounded-xl border border-gray-700 bg-gray-900 shadow-xl shadow-black/30 p-1">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DropdownContext.Provider>
  );
}
