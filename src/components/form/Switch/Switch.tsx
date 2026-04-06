import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const trackSizes = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
};

const thumbSizes = {
  sm: 'w-3 h-3 translate-x-0.5 peer-checked:translate-x-4',
  md: 'w-4 h-4 translate-x-1 peer-checked:translate-x-6',
  lg: 'w-5 h-5 translate-x-1 peer-checked:translate-x-8',
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, size = 'md', id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <span className="relative inline-flex flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'flex items-center rounded-full transition-colors duration-200',
              'bg-gray-200 peer-checked:bg-crisp-500',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-crisp-500 peer-focus-visible:ring-offset-2',
              trackSizes[size],
            )}
          />
          <span
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-200',
              thumbSizes[size],
            )}
          />
        </span>
        {(label || description) && (
          <span className="flex flex-col">
            {label && <span className="text-sm font-medium text-gray-800 leading-tight">{label}</span>}
            {description && <span className="text-xs text-gray-500 mt-0.5">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
