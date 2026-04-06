import { forwardRef, createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

interface MenubarCtx { active: string | null; setActive: (v: string | null) => void; }
const MenubarContext = createContext<MenubarCtx>({ active: null, setActive: () => {} });

export const Menubar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const [active, setActive] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const h = (e: MouseEvent) => { if (!containerRef.current?.contains(e.target as Node)) setActive(null); };
      document.addEventListener('mousedown', h);
      return () => document.removeEventListener('mousedown', h);
    }, []);
    return (
      <MenubarContext.Provider value={{ active, setActive }}>
        <div
          ref={el => { (ref as React.RefCallback<HTMLDivElement>)?.(el); (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}
          className={cn('flex items-center gap-1 border border-gray-700 rounded-xl bg-gray-900 p-1', className)}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    );
  },
);
Menubar.displayName = 'Menubar';

export interface MenubarMenuProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const MenubarMenu = forwardRef<HTMLDivElement, MenubarMenuProps>(
  ({ value, className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
    </div>
  ),
);
MenubarMenu.displayName = 'MenubarMenu';

export interface MenubarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { active, setActive } = useContext(MenubarContext);
    const isActive = active === value;
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setActive(isActive ? null : value)}
        onMouseEnter={() => active && setActive(value)}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
MenubarTrigger.displayName = 'MenubarTrigger';

export interface MenubarContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { active } = useContext(MenubarContext);
    return (
      <AnimatePresence>
        {active === value && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1 z-50"
          >
            <div ref={ref} role="menu" className={cn('rounded-xl border border-gray-700 bg-gray-900 shadow-xl shadow-black/30 p-1 min-w-[180px]', className)} {...props}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
MenubarContent.displayName = 'MenubarContent';

export interface MenubarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
}

export const MenubarItem = forwardRef<HTMLButtonElement, MenubarItemProps>(
  ({ className, shortcut, icon, destructive, children, onClick, ...props }, ref) => {
    const { setActive } = useContext(MenubarContext);
    return (
      <button
        ref={ref}
        role="menuitem"
        type="button"
        onClick={e => { onClick?.(e); setActive(null); }}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors focus:outline-none',
          destructive ? 'text-rose-400 hover:bg-rose-500/10' : 'text-gray-200 hover:bg-gray-800',
          className,
        )}
        {...props}
      >
        {icon && <span className="w-4 h-4 text-gray-400 shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{children}</span>
        {shortcut && <kbd className="text-[10px] text-gray-500 font-mono">{shortcut}</kbd>}
      </button>
    );
  },
);
MenubarItem.displayName = 'MenubarItem';

export const MenubarSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('my-1 h-px bg-gray-800', className)} {...props} />
  ),
);
MenubarSeparator.displayName = 'MenubarSeparator';

export const MenubarLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-3 py-1 text-[10px] font-semibold text-gray-500 uppercase tracking-widest', className)} {...props} />
  ),
);
MenubarLabel.displayName = 'MenubarLabel';
