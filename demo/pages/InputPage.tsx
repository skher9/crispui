import { useState } from 'react';
import { Input, Textarea, Select, OTPInput, Slider } from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

// ── Input Page ────────────────────────────────────────────────────────────

export function InputPage() {
  const [val, setVal] = useState('');

  return (
    <DocPage
      title="Input"
      description="A styled text input with support for labels, hint text, error states, addons, and three variants. Built with forwardRef — fully composable."
      importNames="Input"
    >
      <DocSection title="Variants" description="outline (default), filled, and flushed.">
        <ExampleBlock
          code={`<Input label="Outline" placeholder="Default variant" />
<Input label="Filled" variant="filled" placeholder="Filled background" />
<Input label="Flushed" variant="flushed" placeholder="Borderless bottom only" />`}
          previewClassName="flex-col items-stretch gap-4"
        >
          <div className="w-full max-w-xs space-y-3">
            <Input label="Outline" placeholder="Default variant" />
            <Input label="Filled" variant="filled" placeholder="Filled background" />
            <Input label="Flushed" variant="flushed" placeholder="Borderless bottom only" />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<Input inputSize="sm" placeholder="Small" />
<Input inputSize="md" placeholder="Medium" />
<Input inputSize="lg" placeholder="Large" />`} previewClassName="flex-col items-stretch gap-3">
          <div className="w-full max-w-xs space-y-3">
            <Input inputSize="sm" placeholder="Small" />
            <Input inputSize="md" placeholder="Medium" />
            <Input inputSize="lg" placeholder="Large" />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Addons" description="Render any ReactNode to the left or right of the input.">
        <ExampleBlock code={`<Input label="Email" leftAddon={<MailIcon />} placeholder="you@example.com" />
<Input label="Username" leftAddon={<span>@</span>} variant="filled" />
<Input label="Search" rightAddon={<SearchIcon />} variant="flushed" />`} previewClassName="flex-col items-stretch gap-3">
          <div className="w-full max-w-xs space-y-3">
            <Input label="Email" leftAddon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} placeholder="you@example.com" />
            <Input label="Username" leftAddon={<span className="text-gray-400 text-sm">@</span>} variant="filled" placeholder="handle" />
            <Input label="Search" rightAddon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} variant="flushed" placeholder="Search…" />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="States — error & hint">
        <Callout variant="warning">
          <code className="font-mono text-xs">error</code> takes precedence over <code className="font-mono text-xs">hint</code>. If both are set, only the error is shown.
        </Callout>
        <ExampleBlock code={`<Input label="Email" value={val} onChange={e => setVal(e.target.value)}
  error={val && !val.includes('@') ? 'Enter a valid email address' : undefined}
  hint="We'll never share your email." />

<Input label="Password" type="password" error="Must be at least 8 characters" />
<Input label="Confirmed" disabled placeholder="Can't touch this" />`} previewClassName="flex-col items-stretch gap-3">
          <div className="w-full max-w-xs space-y-3">
            <Input
              label="Email"
              value={val}
              onChange={e => setVal(e.target.value)}
              placeholder="you@example.com"
              error={val && !val.includes('@') ? 'Enter a valid email address' : undefined}
              hint="We'll never share your email."
            />
            <Input label="Password" type="password" error="Must be at least 8 characters" />
            <Input label="Disabled" disabled placeholder="Can't touch this" />
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'label', type: 'string', description: 'Label rendered above the input with a linked htmlFor.' },
        { name: 'variant', type: "'outline' | 'filled' | 'flushed'", default: "'outline'", description: 'Visual style.' },
        { name: 'inputSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height and font size.' },
        { name: 'error', type: 'string', description: 'Error message. Overrides hint and sets aria-invalid.' },
        { name: 'hint', type: 'string', description: 'Helper text shown below the input when there is no error.' },
        { name: 'leftAddon', type: 'ReactNode', description: 'Element absolutely positioned inside the left edge.' },
        { name: 'rightAddon', type: 'ReactNode', description: 'Element absolutely positioned inside the right edge.' },
        { name: 'wrapperClassName', type: 'string', description: 'Classes on the outer flex wrapper.' },
      ]} />
    </DocPage>
  );
}

// ── Textarea Page ──────────────────────────────────────────────────────────

export function TextareaPage() {
  const [text, setText] = useState('');
  return (
    <DocPage title="Textarea" description="A resizable multi-line input with optional character count, resize control, and error/hint states." importNames="Textarea">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Textarea label="Message" placeholder="Write something…" rows={4} />`} previewClassName="flex-col items-stretch">
          <div className="w-full max-w-sm">
            <Textarea label="Message" placeholder="Write something…" rows={4} />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Character count">
        <ExampleBlock code={`<Textarea
  label="Bio"
  value={text}
  onChange={e => setText(e.target.value)}
  showCount
  maxLength={200}
  rows={3}
/>`} previewClassName="flex-col items-stretch">
          <div className="w-full max-w-sm">
            <Textarea label="Bio" value={text} onChange={e => setText(e.target.value)} showCount maxLength={200} rows={3} placeholder="Tell us about yourself…" />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Resize variants">
        <ExampleBlock code={`<Textarea resize="none" label="Fixed" rows={3} />
<Textarea resize="vertical" label="Vertical (default)" rows={3} />
<Textarea resize="both" label="Both" rows={3} />`} previewClassName="flex-col items-stretch gap-3">
          <div className="w-full max-w-sm space-y-3">
            <Textarea resize="none" label="Fixed (no resize)" rows={2} />
            <Textarea resize="vertical" label="Vertical resize (default)" rows={2} />
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'label', type: 'string', description: 'Accessible label above the textarea.' },
        { name: 'resize', type: "'none' | 'vertical' | 'both'", default: "'vertical'", description: 'CSS resize handle.' },
        { name: 'showCount', type: 'boolean', default: 'false', description: 'Shows current / maxLength character count. Requires maxLength.' },
        { name: 'maxLength', type: 'number', description: 'Max character count. Counter turns red when reached.' },
        { name: 'error', type: 'string', description: 'Error message. Overrides hint.' },
        { name: 'hint', type: 'string', description: 'Helper text shown when no error.' },
      ]} />
    </DocPage>
  );
}

