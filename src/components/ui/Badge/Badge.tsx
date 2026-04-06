import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-colors',
  {
    variants: {
      variant: {
        default:     'bg-crisp-100 text-crisp-700',
        secondary:   'bg-gray-100 text-gray-600',
        success:     'bg-emerald-100 text-emerald-700',
        warning:     'bg-amber-100 text-amber-700',
        destructive: 'bg-rose-100 text-rose-700',
        outline:     'border border-gray-200 text-gray-600 bg-transparent',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-md',
        md: 'text-xs px-2.5 py-1 rounded-lg',
        lg: 'text-sm px-3 py-1 rounded-lg',
      },
      dot: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      dot: false,
    },
  },
);

const dotColors: Record<string, string> = {
  default:     'bg-crisp-500',
  secondary:   'bg-gray-400',
  success:     'bg-emerald-500',
  warning:     'bg-amber-500',
  destructive: 'bg-rose-500',
  outline:     'bg-gray-400',
};

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...props}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant ?? 'default'])} />
      )}
      {children}
    </span>
  ),
);

Badge.displayName = 'Badge';
