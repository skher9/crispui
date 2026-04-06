import { cn } from '../../../utils/cn';
import type { SkeletonProps } from './Skeleton.types';

function SkeletonBase({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn('relative overflow-hidden bg-gray-100 rounded', className)}
      style={style}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

export function Skeleton({ variant = 'line', width, height, lines = 1, className }: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'circle') {
    return (
      <SkeletonBase
        className={cn('rounded-full', className)}
        style={{ width: width ?? '2.5rem', height: height ?? '2.5rem' }}
      />
    );
  }

  if (variant === 'rect') {
    return <SkeletonBase className={cn('rounded-xl', className)} style={style} />;
  }

  // line — supports multiple stacked lines
  if (lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={cn('h-4', i === lines - 1 && 'w-3/4', className)}
            style={i < lines - 1 ? { width: style.width } : undefined}
          />
        ))}
      </div>
    );
  }

  return <SkeletonBase className={cn('h-4', className)} style={style} />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return <Skeleton variant="line" lines={lines} />;
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circle" width={size} height={size} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton variant="line" className="h-4 w-1/2" />
          <Skeleton variant="line" className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton variant="rect" className="h-32 w-full" />
      <SkeletonText lines={2} />
    </div>
  );
}
