import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  avatar?: string;
  icon?: React.ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  action?: { label: string; onClick: () => void };
}

// ─── NotificationBell ─────────────────────────────────────────────────────────

export interface NotificationBellProps {
  notifications: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onClear?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

const typeStyles = {
  info:    { dot: 'bg-crisp-400',   icon: 'text-crisp-400' },
  success: { dot: 'bg-emerald-400', icon: 'text-emerald-400' },
  warning: { dot: 'bg-amber-400',   icon: 'text-amber-400' },
  error:   { dot: 'bg-rose-400',    icon: 'text-rose-400' },
};

export function NotificationBell({
  notifications, onMarkRead, onMarkAllRead, onClear, onClearAll, className,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className={cn('relative', className)}>
      {/* Bell button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center"
          >
            {unread > 9 ? '9+' : unread}
          </motion.span>
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-80 rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-200">Notifications</h3>
                {unread > 0 && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-crisp-500/15 text-crisp-400">
                    {unread} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unread > 0 && onMarkAllRead && (
                  <button type="button" onClick={onMarkAllRead} className="text-xs text-crisp-400 hover:text-crisp-300 transition-colors">
                    Mark all read
                  </button>
                )}
                {onClearAll && (
                  <button type="button" onClick={onClearAll} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-gray-600">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  <p className="text-sm">All caught up!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map(n => {
                    const ts = n.type ? typeStyles[n.type] : null;
                    return (
                      <motion.div
                        key={n.id}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                          'flex items-start gap-3 px-4 py-3 border-b border-gray-800/60 last:border-0 cursor-pointer transition-colors',
                          !n.read ? 'bg-crisp-500/5 hover:bg-crisp-500/10' : 'hover:bg-gray-800/40',
                        )}
                        onClick={() => onMarkRead?.(n.id)}
                      >
                        {/* Avatar or icon */}
                        <div className="shrink-0 mt-0.5">
                          {n.avatar
                            ? <img src={n.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                            : n.icon
                            ? <div className={cn('w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center', ts?.icon)}>
                                {n.icon}
                              </div>
                            : <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                              </div>
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm text-gray-200 font-medium leading-snug">{n.title}</p>
                            {!n.read && ts && <span className={cn('w-2 h-2 rounded-full shrink-0 mt-1', ts.dot)} />}
                          </div>
                          {n.description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.description}</p>}
                          <div className="flex items-center justify-between mt-1.5">
                            {n.time && <p className="text-[10px] text-gray-600">{n.time}</p>}
                            {n.action && (
                              <button type="button" onClick={e => { e.stopPropagation(); n.action!.onClick(); }}
                                className="text-[10px] font-medium text-crisp-400 hover:text-crisp-300 transition-colors">
                                {n.action.label}
                              </button>
                            )}
                          </div>
                        </div>

                        {onClear && (
                          <button type="button"
                            onClick={e => { e.stopPropagation(); onClear(n.id); }}
                            className="shrink-0 text-gray-600 hover:text-gray-400 transition-colors mt-0.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
