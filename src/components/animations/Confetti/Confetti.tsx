import { useCallback, useRef } from 'react';

export interface ConfettiOptions {
  count?: number;
  spread?: number;
  gravity?: number;
  duration?: number;
  colors?: string[];
  origin?: { x?: number; y?: number };
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle' | 'triangle';
  scaleX: number;
  scaleXDir: number;
}

const DEFAULT_COLORS = ['#7C5CFC', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#f97316'];

function createParticle(canvas: HTMLCanvasElement, opts: ConfettiOptions): Particle {
  const { spread = 80, colors = DEFAULT_COLORS, origin = {} } = opts;
  const ox = (origin.x ?? 0.5) * canvas.width;
  const oy = (origin.y ?? 0.4) * canvas.height;
  const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180);
  const speed = Math.random() * 8 + 4;
  return {
    x: ox, y: oy,
    vx: Math.sin(angle) * speed,
    vy: -Math.abs(Math.cos(angle) * speed) - 2,
    r: Math.random() * 5 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    shape: (['rect', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)],
    scaleX: 1,
    scaleXDir: (Math.random() > 0.5 ? 1 : -1) * 0.05,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.scale(p.scaleX, 1);
  if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.r, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.shape === 'rect') {
    ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
  } else {
    ctx.beginPath();
    ctx.moveTo(0, -p.r);
    ctx.lineTo(p.r, p.r);
    ctx.lineTo(-p.r, p.r);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

export interface UseConfettiReturn {
  fire: (opts?: ConfettiOptions) => void;
}

export function useConfetti(): UseConfettiReturn {
  const rafRef = useRef<number | null>(null);

  const fire = useCallback((opts: ConfettiOptions = {}) => {
    const { count = 120, gravity = 0.25, duration = 3000 } = opts;

    // Create full-page canvas overlay
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    const particles: Particle[] = Array.from({ length: count }, () => createParticle(canvas, opts));
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive = true;
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.scaleX += p.scaleXDir;
        if (Math.abs(p.scaleX) > 1) p.scaleXDir *= -1;
        // Fade out in last 40% of duration
        const fadeStart = duration * 0.6;
        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / (duration * 0.4));
        }
        drawParticle(ctx, p);
      }

      if (alive && elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  return { fire };
}
