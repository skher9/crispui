import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    },
    variant: {
      default:     'text-crisp-500',
      muted:       'text-gray-300',
      white:       'text-white',
      success:     'text-emerald-500',
      destructive: 'text-rose-500',
    },
  },
  defaultVariants: { size: 'md', variant: 'default' },
});

export interface SpinnerProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading…', ...props }, ref) => (
    <span ref={ref} role="status" aria-label={label} className={cn('inline-flex', className)} {...props}>
      <svg
        className={spinnerVariants({ size, variant })}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  ),
);
Spinner.displayName = 'Spinner';

// ── LoadingOverlay ─────────────────────────────────────────────────────────

export interface LoadingOverlayProps {
  visible?: boolean;
  label?: string;
  blur?: boolean;
  className?: string;
}

export function LoadingOverlay({ visible = true, label = 'Loading…', blur = true, className }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <div className={cn(
      'absolute inset-0 z-10 flex items-center justify-center rounded-inherit',
      blur && 'backdrop-blur-sm',
      'bg-white/70',
      className,
    )}>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        {label && <p className="text-sm text-gray-500">{label}</p>}
      </div>
    </div>
  );
}
