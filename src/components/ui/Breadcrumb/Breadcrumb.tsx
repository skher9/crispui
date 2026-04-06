import { forwardRef, createContext, useContext } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, OlHTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes } from 'react';

const BreadcrumbContext = createContext<{ separator?: React.ReactNode }>({});

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', className, children, ...props }, ref) => (
    <BreadcrumbContext.Provider value={{ separator }}>
      <nav ref={ref} aria-label="breadcrumb" className={cn('flex', className)} {...props}>
        {children}
      </nav>
    </BreadcrumbContext.Provider>
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbList = forwardRef<HTMLOListElement, OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('flex flex-wrap items-center gap-1 text-sm text-gray-400', className)} {...props} />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('flex items-center gap-1', className)} {...props} />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn('hover:text-gray-200 transition-colors', className)} {...props} />
  ),
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-current="page" className={cn('text-gray-100 font-medium', className)} {...props} />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => {
    const { separator } = useContext(BreadcrumbContext);
    return (
      <span ref={ref} aria-hidden className={cn('text-gray-600 select-none', className)} {...props}>
        {children ?? separator}
      </span>
    );
  },
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} aria-hidden className={cn('text-gray-500 select-none', className)} {...props}>…</span>
  ),
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
