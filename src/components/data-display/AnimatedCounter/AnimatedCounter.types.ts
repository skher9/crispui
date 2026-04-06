export interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  format?: (n: number) => string;
  prefix?: string;
  suffix?: string;
  className?: string;
}
