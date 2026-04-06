import { forwardRef, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { InputHTMLAttributes } from 'react';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  showValue?: boolean;
  formatValue?: (v: number) => string;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  wrapperClassName?: string;
}

const trackHeights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' };
const thumbSizes = {
  sm: '[&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3',
  md: '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
  lg: '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5',
};
const fillColors = {
  default:     'accent-crisp-500',
  success:     'accent-emerald-500',
  warning:     'accent-amber-500',
  destructive: 'accent-rose-500',
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      hint,
      error,
      showValue = true,
      formatValue,
      min = 0,
      max = 100,
      step = 1,
      size = 'md',
      variant = 'default',
      wrapperClassName,
      value,
      defaultValue,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const currentVal = Number(value ?? defaultValue ?? min);
    const pct = ((currentVal - min) / (max - min)) * 100;
    const displayVal = formatValue ? formatValue(currentVal) : String(currentVal);

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
            {showValue && <span className="text-sm font-semibold text-gray-900 tabular-nums">{displayVal}</span>}
          </div>
        )}
        <div className="relative flex items-center">
          {/* Track background */}
          <div className={cn('absolute left-0 right-0 rounded-full bg-gray-200', trackHeights[size])} />
          {/* Fill */}
          <div
            className={cn('absolute left-0 rounded-full', trackHeights[size], {
              'bg-crisp-500': variant === 'default',
              'bg-emerald-500': variant === 'success',
              'bg-amber-500': variant === 'warning',
              'bg-rose-500': variant === 'destructive',
            })}
            style={{ width: `${pct}%` }}
          />
          <input
            ref={ref}
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            defaultValue={defaultValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentVal}
            className={cn(
              'relative w-full cursor-pointer appearance-none bg-transparent',
              trackHeights[size],
              fillColors[variant],
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-white',
              '[&::-webkit-slider-thumb]:border-2',
              '[&::-webkit-slider-thumb]:border-current',
              '[&::-webkit-slider-thumb]:shadow-sm',
              '[&::-webkit-slider-thumb]:transition-transform',
              '[&::-webkit-slider-thumb]:hover:scale-110',
              '[&::-moz-range-thumb]:appearance-none',
              '[&::-moz-range-thumb]:rounded-full',
              '[&::-moz-range-thumb]:bg-white',
              '[&::-moz-range-thumb]:border-2',
              '[&::-moz-range-thumb]:border-current',
              '[&::-moz-range-thumb]:shadow-sm',
              'focus-visible:outline-none',
              thumbSizes[size],
              props.disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            {...props}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>{formatValue ? formatValue(min) : min}</span>
          <span>{formatValue ? formatValue(max) : max}</span>
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
