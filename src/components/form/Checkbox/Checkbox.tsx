import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
}

const boxSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
const labelSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, size = 'md', error, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
      <div className={cn('flex flex-col gap-0.5', className)}>
        <label
          htmlFor={id}
          className={cn(
            'inline-flex items-start gap-2.5 cursor-pointer select-none',
            props.disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <span className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              className={cn(
                'peer appearance-none rounded border-2 transition-all duration-150 cursor-pointer',
                'border-gray-300 bg-white',
                'checked:border-crisp-500 checked:bg-crisp-500',
                'focus-visible:ring-2 focus-visible:ring-crisp-500 focus-visible:ring-offset-2 focus-visible:outline-none',
                error && 'border-rose-400 checked:border-rose-500 checked:bg-rose-500',
                boxSizes[size],
              )}
              {...props}
            />
            <svg
              className="absolute inset-0 w-full h-full text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-150"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l3.5 3.5 6.5-7" />
            </svg>
          </span>
          {(label || description) && (
            <span className="flex flex-col">
              {label && (
                <span className={cn('font-medium text-gray-800 leading-tight', labelSizes[size])}>
                  {label}
                </span>
              )}
              {description && <span className="text-xs text-gray-500 mt-0.5">{description}</span>}
            </span>
          )}
        </label>
        {error && <p className="text-xs text-rose-500 ml-7">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
