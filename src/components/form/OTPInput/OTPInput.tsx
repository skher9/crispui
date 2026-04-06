import { forwardRef, useRef, useState, useId } from 'react';
import { cn } from '../../../utils/cn';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  mask?: boolean;
  size?: 'sm' | 'md' | 'lg';
  separator?: boolean;
  className?: string;
}

const cellSizes = {
  sm: 'w-8 h-10 text-sm',
  md: 'w-10 h-12 text-base',
  lg: 'w-12 h-14 text-lg',
};

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value = '',
      onChange,
      onComplete,
      label,
      hint,
      error,
      disabled,
      mask,
      size = 'md',
      separator = false,
      className,
    },
    ref,
  ) => {
    const labelId = useId();
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [localValue, setLocalValue] = useState(value);
    const current = value !== undefined ? value : localValue;

    const update = (next: string) => {
      setLocalValue(next);
      onChange?.(next);
      if (next.length === length) onComplete?.(next);
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (current[i]) {
          update(current.slice(0, i) + current.slice(i + 1));
        } else if (i > 0) {
          inputsRef.current[i - 1]?.focus();
          update(current.slice(0, i - 1) + current.slice(i));
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' && i > 0) {
        inputsRef.current[i - 1]?.focus();
      } else if (e.key === 'ArrowRight' && i < length - 1) {
        inputsRef.current[i + 1]?.focus();
      }
    };

    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.replace(/\D/g, '').slice(-1);
      if (!char) return;
      const next = current.slice(0, i) + char + current.slice(i + 1);
      update(next);
      if (i < length - 1) inputsRef.current[i + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      update(pasted.padEnd(length, '').slice(0, length).trimEnd());
      const focusIdx = Math.min(pasted.length, length - 1);
      inputsRef.current[focusIdx]?.focus();
    };

    return (
      <div className={cn('flex flex-col gap-1.5', className)} ref={ref}>
        {label && <label id={labelId} className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="flex items-center gap-2" role="group" aria-labelledby={label ? labelId : undefined}>
          {Array.from({ length }).map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              {separator && i === Math.floor(length / 2) && (
                <span className="text-gray-300 text-lg font-light select-none">—</span>
              )}
              <input
                ref={el => { inputsRef.current[i] = el; }}
                type={mask ? 'password' : 'text'}
                inputMode="numeric"
                maxLength={1}
                value={current[i] ?? ''}
                disabled={disabled}
                autoComplete="one-time-code"
                onChange={e => handleChange(i, e)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={e => e.target.select()}
                aria-label={`Digit ${i + 1} of ${length}`}
                className={cn(
                  'text-center font-semibold rounded-xl border-2 outline-none transition-all duration-150 tabular-nums',
                  'bg-white text-gray-900',
                  'border-gray-200 hover:border-gray-300',
                  'focus:border-crisp-500 focus:ring-2 focus:ring-crisp-100',
                  error ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : '',
                  current[i] ? 'border-crisp-400 bg-crisp-50' : '',
                  disabled && 'opacity-50 cursor-not-allowed',
                  cellSizes[size],
                )}
              />
            </span>
          ))}
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  },
);

OTPInput.displayName = 'OTPInput';
