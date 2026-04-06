import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, children, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ position: 'relative', paddingBottom: `${(1 / ratio) * 100}%`, ...style }}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  ),
);
AspectRatio.displayName = 'AspectRatio';
