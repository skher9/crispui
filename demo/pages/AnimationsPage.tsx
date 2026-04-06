import { Animate, AnimatedIcon, Stagger, Typewriter, GlowPulse, Magnetic, useConfetti, Button } from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

const StarIcon = () => (
  <svg className="w-6 h-6 text-crisp-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

const ANIMATIONS = ['bounce', 'shake', 'pulse', 'spin', 'float', 'tada', 'heartbeat', 'wobble'] as const;
const ANIMATE_TYPES = ['fadeIn', 'slideUp', 'slideDown', 'zoomIn', 'bounceIn', 'flipX'] as const;

// ── AnimatedIcon ──────────────────────────────────────────────────────────────

export function AnimatedIconPage() {
  return (
    <DocPage title="AnimatedIcon" description="Wraps any icon with one of 13 motion presets. Supports hover, click, and always-loop triggers." importNames="AnimatedIcon">
      <DocSection title="Trigger: hover (try hovering each)">
        <ExampleBlock code={`<AnimatedIcon animation="bounce" trigger="hover">
  <StarIcon />
</AnimatedIcon>

<AnimatedIcon animation="spin" trigger="loop">
  <CogIcon />
</AnimatedIcon>`}>
          {ANIMATIONS.map(anim => (
            <AnimatedIcon key={anim} animation={anim} trigger="hover">
              <StarIcon />
            </AnimatedIcon>
          ))}
        </ExampleBlock>
      </DocSection>

      <Callout variant="tip">Hover over each icon to preview its animation. The label below shows the animation name.</Callout>

      <PropsTable props={[
        { name: 'animation', type: "'bounce' | 'spin' | 'pulse' | 'shake' | 'float' | 'wobble' | 'heartbeat' | 'tada' | 'swing' | 'rubberBand' | 'jello' | 'flash' | 'ping'", required: true, description: 'Animation preset.' },
        { name: 'trigger', type: "'hover' | 'click' | 'loop' | 'none'", default: "'hover'", description: 'When to play the animation.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Icon container text size.' },
        { name: 'speed', type: 'number', description: 'Animation duration in ms.' },
        { name: 'delay', type: 'number', description: 'Delay before animation starts in ms.' },
      ]} />
    </DocPage>
  );
}

// ── Animate ───────────────────────────────────────────────────────────────────

export function AnimatePage() {
  return (
    <DocPage title="Animate" description="Declarative entrance animations for any element. 11 presets powered by Framer Motion with viewport detection." importNames="Animate">
      <DocSection title="Presets">
        <ExampleBlock code={`<Animate type="fadeIn">
  <Card>Fades in on mount</Card>
</Animate>

<Animate type="slideUp">
  <Card>Slides up from below</Card>
</Animate>

<Animate type="zoomIn">
  <Card>Scales in from center</Card>
</Animate>`} previewClassName="flex-col items-stretch gap-3">
          {ANIMATE_TYPES.map(type => (
            <Animate key={type} type={type}>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300">{type}</div>
            </Animate>
          ))}
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'type', type: "'fadeIn' | 'fadeOut' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'zoomOut' | 'bounceIn' | 'flipX' | 'flipY'", required: true, description: 'Animation preset.' },
        { name: 'delay', type: 'number', default: '0', description: 'Delay in seconds before the animation starts.' },
        { name: 'duration', type: 'number', default: '0.4', description: 'Animation duration in seconds.' },
        { name: 'once', type: 'boolean', default: 'true', description: 'Whether to replay when the element re-enters the viewport.' },
      ]} />
    </DocPage>
  );
}

// ── Stagger ───────────────────────────────────────────────────────────────────

