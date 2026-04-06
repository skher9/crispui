import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../../utils/cn';

// ─── Color conversion helpers ──────────────────────────────────────────────────

function hsvToRgb(h: number, s: number, v: number) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  return { r: Math.round(f(5) * 255), g: Math.round(f(3) * 255), b: Math.round(f(1) * 255) };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s, v };
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ColorPickerProps {
  value?: string;      // hex color
  defaultValue?: string;
  onChange?: (hex: string) => void;
  showAlpha?: boolean;
  showInput?: boolean;
  showSwatches?: boolean;
  swatches?: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DEFAULT_SWATCHES = [
  '#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#6366f1','#8b5cf6','#ec4899',
  '#ffffff','#d1d5db','#6b7280','#374151','#1f2937','#111827','#030712','#000000',
];

const sizeMap = { sm: 160, md: 220, lg: 280 };

// ─── Component ────────────────────────────────────────────────────────────────

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(({
  value,
  defaultValue = '#6366f1',
  onChange,
  showInput = true,
  showSwatches = true,
  swatches = DEFAULT_SWATCHES,
  size = 'md',
  className,
}, ref) => {
  const [hex, setHex] = useState(value ?? defaultValue);
  const [hexInput, setHexInput] = useState(hex);
  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');

  const rgb = hexToRgb(hex) ?? { r: 99, g: 102, b: 241 };
  const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const [hsv, setHsv] = useState({ h, s, v });

  const svRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const pickerSize = sizeMap[size];

  const applyHex = useCallback((newHex: string) => {
    setHex(newHex);
    setHexInput(newHex);
    const r2 = hexToRgb(newHex);
    if (r2) setHsv(rgbToHsv(r2.r, r2.g, r2.b));
    onChange?.(newHex);
  }, [onChange]);

  // When external value changes
  useEffect(() => {
    if (value && value !== hex) applyHex(value);
  }, [value]);

  const updateFromHsv = useCallback((newH: number, newS: number, newV: number) => {
    const { r, g, b } = hsvToRgb(newH, newS, newV);
    const newHex = rgbToHex(r, g, b);
    setHsv({ h: newH, s: newS, v: newV });
    setHex(newHex);
    setHexInput(newHex);
    onChange?.(newHex);
  }, [onChange]);

  // SV picker drag
  const svDrag = useRef(false);
  const onSvMouseDown = (e: React.MouseEvent) => { svDrag.current = true; moveSv(e); };
  const moveSv = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!svRef.current) return;
    const rect = svRef.current.getBoundingClientRect();
    const newS = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newV = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    updateFromHsv(hsv.h, newS, newV);
  }, [hsv.h, updateFromHsv]);

  // Hue slider drag
  const hueDrag = useRef(false);
  const onHueMouseDown = (e: React.MouseEvent) => { hueDrag.current = true; moveHue(e); };
  const moveHue = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const newH = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360));
    updateFromHsv(newH, hsv.s, hsv.v);
  }, [hsv.s, hsv.v, updateFromHsv]);

  useEffect(() => {
    const up = () => { svDrag.current = false; hueDrag.current = false; };
    const move = (e: MouseEvent) => {
      if (svDrag.current) moveSv(e as unknown as React.MouseEvent);
      if (hueDrag.current) moveHue(e as unknown as React.MouseEvent);
    };
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move); };
  }, [moveSv, moveHue]);

  const hueColor = rgbToHex(...Object.values(hsvToRgb(hsv.h, 1, 1)) as [number, number, number]);
  const thumbColor = rgbToHex(...Object.values(hsvToRgb(hsv.h, hsv.s, hsv.v)) as [number, number, number]);

  return (
    <div ref={ref} className={cn('flex flex-col gap-3 select-none', className)} style={{ width: pickerSize }}>
      {/* SV area */}
      <div
        ref={svRef}
        onMouseDown={onSvMouseDown}
        style={{
          width: '100%',
          height: pickerSize * 0.65,
          borderRadius: 10,
          background: `linear-gradient(to right, white, ${hueColor})`,
          position: 'relative',
          cursor: 'crosshair',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, black)' }} />
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          left: `${hsv.s * 100}%`,
          top: `${(1 - hsv.v) * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: 14, height: 14,
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
          background: thumbColor,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Hue slider */}
      <div
        ref={hueRef}
        onMouseDown={onHueMouseDown}
        style={{
          width: '100%', height: 12, borderRadius: 6, cursor: 'pointer', position: 'relative',
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
        }}
      >
        <div style={{
          position: 'absolute',
          left: `${(hsv.h / 360) * 100}%`,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16,
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
          background: hueColor,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Color preview + input */}
      {showInput && (
        <div className="flex items-center gap-2">
          <div style={{ width: 32, height: 32, borderRadius: 8, background: hex, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
          <div className="flex-1 flex items-center gap-1">
            {format === 'hex' ? (
              <input
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-200 focus:outline-none focus:border-crisp-500 font-mono"
                value={hexInput}
                onChange={e => {
                  setHexInput(e.target.value);
                  const v = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                  if (/^#[0-9a-fA-F]{6}$/.test(v)) applyHex(v);
                }}
              />
            ) : (
              <div className="flex gap-1 flex-1">
                {(['r', 'g', 'b'] as const).map(ch => (
                  <input
                    key={ch}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-1 py-1 text-xs text-gray-200 focus:outline-none focus:border-crisp-500 text-center"
                    value={rgb[ch]}
                    onChange={e => {
                      const v = parseInt(e.target.value);
                      if (!isNaN(v) && v >= 0 && v <= 255) {
                        const nr = { ...rgb, [ch]: v };
                        applyHex(rgbToHex(nr.r, nr.g, nr.b));
                      }
                    }}
                  />
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setFormat(f => f === 'hex' ? 'rgb' : 'hex')}
              className="px-1.5 py-1 text-[10px] text-gray-500 hover:text-gray-300 bg-gray-800 rounded border border-gray-700 transition-colors"
            >
              {format.toUpperCase()}
            </button>
          </div>
        </div>
      )}

      {/* Swatches */}
      {showSwatches && (
        <div className="flex flex-wrap gap-1.5">
          {swatches.map(sw => (
            <button
              key={sw}
              type="button"
              onClick={() => applyHex(sw)}
              title={sw}
              style={{ background: sw }}
              className={cn(
                'w-6 h-6 rounded-md border transition-transform hover:scale-110',
                hex.toLowerCase() === sw.toLowerCase() ? 'border-white scale-110' : 'border-transparent',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
});
ColorPicker.displayName = 'ColorPicker';

// ─── ColorPickerPopover ───────────────────────────────────────────────────────

export interface ColorPickerPopoverProps extends Omit<ColorPickerProps, 'className'> {
  label?: string;
  className?: string;
}

export function ColorPickerPopover({ value, defaultValue = '#6366f1', onChange, label, className, ...rest }: ColorPickerPopoverProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(value ?? defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative inline-flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-gray-200">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-700 bg-gray-900 hover:border-gray-500 transition-colors"
      >
        <div style={{ width: 20, height: 20, borderRadius: 4, background: color, border: '1px solid rgba(255,255,255,0.15)' }} />
        <span className="text-sm font-mono text-gray-300">{color}</span>
      </button>
      {open && (
        <div className="absolute top-full mt-2 z-50 p-3 rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/40">
          <ColorPicker
            value={color}
            onChange={hex => { setColor(hex); onChange?.(hex); }}
            {...rest}
          />
        </div>
      )}
    </div>
  );
}
