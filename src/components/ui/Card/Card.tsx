import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant =
  | 'default' | 'bordered' | 'elevated' | 'ghost'
  | 'dark' | 'dark-bordered' | 'dark-elevated'
  | 'glass' | 'gradient' | 'glow' | 'holographic';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  glowColor?: string;
}

// ─── Variant map ──────────────────────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  // Light
  default:       'bg-white border border-gray-100 shadow-sm',
  bordered:      'bg-white border border-gray-200',
  elevated:      'bg-white shadow-xl shadow-gray-200/60',
  ghost:         'bg-gray-50',
  // Dark
  'dark':         'bg-gray-900 border border-gray-800',
  'dark-bordered':'bg-gray-900 border border-gray-700',
  'dark-elevated':'bg-gray-900 shadow-xl shadow-black/40',
  // Premium
  glass:         'bg-white/5 backdrop-blur-md border border-white/10',
  gradient:      'bg-gradient-to-br from-gray-900 via-gray-900 to-crisp-950/40 border border-crisp-900/50',
  glow:          'bg-gray-900 border border-gray-800',
  holographic:   'bg-gray-900 border border-transparent',
};

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'none', hoverable, clickable, glowColor = '#6366f1', children, style, ...props }, ref) => {
    const isHolographic = variant === 'holographic';
    const isGlow = variant === 'glow';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden relative transition-all duration-200',
          variantClasses[variant],
          paddingClasses[padding],
          (hoverable || clickable) && 'hover:-translate-y-1 hover:shadow-2xl',
          clickable && 'cursor-pointer active:translate-y-0 active:scale-[0.98]',
          isHolographic && 'holographic-card',
          className,
        )}
        style={
          isHolographic
            ? {
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #1e1b4b 50%, #312e81 75%, #1e1b4b 100%)',
                backgroundSize: '400% 400%',
                ...style,
              }
            : isGlow
            ? {
                boxShadow: `0 0 0 1px ${glowColor}20, 0 0 30px ${glowColor}10`,
                ...style,
              }
            : style
        }
        {...props}
      >
        {isGlow && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${glowColor}15 0%, transparent 60%)` }}
          />
        )}
        {isHolographic && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
            style={{ background: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)', backgroundSize: '200% 200%' }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);
Card.displayName = 'Card';

// ─── Card sub-components ──────────────────────────────────────────────────────

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4 border-b border-gray-800', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-base font-semibold text-gray-100 leading-tight', className)} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500 mt-1', className)} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4 border-t border-gray-800 flex items-center gap-3', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

// ─── Specialised card presets ─────────────────────────────────────────────────

export interface ProfileCardProps {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
  stats?: { label: string; value: string }[];
  actions?: React.ReactNode;
  className?: string;
}

export function ProfileCard({ name, role, avatar, bio, stats, actions, className }: ProfileCardProps) {
  return (
    <Card variant="dark" className={cn('overflow-hidden', className)}>
      {/* Cover */}
      <div className="h-20 bg-gradient-to-br from-crisp-900/60 via-violet-900/40 to-gray-900" />
      <CardContent className="pt-0 -mt-8">
        <div className="flex items-end gap-3 mb-4">
          {avatar
            ? <img src={avatar} className="w-16 h-16 rounded-2xl border-2 border-gray-900 object-cover" alt={name} />
            : <div className="w-16 h-16 rounded-2xl border-2 border-gray-900 bg-gradient-to-br from-crisp-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold">{name[0]}</div>
          }
          {actions && <div className="ml-auto mt-8 flex gap-2">{actions}</div>}
        </div>
        <h3 className="text-base font-semibold text-gray-100">{name}</h3>
        {role && <p className="text-sm text-gray-500 mt-0.5">{role}</p>}
        {bio && <p className="text-sm text-gray-400 mt-3 leading-relaxed">{bio}</p>}
        {stats && stats.length > 0 && (
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-800">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-base font-bold text-gray-100">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  color?: string;
  hoverable?: boolean;
  className?: string;
}

export function FeatureCard({ icon, title, description, badge, color = '#6366f1', hoverable = true, className }: FeatureCardProps) {
  return (
    <Card variant="dark" hoverable={hoverable} className={className}>
      <CardContent>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, color }}>
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gray-100 mb-1.5">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

export interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: { text: string; included: boolean }[];
  action: React.ReactNode;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({ name, price, period = '/mo', description, features, action, highlighted, badge, className }: PricingCardProps) {
  return (
    <Card
      variant={highlighted ? 'glow' : 'dark'}
      glowColor="#6366f1"
      className={cn(highlighted && 'ring-1 ring-crisp-500/40', className)}
    >
      <CardContent className="flex flex-col gap-5">
        <div>
          {badge && (
            <span className="inline-flex mb-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-crisp-500/15 text-crisp-400">
              {badge}
            </span>
          )}
          <h3 className="text-base font-semibold text-gray-100">{name}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="flex items-baseline gap-1">
          <span className={cn('text-4xl font-bold', highlighted ? 'text-white' : 'text-gray-100')}>{price}</span>
          <span className="text-sm text-gray-500">{period}</span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm">
              {f.included
                ? <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                : <svg className="w-4 h-4 text-gray-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              }
              <span className={f.included ? 'text-gray-300' : 'text-gray-600'}>{f.text}</span>
            </li>
          ))}
        </ul>
        <div>{action}</div>
      </CardContent>
    </Card>
  );
}
