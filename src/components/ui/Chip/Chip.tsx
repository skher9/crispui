import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, MouseEvent } from 'react';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-all select-none',
  {
    variants: {
      variant: {
        default:     'bg-gray-800 text-gray-200 border border-gray-700 hover:border-gray-500',
        primary:     'bg-crisp-500/15 text-crisp-300 border border-crisp-500/30 hover:border-crisp-500/60',
        success:     'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
        warning:     'bg-amber-500/15 text-amber-300 border border-amber-500/30',
        destructive: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-md',
        md: 'text-xs px-2.5 py-1 rounded-lg',
        lg: 'text-sm px-3 py-1.5 rounded-lg',
      },
      clickable: {
        true: 'cursor-pointer active:scale-95',
        false: 'cursor-default',
      },
    },
    defaultVariants: { variant: 'default', size: 'md', clickable: false },
  },
);

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, size, icon, avatar, onDelete, onClick, children, ...props }, ref) => (
    <span
      ref={ref}
      onClick={onClick}
      className={cn(chipVariants({ variant, size, clickable: !!onClick }), className)}
      {...props}
    >
      {avatar}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {onDelete && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onDelete(e); }}
          className="ml-0.5 rounded-full hover:bg-white/10 p-0.5 transition-colors -mr-0.5"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  ),
);
Chip.displayName = 'Chip';
