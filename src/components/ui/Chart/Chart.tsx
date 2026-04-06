import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut';
  height?: number;
  color?: string;
  colors?: string[];
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  animated?: boolean;
  className?: string;
  title?: string;
  valueFormat?: (v: number) => string;
}

const DEFAULT_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#f97316'];

function formatValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return v.toString();
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ x, y, label, value, fmt }: { x: number; y: number; label: string; value: number; fmt: (v: number) => string }) {
  return (
    <g>
      <foreignObject x={x - 50} y={y - 48} width={100} height={40} style={{ overflow: 'visible' }}>
        <div className="bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1.5 shadow-xl text-center pointer-events-none">
          <p className="text-[10px] text-gray-400 truncate">{label}</p>
          <p className="text-xs font-semibold text-white">{fmt(value)}</p>
        </div>
      </foreignObject>
    </g>
  );
}

// ─── Line / Area Chart ────────────────────────────────────────────────────────

function LineAreaChart({ data, type, height, color, showGrid, showLabels, showTooltip, animated, valueFormat: fmt = formatValue }: ChartProps & { height: number }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; d: ChartDataPoint } | null>(null);
  const padding = { top: 20, right: 20, bottom: showLabels ? 40 : 20, left: 50 };
  const w = 600;
  const h = height;
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;

  const max = Math.max(...data.map(d => d.value)) * 1.1;
  const min = 0;

  const xStep = data.length > 1 ? innerW / (data.length - 1) : innerW;
  const points = data.map((d, i) => ({
    x: padding.left + i * xStep,
    y: padding.top + innerH - ((d.value - min) / (max - min)) * innerH,
    d,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = pathD + ` L${points[points.length - 1].x},${padding.top + innerH} L${points[0].x},${padding.top + innerH} Z`;

  const gridLines = 5;
  const mainColor = color ?? DEFAULT_COLORS[0];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      {/* Grid */}
      {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
        const gy = padding.top + (innerH / gridLines) * i;
        const gv = max - (max / gridLines) * i;
        return (
          <g key={i}>
            <line x1={padding.left} y1={gy} x2={w - padding.right} y2={gy} stroke="#374151" strokeWidth={0.5} strokeDasharray="4,4" />
            <text x={padding.left - 8} y={gy + 4} textAnchor="end" fontSize={10} fill="#6b7280">{fmt(Math.round(gv))}</text>
          </g>
        );
      })}

      {/* Area fill */}
      {type === 'area' && (
        <motion.path
          d={areaD}
          fill={mainColor}
          fillOpacity={0.12}
          initial={animated ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={mainColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Dots + labels + tooltip zones */}
      {points.map((p, i) => (
        <g key={i} onMouseEnter={() => showTooltip && setTooltip({ x: p.x, y: p.y, d: p.d })} onMouseLeave={() => setTooltip(null)}>
          <circle cx={p.x} cy={p.y} r={8} fill="transparent" />
          <motion.circle
            cx={p.x} cy={p.y} r={4}
            fill={mainColor}
            stroke="#0f172a" strokeWidth={2}
            initial={animated ? { scale: 0 } : undefined}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.05 }}
          />
          {showLabels && (
            <text x={p.x} y={padding.top + innerH + 24} textAnchor="middle" fontSize={10} fill="#9ca3af">{p.d.label}</text>
          )}
        </g>
      ))}

      {/* Tooltip */}
      {tooltip && <Tooltip x={tooltip.x} y={tooltip.y} label={tooltip.d.label} value={tooltip.d.value} fmt={fmt} />}
    </svg>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({ data, height, color, colors, showGrid, showLabels, showTooltip, animated, valueFormat: fmt = formatValue }: ChartProps & { height: number }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; d: ChartDataPoint } | null>(null);
  const padding = { top: 20, right: 20, bottom: showLabels ? 40 : 20, left: 50 };
  const w = 600;
  const h = height;
  const innerW = w - padding.left - padding.right;
  const innerH = h - padding.top - padding.bottom;

  const max = Math.max(...data.map(d => d.value)) * 1.1;
  const barW = (innerW / data.length) * 0.6;
  const barGap = innerW / data.length;
  const gridLines = 5;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      {showGrid && Array.from({ length: gridLines + 1 }, (_, i) => {
        const gy = padding.top + (innerH / gridLines) * i;
        const gv = max - (max / gridLines) * i;
        return (
          <g key={i}>
            <line x1={padding.left} y1={gy} x2={w - padding.right} y2={gy} stroke="#374151" strokeWidth={0.5} strokeDasharray="4,4" />
            <text x={padding.left - 8} y={gy + 4} textAnchor="end" fontSize={10} fill="#6b7280">{fmt(Math.round(gv))}</text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const bh = ((d.value) / max) * innerH;
        const bx = padding.left + i * barGap + (barGap - barW) / 2;
        const by = padding.top + innerH - bh;
        const col = d.color ?? (colors ? colors[i % colors.length] : color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]);
        return (
          <g key={i} onMouseEnter={() => showTooltip && setTooltip({ x: bx + barW / 2, y: by, d })} onMouseLeave={() => setTooltip(null)}>
            <motion.rect
              x={bx} y={padding.top + innerH}
              width={barW} rx={4}
              fill={col}
              fillOpacity={0.85}
              initial={animated ? { height: 0, y: padding.top + innerH } : { height: bh, y: by }}
              animate={{ height: bh, y: by }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
            />
            {showLabels && (
              <text x={bx + barW / 2} y={padding.top + innerH + 24} textAnchor="middle" fontSize={10} fill="#9ca3af">{d.label}</text>
            )}
          </g>
        );
      })}

      {tooltip && <Tooltip x={tooltip.x} y={tooltip.y} label={tooltip.d.label} value={tooltip.d.value} fmt={fmt} />}
    </svg>
  );
}

// ─── Pie / Donut Chart ────────────────────────────────────────────────────────

function PieDonutChart({ data, type, height, colors, showLegend, showTooltip, animated, valueFormat: fmt = formatValue }: ChartProps & { height: number }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; d: ChartDataPoint } | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const size = Math.min(height, 240);
  const cx = size / 2, cy = size / 2;
  const outerR = size * 0.42;
  const innerR = type === 'donut' ? outerR * 0.58 : 0;
  const total = data.reduce((s, d) => s + d.value, 0);

  let cumulativeAngle = -Math.PI / 2;

  const slices = data.map((d, i) => {
    const angle = (d.value / total) * Math.PI * 2;
    const startA = cumulativeAngle;
    const endA = cumulativeAngle + angle;
    cumulativeAngle += angle;
    const col = d.color ?? (colors ? colors[i % colors.length] : DEFAULT_COLORS[i % DEFAULT_COLORS.length]);

    const isHovered = hovered === i;
    const offset = isHovered ? 8 : 0;
    const midA = (startA + endA) / 2;
    const ox = Math.cos(midA) * offset;
    const oy = Math.sin(midA) * offset;

    const x1 = cx + ox + Math.cos(startA) * outerR;
    const y1 = cy + oy + Math.sin(startA) * outerR;
    const x2 = cx + ox + Math.cos(endA) * outerR;
    const y2 = cy + oy + Math.sin(endA) * outerR;
    const ix1 = cx + ox + Math.cos(startA) * innerR;
    const iy1 = cy + oy + Math.sin(startA) * innerR;
    const ix2 = cx + ox + Math.cos(endA) * innerR;
    const iy2 = cy + oy + Math.sin(endA) * innerR;

    const large = angle > Math.PI ? 1 : 0;
    const pathD = innerR > 0
      ? `M${ix1},${iy1} L${x1},${y1} A${outerR},${outerR} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${large} 0 ${ix1},${iy1} Z`
      : `M${cx + ox},${cy + oy} L${x1},${y1} A${outerR},${outerR} 0 ${large} 1 ${x2},${y2} Z`;

    const tx = cx + Math.cos(midA) * (outerR * 0.7 + innerR * 0.3);
    const ty = cy + Math.sin(midA) * (outerR * 0.7 + innerR * 0.3);

    return { pathD, col, d, i, tx, ty, ox, oy, midA };
  });

  return (
    <div className={cn('flex items-center gap-6', showLegend ? 'flex-row' : 'flex-col')}>
      <svg width={size} height={size} style={{ flexShrink: 0 }}>
        {slices.map(({ pathD, col, d, i, tx, ty }) => (
          <motion.path
            key={i}
            d={pathD}
            fill={col}
            fillOpacity={hovered === null || hovered === i ? 0.85 : 0.5}
            stroke="#0f172a" strokeWidth={2}
            style={{ cursor: 'pointer', transition: 'all 0.15s' }}
            initial={animated ? { scale: 0 } : { scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onMouseEnter={() => { setHovered(i); showTooltip && setTooltip({ x: tx, y: ty, d }); }}
            onMouseLeave={() => { setHovered(null); setTooltip(null); }}
          />
        ))}
        {type === 'donut' && (
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={16} fontWeight={700} fill="white">
            {fmt(total)}
          </text>
        )}
        {tooltip && <Tooltip x={tooltip.x} y={tooltip.y} label={tooltip.d.label} value={tooltip.d.value} fmt={fmt} />}
      </svg>

      {showLegend && (
        <div className="flex flex-col gap-2">
          {data.map((d, i) => {
            const col = d.color ?? (DEFAULT_COLORS[i % DEFAULT_COLORS.length]);
            return (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div style={{ width: 10, height: 10, borderRadius: 2, background: col, flexShrink: 0 }} />
                <span className="text-gray-300 truncate">{d.label}</span>
                <span className="text-gray-500 ml-auto pl-4">{((d.value / total) * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Chart ───────────────────────────────────────────────────────────────

export function Chart({
  type,
  data,
  height = 240,
  color = DEFAULT_COLORS[0],
  colors,
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  showLegend = false,
  animated = true,
  className,
  title,
  valueFormat,
}: ChartProps) {
  if (!data.length) return (
    <div className={cn('flex items-center justify-center rounded-xl border border-gray-800 bg-gray-900/50 text-gray-500 text-sm', className)} style={{ height }}>
      No data
    </div>
  );

  const shared = { data, type, height, color, colors, showGrid, showLabels, showTooltip, showLegend, animated, valueFormat };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && <p className="text-sm font-medium text-gray-300">{title}</p>}
      {(type === 'line' || type === 'area') && <LineAreaChart {...shared} />}
      {type === 'bar' && <BarChart {...shared} />}
      {(type === 'pie' || type === 'donut') && <PieDonutChart {...shared} />}
    </div>
  );
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

export interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  type?: 'line' | 'bar';
  className?: string;
}

export function Sparkline({ data, color = '#6366f1', width = 80, height = 32, type = 'line', className }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  if (type === 'bar') {
    const bw = width / data.length - 1;
    return (
      <svg width={width} height={height} className={className}>
        {data.map((v, i) => {
          const bh = ((v - min) / range) * height;
          return <rect key={i} x={i * (bw + 1)} y={height - bh} width={bw} height={bh} fill={color} fillOpacity={0.8} rx={1} />;
        })}
      </svg>
    );
  }

  const step = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`).join(' ');
  const area = `${pts} ${width},${height} 0,${height}`;

  return (
    <svg width={width} height={height} className={className}>
      <polyline points={area} fill={color} fillOpacity={0.1} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
