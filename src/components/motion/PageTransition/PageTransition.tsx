import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import type { PageTransitionProps, TransitionVariant } from './PageTransition.types';

const variantInitial: Record<TransitionVariant, string> = {
  fade:      'opacity-0',
  slideUp:   'opacity-0 translate-y-3',
  slideLeft: 'opacity-0 translate-x-3',
};

const variantFinal: Record<TransitionVariant, string> = {
  fade:      'opacity-100',
  slideUp:   'opacity-100 translate-y-0',
  slideLeft: 'opacity-100 translate-x-0',
};

export function PageTransition({
  children,
  variant = 'fade',
  duration = 300,
  className,
}: PageTransitionProps) {
  const [entered, setEntered] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setEntered(false);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setEntered(true);
      });
    });
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={cn(
        'transform transition-all',
        entered ? variantFinal[variant] : variantInitial[variant],
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
