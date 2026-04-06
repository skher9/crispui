import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('w-px bg-gray-200 self-stretch', className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn('h-px w-full bg-gray-200', className)}
        {...props}
      />
    );
  },
);

Separator.displayName = 'Separator';
