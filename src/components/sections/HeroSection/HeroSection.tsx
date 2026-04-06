import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { AuroraBackground } from '../../effects/AuroraBackground/AuroraBackground';
import { GridPattern } from '../../effects/GridPattern/GridPattern';
import { ParticleField } from '../../effects/ParticleField/ParticleField';

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface HeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

// ─── HeroCenter ───────────────────────────────────────────────────────────────

export interface HeroCenterProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  actions?: HeroAction[];
  background?: 'aurora' | 'grid' | 'particles' | 'gradient' | 'none';
  className?: string;
}

export function HeroCenter({ badge, title, titleHighlight, description, actions = [], background = 'aurora', className }: HeroCenterProps) {
  const inner = (
    <div className={cn('relative min-h-[480px] flex items-center justify-center px-6 py-24 overflow-hidden', className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {badge && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crisp-500/30 bg-crisp-500/10 text-crisp-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-crisp-400 animate-pulse" />
            {badge}
          </motion.div>
        )}
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          {title}{' '}
          {titleHighlight && (
            <span className="bg-gradient-to-r from-crisp-400 to-violet-400 bg-clip-text text-transparent">{titleHighlight}</span>
          )}
        </motion.h1>
        {description && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{description}</motion.p>
        )}
        {actions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3">
            {actions.map((a, i) => (
              <a key={i} href={a.href ?? '#'} onClick={a.onClick}
                className={cn('inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.97]',
                  a.variant === 'secondary' ? 'border border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500 hover:text-gray-100'
                    : a.variant === 'ghost' ? 'text-gray-400 hover:text-gray-200'
                    : 'bg-crisp-600 text-white hover:bg-crisp-500 shadow-lg shadow-crisp-600/30',
                )}>
                {a.label}
              </a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  if (background === 'aurora') return <AuroraBackground className="bg-gray-950">{inner}</AuroraBackground>;
  if (background === 'grid') return <GridPattern className="bg-gray-950" fade>{inner}</GridPattern>;
  if (background === 'particles') return (
    <div className="relative bg-gray-950 overflow-hidden">
      <ParticleField className="absolute inset-0" color="#6366f1" count={60} />
      {inner}
    </div>
  );
  if (background === 'gradient') return (
    <div className="relative bg-gradient-to-br from-gray-950 via-crisp-950/20 to-gray-950">{inner}</div>
  );
  return <div className="bg-gray-950">{inner}</div>;
}

// ─── HeroSplit ────────────────────────────────────────────────────────────────

export interface HeroSplitProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  actions?: HeroAction[];
  visual?: React.ReactNode;
  className?: string;
}

export function HeroSplit({ badge, title, titleHighlight, description, actions = [], visual, className }: HeroSplitProps) {
  return (
    <div className={cn('relative bg-gray-950 overflow-hidden', className)}>
      <GridPattern opacity={0.04} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crisp-500/30 bg-crisp-500/10 text-crisp-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-crisp-400 animate-pulse" />
              {badge}
            </div>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            {title}{' '}
            {titleHighlight && <span className="bg-gradient-to-r from-crisp-400 to-violet-400 bg-clip-text text-transparent">{titleHighlight}</span>}
          </h1>
          {description && <p className="text-lg text-gray-400 mb-8">{description}</p>}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((a, i) => (
                <a key={i} href={a.href ?? '#'} onClick={a.onClick}
                  className={cn('inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-[0.97]',
                    a.variant === 'secondary' ? 'border border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500'
                      : a.variant === 'ghost' ? 'text-gray-400 hover:text-gray-200'
                      : 'bg-crisp-600 text-white hover:bg-crisp-500 shadow-lg shadow-crisp-600/30',
                  )}>
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          {visual ?? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/60 h-80 flex items-center justify-center text-gray-600 text-sm">
              Visual placeholder
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── FeatureBento ─────────────────────────────────────────────────────────────

export interface BentoItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  span?: 'full' | 'half';
  visual?: React.ReactNode;
  badge?: string;
  color?: string;
}

export interface FeatureBentoProps {
  items: BentoItem[];
  className?: string;
}

export function FeatureBento({ items, className }: FeatureBentoProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -2 }}
          className={cn(
            'relative rounded-2xl border border-gray-800 bg-gray-900/60 p-6 overflow-hidden',
            'hover:border-gray-700 transition-colors',
            item.span === 'full' && 'md:col-span-2 lg:col-span-3',
          )}
        >
          {item.color && <div className="absolute inset-0 opacity-5 rounded-2xl" style={{ background: item.color }} />}
          {item.badge && (
            <span className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ borderColor: item.color ?? '#6366f1', color: item.color ?? '#818cf8', background: `${item.color ?? '#6366f1'}15` }}>
              {item.badge}
            </span>
          )}
          {item.icon && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-crisp-400" style={{ background: `${item.color ?? '#6366f1'}15` }}>
              {item.icon}
            </div>
          )}
          <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
          {item.visual && <div className="mt-4">{item.visual}</div>}
        </motion.div>
      ))}
    </div>
  );
}

