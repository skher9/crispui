import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../utils/cn';

// ─── AnimatedNumber ───────────────────────────────────────────────────────────

export interface AnimatedNumberProps {
  value: number;
  duration?: number;       // ms
  delay?: number;          // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  format?: (value: number) => string;
  triggerOnView?: boolean; // start when element enters viewport
  easing?: 'linear' | 'easeOut' | 'easeInOut' | 'spring';
  className?: string;
}

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

export function AnimatedNumber({
  value,
  duration = 1500,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  format,
  triggerOnView = true,
  easing = 'easeOut',
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startValRef = useRef<number>(0);
  const [inViewRef, inView] = useInView<HTMLSpanElement>({ threshold: 0.1, once: true });

  const easeFn = easing === 'linear' ? (t: number) => t
    : easing === 'easeInOut' ? easeInOut
    : easeOutQuart;

  const animate = (from: number, to: number) => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now() + delay;

    const tick = (now: number) => {
      if (now < start) { rafRef.current = requestAnimationFrame(tick); return; }
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeFn(t);
      setDisplay(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(to);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!triggerOnView || inView) {
      animate(startValRef.current, value);
      startValRef.current = value;
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, inView, triggerOnView]);

  const formatted = format
    ? format(display)
    : display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span ref={inViewRef as React.RefObject<HTMLSpanElement>} className={cn('tabular-nums', className)}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

// ─── StatNumber ───────────────────────────────────────────────────────────────
// Pre-styled stat display with label and trend

export interface StatNumberProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: number;      // percentage, positive = up, negative = down
  trendLabel?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function StatNumber({ value, label, prefix, suffix, trend, trendLabel, decimals = 0, duration = 1200, className }: StatNumberProps) {
  const isUp = trend !== undefined && trend >= 0;
  const isDown = trend !== undefined && trend < 0;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="text-3xl font-bold text-white">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} duration={duration} />
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">{label}</p>
        {trend !== undefined && (
          <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full',
            isUp ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10')}>
            <svg className={cn('w-3 h-3', isDown && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
            {Math.abs(trend)}%
            {trendLabel && <span className="text-gray-600 ml-1 font-normal">{trendLabel}</span>}
          </span>
        )}
      </div>
    </div>
  );
}
