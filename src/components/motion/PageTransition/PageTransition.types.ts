import type { ReactNode } from 'react';

export type TransitionVariant = 'fade' | 'slideUp' | 'slideLeft';

export interface PageTransitionProps {
  children: ReactNode;
  variant?: TransitionVariant;
  duration?: number;
  className?: string;
}
