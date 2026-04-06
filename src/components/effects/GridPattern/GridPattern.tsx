import type React from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface GridPatternProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'lines' | 'cross';
  size?: number;
  color?: string;
  opacity?: number;
  fade?: boolean;
}

export function GridPattern({
  variant = 'dots',
  size = 24,
  color = '#ffffff',
  opacity = 0.07,
  fade = true,
  className,
  children,
  style,
  ...props
}: GridPatternProps) {
  const id = `grid-${variant}-${size}`;

  const pattern = variant === 'dots'
    ? <circle cx={size / 2} cy={size / 2} r={1} fill={color} />
    : variant === 'lines'
    ? (
      <>
        <line x1="0" y1={size} x2={size} y2={size} stroke={color} strokeWidth="0.5" />
        <line x1={size} y1="0" x2={size} y2={size} stroke={color} strokeWidth="0.5" />
      </>
    )
    : (
      <>
        <line x1={size / 2 - 3} y1={size / 2} x2={size / 2 + 3} y2={size / 2} stroke={color} strokeWidth="1" strokeLinecap="round" />
        <line x1={size / 2} y1={size / 2 - 3} x2={size / 2} y2={size / 2 + 3} stroke={color} strokeWidth="1" strokeLinecap="round" />
      </>
    );

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={style}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
            {pattern}
          </pattern>
          {fade && (
            <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        {fade && <rect width="100%" height="100%" fill={`url(#${id}-fade)`} style={{ mixBlendMode: 'destination-out' as React.CSSProperties['mixBlendMode'] }} />}
      </svg>
      {children}
    </div>
  );
}
