import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number;
  orientation?: 'vertical' | 'horizontal' | 'both';
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, maxHeight, orientation = 'vertical', style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative overflow-auto',
        '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-600',
        orientation === 'vertical' && 'overflow-x-hidden',
        orientation === 'horizontal' && 'overflow-y-hidden',
        className,
      )}
      style={{ maxHeight, ...style }}
      {...props}
    >
      {children}
    </div>
  ),
);
ScrollArea.displayName = 'ScrollArea';
