import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  count: number;
  siblingCount?: number;
  boundaryCount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'ghost';
  showFirstLast?: boolean;
  onChange: (page: number) => void;
}

function getRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(page: number, count: number, sibling = 1, boundary = 1) {
  const left = Math.max(1, page - sibling);
  const right = Math.min(count, page + sibling);
  const leftBound = getRange(1, Math.min(boundary, count));
  const rightBound = getRange(Math.max(count - boundary + 1, 1), count);
  const middle = getRange(left, right);

  const all = Array.from(new Set([...leftBound, ...middle, ...rightBound])).sort((a, b) => a - b);
  const withEllipsis: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];
  let prev = 0;
  for (const p of all) {
    if (p - prev > 1) withEllipsis.push(prev < left ? 'ellipsis-left' : 'ellipsis-right');
    withEllipsis.push(p);
    prev = p;
  }
  return withEllipsis;
}

const sizeMap = {
  sm: 'h-7 min-w-[28px] text-xs rounded-md',
  md: 'h-9 min-w-[36px] text-sm rounded-lg',
  lg: 'h-11 min-w-[44px] text-base rounded-xl',
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ page, count, siblingCount = 1, boundaryCount = 1, size = 'md', variant = 'outlined', showFirstLast = false, onChange, className, ...props }, ref) => {
    const pages = buildPages(page, count, siblingCount, boundaryCount);

    const btnClass = cn(
      'inline-flex items-center justify-center font-medium transition-all px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisp-500 disabled:opacity-40 disabled:pointer-events-none',
      sizeMap[size],
      variant === 'outlined' && 'border border-gray-700 hover:border-gray-500 text-gray-300 hover:bg-gray-800',
      variant === 'filled' && 'bg-gray-800 text-gray-300 hover:bg-gray-700',
      variant === 'ghost' && 'text-gray-300 hover:bg-gray-800',
    );

    const activeClass = cn(
      sizeMap[size], 'inline-flex items-center justify-center px-1 font-semibold',
      variant === 'outlined' && 'border border-crisp-500 bg-crisp-500/15 text-crisp-300',
      variant === 'filled' && 'bg-crisp-600 text-white',
      variant === 'ghost' && 'text-crisp-300 font-bold',
    );

    const ChevronLeft = () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    );
    const ChevronRight = () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    );

    return (
      <nav ref={ref} aria-label="pagination" className={cn('flex items-center gap-1', className)} {...props}>
        {showFirstLast && (
          <button className={btnClass} onClick={() => onChange(1)} disabled={page === 1} aria-label="First page">«</button>
        )}
        <button className={btnClass} onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Previous page">
          <ChevronLeft />
        </button>

        {pages.map((p, i) =>
          typeof p === 'string' ? (
            <span key={p + i} className="flex items-center justify-center w-9 text-gray-500 text-sm select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={p === page ? activeClass : btnClass}
            >
              {p}
            </button>
          ),
        )}

        <button className={btnClass} onClick={() => onChange(page + 1)} disabled={page === count} aria-label="Next page">
          <ChevronRight />
        </button>
        {showFirstLast && (
          <button className={btnClass} onClick={() => onChange(count)} disabled={page === count} aria-label="Last page">»</button>
        )}
      </nav>
    );
  },
);
Pagination.displayName = 'Pagination';
