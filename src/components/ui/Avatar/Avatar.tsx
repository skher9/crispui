import { forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 font-semibold uppercase select-none',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
      },
      colorScheme: {
        crisp:   'bg-crisp-100 text-crisp-700',
        emerald: 'bg-emerald-100 text-emerald-700',
        rose:    'bg-rose-100 text-rose-700',
        amber:   'bg-amber-100 text-amber-700',
        sky:     'bg-sky-100 text-sky-700',
        gray:    'bg-gray-100 text-gray-700',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'crisp',
    },
  },
);

export type AvatarColorScheme = 'crisp' | 'emerald' | 'rose' | 'amber' | 'sky' | 'gray';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  color?: AvatarColorScheme;
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const statusColors = {
  online:  'bg-emerald-500',
  offline: 'bg-gray-300',
  busy:    'bg-rose-500',
  away:    'bg-amber-400',
};

function getInitials(name?: string) {
  if (!name) return '?';
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, color, src, alt, fallback, status, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    return (
      <span ref={ref} className={cn('relative inline-flex flex-shrink-0', className)} {...props}>
        <span className={cn(avatarVariants({ size, colorScheme: color }))}>
          {src && !imgError ? (
            <img
              src={src}
              alt={alt ?? fallback}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{getInitials(fallback)}</span>
          )}
        </span>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
              statusColors[status],
              size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3',
            )}
          />
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';
