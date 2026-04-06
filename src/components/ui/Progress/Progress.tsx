import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
const variantFill = {
  default:     'bg-crisp-500',
  success:     'bg-emerald-500',
  warning:     'bg-amber-400',
  destructive: 'bg-rose-500',
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      size = 'md',
      variant = 'default',
      showLabel,
      label,
      animated = true,
      ...props
    },
    ref,
  ) => {
    const pct = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(showLabel || label) && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-600">{label}</span>
            {showLabel && <span className="text-xs font-semibold text-gray-700 tabular-nums">{Math.round(pct)}%</span>}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn('w-full bg-gray-100 rounded-full overflow-hidden', sizeClasses[size])}
        >
          <div
            className={cn(
              'h-full rounded-full',
              variantFill[variant],
              animated && 'transition-all duration-500 ease-out',
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = 'Progress';
