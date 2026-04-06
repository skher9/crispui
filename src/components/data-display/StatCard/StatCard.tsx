import { cn } from '../../../utils/cn';
import { Skeleton } from '../../motion/Skeleton/Skeleton';
import type { StatCardProps } from './StatCard.types';
import type { ColorToken } from '../../../types';

const variantStyles: Record<ColorToken, { icon: string; bg: string }> = {
  crisp:   { icon: 'bg-crisp-100 text-crisp-600',   bg: 'border-crisp-100' },
  emerald: { icon: 'bg-emerald-100 text-emerald-600', bg: 'border-emerald-100' },
  rose:    { icon: 'bg-rose-100 text-rose-600',      bg: 'border-rose-100' },
  amber:   { icon: 'bg-amber-100 text-amber-600',    bg: 'border-amber-100' },
  sky:     { icon: 'bg-sky-100 text-sky-600',        bg: 'border-sky-100' },
};

const deltaStyles = {
  increase: 'text-emerald-600 bg-emerald-50',
  decrease: 'text-rose-600 bg-rose-50',
  neutral:  'text-gray-500 bg-gray-50',
};

const deltaIcons = {
  increase: '↑',
  decrease: '↓',
  neutral: '→',
};

export function StatCard({
  title,
  value,
  delta,
  deltaType = 'neutral',
  icon,
  variant = 'crisp',
  loading = false,
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn('bg-white rounded-2xl border p-5 shadow-sm', styles.bg, className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{title}</p>
          {loading ? (
            <Skeleton variant="line" className="w-28 h-8 mb-1" />
          ) : (
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
          )}
          {loading ? (
            <Skeleton variant="line" className="w-16 h-4 mt-2" />
          ) : (
            delta !== undefined && (
              <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mt-1.5', deltaStyles[deltaType])}>
                <span>{deltaIcons[deltaType]}</span>
                {delta}
              </span>
            )
          )}
        </div>
        {icon && (
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', styles.icon)}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
