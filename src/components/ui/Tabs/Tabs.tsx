import { createContext, forwardRef, useContext, useId, useState } from 'react';
import { motion } from 'framer-motion';
// TabPanel uses CSS animation defined in tailwind.css
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';

// ── Context ────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: 'line' | 'pill' | 'enclosed';
  layoutId: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);

// ── Tabs root ──────────────────────────────────────────────────────────────

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  variant?: 'line' | 'pill' | 'enclosed';
}

export function Tabs({
  defaultTab,
  activeTab: controlled,
  onTabChange,
  variant = 'line',
  children,
  className,
  ...props
}: TabsProps) {
  const layoutId = useId();
  const [local, setLocal] = useState(defaultTab ?? '');

  const activeTab = controlled ?? local;
  const setActiveTab = (id: string) => {
    setLocal(id);
    onTabChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, layoutId }}>
      <div className={cn('flex flex-col', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ── TabList ────────────────────────────────────────────────────────────────

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(TabsContext)!;
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'flex',
          ctx.variant === 'line' && 'border-b border-gray-200 gap-1',
          ctx.variant === 'pill' && 'bg-gray-100 rounded-xl p-1 gap-1 w-fit',
          ctx.variant === 'enclosed' && 'border border-gray-200 rounded-t-xl overflow-hidden',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabList.displayName = 'TabList';

// ── Tab ────────────────────────────────────────────────────────────────────

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ id, icon, badge, children, className, ...props }, ref) => {
    const ctx = useContext(TabsContext)!;
    const isActive = ctx.activeTab === id;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${id}`}
        onClick={() => ctx.setActiveTab(id)}
        className={cn(
          'relative flex items-center gap-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap outline-none',
          'focus-visible:ring-2 focus-visible:ring-crisp-500 focus-visible:ring-offset-1',
          ctx.variant === 'line' && [
            'px-3 py-2.5 rounded-t-lg',
            isActive ? 'text-crisp-600' : 'text-gray-500 hover:text-gray-900',
          ],
          ctx.variant === 'pill' && [
            'px-3.5 py-1.5 rounded-lg z-10',
            isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800',
          ],
          ctx.variant === 'enclosed' && [
            'px-4 py-2.5 border-r border-gray-200 last:border-r-0',
            isActive ? 'text-gray-900 bg-white' : 'text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100/80',
          ],
          className,
        )}
        {...props}
      >
        {icon}
        {children}
        {badge !== undefined && (
          <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full font-semibold leading-none">
            {badge}
          </span>
        )}
        {/* Active indicator */}
        {isActive && ctx.variant === 'line' && (
          <motion.span
            layoutId={ctx.layoutId}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-crisp-500 rounded-full"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        {isActive && ctx.variant === 'pill' && (
          <motion.span
            layoutId={ctx.layoutId}
            className="absolute inset-0 bg-white rounded-lg shadow-sm"
            style={{ zIndex: -1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    );
  },
);
Tab.displayName = 'Tab';

// ── TabPanel ───────────────────────────────────────────────────────────────

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ id, className, children, ...props }, ref) => {
    const ctx = useContext(TabsContext)!;
    if (ctx.activeTab !== id) return null;
    return (
      <div
        ref={ref}
        id={`panel-${id}`}
        role="tabpanel"
        className={cn('outline-none animate-[fadeIn_0.18s_ease-out]', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabPanel.displayName = 'TabPanel';
