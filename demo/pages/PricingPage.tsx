import { useState } from 'react';
import { motion } from 'framer-motion';
import { TickCircle, CloseCircle, Flash, Crown, Briefcase, ArrowRight2 } from 'iconsax-react';
import { Button, Badge, Animate, Stagger } from '@crispui/react';

// ── Types ─────────────────────────────────────────────────────────────────────

type BillingCycle = 'monthly' | 'annual';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  cta: string;
  ctaVariant: 'default' | 'secondary' | 'outline';
  highlighted: boolean;
  features: PricingFeature[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Starter',
    icon: <Flash size={18} color="currentColor" />,
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Everything you need to get started building great UIs.',
    cta: 'Get started free',
    ctaVariant: 'outline',
    highlighted: false,
    features: [
      { text: '50+ components', included: true },
      { text: '993 Iconsax icons', included: true },
      { text: 'Dark mode support', included: true },
      { text: 'TypeScript definitions', included: true },
      { text: 'Community support', included: true },
      { text: 'Framer Motion animations', included: false },
      { text: 'Productivity components', included: false },
      { text: 'Priority support', included: false },
      { text: 'Design tokens & Figma kit', included: false },
      { text: 'White-label license', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: <Crown size={18} color="currentColor" />,
    badge: 'Most popular',
    monthlyPrice: 12,
    annualPrice: 9,
    description: 'Full access to every component, animation, and integration.',
    cta: 'Start free trial',
    ctaVariant: 'default',
    highlighted: true,
    features: [
      { text: '50+ components', included: true },
      { text: '993 Iconsax icons', included: true },
      { text: 'Dark mode support', included: true },
      { text: 'TypeScript definitions', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Framer Motion animations', included: true },
      { text: 'Productivity components', included: true },
      { text: 'Design tokens & Figma kit', included: true },
      { text: 'White-label license', included: false },
      { text: 'Custom theme generator', included: false },
    ],
  },
  {
    id: 'team',
    name: 'Team',
    icon: <Briefcase size={18} color="currentColor" />,
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'Built for design systems teams that ship at scale.',
    cta: 'Talk to us',
    ctaVariant: 'secondary',
    highlighted: false,
    features: [
      { text: '50+ components', included: true },
      { text: '993 Iconsax icons', included: true },
      { text: 'Dark mode support', included: true },
      { text: 'TypeScript definitions', included: true },
      { text: 'Dedicated Slack channel', included: true },
      { text: 'Framer Motion animations', included: true },
      { text: 'Productivity components', included: true },
      { text: 'Design tokens & Figma kit', included: true },
      { text: 'White-label license', included: true },
      { text: 'Custom theme generator', included: true },
    ],
  },
];

const FAQ = [
  {
    q: 'Is there really a free plan?',
    a: 'Yes. The Starter plan gives you access to all 50+ UI components and 993 icons forever, no credit card required.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards via Stripe, as well as PayPal for annual plans.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel from your account settings at any time — no fees, no questions asked.',
  },
  {
    q: 'Does crispui work with Next.js / Remix / Vite?',
    a: 'Yes — crispui is a plain React library. It works wherever React runs: CRA, Next.js, Remix, Vite, Expo Web.',
  },
  {
    q: 'Is a Figma kit included?',
    a: 'Pro and Team plans include a Figma community file with all components mapped 1-to-1 to the React implementations.',
  },
  {
    q: 'What does "white-label license" mean?',
    a: 'Team plan holders can remove all crispui branding and ship the component source inside their own design system or product.',
  },
];

// ── Pricing card ──────────────────────────────────────────────────────────────

function PricingCard({ tier, billing }: { tier: PricingTier; billing: BillingCycle }) {
  const price = billing === 'annual' ? tier.annualPrice : tier.monthlyPrice;

  return (
    <div className={`relative flex flex-col rounded-2xl border p-8 transition-all
      ${tier.highlighted
        ? 'border-crisp-500/50 bg-crisp-500/5 shadow-[0_0_40px_-8px_rgba(139,92,246,0.3)]'
        : 'border-gray-800 bg-gray-900/40 hover:border-gray-600 hover:bg-gray-800/40'
      }`}
    >
      {/* Popular badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="default" className="shadow-lg shadow-crisp-500/20">
            <Flash size={10} color="currentColor" />
            {tier.badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center
          ${tier.highlighted ? 'bg-crisp-500/20 text-crisp-400' : 'bg-gray-800 text-gray-400'}`}>
          {tier.icon}
        </div>
        <div>
          <h3 className="font-semibold text-white text-lg">{tier.name}</h3>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{tier.description}</p>

      {/* Price */}
      <div className="mb-6">
        {price === 0 ? (
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-white">Free</span>
            <span className="text-gray-500 mb-1">forever</span>
          </div>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold text-gray-400 mb-1">$</span>
            <motion.span
              key={billing + tier.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              {price}
            </motion.span>
            <span className="text-gray-500 mb-1">/ mo</span>
          </div>
        )}
        {billing === 'annual' && price !== null && price > 0 && (
          <p className="text-xs text-emerald-400 mt-1.5">
            Billed annually — save {Math.round((1 - tier.annualPrice! / tier.monthlyPrice!) * 100)}%
          </p>
        )}
      </div>

      <Button
        variant={tier.ctaVariant}
        className="w-full mb-8"
        rightIcon={<ArrowRight2 size={14} color="currentColor" />}
      >
        {tier.cta}
      </Button>

      {/* Features */}
      <ul className="space-y-3">
        {tier.features.map((f, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${f.included ? 'text-gray-300' : 'text-gray-600'}`}>
            {f.included
              ? <TickCircle size={16} color="currentColor" className="text-emerald-400 mt-0.5 shrink-0" />
              : <CloseCircle size={16} color="currentColor" className="text-gray-700 mt-0.5 shrink-0" />}
            {f.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-200 hover:bg-gray-800/50 transition-colors"
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-gray-500 shrink-0 ml-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('annual');

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Header */}
      <Animate type="slideUp">
        <div className="text-center pt-12 pb-12">
          <Badge variant="secondary" className="mb-4 mx-auto">
            <TickCircle size={12} color="currentColor" className="text-emerald-400" />
            14-day free trial on all paid plans
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>
        </div>
      </Animate>

      {/* Billing toggle */}
      <Animate type="fadeIn" delay={0.1}>
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-sm font-medium transition-colors ${billing === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
            className={`relative w-12 h-6 rounded-full transition-colors ${billing === 'annual' ? 'bg-crisp-600' : 'bg-gray-700'}`}
          >
            <motion.span
              animate={{ x: billing === 'annual' ? 24 : 2 }}
              className="absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow"
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${billing === 'annual' ? 'text-white' : 'text-gray-500'}`}>
            Annual
          </span>
          <Badge variant="success" size="sm">Save up to 25%</Badge>
        </div>
      </Animate>

      {/* Cards */}
      <Stagger delay={80} type="slideUp">
        {TIERS.map(tier => (
          <PricingCard key={tier.id} tier={tier} billing={billing} />
        ))}
      </Stagger>

      {/* Enterprise */}
      <Animate type="slideUp" delay={0.2}>
        <div className="mt-8 rounded-2xl border border-gray-700 bg-gray-900/40 p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={18} color="currentColor" className="text-gray-400" />
              <h3 className="font-semibold text-white">Enterprise</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Custom SLAs, SSO, audit logs, dedicated onboarding, and volume licensing for large teams. Contact us for a custom quote.
            </p>
          </div>
          <Button variant="outline" size="lg" className="shrink-0">
            Contact sales
          </Button>
        </div>
      </Animate>

      {/* FAQ */}
      <Animate type="slideUp" delay={0.1}>
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </Animate>

      {/* Trust bar */}
      <Animate type="fadeIn" delay={0.2}>
        <div className="mt-16 pt-10 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <TickCircle size={14} color="currentColor" className="text-emerald-500" />
            No credit card to start
          </span>
          <span className="flex items-center gap-2">
            <TickCircle size={14} color="currentColor" className="text-emerald-500" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-2">
            <TickCircle size={14} color="currentColor" className="text-emerald-500" />
            SOC 2 Type II compliant
          </span>
          <span className="flex items-center gap-2">
            <TickCircle size={14} color="currentColor" className="text-emerald-500" />
            99.9% uptime SLA
          </span>
        </div>
      </Animate>
    </div>
  );
}
