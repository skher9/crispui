import { forwardRef, createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

interface CarouselCtx {
  current: number;
  count: number;
  prev: () => void;
  next: () => void;
  goTo: (i: number) => void;
  direction: number;
  opts: { loop?: boolean; autoPlay?: boolean; interval?: number };
}
const CarouselContext = createContext<CarouselCtx | null>(null);
const useCarousel = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error('Carousel compound components must be used inside <Carousel>');
  return ctx;
};

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  onIndexChange?: (index: number) => void;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ defaultIndex = 0, loop = true, autoPlay = false, interval = 4000, onIndexChange, className, children, ...props }, ref) => {
    const [current, setCurrent] = useState(defaultIndex);
    const [direction, setDirection] = useState(0);
    const count = Array.isArray(children) ? children.length : 1;

    const go = useCallback((next: number, dir: number) => {
      setDirection(dir);
      setCurrent(next);
      onIndexChange?.(next);
    }, [onIndexChange]);

    const prev = useCallback(() => {
      const next = current - 1;
      if (next < 0) { if (loop) go(count - 1, -1); }
      else go(next, -1);
    }, [current, count, loop, go]);

    const next = useCallback(() => {
      const nx = current + 1;
      if (nx >= count) { if (loop) go(0, 1); }
      else go(nx, 1);
    }, [current, count, loop, go]);

    const timer = useRef<ReturnType<typeof setInterval>>();
    useEffect(() => {
      if (autoPlay) { timer.current = setInterval(next, interval); return () => clearInterval(timer.current); }
    }, [autoPlay, interval, next]);

    return (
      <CarouselContext.Provider value={{ current, count, prev, next, goTo: (i) => go(i, i > current ? 1 : -1), direction, opts: { loop, autoPlay, interval } }}>
        <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { current, direction } = useCarousel();
    const items = Array.isArray(children) ? children : [children];
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            {items[current]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },
);
CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('w-full', className)} {...props} />
  ),
);
CarouselItem.displayName = 'CarouselItem';

export const CarouselPrevious = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { prev } = useCarousel();
    return (
      <button
        ref={ref}
        type="button"
        onClick={prev}
        className={cn('absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-gray-900/80 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:text-white transition-all', className)}
        {...props}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  },
);
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { next } = useCarousel();
    return (
      <button
        ref={ref}
        type="button"
        onClick={next}
        className={cn('absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-gray-900/80 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-800 hover:text-white transition-all', className)}
        {...props}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  },
);
CarouselNext.displayName = 'CarouselNext';

export const CarouselDots = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { current, count, goTo } = useCarousel();
    return (
      <div ref={ref} className={cn('flex items-center justify-center gap-1.5 mt-3', className)} {...props}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={cn('rounded-full transition-all', i === current ? 'w-4 h-1.5 bg-crisp-500' : 'w-1.5 h-1.5 bg-gray-600 hover:bg-gray-500')}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    );
  },
);
CarouselDots.displayName = 'CarouselDots';
