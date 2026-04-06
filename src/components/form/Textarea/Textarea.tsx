import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  resize?: 'none' | 'vertical' | 'both';
  wrapperClassName?: string;
  showCount?: boolean;
  maxLength?: number;
}

const resizeClasses = { none: 'resize-none', vertical: 'resize-y', both: 'resize' };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      hint,
      error,
      resize = 'vertical',
      wrapperClassName,
      showCount,
      maxLength,
      id: externalId,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          value={value}
          maxLength={maxLength}
          aria-invalid={!!error}
          className={cn(
            'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800',
            'placeholder:text-gray-300 outline-none transition-all duration-150',
            'focus:border-crisp-500 focus:ring-2 focus:ring-crisp-100',
            error && 'border-rose-400 focus:border-rose-400 focus:ring-rose-100',
            props.disabled && 'opacity-50 cursor-not-allowed',
            resizeClasses[resize],
            className,
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && <p className="text-xs text-rose-500">{error}</p>}
            {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
          </div>
          {showCount && maxLength && (
            <span className={cn('text-xs tabular-nums', charCount >= maxLength ? 'text-rose-500' : 'text-gray-400')}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
