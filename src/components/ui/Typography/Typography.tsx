import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight text-white',
      h2: 'scroll-m-20 text-3xl font-bold tracking-tight text-white',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight text-white',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight text-white',
      h5: 'scroll-m-20 text-lg font-semibold text-white',
      h6: 'scroll-m-20 text-base font-semibold text-white',
      body1: 'text-base leading-7 text-gray-200',
      body2: 'text-sm leading-6 text-gray-300',
      caption: 'text-xs text-gray-400',
      label: 'text-sm font-medium text-gray-200',
      overline: 'text-xs font-semibold uppercase tracking-widest text-gray-400',
      code: 'font-mono text-sm bg-gray-800 border border-gray-700 px-1.5 py-0.5 rounded text-crisp-300',
      lead: 'text-lg text-gray-300 leading-7',
      muted: 'text-sm text-gray-500',
      blockquote: 'border-l-2 border-crisp-500 pl-4 italic text-gray-300',
    },
  },
  defaultVariants: { variant: 'body1' },
});

const tagMap: Record<string, React.ElementType> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  body1: 'p', body2: 'p', caption: 'span', label: 'span', overline: 'span',
  code: 'code', lead: 'p', muted: 'p', blockquote: 'blockquote',
};

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body1', as, children, ...props }, ref) => {
    const Tag = as ?? tagMap[variant ?? 'body1'] ?? 'p';
    return (
      <Tag ref={ref} className={cn(typographyVariants({ variant }), className)} {...props}>
        {children}
      </Tag>
    );
  },
);
Typography.displayName = 'Typography';
