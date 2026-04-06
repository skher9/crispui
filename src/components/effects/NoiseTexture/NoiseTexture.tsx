import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface NoiseTextureProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'soft-light';
}

// Inline SVG noise filter — no external dependencies
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export function NoiseTexture({
  opacity = 0.04,
  blendMode = 'overlay',
  className,
  children,
  ...props
}: NoiseTextureProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: NOISE_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity,
          mixBlendMode: blendMode,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
}
