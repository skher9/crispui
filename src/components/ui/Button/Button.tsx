import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { ButtonProps } from './Button.types';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisp-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        // Light variants
        default:     'bg-crisp-600 text-white shadow-sm hover:bg-crisp-700 active:scale-[0.97]',
        secondary:   'bg-crisp-50 text-crisp-700 hover:bg-crisp-100 active:scale-[0.97]',
        outline:     'border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 active:scale-[0.97]',
        ghost:       'text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97]',
        destructive: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:scale-[0.97]',
        success:     'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:scale-[0.97]',
        warning:     'bg-amber-500 text-white shadow-sm hover:bg-amber-600 active:scale-[0.97]',
        link:        'text-crisp-600 underline-offset-4 hover:underline p-0 h-auto',
        // Dark variants
        'dark':         'bg-gray-800 text-gray-100 border border-gray-700 hover:bg-gray-700 hover:border-gray-600 active:scale-[0.97]',
        'dark-outline': 'border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-gray-100 hover:bg-gray-800/50 active:scale-[0.97]',
        'dark-ghost':   'text-gray-400 hover:text-gray-100 hover:bg-gray-800 active:scale-[0.97]',
        'dark-destructive': 'text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-500/60 active:scale-[0.97]',
        // Premium variants
        glow:       'bg-crisp-600 text-white shadow-lg shadow-crisp-500/40 hover:bg-crisp-500 hover:shadow-crisp-500/60 active:scale-[0.97]',
        gradient:   'bg-gradient-to-r from-crisp-600 to-violet-600 text-white hover:from-crisp-500 hover:to-violet-500 shadow-lg shadow-crisp-600/30 active:scale-[0.97]',
        glass:      'border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/20 active:scale-[0.97]',
        soft:       'bg-crisp-500/10 text-crisp-400 hover:bg-crisp-500/20 hover:text-crisp-300 active:scale-[0.97]',
        'soft-rose':    'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 active:scale-[0.97]',
        'soft-emerald': 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 active:scale-[0.97]',
        'soft-amber':   'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 active:scale-[0.97]',
      },
      size: {
        xs:   'h-6 px-2 text-xs rounded-md',
        sm:   'h-8 px-3 text-xs rounded-lg',
        md:   'h-10 px-4 text-sm rounded-xl',
        lg:   'h-12 px-6 text-base rounded-xl',
        xl:   'h-14 px-8 text-lg rounded-2xl',
        icon: 'h-10 w-10 rounded-xl text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  ),
);

Button.displayName = 'Button';
