import { forwardRef, useId, useState, useRef } from 'react';
import { cn } from '../../../utils/cn';
import type { InputHTMLAttributes, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputVariant = 'outline' | 'filled' | 'flushed' | 'glass';
export type InputState = 'default' | 'success' | 'warning' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  warning?: string;
  // Layout
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  leftText?: string;
  rightText?: string;
  // Behaviour
  inputSize?: InputSize;
  variant?: InputVariant;
  wrapperClassName?: string;
  // Special modes
  password?: boolean;       // password toggle eye icon
  copyable?: boolean;       // copy button in right
  clearable?: boolean;      // clear × button
  search?: boolean;         // search icon left + clear on value
  loading?: boolean;        // spinner right
  characterCount?: number;  // max chars shown as counter
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const sizeMap: Record<InputSize, string> = {
  sm: 'h-8 text-xs px-3 rounded-lg',
  md: 'h-10 text-sm px-3.5 rounded-xl',
  lg: 'h-12 text-base px-4 rounded-xl',
};

const labelSize: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

// ─── Variant maps ─────────────────────────────────────────────────────────────

const variantBase: Record<InputVariant, string> = {
  outline: 'border bg-gray-900 text-gray-100 placeholder-gray-600',
  filled:  'border border-transparent bg-gray-800 text-gray-100 placeholder-gray-600 focus:bg-gray-900',
  flushed: 'border-b border-t-0 border-l-0 border-r-0 bg-transparent text-gray-100 placeholder-gray-600 rounded-none px-0',
  glass:   'border bg-white/5 backdrop-blur-md text-gray-100 placeholder-gray-500',
};

const variantIdle: Record<InputVariant, string> = {
  outline: 'border-gray-700 hover:border-gray-500 focus:border-crisp-500 focus:ring-2 focus:ring-crisp-500/20',
  filled:  'hover:bg-gray-700 focus:border-crisp-500 focus:ring-2 focus:ring-crisp-500/20',
  flushed: 'border-gray-700 hover:border-gray-500 focus:border-crisp-500',
  glass:   'border-white/10 hover:border-white/20 focus:border-crisp-500/60 focus:ring-2 focus:ring-crisp-500/10',
};

const stateClasses: Record<InputState, Record<InputVariant, string>> = {
  default: variantIdle,
  success: {
    outline: 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
    filled:  'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
    flushed: 'border-emerald-500 focus:border-emerald-500',
    glass:   'border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
  },
  warning: {
    outline: 'border-amber-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20',
    filled:  'border-amber-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20',
    flushed: 'border-amber-500 focus:border-amber-500',
    glass:   'border-amber-500/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20',
  },
  error: {
    outline: 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20',
    filled:  'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20',
    flushed: 'border-rose-500 focus:border-rose-500',
    glass:   'border-rose-500/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20',
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function StateIcon({ state }: { state: InputState }) {
  if (state === 'success') return <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;
  if (state === 'warning') return <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
  if (state === 'error') return <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>;
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, hint, error, success, warning,
    leftAddon, rightAddon, leftText, rightText,
    inputSize = 'md', variant = 'outline',
    password = false, copyable = false, clearable = false,
    search = false, loading = false, characterCount,
    wrapperClassName, className,
    id: externalId, type, value, defaultValue,
    onChange, ...props
  }, ref) => {
    const genId = useId();
    const id = externalId ?? genId;
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);
    const [internalVal, setInternalVal] = useState<string>(String(defaultValue ?? ''));
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = value !== undefined;
    const currentVal = isControlled ? String(value) : internalVal;

    const state: InputState = error ? 'error' : warning ? 'warning' : success ? 'success' : 'default';
    const msg = error ?? warning ?? success ?? hint;
    const msgColor = error ? 'text-rose-400' : warning ? 'text-amber-400' : success ? 'text-emerald-400' : 'text-gray-500';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalVal(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalVal('');
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      const el = (ref as React.RefObject<HTMLInputElement>)?.current ?? inputRef.current;
      if (el && nativeInputValueSetter) {
        nativeInputValueSetter.call(el, '');
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(currentVal).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    };

    const inputType = password ? (showPassword ? 'text' : 'password') : (type ?? 'text');

    // Calculate left/right padding
    const hasLeft = !!(leftAddon || leftText || search);
    const rightCount = [rightAddon, rightText, password, copyable, loading, state !== 'default', clearable && currentVal].filter(Boolean).length;

    const leftPad = hasLeft ? (variant === 'flushed' ? 'pl-7' : 'pl-9') : '';
    const rightPad = rightCount > 0 ? (rightCount >= 2 ? 'pr-16' : 'pr-9') : '';

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label htmlFor={id} className={cn('font-medium text-gray-200', labelSize[inputSize])}>
            {label}
            {props.required && <span className="text-rose-400 ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left */}
          {(search || leftAddon || leftText) && (
            <div className={cn('absolute left-3 flex items-center gap-1.5 text-gray-500 pointer-events-none', variant === 'flushed' && 'left-0')}>
              {search && <SearchIcon />}
              {leftAddon}
              {leftText && <span className="text-sm">{leftText}</span>}
            </div>
          )}

          <input
            ref={ref ?? inputRef}
            id={id}
            type={inputType}
            value={isControlled ? value : internalVal}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={msg ? `${id}-msg` : undefined}
            className={cn(
              'w-full outline-none transition-all duration-150',
              sizeMap[inputSize],
              variantBase[variant],
              stateClasses[state][variant],
              leftPad,
              rightPad,
              props.disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            {...props}
          />

          {/* Right cluster */}
          <div className={cn('absolute right-2 flex items-center gap-1', variant === 'flushed' && 'right-0')}>
            {loading && <SpinnerIcon />}
            {!loading && state !== 'default' && <StateIcon state={state} />}
            {clearable && currentVal && !loading && (
              <button type="button" onClick={handleClear} className="text-gray-500 hover:text-gray-300 transition-colors p-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {copyable && (
              <button type="button" onClick={handleCopy} className="text-gray-500 hover:text-gray-300 transition-colors p-0.5">
                <CopyIcon copied={copied} />
              </button>
            )}
            {password && (
              <button type="button" onClick={() => setShowPassword(v => !v)} className="text-gray-500 hover:text-gray-300 transition-colors p-0.5">
                <EyeIcon open={showPassword} />
              </button>
            )}
            {rightAddon && <span className="text-gray-500">{rightAddon}</span>}
            {rightText && <span className="text-sm text-gray-500 pr-1">{rightText}</span>}
          </div>
        </div>

        {/* Bottom row: message + char count */}
        <div className="flex items-center justify-between">
          {msg && (
            <p id={`${id}-msg`} className={cn('text-xs flex items-center gap-1', msgColor)}>
              {msg}
            </p>
          )}
          {characterCount && (
            <p className={cn('text-xs ml-auto', currentVal.length > characterCount ? 'text-rose-400' : 'text-gray-600')}>
              {currentVal.length}/{characterCount}
            </p>
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';
