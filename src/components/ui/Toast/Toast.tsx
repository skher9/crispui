import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export interface ToastOptions extends Omit<ToastItem, 'id'> {}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, { bar: string; icon: React.ReactNode }> = {
  default: {
    bar: 'bg-crisp-500',
    icon: <svg className="w-4 h-4 text-crisp-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  },
  success: {
    bar: 'bg-emerald-500',
    icon: <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  },
  warning: {
    bar: 'bg-amber-400',
    icon: <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  },
  destructive: {
    bar: 'bg-rose-500',
    icon: <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  },
  info: {
    bar: 'bg-sky-500',
    icon: <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  },
};

const positionClasses: Record<ToastPosition, string> = {
  'top-right':      'top-4 right-4 items-end',
  'top-left':       'top-4 left-4 items-start',
  'top-center':     'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right':   'bottom-4 right-4 items-end',
  'bottom-left':    'bottom-4 left-4 items-start',
  'bottom-center':  'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const v = variantStyles[item.variant ?? 'default'];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-80 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-900/10 overflow-hidden"
    >
      {/* Coloured top bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-0.5', v.bar)} />
      <div className="flex items-start gap-3 p-4 pt-5">
        <span className="flex-shrink-0 mt-0.5">{v.icon}</span>
        <div className="flex-1 min-w-0">
          {item.title && <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>}
          <p className="text-sm text-gray-600">{item.message}</p>
          {item.action && (
            <button
              onClick={() => { item.action!.onClick(); onDismiss(item.id); }}
              className="mt-2 text-xs font-semibold text-crisp-600 hover:underline"
            >
              {item.action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onDismiss(item.id)}
          className="flex-shrink-0 text-gray-300 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

export function ToastProvider({ children, position = 'top-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  }, []);

  const toast = useCallback((opts: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const duration = opts.duration ?? 4000;
    setToasts(prev => [...prev, { ...opts, id }]);
    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    }
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={cn('fixed z-[100] flex flex-col gap-2 pointer-events-none', positionClasses[position])}>
        <AnimatePresence mode="popLayout">
          {toasts.map(item => (
            <div key={item.id} className="pointer-events-auto">
              <ToastItem item={item} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
