import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-1',
  lg: 'text-sm px-2.5 py-1',
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-mono font-medium',
        'border border-gray-600 bg-gray-800 text-gray-200',
        'rounded-md shadow-[0_2px_0_0_rgba(0,0,0,0.4)]',
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  ),
);
Kbd.displayName = 'Kbd';
