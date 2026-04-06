import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Flash, Shield, Code, Layer, Crown, Heart, Star, Chart,
  Setting2, Notification, SearchNormal, Briefcase, People, Timer,
  TickCircle, Copy, ArrowRight2,
} from 'iconsax-react';
import { Button, Badge, Typewriter, Animate, Stagger } from '@crispui/react';

// ── Feature card ──────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc, delay }: {
  icon: React.ReactNode; title: string; desc: string; delay: number
}) {
  return (
    <Animate type="slideUp" delay={delay}>
      <div className="group p-6 rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-gray-600 hover:bg-gray-800/60 transition-all duration-300 cursor-default">
        <div className="w-10 h-10 rounded-xl bg-crisp-500/10 border border-crisp-500/20 flex items-center justify-center text-crisp-400 mb-4 group-hover:bg-crisp-500/20 group-hover:border-crisp-500/40 transition-all">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-100 mb-1.5">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </Animate>
  );
}

// ── Component preview card ────────────────────────────────────────────────────

function ComponentPreview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/40 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-xs text-gray-500 ml-1">{label}</span>
      </div>
      <div className="p-5 flex flex-wrap gap-3 items-center justify-center min-h-[120px]">
        {children}
      </div>
    </div>
  );
}

// ── Stat counter ──────────────────────────────────────────────────────────────

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

// ── Home page ─────────────────────────────────────────────────────────────────

export function HomePage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [copied, setCopied] = useState(false);

  const copyInstall = useCallback(() => {
    navigator.clipboard.writeText('npm install @crispui/react');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <section className="pt-16 pb-20 text-center">
        <Animate type="fadeIn" delay={0}>
          <Badge variant="secondary" className="mb-6 mx-auto">
            <Flash size={12} color="currentColor" className="text-crisp-400" />
            <span>50+ components · Dark first · TypeScript</span>
          </Badge>
        </Animate>

        <Animate type="slideUp" delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Build beautiful UIs{' '}
            <span className="bg-gradient-to-r from-crisp-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              <Typewriter
                text={['at warp speed.', 'without the grind.', 'that ship.', 'you love.']}
                loop
                speed={55}
                deleteSpeed={30}
              />
            </span>
          </h1>
        </Animate>

        <Animate type="slideUp" delay={0.2}>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            crispui is a React + TypeScript component library with 50+ production-ready components,
            fluid animations, dark mode, and full accessibility — all under 30 kB gzipped.
          </p>
        </Animate>

        <Animate type="slideUp" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => onNavigate('installation')}
              rightIcon={<ArrowRight2 size={16} color="currentColor" />}
            >
              Get started
            </Button>
            <button
              onClick={copyInstall}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-700 bg-gray-900 hover:border-gray-500 hover:bg-gray-800 transition-all text-sm font-mono text-gray-300 group"
            >
              <span className="text-gray-500">$</span>
              npm install @crispui/react
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <TickCircle size={14} color="currentColor" className="text-emerald-400" />
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy size={14} color="currentColor" className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Animate>
      </section>

      {/* Stats */}
      <Animate type="fadeIn" delay={0.4}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-y border-gray-800 mb-20">
          <Stat value="50+" label="Components" />
          <Stat value="993" label="Icons" />
          <Stat value="13" label="Animations" />
          <Stat value="~28kB" label="Gzipped" />
        </div>
      </Animate>

      {/* Component previews */}
      <section className="mb-20">
        <Animate type="slideUp">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Everything you need</h2>
            <p className="text-gray-400">Battle-tested components for every use case.</p>
          </div>
        </Animate>

        <Stagger delay={80} type="slideUp">
          <ComponentPreview label="Buttons & variants">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="success">Success</Button>
            <Button variant="destructive">Destructive</Button>
          </ComponentPreview>

          <ComponentPreview label="Badges">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>Away</Badge>
            <Badge variant="destructive">3</Badge>
            <Badge variant="outline">Outline</Badge>
          </ComponentPreview>

          <ComponentPreview label="Icons (iconsax · 993 total)">
            {[Home, Flash, Shield, Code, Layer, Crown, Heart, Star, Chart, Setting2, Notification, SearchNormal, Briefcase, People, Timer].map((Icon, i) => (
              <span key={i} className="text-gray-300 hover:text-crisp-400 transition-colors cursor-pointer">
                <Icon size={22} color="currentColor" />
              </span>
            ))}
          </ComponentPreview>
        </Stagger>
      </section>

      {/* Features grid */}
      <section className="mb-20">
        <Animate type="slideUp">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Why crispui?</h2>
            <p className="text-gray-400">Opinionated defaults, zero config, escape hatches everywhere.</p>
          </div>
        </Animate>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard delay={0} icon={<Flash size={18} color="currentColor" />} title="Framer Motion animations" desc="Every transition, entrance, and gesture is powered by Framer Motion with sensible defaults." />
          <FeatureCard delay={0.05} icon={<Code size={18} color="currentColor" />} title="TypeScript first" desc="Full prop inference via class-variance-authority. No any, no casting — autocompletion everywhere." />
          <FeatureCard delay={0.1} icon={<Shield size={18} color="currentColor" />} title="ARIA accessible" desc="Screen-reader tested. Every interactive component has correct roles, labels, and keyboard nav." />
          <FeatureCard delay={0.15} icon={<Layer size={18} color="currentColor" />} title="Composable by design" desc="Compound components with React context. Slot-based APIs for full layout control." />
          <FeatureCard delay={0.2} icon={<Star size={18} color="currentColor" />} title="Dark mode native" desc="Built on OKLCH tokens and Tailwind v4. Dark mode is the default, not an afterthought." />
          <FeatureCard delay={0.25} icon={<Crown size={18} color="currentColor" />} title="993 Iconsax icons" desc="Linear, Outline, Bold, Bulk, Broken, TwoTone — all in one package, tree-shakeable." />
        </div>
      </section>

      {/* CTA */}
      <Animate type="slideUp">
        <section className="rounded-3xl border border-crisp-500/20 bg-gradient-to-br from-crisp-500/5 via-transparent to-violet-500/5 p-12 text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Start building today</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            One command to install. Import what you need. Ship faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => onNavigate('installation')}>
              Read the docs
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('pricing')}>
              View pricing
            </Button>
          </div>
        </section>
      </Animate>
    </div>
  );
}
