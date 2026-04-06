import { useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface StarFieldProps extends HTMLAttributes<HTMLCanvasElement> {
  count?: number;
  speed?: number;
  color?: string;
  twinkle?: boolean;
}

export function StarField({
  count = 150,
  speed = 0.3,
  color = '#ffffff',
  twinkle = true,
  className,
  ...props
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    interface Star {
      x: number; y: number;
      z: number; // depth (parallax)
      size: number;
      opacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
    }

    let stars: Star[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));
    };

    let frame = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      frame++;

      for (const star of stars) {
        // Move — deeper stars move slower
        star.x -= speed * (0.2 + star.z * 0.8);
        if (star.x < 0) {
          star.x = w;
          star.y = Math.random() * h;
        }

        // Twinkle
        let alpha = star.opacity;
        if (twinkle) {
          star.twinklePhase += star.twinkleSpeed;
          alpha = star.opacity * (0.6 + 0.4 * Math.sin(star.twinklePhase));
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.5 + star.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [count, speed, color, twinkle]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-full', className)}
      {...props}
    />
  );
}