// ─── LogoStrip ────────────────────────────────────────────────────────────────

export interface LogoStripProps {
  logos: { name: string; logo?: React.ReactNode }[];
  label?: string;
  speed?: number;
  className?: string;
}

export function LogoStrip({ logos, label, speed = 30, className }: LogoStripProps) {
  const doubled = [...logos, ...logos];
  return (
    <div className={cn('py-8 overflow-hidden', className)}>
      {label && <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">{label}</p>}
      <div className="relative">
        <div
          className="flex items-center gap-10"
          style={{
            animation: `scroll ${speed}s linear infinite`,
            width: 'max-content',
          }}
        >
          {doubled.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors whitespace-nowrap shrink-0">
              {logo.logo ?? (
                <span className="text-sm font-semibold tracking-tight">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
        <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>
    </div>
  );
}

// ─── TestimonialCard ──────────────────────────────────────────────────────────

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialGridProps {
  testimonials: Testimonial[];
  columns?: 2 | 3;
  className?: string;
}

export function TestimonialGrid({ testimonials, columns = 3, className }: TestimonialGridProps) {
  return (
    <div className={cn(columns === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-800 bg-gray-900/50"
        >
          {t.rating && (
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, j) => (
                <svg key={j} className={cn('w-4 h-4', j < t.rating! ? 'text-amber-400' : 'text-gray-700')} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          <blockquote className="text-sm text-gray-300 leading-relaxed flex-1">"{t.quote}"</blockquote>
          <div className="flex items-center gap-3">
            {t.avatar
              ? <img src={t.avatar} className="w-9 h-9 rounded-full object-cover" alt={t.author} />
              : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crisp-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold">{t.author[0]}</div>
            }
            <div>
              <p className="text-sm font-medium text-gray-200">{t.author}</p>
              {(t.role || t.company) && <p className="text-xs text-gray-500">{[t.role, t.company].filter(Boolean).join(' · ')}</p>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── CtaBanner ────────────────────────────────────────────────────────────────

export interface CtaBannerProps {
  title: string;
  description?: string;
  actions?: HeroAction[];
  variant?: 'gradient' | 'glow' | 'bordered';
  className?: string;
}

export function CtaBanner({ title, description, actions = [], variant = 'gradient', className }: CtaBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'relative rounded-3xl p-10 text-center overflow-hidden',
        variant === 'gradient' && 'bg-gradient-to-br from-crisp-900/80 via-violet-900/40 to-gray-900 border border-crisp-800/50',
        variant === 'glow' && 'bg-gray-900 border border-gray-800',
        variant === 'bordered' && 'border-2 border-dashed border-gray-700 bg-gray-950',
        className,
      )}
    >
      {variant === 'glow' && (
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h2>
      {description && <p className="text-gray-400 mb-8 max-w-xl mx-auto">{description}</p>}
      {actions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actions.map((a, i) => (
            <a key={i} href={a.href ?? '#'} onClick={a.onClick}
              className={cn('inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all active:scale-[0.97]',
                a.variant === 'secondary' ? 'border border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500'
                  : a.variant === 'ghost' ? 'text-gray-400 hover:text-gray-200'
                  : 'bg-crisp-600 text-white hover:bg-crisp-500 shadow-lg shadow-crisp-600/30',
              )}>
              {a.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── StatsBanner ──────────────────────────────────────────────────────────────

export interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface StatsBannerProps {
  stats: StatItem[];
  className?: string;
}

export function StatsBanner({ stats, className }: StatsBannerProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6', className)}>
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <p className="text-3xl font-bold text-white">
            {s.prefix}<span className="bg-gradient-to-r from-crisp-400 to-violet-400 bg-clip-text text-transparent">{s.value}</span>{s.suffix}
          </p>
          <p className="text-sm text-gray-500 mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
