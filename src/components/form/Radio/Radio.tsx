import { createContext, forwardRef, useContext, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { InputHTMLAttributes } from 'react';

// ── Context ────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ── RadioGroup ─────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  label,
  hint,
  error,
  size = 'md',
  orientation = 'vertical',
  disabled,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, size, disabled }}>
      <fieldset className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <legend className="text-sm font-medium text-gray-700 mb-1">{label}</legend>
        )}
        <div className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        )}>
          {children}
        </div>
        {error && <p className="text-xs text-rose-500 mt-0.5">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

// ── Radio ──────────────────────────────────────────────────────────────────

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const dotSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
const innerDotSizes = { sm: 'w-1.5 h-1.5', md: 'w-2 h-2', lg: 'w-2.5 h-2.5' };
const labelSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, size: propSize, id: externalId, value, onChange, ...props }, ref) => {
    const ctx = useContext(RadioGroupContext);
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const size = propSize ?? ctx?.size ?? 'md';
    const isDisabled = props.disabled ?? ctx?.disabled;
    const isChecked = ctx?.value !== undefined ? ctx.value === value : props.checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      ctx?.onChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-start gap-2.5 cursor-pointer select-none',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <span className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            id={id}
            type="radio"
            value={value}
            checked={isChecked}
            name={ctx?.name ?? props.name}
            disabled={isDisabled}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          {/* outer ring */}
          <span className={cn(
            'flex items-center justify-center rounded-full border-2 transition-all duration-150',
            'border-gray-300 bg-white',
            'peer-checked:border-crisp-500',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-crisp-500 peer-focus-visible:ring-offset-2',
            dotSizes[size],
          )} />
          {/* inner dot */}
          <span className={cn(
            'absolute inset-0 m-auto rounded-full bg-crisp-500 scale-0 transition-transform duration-150',
            'peer-checked:scale-100',
            innerDotSizes[size],
          )} />
        </span>
        {(label || description) && (
          <span className="flex flex-col">
            {label && <span className={cn('font-medium text-gray-800 leading-tight', labelSizes[size])}>{label}</span>}
            {description && <span className="text-xs text-gray-500 mt-0.5">{description}</span>}
          </span>
        )}
      </label>
    );
  },
);

Radio.displayName = 'Radio';
