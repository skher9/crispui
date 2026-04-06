import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: { wrapper: 'py-8', icon: 'w-10 h-10 text-xl', title: 'text-sm', desc: 'text-xs' },
  md: { wrapper: 'py-12', icon: 'w-14 h-14 text-2xl', title: 'text-base', desc: 'text-sm' },
  lg: { wrapper: 'py-20', icon: 'w-20 h-20 text-4xl', title: 'text-xl', desc: 'text-base' },
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, size = 'md', ...props }, ref) => {
    const s = sizeClasses[size];
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center text-center', s.wrapper, className)}
        {...props}
      >
        {icon && (
          <div className={cn('flex items-center justify-center rounded-2xl bg-gray-100 text-gray-400 mb-4 flex-shrink-0', s.icon)}>
            {icon}
          </div>
        )}
        {!icon && (
          <div className={cn('flex items-center justify-center rounded-2xl bg-gray-100 text-gray-400 mb-4 flex-shrink-0', s.icon)}>
            <svg className="w-1/2 h-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        )}
        <h3 className={cn('font-semibold text-gray-900', s.title)}>{title}</h3>
        {description && <p className={cn('text-gray-500 mt-1.5 max-w-sm', s.desc)}>{description}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';
