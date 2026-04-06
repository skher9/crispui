import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  position?: 'left' | 'right' | 'alternate';
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <ol ref={ref} className={cn('relative flex flex-col', className)} {...props}>
      {children}
    </ol>
  ),
);
Timeline.displayName = 'Timeline';

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  connector?: boolean;
}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, connector = true, children, ...props }, ref) => (
    <li ref={ref} className={cn('flex gap-4 pb-6 last:pb-0', className)} {...props}>
      {children}
    </li>
  ),
);
TimelineItem.displayName = 'TimelineItem';

export interface TimelineDotProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outlined' | 'dot';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

const dotColors = {
  default: 'border-gray-600 bg-gray-700',
  primary: 'border-crisp-500 bg-crisp-500/20',
  success: 'border-emerald-500 bg-emerald-500/20',
  warning: 'border-amber-500 bg-amber-500/20',
  error:   'border-rose-500 bg-rose-500/20',
};
const dotIconColors = {
  default: 'text-gray-300',
  primary: 'text-crisp-400',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  error:   'text-rose-400',
};

export const TimelineDot = forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, variant = 'filled', color = 'primary', icon, ...props }, ref) => (
    <div className="flex flex-col items-center shrink-0">
      <div
        ref={ref}
        className={cn(
          'w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0',
          dotColors[color],
          dotIconColors[color],
          className,
        )}
        {...props}
      >
        {icon ?? <span className="w-2 h-2 rounded-full bg-current" />}
      </div>
      <div className="w-0.5 flex-1 mt-2 bg-gray-700" />
    </div>
  ),
);
TimelineDot.displayName = 'TimelineDot';

export const TimelineContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 pb-2', className)} {...props} />
  ),
);
TimelineContent.displayName = 'TimelineContent';

export const TimelineTime = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-xs text-gray-500 mb-1', className)} {...props} />
  ),
);
TimelineTime.displayName = 'TimelineTime';
