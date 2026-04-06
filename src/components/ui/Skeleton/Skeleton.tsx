import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rounded', width, height, lines, style, ...props }, ref) => {
    const variantClass = {
      text: 'rounded',
      rectangular: 'rounded-none',
      circular: 'rounded-full',
      rounded: 'rounded-lg',
    }[variant];

    if (lines && lines > 1) {
      return (
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn('animate-pulse bg-gray-800', variantClass, i === lines - 1 && 'w-3/4')}
              style={{ height: height ?? '1rem', width: i === lines - 1 ? undefined : width }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('animate-pulse bg-gray-800', variantClass, className)}
        style={{ width, height: height ?? (variant === 'text' ? '1rem' : undefined), ...style }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';

// Preset skeleton layouts
export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <Skeleton variant="text" lines={lines} className={className} />
);

export const SkeletonAvatar = ({ size = 40, className }: { size?: number; className?: string }) => (
  <Skeleton variant="circular" width={size} height={size} className={className} />
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn('space-y-3 p-4 rounded-xl border border-gray-800 bg-gray-900/40', className)}>
    <div className="flex items-center gap-3">
      <SkeletonAvatar size={40} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height="0.875rem" width="60%" />
        <Skeleton variant="text" height="0.75rem" width="40%" />
      </div>
    </div>
    <Skeleton variant="rounded" height={120} />
    <SkeletonText lines={2} />
  </div>
);
