import { forwardRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: 1 | 0.5;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
}

const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };

const StarIcon = ({ filled, half, className }: { filled: boolean; half?: boolean; className?: string }) => (
  <svg className={cn('transition-colors', className)} viewBox="0 0 24 24" fill={filled || half ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
    {half ? (
      <>
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path fill="url(#half-fill)" stroke="currentColor" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </>
    ) : (
      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    )}
  </svg>
);

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value: controlledValue, defaultValue = 0, max = 5, size = 'md', disabled, readOnly, onChange, ...props }, ref) => {
    const [internal, setInternal] = useState(defaultValue);
    const [hover, setHover] = useState(0);
    const value = controlledValue ?? internal;
    const display = hover || value;

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-0.5', disabled && 'opacity-50 pointer-events-none', className)}
        onMouseLeave={() => setHover(0)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const star = i + 1;
          const filled = display >= star;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled || readOnly}
              onClick={() => { setInternal(star); onChange?.(star); }}
              onMouseEnter={() => !readOnly && setHover(star)}
              className={cn(
                'transition-transform focus-visible:outline-none',
                !readOnly && !disabled && 'hover:scale-110 cursor-pointer',
                readOnly && 'cursor-default',
                sizeMap[size],
              )}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              <StarIcon
                filled={filled}
                className={cn(sizeMap[size], filled ? 'text-amber-400' : 'text-gray-600')}
              />
            </button>
          );
        })}
        {!readOnly && (
          <span className="ml-2 text-xs text-gray-400">{value > 0 ? `${value}/${max}` : ''}</span>
        )}
      </div>
    );
  },
);
Rating.displayName = 'Rating';