// ── Select Page ────────────────────────────────────────────────────────────

export function SelectPage() {
  return (
    <DocPage title="Select" description="A styled native select element. Keeps native browser UX (mobile-friendly) while matching the Input visual system." importNames="Select">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Select
  label="Country"
  placeholder="Select a country…"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
  ]}
/>`} previewClassName="flex-col items-stretch pb-40">
          <div className="w-full max-w-xs">
            <Select label="Country" placeholder="Select a country…" options={[
              { value: 'us', label: 'United States' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'au', label: 'Australia' },
            ]} />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="With error & hint">
        <ExampleBlock code={`<Select label="Role" placeholder="Pick a role…" error="This field is required" options={[...]} />
<Select label="Department" options={[...]} hint="Affects your default workspace." />`} previewClassName="flex-col items-stretch gap-3 pb-40">
          <div className="w-full max-w-xs space-y-3">
            <Select label="Role" placeholder="Pick a role…" error="This field is required" options={[{ value: 'eng', label: 'Engineer' }, { value: 'design', label: 'Designer' }]} />
            <Select label="Department" options={[{ value: 'eng', label: 'Engineering' }, { value: 'product', label: 'Product' }]} hint="Affects your default workspace." />
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'options', type: 'SelectOption[]', description: 'Array of { value, label, disabled? } objects.' },
        { name: 'placeholder', type: 'string', description: 'Disabled first option shown as a prompt.' },
        { name: 'label', type: 'string', description: 'Label above the select.' },
        { name: 'error', type: 'string', description: 'Error message. Shows red border.' },
        { name: 'hint', type: 'string', description: 'Helper text shown below when no error.' },
        { name: 'inputSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height and font size.' },
      ]} />
    </DocPage>
  );
}

// ── OTPInput Page ──────────────────────────────────────────────────────────

export function OTPInputPage() {
  const [val, setVal] = useState('');
  return (
    <DocPage title="OTPInput" description="A PIN / verification code input that auto-advances focus, supports paste, mask mode, and a separator for grouped digits." importNames="OTPInput">
      <DocSection title="Basic 6-digit OTP">
        <ExampleBlock code={`const [code, setCode] = useState('');

