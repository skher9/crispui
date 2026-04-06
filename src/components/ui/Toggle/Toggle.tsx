import { forwardRef, createContext, useContext, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisp-500 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-gray-800 data-[state=on]:bg-gray-700 data-[state=on]:text-white text-gray-400 border border-transparent hover:border-gray-700 data-[state=on]:border-gray-600',
        outline: 'border border-gray-700 bg-transparent hover:bg-gray-800 data-[state=on]:bg-crisp-500/15 data-[state=on]:border-crisp-500/50 data-[state=on]:text-crisp-300 text-gray-400',
        ghost: 'bg-transparent hover:bg-gray-800 data-[state=on]:bg-gray-700 text-gray-400 data-[state=on]:text-white',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-lg',
        md: 'h-10 px-4 text-sm rounded-xl',
        lg: 'h-12 px-5 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-xl text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export interface ToggleProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed: controlledPressed, defaultPressed = false, onPressedChange, onClick, children, ...props }, ref) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const pressed = controlledPressed ?? internalPressed;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? 'on' : 'off'}
        onClick={e => {
          const next = !pressed;
          setInternalPressed(next);
          onPressedChange?.(next);
          onClick?.(e);
        }}
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Toggle.displayName = 'Toggle';

// ── ToggleGroup ───────────────────────────────────────────────────────────────

interface ToggleGroupCtx {
  value: string[];
  onToggle: (val: string) => void;
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
  type: 'single' | 'multiple';
}
const ToggleGroupContext = createContext<ToggleGroupCtx | null>(null);

export interface ToggleGroupProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof toggleVariants> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ type = 'single', value: controlledValue, defaultValue, onValueChange, variant, size, className, children, ...props }, ref) => {
    const def = defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : [];
    const [internal, setInternal] = useState<string[]>(def);
    const value = controlledValue
      ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
      : internal;

    const onToggle = (val: string) => {
      let next: string[];
      if (type === 'single') {
        next = value.includes(val) ? [] : [val];
      } else {
        next = value.includes(val) ? value.filter(v => v !== val) : [...value, val];
      }
      setInternal(next);
      onValueChange?.(type === 'single' ? (next[0] ?? '') : next);
    };

    return (
      <ToggleGroupContext.Provider value={{ value, onToggle, variant, size, type }}>
        <div ref={ref} role="group" className={cn('flex items-center gap-1', className)} {...props}>
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);
ToggleGroup.displayName = 'ToggleGroup';

export interface ToggleGroupItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  value: string;
}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, variant: itemVariant, size: itemSize, className, children, ...props }, ref) => {
    const ctx = useContext(ToggleGroupContext);
    const pressed = ctx ? ctx.value.includes(value) : false;
    const variant = itemVariant ?? ctx?.variant;
    const size = itemSize ?? ctx?.size;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? 'on' : 'off'}
        onClick={() => ctx?.onToggle(value)}
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ToggleGroupItem.displayName = 'ToggleGroupItem';
