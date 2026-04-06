import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  showClose?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  xs:   'max-w-xs',
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-2xl',
  '2xl':'max-w-4xl',
  full: 'max-w-[95vw] min-h-[80vh]',
};

// ─── Base Modal ───────────────────────────────────────────────────────────────

export function Modal({
  open, onClose, children, size = 'md',
  closeOnBackdrop = true, showClose = true,
  className, title, description,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
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
              'relative z-10 w-full bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden',
              sizeClasses[size], className,
            )}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {(title || description) && (
              <ModalHeader>
                {title && <h2 className="text-base font-semibold text-gray-100">{title}</h2>}
                {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
              </ModalHeader>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 pt-6 pb-4 border-b border-gray-800', className)}>{children}</div>;
}

export function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-5', className)}>{children}</div>;
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 bg-gray-900/80 border-t border-gray-800 flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  );
}

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive' | 'warning';
  loading?: boolean;
}

const confirmVariant = {
  default:     'bg-crisp-600 text-white hover:bg-crisp-500',
  destructive: 'bg-rose-600 text-white hover:bg-rose-500',
  warning:     'bg-amber-500 text-white hover:bg-amber-400',
};

const confirmIcon = {
  default: (
    <div className="w-12 h-12 rounded-full bg-crisp-500/15 flex items-center justify-center">
      <svg className="w-6 h-6 text-crisp-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    </div>
  ),
  destructive: (
    <div className="w-12 h-12 rounded-full bg-rose-500/15 flex items-center justify-center">
      <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    </div>
  ),
  warning: (
    <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center">
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    </div>
  ),
};

export function ConfirmDialog({
  open, onConfirm, onCancel,
  title, description,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  variant = 'default', loading = false,
}: ConfirmDialogProps) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    try { await onConfirm(); } finally { setBusy(false); }
  };

  return (
    <Modal open={open} onClose={onCancel} size="sm" showClose={false}>
      <ModalBody className="flex flex-col items-center text-center gap-4 pt-8">
        {confirmIcon[variant]}
        <div>
          <h2 className="text-base font-semibold text-gray-100">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1.5">{description}</p>}
        </div>
      </ModalBody>
      <ModalFooter className="justify-center gap-3 pb-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-gray-700 text-sm text-gray-300 hover:border-gray-500 hover:text-gray-100 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={busy || loading}
          className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2', confirmVariant[variant])}
        >
          {(busy || loading) && (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {confirmLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
}

// ─── AlertDialog ──────────────────────────────────────────────────────────────

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  actionLabel?: string;
}

const alertStyles = {
  info:    { icon: 'text-crisp-400', bg: 'bg-crisp-500/15', btn: 'bg-crisp-600 hover:bg-crisp-500 text-white' },
  success: { icon: 'text-emerald-400', bg: 'bg-emerald-500/15', btn: 'bg-emerald-600 hover:bg-emerald-500 text-white' },
  warning: { icon: 'text-amber-400', bg: 'bg-amber-500/15', btn: 'bg-amber-500 hover:bg-amber-400 text-white' },
  error:   { icon: 'text-rose-400', bg: 'bg-rose-500/15', btn: 'bg-rose-600 hover:bg-rose-500 text-white' },
};

export function AlertDialog({ open, onClose, title, description, variant = 'info', actionLabel = 'Got it' }: AlertDialogProps) {
  const s = alertStyles[variant];
  return (
    <Modal open={open} onClose={onClose} size="sm" showClose={false}>
      <ModalBody className="flex flex-col items-center text-center gap-4 pt-8 pb-2">
        <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', s.bg)}>
          <svg className={cn('w-6 h-6', s.icon)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            {variant === 'success'
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              : variant === 'error'
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            }
          </svg>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-100">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1.5">{description}</p>}
        </div>
      </ModalBody>
      <ModalFooter className="justify-center pb-6">
        <button type="button" onClick={onClose} className={cn('px-5 py-2 rounded-xl text-sm font-medium transition-all', s.btn)}>
          {actionLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
}

// ─── WizardModal (multi-step) ─────────────────────────────────────────────────

export interface WizardStep {
  title: string;
  description?: string;
  content: React.ReactNode;
  onNext?: () => boolean | Promise<boolean>; // return false to prevent advance
}

export interface WizardModalProps {
  open: boolean;
  onClose: () => void;
  steps: WizardStep[];
  onComplete?: () => void;
  size?: ModalSize;
  completeLabel?: string;
}

export function WizardModal({ open, onClose, steps, onComplete, size = 'md', completeLabel = 'Finish' }: WizardModalProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = async () => {
    if (current.onNext) {
      setLoading(true);
      const ok = await current.onNext();
      setLoading(false);
      if (!ok) return;
    }
    if (isLast) { onComplete?.(); onClose(); }
    else setStep(s => s + 1);
  };

  const handleClose = () => { setStep(0); onClose(); };

  return (
    <Modal open={open} onClose={handleClose} size={size} showClose>
      <ModalHeader>
        {/* Step indicators */}
        <div className="flex items-center gap-1.5 mb-4">
          {steps.map((_s, i) => (
            <div key={i} className={cn('h-1 rounded-full transition-all duration-300',
              i < step ? 'bg-crisp-500 flex-1' : i === step ? 'bg-crisp-500 flex-[2]' : 'bg-gray-800 flex-1'
            )} />
          ))}
        </div>
        <p className="text-xs text-gray-500 mb-1">Step {step + 1} of {steps.length}</p>
        <h2 className="text-base font-semibold text-gray-100">{current.title}</h2>
        {current.description && <p className="text-sm text-gray-500 mt-1">{current.description}</p>}
      </ModalHeader>

      <ModalBody>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </ModalBody>

      <ModalFooter>
        {step > 0 && (
          <button type="button" onClick={() => setStep(s => s - 1)}
            className="px-4 py-2 rounded-xl border border-gray-700 text-sm text-gray-300 hover:border-gray-500 hover:text-gray-100 transition-colors mr-auto">
            Back
          </button>
        )}
        <button type="button" onClick={handleClose}
          className="px-4 py-2 rounded-xl border border-gray-700 text-sm text-gray-300 hover:border-gray-500 hover:text-gray-100 transition-colors">
          Cancel
        </button>
        <button type="button" onClick={handleNext} disabled={loading}
          className="px-4 py-2 rounded-xl bg-crisp-600 text-white text-sm font-medium hover:bg-crisp-500 transition-all disabled:opacity-60 flex items-center gap-2">
          {loading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
          {isLast ? completeLabel : 'Next →'}
        </button>
      </ModalFooter>
    </Modal>
  );
}
