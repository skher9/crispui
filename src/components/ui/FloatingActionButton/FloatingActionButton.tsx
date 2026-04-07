import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FabAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;         // tailwind bg class e.g. 'bg-violet-600'
  disabled?: boolean;
}

export interface FloatingActionButtonProps {
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  actions?: FabAction[];
  onClick?: () => void;    // for standalone FAB (no speed-dial)
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: string;         // tailwind class e.g. 'bg-crisp-600'
  label?: string;
  tooltip?: string;
  className?: string;
}

const sizeMap = {
  sm: { fab: 'w-11 h-11', icon: 'w-4 h-4', mini: 'w-9 h-9', miniIcon: 'w-3.5 h-3.5' },
  md: { fab: 'w-14 h-14', icon: 'w-6 h-6', mini: 'w-11 h-11', miniIcon: 'w-4 h-4' },
  lg: { fab: 'w-16 h-16', icon: 'w-7 h-7', mini: 'w-12 h-12', miniIcon: 'w-5 h-5' },
};

const posMap = {
  'bottom-right': 'bottom-6 right-6 items-end',
  'bottom-left':  'bottom-6 left-6 items-start',
  'top-right':    'top-6 right-6 items-end',
  'top-left':     'top-6 left-6 items-start',
};

const actionDir = {
  'bottom-right': -1,
  'bottom-left':  -1,
  'top-right':    1,
  'top-left':     1,
};

// ─── FloatingActionButton ─────────────────────────────────────────────────────

export function FloatingActionButton({
  icon, closeIcon, actions = [], onClick,
  size = 'md', position = 'bottom-right',
  color = 'bg-crisp-600', label, className,
}: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);
  const s = sizeMap[size];
  const hasActions = actions.length > 0;
  const dir = actionDir[position];

  const handleFabClick = () => {
    if (hasActions) setOpen(o => !o);
    else onClick?.();
  };

  const defaultIcon = (
    <svg className={s.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
  const defaultCloseIcon = (
    <svg className={s.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className={cn('fixed z-50 flex flex-col gap-3', posMap[position], className)}>
      {/* Speed-dial actions */}
      <AnimatePresence>
        {open && hasActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn('flex flex-col gap-2.5', position.startsWith('bottom') ? 'flex-col-reverse' : 'flex-col')}
          >
            {actions.map((action, i) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: dir * 16, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: dir * 8, scale: 0.85 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                className="flex items-center gap-3"
              >
                {/* Label */}
                {label !== undefined && (
                  <span className="text-xs font-medium text-white bg-gray-900/90 backdrop-blur px-2.5 py-1 rounded-lg shadow-lg border border-gray-700 whitespace-nowrap">
                    {action.label}
                  </span>
                )}
                {/* Mini FAB */}
                <button
                  type="button"
                  disabled={action.disabled}
                  onClick={() => { action.onClick(); setOpen(false); }}
                  className={cn(
                    'rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-90',
                    s.mini,
                    action.color ?? 'bg-gray-700 hover:bg-gray-600',
                    action.disabled && 'opacity-50 cursor-not-allowed',
                  )}
                  title={action.label}
                >
                  <span className={s.miniIcon}>{action.icon}</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        type="button"
        onClick={handleFabClick}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          'rounded-full flex items-center justify-center text-white shadow-xl shadow-black/30 transition-colors',
          s.fab,
          color,
        )}
        aria-label={label ?? (hasActions ? (open ? 'Close menu' : 'Open menu') : 'Action')}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {closeIcon ?? defaultCloseIcon}
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              {icon ?? defaultIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[-1] bg-gray-950/40 backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