<OTPInput
  label="Verification code"
  length={6}
  value={code}
  onChange={setCode}
  onComplete={code => console.log('complete:', code)}
  hint="Check your email for the 6-digit code."
/>`} previewClassName="flex-col items-start gap-4">
          <OTPInput label="Verification code" length={6} value={val} onChange={setVal} hint="Check your email for the 6-digit code." />
          {val.length > 0 && <p className="text-xs text-emerald-400">Entered: {val} {val.length === 6 ? '✓ complete' : `(${6 - val.length} more)`}</p>}
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes & mask">
        <ExampleBlock code={`<OTPInput length={4} mask label="PIN (masked)" size="md" />
<OTPInput length={6} size="sm" label="Small" />`} previewClassName="flex-col items-start gap-4">
          <OTPInput length={4} mask label="PIN (masked)" size="md" />
          <OTPInput length={6} size="sm" label="Small" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="With separator">
        <Callout variant="tip">The separator renders a dash at the midpoint of the input group — useful for phone-style codes.</Callout>
        <ExampleBlock code={`<OTPInput length={6} separator label="Split code" />`} previewClassName="flex-col items-start">
          <OTPInput length={6} separator label="Split code" />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'length', type: 'number', default: '6', description: 'Number of digit cells.' },
        { name: 'value', type: 'string', description: 'Controlled value string of digits.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Called with the full string on each digit change.' },
        { name: 'onComplete', type: '(value: string) => void', description: 'Called when all cells are filled.' },
        { name: 'mask', type: 'boolean', default: 'false', description: 'Renders cells as password inputs.' },
        { name: 'separator', type: 'boolean', default: 'false', description: 'Renders a dash in the middle of the group.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Cell size.' },
        { name: 'error', type: 'string', description: 'Error message. Applies red border to cells.' },
      ]} />
    </DocPage>
  );
}

// ── Slider Page ────────────────────────────────────────────────────────────

export function SliderPage() {
  const [vol, setVol] = useState(40);
  return (
    <DocPage title="Slider" description="A range input with an animated fill track, value display, and four color variants. Fully accessible with ARIA attributes." importNames="Slider">
      <DocSection title="Basic usage">
        <ExampleBlock code={`const [vol, setVol] = useState(40);

<Slider
  label="Volume"
  value={vol}
  onChange={e => setVol(Number(e.target.value))}
  formatValue={v => \`\${v}%\`}
/>`} previewClassName="flex-col items-stretch">
          <div className="w-full max-w-xs">
            <Slider label="Volume" value={vol} onChange={e => setVol(Number(e.target.value))} formatValue={v => `${v}%`} />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Variants">
        <ExampleBlock code={`<Slider label="Success" defaultValue={70} variant="success" />
<Slider label="Warning" defaultValue={60} variant="warning" />
<Slider label="Destructive" defaultValue={88} variant="destructive" />`} previewClassName="flex-col items-stretch gap-4">
          <div className="w-full max-w-xs space-y-4">
            <Slider label="Success" defaultValue={70} variant="success" />
            <Slider label="Warning" defaultValue={60} variant="warning" />
            <Slider label="Destructive" defaultValue={88} variant="destructive" />
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'label', type: 'string', description: 'Label shown to the left of the value display.' },
        { name: 'showValue', type: 'boolean', default: 'true', description: 'Whether to display the current value.' },
        { name: 'formatValue', type: '(v: number) => string', description: 'Custom formatter for the displayed value.' },
        { name: 'variant', type: "'default' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Fill track color.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track and thumb height.' },
        { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
        { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        { name: 'step', type: 'number', default: '1', description: 'Step interval.' },
      ]} />
    </DocPage>
  );
}
