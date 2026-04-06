import { forwardRef, createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, AnchorHTMLAttributes } from 'react';

interface NavMenuCtx { active: string | null; setActive: (v: string | null) => void; }
const NavMenuContext = createContext<NavMenuCtx>({ active: null, setActive: () => {} });

export const NavigationMenu = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const [active, setActive] = useState<string | null>(null);
    const ref2 = useRef<HTMLElement>(null);
    useEffect(() => {
      const h = (e: MouseEvent) => { if (!ref2.current?.contains(e.target as Node)) setActive(null); };
      document.addEventListener('mousedown', h);
      return () => document.removeEventListener('mousedown', h);
    }, []);
    return (
      <NavMenuContext.Provider value={{ active, setActive }}>
        <nav ref={el => { (ref as React.RefCallback<HTMLElement>)?.(el); (ref2 as React.MutableRefObject<HTMLElement | null>).current = el; }}
          className={cn('relative flex items-center', className)} {...props}>
          {children}
        </nav>
      </NavMenuContext.Provider>
    );
  },
);
NavigationMenu.displayName = 'NavigationMenu';

export const NavigationMenuList = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex items-center gap-1', className)} {...props} />
  ),
);
NavigationMenuList.displayName = 'NavigationMenuList';

export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  value?: string;
}

export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ value, className, children, ...props }, ref) => (
    <li ref={ref} className={cn('relative', className)} {...props}>
      {children}
    </li>
  ),
);
NavigationMenuItem.displayName = 'NavigationMenuItem';

export interface NavigationMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { active, setActive } = useContext(NavMenuContext);
    const isActive = active === value;
    return (
      <button
        ref={ref}
        type="button"
        onMouseEnter={() => setActive(value)}
        onClick={() => setActive(isActive ? null : value)}
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
          isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/60',
          className,
        )}
        {...props}
      >
        {children}
        <svg className={cn('w-3.5 h-3.5 transition-transform', isActive && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  },
);
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

export interface NavigationMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { active } = useContext(NavMenuContext);
    return (
      <AnimatePresence>
        {active === value && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 z-50"
          >
            <div
              ref={ref}
              className={cn('rounded-xl border border-gray-700 bg-gray-900 shadow-xl shadow-black/30 p-4 min-w-[200px]', className)}
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
NavigationMenuContent.displayName = 'NavigationMenuContent';

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }>(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
        active ? 'bg-crisp-500/15 text-crisp-300' : 'text-gray-300 hover:bg-gray-800 hover:text-white',
        className,
      )}
      {...props}
    />
  ),
);
NavigationMenuLink.displayName = 'NavigationMenuLink';
