import { useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes, MouseEvent } from 'react';

export interface SpotlightEffectProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
  opacity?: number;
}

export function SpotlightEffect({
  color = '#6366f1',
  size = 400,
  opacity = 0.15,
  className,
  children,
  onMouseMove,
  ...props
}: SpotlightEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    onMouseMove?.(e);
  };

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      {...props}
    >
      {visible && (
        <div
          style={{
            position: 'absolute',
            left: pos.x - size / 2,
            top: pos.y - size / 2,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity,
            pointerEvents: 'none',
            zIndex: 0,
            borderRadius: '50%',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