export function StaggerPage() {
  return (
    <DocPage title="Stagger" description="Animates children one after another with a configurable delay between each." importNames="Stagger">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Stagger delay={80} type="slideUp">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
  <div>Fourth item</div>
</Stagger>`} previewClassName="flex-col items-stretch gap-2">
          <Stagger delay={120} type="slideUp">
            {['First item', 'Second item', 'Third item', 'Fourth item'].map((item, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300">{item}</div>
            ))}
          </Stagger>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'delay', type: 'number', default: '80', description: 'Delay in ms between each child animation.' },
        { name: 'type', type: "'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn'", default: "'slideUp'", description: 'Animation applied to each child.' },
        { name: 'duration', type: 'number', default: '0.35', description: 'Duration per child in seconds.' },
        { name: 'once', type: 'boolean', default: 'true', description: 'Only trigger once when scrolled into view.' },
      ]} />
    </DocPage>
  );
}

// ── Typewriter ────────────────────────────────────────────────────────────────

export function TypewriterPage() {
  return (
    <DocPage title="Typewriter" description="Types text character by character with a blinking cursor. Supports looping and multiple strings." importNames="Typewriter">
      <DocSection title="Multiple strings, looping">
        <ExampleBlock code={`<Typewriter
  text={['Hello, world!', 'Build faster.', 'Ship with confidence.']}
  loop
  speed={60}
/>`} previewClassName="flex-col items-start">
          <Typewriter
            text={['Hello, world!', 'Build faster.', 'Ship with confidence.']}
            loop
            speed={60}
            className="text-2xl font-bold text-crisp-400"
          />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'text', type: 'string | string[]', required: true, description: 'String or array of strings to type in sequence.' },
        { name: 'speed', type: 'number', default: '55', description: 'Milliseconds per character (typing).' },
        { name: 'deleteSpeed', type: 'number', default: '30', description: 'Milliseconds per character when deleting.' },
        { name: 'loop', type: 'boolean', default: 'false', description: 'Whether to loop through all strings.' },
        { name: 'pauseDelay', type: 'number', default: '1800', description: 'Milliseconds to pause after completing each string.' },
        { name: 'cursor', type: 'boolean', default: 'true', description: 'Show blinking cursor.' },
        { name: 'cursorChar', type: 'string', default: "'|'", description: 'Character to use as cursor.' },
      ]} />
    </DocPage>
  );
}

// ── GlowPulse & Magnetic ──────────────────────────────────────────────────────

export function GlowPulsePage() {
  return (
    <DocPage title="GlowPulse & Magnetic" description="GlowPulse animates a glow ring around any element. Magnetic makes an element attract towards the cursor." importNames="GlowPulse, Magnetic">
      <DocSection title="GlowPulse">
        <ExampleBlock code={`<GlowPulse color="violet" size="md">
  <Button>Glowing button</Button>
</GlowPulse>`}>
          <GlowPulse color="violet" size="md">
            <Button>Glowing button</Button>
          </GlowPulse>
          <GlowPulse color="emerald" size="md">
            <Button variant="success">Green glow</Button>
          </GlowPulse>
          <GlowPulse color="rose" size="md">
            <Button variant="destructive">Red glow</Button>
          </GlowPulse>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Magnetic">
        <Callout variant="tip">Move your cursor near the button to see the magnetic pull effect.</Callout>
        <ExampleBlock code={`<Magnetic strength={0.3}>
  <Button variant="outline">Magnetic</Button>
</Magnetic>`}>
          <Magnetic strength={0.3}>
            <Button variant="outline">Magnetic</Button>
          </Magnetic>
          <Magnetic strength={0.5}>
            <Button variant="secondary">Stronger pull</Button>
          </Magnetic>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="GlowPulse Props" props={[
        { name: 'color', type: "'crisp' | 'emerald' | 'rose' | 'amber' | 'sky' | 'violet'", default: "'crisp'", description: 'Glow color.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Glow spread.' },
        { name: 'speed', type: 'number', default: '2', description: 'Pulse cycle duration in seconds.' },
      ]} />
      <PropsTable title="Magnetic Props" props={[
        { name: 'strength', type: 'number', default: '0.3', description: 'How strongly the element moves toward the cursor (0–1).' },
      ]} />
    </DocPage>
  );
}

// ── Confetti ──────────────────────────────────────────────────────────────────

export function ConfettiPage() {
  const { fire } = useConfetti();
  return (
    <DocPage title="Confetti" description="Canvas-based confetti burst with configurable particle count, spread, colors, and gravity." importNames="useConfetti">
      <DocSection title="Basic usage">
        <Callout variant="tip">No third-party canvas libraries — pure TypeScript particle physics.</Callout>
        <ExampleBlock code={`const { fire } = useConfetti();

<Button onClick={() => fire({ count: 120, spread: 80 })}>
  Launch confetti 🎉
</Button>`}>
          <Button onClick={() => fire({ count: 120, spread: 80 })}>Launch confetti 🎉</Button>
          <Button variant="outline" onClick={() => fire({ count: 60, colors: ['#f59e0b', '#ef4444', '#8b5cf6'] })}>
            Custom colors
          </Button>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="fire() Options" props={[
        { name: 'count', type: 'number', default: '80', description: 'Number of confetti particles.' },
        { name: 'spread', type: 'number', default: '60', description: 'Horizontal spread angle in degrees.' },
        { name: 'startVelocity', type: 'number', default: '30', description: 'Initial upward velocity.' },
        { name: 'gravity', type: 'number', default: '1', description: 'Downward acceleration per frame.' },
        { name: 'colors', type: 'string[]', description: 'Array of hex/CSS colors. Defaults to a rainbow palette.' },
        { name: 'origin', type: '{ x: number; y: number }', description: 'Launch origin as fraction of viewport (0–1).' },
      ]} />
    </DocPage>
  );
}
