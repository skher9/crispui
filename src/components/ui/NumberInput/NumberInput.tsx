import { forwardRef, useId, useRef, useCallback } from 'react';
import { cn } from '../../../utils/cn';
import type { InputHTMLAttributes } from 'react';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value' | 'size' | 'prefix'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  formatValue?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}

const sizeMap = {
  sm: { input: 'h-8 text-xs px-2', btn: 'w-7 text-xs', wrap: 'rounded-lg' },
  md: { input: 'h-10 text-sm px-3', btn: 'w-9 text-sm', wrap: 'rounded-xl' },
  lg: { input: 'h-12 text-base px-4', btn: 'w-11 text-base', wrap: 'rounded-xl' },
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({
    className, value, defaultValue = 0, min, max, step = 1, precision = 0,
    label, hint, error, size = 'md', onChange, prefix, suffix, id: propId, ...props
  }, ref) => {
    const genId = useId();
    const id = propId ?? genId;
    const internalVal = useRef(value ?? defaultValue);
    const current = value ?? internalVal.current;
    const s = sizeMap[size];

    const clamp = useCallback((v: number) => {
      let result = parseFloat(v.toFixed(precision));
      if (min !== undefined) result = Math.max(min, result);
      if (max !== undefined) result = Math.min(max, result);
      return result;
    }, [min, max, precision]);

    const handleStep = useCallback((dir: 1 | -1) => {
      const next = clamp(current + dir * step);
      internalVal.current = next;
      onChange?.(next);
    }, [current, step, clamp, onChange]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v)) {
        const next = clamp(v);
        internalVal.current = next;
        onChange?.(next);
      }
    }, [clamp, onChange]);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-200">{label}</label>
        )}
        <div className={cn('flex items-stretch border transition-colors overflow-hidden', s.wrap,
          error ? 'border-rose-500' : 'border-gray-700 hover:border-gray-500 focus-within:border-crisp-500',
          'bg-gray-900',
        )}>
          <button
            type="button"
            onClick={() => handleStep(-1)}
            disabled={min !== undefined && current <= min}
            className={cn('flex items-center justify-center shrink-0 text-gray-400 hover:text-white hover:bg-gray-800 border-r border-gray-700 transition-colors disabled:opacity-30 disabled:pointer-events-none', s.btn)}
          >−</button>

          <div className="flex items-center flex-1">
            {prefix && <span className="pl-2 text-gray-500 text-sm select-none">{prefix}</span>}
            <input
              ref={ref}
              id={id}
              type="number"
              value={current}
              min={min}
              max={max}
              step={step}
              onChange={handleChange}
              className={cn('flex-1 bg-transparent text-gray-100 text-center focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none', s.input, className)}
              {...props}
            />
            {suffix && <span className="pr-2 text-gray-500 text-sm select-none">{suffix}</span>}
          </div>

          <button
            type="button"
            onClick={() => handleStep(1)}
            disabled={max !== undefined && current >= max}
            className={cn('flex items-center justify-center shrink-0 text-gray-400 hover:text-white hover:bg-gray-800 border-l border-gray-700 transition-colors disabled:opacity-30 disabled:pointer-events-none', s.btn)}
          >+</button>
        </div>
        {(error || hint) && (
          <p className={cn('text-xs', error ? 'text-rose-400' : 'text-gray-500')}>{error ?? hint}</p>
        )}
      </div>
    );
  },
);
NumberInput.displayName = 'NumberInput';
