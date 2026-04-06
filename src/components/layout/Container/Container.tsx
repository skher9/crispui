import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  center?: boolean;
  px?: boolean;
}

const sizeClasses = {
  sm:   'max-w-xl',
  md:   'max-w-3xl',
  lg:   'max-w-5xl',
  xl:   'max-w-6xl',
  '2xl':'max-w-7xl',
  full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'xl', center = true, px = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        sizeClasses[size],
        center && 'mx-auto',
        px && 'px-4 sm:px-6',
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = 'Container';

// ── SectionWrapper ─────────────────────────────────────────────────────────

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  py?: 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
}

const pyClasses = { sm: 'py-8', md: 'py-12', lg: 'py-16', xl: 'py-24' };

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ py = 'lg', as: Tag = 'section', className, ...props }, ref) => (
    <Tag ref={ref} className={cn(pyClasses[py], className)} {...props} />
  ),
);
SectionWrapper.displayName = 'SectionWrapper';

// ── Grid ───────────────────────────────────────────────────────────────────

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 3 | 4 | 6 | 8;
  responsive?: boolean;
}

const colClasses = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 6: 'grid-cols-6', 12: 'grid-cols-12' };
const smColClasses = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 6: 'sm:grid-cols-6', 12: 'sm:grid-cols-12' };
const gapClasses = { 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' };

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 3, gap = 4, responsive = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid',
        responsive ? 'grid-cols-1' : colClasses[cols],
        responsive && smColClasses[cols],
        gapClasses[gap],
        className,
      )}
      {...props}
    />
  ),
);
Grid.displayName = 'Grid';
