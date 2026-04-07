import { useState } from 'react';
import {
  // Deepened existing
  Input, Select,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  ProfileCard, FeatureCard, PricingCard,
  Modal, ModalBody, ModalFooter,
  ConfirmDialog, AlertDialog, WizardModal,
  // New components
  TagInput,
  AnimatedList, ActivityFeed,
  AnimatedNumber, StatNumber,
  PresenceAvatars, RealtimeIndicator,
  StreamingText, StreamingMessage, StreamingCode,
  NotificationBell,
  Button,
  PhoneInput,
  RichTextEditor,
  CodeEditor,
  JsonViewer,
  VirtualList,
  FloatingActionButton,
  MentionInput,
} from '@crispui/react';
import type { NotificationItem, PresenceUser, FabAction } from '@crispui/react';
import { DocPage, DocSection } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';

// ── Input — Full Depth ────────────────────────────────────────────────────────

export function InputDepthPage() {
  return (
    <DocPage title="Input — All Features" description="Full-featured dark input with variants, states, password toggle, copy button, character count, search mode, and more." importNames="Input">
      <DocSection title="Variants">
        <ExampleBlock code={`<Input variant="outline" placeholder="Outline" />\n<Input variant="filled" placeholder="Filled" />\n<Input variant="flushed" placeholder="Flushed" />\n<Input variant="glass" placeholder="Glass" />`} previewClassName="flex-col gap-3 bg-gray-900 p-4 rounded-xl">
          <Input variant="outline" placeholder="Outline (default)" />
          <Input variant="filled" placeholder="Filled" />
          <Input variant="flushed" placeholder="Flushed" />
          <div className="bg-gradient-to-r from-crisp-900/40 to-violet-900/40 p-4 rounded-xl">
            <Input variant="glass" placeholder="Glass (works on backgrounds)" />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="States">
        <ExampleBlock code={`<Input error="This field is required" />\n<Input success="Email is available" />\n<Input warning="Password is weak" />`} previewClassName="flex-col gap-3">
          <Input placeholder="Default" />
          <Input error="This field is required" defaultValue="bad-value" />
          <Input success="Email is available!" defaultValue="hey@crisp.ui" />
          <Input warning="Password is weak" defaultValue="pass123" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Special modes">
        <ExampleBlock code={`<Input search clearable />\n<Input password />\n<Input copyable />\n<Input loading />`} previewClassName="flex-col gap-3">
          <Input search clearable placeholder="Search anything…" />
          <Input password defaultValue="mysecretpass" label="Password" />
          <Input copyable defaultValue="npm install @crispui/react" label="Install command" />
          <Input loading placeholder="Verifying…" label="Username" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Addons & affixes">
        <ExampleBlock code={`<Input leftText="https://" rightText=".com" />\n<Input leftAddon={<GlobeIcon />} />`} previewClassName="flex-col gap-3">
          <Input leftText="https://" rightText=".com" placeholder="yoursite" label="Website" />
          <Input
            leftAddon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
            placeholder="you@example.com" label="Email"
          />
          <Input leftText="$" rightText="USD" placeholder="0.00" label="Amount" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Character count">
        <ExampleBlock code={`<Input characterCount={100} />`} previewClassName="flex-col gap-3">
          <Input characterCount={60} placeholder="Write a short bio…" label="Bio" hint="Keep it under 60 characters" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<Input inputSize="sm" />\n<Input inputSize="md" />\n<Input inputSize="lg" />`} previewClassName="flex-col gap-3">
          <Input inputSize="sm" placeholder="Small" />
          <Input inputSize="md" placeholder="Medium (default)" />
          <Input inputSize="lg" placeholder="Large" />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Select — Full Depth ───────────────────────────────────────────────────────

const COUNTRIES = [
  { value: 'us', label: 'United States', description: 'North America', badge: 'Americas' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'ca', label: 'Canada', description: 'North America', badge: 'Americas' },
  { value: 'au', label: 'Australia', description: 'Oceania' },
  { value: 'de', label: 'Germany', description: 'Europe' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'in', label: 'India', description: 'Asia' },
  { value: 'br', label: 'Brazil', description: 'South America' },
];

const ROLES = [
  { value: 'admin', label: 'Admin', group: 'Staff', description: 'Full access' },
  { value: 'editor', label: 'Editor', group: 'Staff', description: 'Can edit content' },
  { value: 'viewer', label: 'Viewer', group: 'Members', description: 'Read-only access' },
  { value: 'guest', label: 'Guest', group: 'Members', description: 'Limited access', disabled: true },
];

export function SelectDepthPage() {
  const [multi, setMulti] = useState<string[]>([]);
  return (
    <DocPage title="Select — All Features" description="Fully custom dark select with multi-select, search, creatable, grouped options, avatars, badges, and keyboard navigation." importNames="Select">
      <DocSection title="Basic + search + clear">
        <ExampleBlock code={`<Select options={countries} searchable clearable placeholder="Select country" />`} previewClassName="flex-col gap-3 pb-52">
          <Select options={COUNTRIES} searchable clearable placeholder="Select country…" label="Country" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Multi-select">
        <ExampleBlock code={`<Select options={options} multiple clearable searchable />`} previewClassName="flex-col gap-3 pb-52">
          <Select
            options={COUNTRIES}
            multiple clearable searchable
            value={multi}
            onChange={v => setMulti(v as string[])}
            label="Countries (multi)"
            placeholder="Select countries…"
            hint={`${multi.length} selected`}
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Grouped options">
        <ExampleBlock code={`<Select options={groupedRoles} searchable />`} previewClassName="flex-col gap-3 pb-52">
          <Select options={ROLES} searchable label="Role" placeholder="Select role…" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="With descriptions + badges">
        <ExampleBlock code={`<Select options={optionsWithMeta} />`} previewClassName="flex-col gap-3 pb-52">
          <Select options={COUNTRIES} label="Country with metadata" placeholder="Choose…" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Creatable">
        <ExampleBlock code={`<Select options={options} creatable searchable />`} previewClassName="flex-col gap-3 pb-52">
          <Select
            options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'svelte', label: 'Svelte' }]}
            creatable searchable multiple clearable
            label="Tech stack"
            placeholder="Select or create…"
            hint="Type to create a new option"
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Max selected">
        <ExampleBlock code={`<Select multiple maxSelected={3} />`} previewClassName="flex-col gap-3 pb-52">
          <Select options={COUNTRIES} multiple maxSelected={3} label="Select up to 3 countries" placeholder="Max 3…" hint="You can select up to 3 options" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="States">
        <ExampleBlock code={`<Select error="Required" />\n<Select disabled />`} previewClassName="flex-col gap-3">
          <Select options={COUNTRIES} error="Please select a country" label="With error" />
          <Select options={COUNTRIES} disabled label="Disabled" placeholder="Disabled" />
          <Select options={COUNTRIES} loading label="Loading options" placeholder="Loading…" />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Card — All Variants ────────────────────────────────────────────────────────

export function CardDepthPage() {
  return (
    <DocPage title="Card — All Variants" description="Dark-first card with 11 visual variants plus ProfileCard, FeatureCard, and PricingCard presets." importNames="Card, ProfileCard, FeatureCard, PricingCard">
      <DocSection title="Dark variants">
        <ExampleBlock code={`<Card variant="dark" />\n<Card variant="dark-bordered" />\n<Card variant="dark-elevated" />`} previewClassName="flex-row gap-4 flex-wrap">
          {(['dark', 'dark-bordered', 'dark-elevated'] as const).map(v => (
            <Card key={v} variant={v} padding="md" className="flex-1 min-w-[160px]">
              <CardTitle>{v}</CardTitle>
              <CardDescription>Dark variant</CardDescription>
            </Card>
          ))}
        </ExampleBlock>
      </DocSection>

      <DocSection title="Premium variants">
        <ExampleBlock code={`<Card variant="glass" />\n<Card variant="gradient" />\n<Card variant="glow" />\n<Card variant="holographic" />`} previewClassName="flex-row gap-4 flex-wrap bg-gray-900/50 p-4 rounded-xl">
          <div className="relative flex-1 min-w-[160px]">
            <Card variant="glass" padding="md">
              <CardTitle>Glass</CardTitle>
              <CardDescription>Frosted glass</CardDescription>
            </Card>
          </div>
          <Card variant="gradient" padding="md" className="flex-1 min-w-[160px]">
            <CardTitle>Gradient</CardTitle>
            <CardDescription>Crisp gradient border</CardDescription>
          </Card>
          <Card variant="glow" padding="md" className="flex-1 min-w-[160px]">
            <CardTitle>Glow</CardTitle>
            <CardDescription>Radial top glow</CardDescription>
          </Card>
          <Card variant="holographic" padding="md" className="flex-1 min-w-[160px]">
            <CardTitle>Holographic</CardTitle>
            <CardDescription>Iridescent shimmer</CardDescription>
          </Card>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Hoverable + clickable">
        <ExampleBlock code={`<Card hoverable />\n<Card clickable />`} previewClassName="flex-row gap-4 flex-wrap">
          <Card variant="dark" hoverable padding="md" className="flex-1 min-w-[160px]">
            <CardTitle>Hoverable</CardTitle>
            <CardDescription>Lifts on hover</CardDescription>
          </Card>
          <Card variant="glow" clickable padding="md" className="flex-1 min-w-[160px]">
            <CardTitle>Clickable</CardTitle>
            <CardDescription>Scales on press</CardDescription>
          </Card>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Card anatomy">
        <ExampleBlock code={`<Card variant="dark">\n  <CardHeader><CardTitle>Title</CardTitle></CardHeader>\n  <CardContent>Body</CardContent>\n  <CardFooter>Footer</CardFooter>\n</Card>`}>
          <Card variant="dark" className="max-w-sm">
            <CardHeader>
              <CardTitle>Card with sections</CardTitle>
              <CardDescription>Header, content, and footer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">This is the card body content area. Add anything here.</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="dark-ghost" size="sm">Cancel</Button>
              <Button variant="gradient" size="sm">Save changes</Button>
            </CardFooter>
          </Card>
        </ExampleBlock>
      </DocSection>

      <DocSection title="ProfileCard">
        <ExampleBlock code={`<ProfileCard name="Alice Chen" role="Staff Engineer" bio="..." stats={[...]} />`} previewClassName="flex-row gap-4 flex-wrap">
          <ProfileCard
            name="Alice Chen"
            role="Staff Engineer at Acme"
            bio="Building design systems and developer tools. Open source contributor."
            stats={[{ value: '47', label: 'Repos' }, { value: '2.4k', label: 'Stars' }, { value: '128', label: 'PRs' }]}
            actions={<><Button variant="soft" size="sm">Follow</Button><Button variant="gradient" size="sm">Message</Button></>}
            className="w-64"
          />
          <ProfileCard
            name="Bob Martinez"
            role="Design Engineer"
            bio="Crafting beautiful UIs and motion design."
            stats={[{ value: '12', label: 'Projects' }, { value: '890', label: 'Likes' }]}
            className="w-64"
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="FeatureCard">
        <ExampleBlock code={`<FeatureCard icon={<Icon />} title="Motion-first" description="..." badge="Built in" />`} previewClassName="flex-row gap-4 flex-wrap">
          {[
            { title: 'Motion-first', desc: 'Framer Motion baked in. Every component animates.', color: '#6366f1', badge: 'Core' },
            { title: '993 Icons', desc: 'iconsax library with 6 variants per icon.', color: '#8b5cf6', badge: 'Included' },
            { title: 'Background FX', desc: 'Particles, aurora, beams — one component.', color: '#06b6d4', badge: 'Unique' },
          ].map((f, i) => (
            <FeatureCard
              key={i}
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
              title={f.title}
              description={f.desc}
              badge={f.badge}
              color={f.color}
              className="flex-1 min-w-[160px]"
            />
          ))}
        </ExampleBlock>
      </DocSection>

      <DocSection title="PricingCard">
        <ExampleBlock code={`<PricingCard name="Pro" price="$12" highlighted features={[...]} />`} previewClassName="flex-row gap-4 flex-wrap items-start">
          {[
            { name: 'Starter', price: 'Free', highlighted: false, features: [
              { text: '5 projects', included: true }, { text: 'Community support', included: true },
              { text: 'Custom domain', included: false }, { text: 'Analytics', included: false },
            ]},
            { name: 'Pro', price: '$12', highlighted: true, badge: 'Most popular', features: [
              { text: 'Unlimited projects', included: true }, { text: 'Priority support', included: true },
              { text: 'Custom domain', included: true }, { text: 'Analytics', included: true },
            ]},
          ].map((p, i) => (
            <PricingCard
              key={i}
              name={p.name}
              price={p.price}
              description={p.highlighted ? 'Best for growing teams' : 'Perfect for getting started'}
              features={p.features}
              highlighted={p.highlighted}
              badge={p.badge}
              action={<Button variant={p.highlighted ? 'gradient' : 'dark'} className="w-full">Get {p.name}</Button>}
              className="flex-1 min-w-[200px]"
            />
          ))}
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Modal — All Variants ───────────────────────────────────────────────────────

export function ModalDepthPage() {
  const [basic, setBasic] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmDest, setConfirmDest] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'info'|'success'|'warning'|'error'|null>(null);
  const [wizard, setWizard] = useState(false);
  const [size, setSize] = useState<'xs'|'sm'|'md'|'lg'|'xl'|'2xl'>('md');
  const [sizeModal, setSizeModal] = useState(false);

  return (
    <DocPage title="Modal — All Variants" description="Modal with all sizes, ConfirmDialog (with async loading), AlertDialog, and WizardModal (multi-step)." importNames="Modal, ConfirmDialog, AlertDialog, WizardModal">
      <DocSection title="Basic modal">
        <ExampleBlock code={`<Modal open={open} onClose={onClose} title="Edit profile">\n  <ModalBody>Content</ModalBody>\n</Modal>`}>
          <Button variant="gradient" onClick={() => setBasic(true)}>Open Modal</Button>
          <Modal open={basic} onClose={() => setBasic(false)} title="Edit profile" description="Update your public profile information.">
            <ModalBody className="flex flex-col gap-3">
              <Input label="Name" defaultValue="Alice Chen" />
              <Input label="Email" defaultValue="alice@example.com" />
              <Input label="Bio" defaultValue="Staff engineer" />
            </ModalBody>
            <ModalFooter>
              <Button variant="dark-ghost" onClick={() => setBasic(false)}>Cancel</Button>
              <Button variant="gradient" onClick={() => setBasic(false)}>Save changes</Button>
            </ModalFooter>
          </Modal>
        </ExampleBlock>
      </DocSection>

      <DocSection title="All sizes">
        <ExampleBlock code={`<Modal size="xs|sm|md|lg|xl|2xl|full" />`} previewClassName="flex-row flex-wrap gap-2">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(s => (
            <Button key={s} variant="dark" size="sm" onClick={() => { setSize(s); setSizeModal(true); }}>{s.toUpperCase()}</Button>
          ))}
          <Modal open={sizeModal} onClose={() => setSizeModal(false)} size={size} title={`Size: ${size}`}>
            <ModalBody>
              <p className="text-sm text-gray-400">This modal uses <code className="text-crisp-400">size="{size}"</code>.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="gradient" size="sm" onClick={() => setSizeModal(false)}>Close</Button>
            </ModalFooter>
          </Modal>
        </ExampleBlock>
      </DocSection>

      <DocSection title="ConfirmDialog">
        <ExampleBlock code={`<ConfirmDialog\n  title="Are you sure?"\n  variant="destructive"\n  onConfirm={async () => { await save(); }}\n/>`} previewClassName="flex-row gap-3">
          <Button variant="soft" onClick={() => setConfirm(true)}>Default confirm</Button>
          <Button variant="soft-rose" onClick={() => setConfirmDest(true)}>Delete confirm</Button>
          <ConfirmDialog
            open={confirm} onCancel={() => setConfirm(false)}
            onConfirm={async () => { await new Promise(r => setTimeout(r, 1200)); setConfirm(false); }}
            title="Publish changes?"
            description="This will make your changes visible to all users."
            confirmLabel="Yes, publish"
          />
          <ConfirmDialog
            open={confirmDest} onCancel={() => setConfirmDest(false)}
            onConfirm={async () => { await new Promise(r => setTimeout(r, 800)); setConfirmDest(false); }}
            title="Delete account?"
            description="This action is permanent and cannot be undone. All your data will be removed."
            confirmLabel="Delete forever"
            variant="destructive"
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="AlertDialog">
        <ExampleBlock code={`<AlertDialog variant="success" title="Payment received!" />`} previewClassName="flex-row flex-wrap gap-2">
          {(['info', 'success', 'warning', 'error'] as const).map(v => (
            <Button key={v} variant="dark" size="sm" onClick={() => setAlertVariant(v)}>{v}</Button>
          ))}
          {alertVariant && (
            <AlertDialog
              open={!!alertVariant} onClose={() => setAlertVariant(null)}
              variant={alertVariant}
              title={alertVariant === 'success' ? 'Payment received!' : alertVariant === 'error' ? 'Something went wrong' : alertVariant === 'warning' ? 'Action required' : 'Heads up!'}
              description={alertVariant === 'success' ? 'Your subscription has been activated.' : alertVariant === 'error' ? 'Please try again or contact support.' : alertVariant === 'warning' ? 'Your trial expires in 3 days.' : 'This feature is in beta and may change.'}
            />
          )}
        </ExampleBlock>
      </DocSection>

      <DocSection title="WizardModal (multi-step)">
        <ExampleBlock code={`<WizardModal steps={[{ title: 'Account', content: <Form /> }, ...]} />`}>
          <Button variant="gradient" onClick={() => setWizard(true)}>Open wizard</Button>
          <WizardModal
            open={wizard}
            onClose={() => setWizard(false)}
            onComplete={() => { setWizard(false); }}
            steps={[
              { title: 'Create account', description: 'Start with the basics.', content: <div className="flex flex-col gap-3"><Input label="Full name" placeholder="Alice Chen" /><Input label="Email" placeholder="alice@example.com" /></div> },
              { title: 'Set your password', description: 'Choose a strong password.', content: <div className="flex flex-col gap-3"><Input label="Password" password placeholder="Min 8 characters" /><Input label="Confirm password" password placeholder="Repeat password" /></div> },
              { title: 'You\'re all set!', description: 'Your account has been created.', content: <div className="flex flex-col items-center gap-3 py-4"><div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center"><svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><p className="text-sm text-gray-400">Welcome to crispui! Click Finish to get started.</p></div> },
            ]}
            completeLabel="Finish"
          />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── TagInput ──────────────────────────────────────────────────────────────────

export function TagInputPage() {
  const [tags, setTags] = useState(['react', 'typescript']);
  return (
    <DocPage title="TagInput" description="Tag input with autocomplete suggestions, validation, max limit, keyboard shortcuts, and animated add/remove." importNames="TagInput">
      <DocSection title="Basic">
        <ExampleBlock code={`<TagInput value={tags} onChange={setTags} />`}>
          <TagInput value={tags} onChange={setTags} label="Tags" hint="Press Enter or comma to add" />
        </ExampleBlock>
      </DocSection>
      <DocSection title="With suggestions">
        <ExampleBlock code={`<TagInput suggestions={['react', 'vue', ...]} />`} previewClassName="pb-40">
          <TagInput suggestions={['react','vue','svelte','angular','solid','qwik','astro','next','remix','vite']} label="Tech stack" placeholder="Type or pick from suggestions" />
        </ExampleBlock>
      </DocSection>
      <DocSection title="Max tags + validation">
        <ExampleBlock code={`<TagInput max={5} validate={tag => tag.length >= 2 || 'Min 2 chars'} />`}>
          <TagInput max={5} validate={tag => tag.length >= 2 || 'Min 2 characters'} label="Labels (max 5)" hint="Each tag must be at least 2 characters" />
        </ExampleBlock>
      </DocSection>
      <DocSection title="Sizes">
        <ExampleBlock code={`<TagInput size="sm" />\n<TagInput size="md" />\n<TagInput size="lg" />`} previewClassName="flex-col gap-3">
          <TagInput size="sm" defaultValue={['small']} label="Small" />
          <TagInput size="md" defaultValue={['medium']} label="Medium" />
          <TagInput size="lg" defaultValue={['large']} label="Large" />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── AnimatedList ──────────────────────────────────────────────────────────────

const DEMO_ITEMS = [
  { id: '1', text: 'Deploy to production', done: false },
  { id: '2', text: 'Write documentation', done: true },
  { id: '3', text: 'Review pull requests', done: false },
];

export function AnimatedListPage() {
  const [items, setItems] = useState(DEMO_ITEMS);
  const [anim, setAnim] = useState<'slideUp'|'slideLeft'|'fadeScale'|'flip'>('slideUp');
  const [notifications, setNotifications] = useState<{ id: string; user: { name: string }; action: string; target: string; time: string }[]>([
    { id: '1', user: { name: 'Alice' }, action: 'merged PR', target: '#142 Add dark mode', time: '2m ago' },
    { id: '2', user: { name: 'Bob' }, action: 'commented on', target: 'TokenSystem.tsx', time: '5m ago' },
    { id: '3', user: { name: 'Carol' }, action: 'opened issue', target: '#143 Button hover', time: '12m ago' },
  ]);

  const addItem = () => {
    const id = Date.now().toString();
    setItems(prev => [{ id, text: `New task #${id.slice(-3)}`, done: false }, ...prev]);
  };
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <DocPage title="AnimatedList + ActivityFeed" description="List with enter/exit animations in 4 styles. ActivityFeed for realtime event streams." importNames="AnimatedList, ActivityFeed">
      <DocSection title="AnimatedList with add/remove">
        <ExampleBlock code={`<AnimatedList items={items} animation="slideUp" renderItem={item => <Item />} />`} previewClassName="flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="gradient" size="sm" onClick={addItem}>+ Add item</Button>
            {(['slideUp','slideLeft','fadeScale','flip'] as const).map(a => (
              <Button key={a} size="sm" variant={anim === a ? 'soft' : 'dark'} onClick={() => setAnim(a)}>{a}</Button>
            ))}
          </div>
          <AnimatedList
            items={items}
            keyExtractor={i => i.id}
            animation={anim}
            itemClassName="mb-2"
            renderItem={item => (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-800">
                <span className={item.done ? 'text-emerald-400' : 'text-gray-600'}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <span className={`flex-1 text-sm ${item.done ? 'line-through text-gray-600' : 'text-gray-300'}`}>{item.text}</span>
                <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-rose-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="ActivityFeed">
        <ExampleBlock code={`<ActivityFeed items={events} />`} previewClassName="flex-col">
          <div className="flex justify-end mb-2">
            <Button size="sm" variant="dark" onClick={() => setNotifications(prev => [{ id: Date.now().toString(), user: { name: ['Dave','Eve','Frank'][Math.floor(Math.random()*3)] }, action: 'pushed to', target: 'main branch', time: 'just now' }, ...prev])}>
              + Simulate event
            </Button>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 px-4 divide-y divide-gray-800/50">
            <ActivityFeed items={notifications} maxItems={5} />
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── AnimatedNumber ────────────────────────────────────────────────────────────

export function AnimatedNumberPage() {
  const [key, setKey] = useState(0);
  return (
    <DocPage title="AnimatedNumber + StatNumber" description="Count-up animation triggered on viewport enter. StatNumber adds label and trend indicator." importNames="AnimatedNumber, StatNumber">
      <DocSection title="AnimatedNumber">
        <ExampleBlock code={`<AnimatedNumber value={12483} prefix="$" duration={1500} />`} previewClassName="flex-row flex-wrap gap-6 items-end">
          <div className="text-center">
            <AnimatedNumber key={key} value={12483} prefix="$" duration={1200} className="text-4xl font-bold text-white" />
            <p className="text-xs text-gray-500 mt-1">Revenue</p>
          </div>
          <div className="text-center">
            <AnimatedNumber key={key} value={99.7} decimals={1} suffix="%" duration={1000} className="text-4xl font-bold text-emerald-400" />
            <p className="text-xs text-gray-500 mt-1">Uptime</p>
          </div>
          <div className="text-center">
            <AnimatedNumber key={key} value={50234} duration={1500} className="text-4xl font-bold text-violet-400" />
            <p className="text-xs text-gray-500 mt-1">Users</p>
          </div>
          <Button variant="dark" size="sm" onClick={() => setKey(k => k+1)}>Replay</Button>
        </ExampleBlock>
      </DocSection>
      <DocSection title="StatNumber with trends">
        <ExampleBlock code={`<StatNumber value={12483} label="Monthly revenue" trend={+18} trendLabel="vs last month" />`} previewClassName="flex-row flex-wrap gap-8">
          <StatNumber key={key} value={12483} label="Monthly revenue" prefix="$" trend={18} trendLabel="vs last month" />
          <StatNumber key={key} value={99.7} label="Uptime" suffix="%" decimals={1} trend={0.3} trendLabel="vs last week" />
          <StatNumber key={key} value={2341} label="New signups" trend={-5} trendLabel="vs last month" />
          <StatNumber key={key} value={48} label="Open issues" trend={-12} />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── PresenceAvatars + Realtime ────────────────────────────────────────────────

const DEMO_USERS: PresenceUser[] = [
  { id: '1', name: 'Alice Chen', status: 'online', color: '#6366f1' },
  { id: '2', name: 'Bob Martinez', status: 'away', color: '#8b5cf6' },
  { id: '3', name: 'Carol White', status: 'busy', color: '#06b6d4' },
  { id: '4', name: 'David Kim', status: 'online', color: '#10b981' },
  { id: '5', name: 'Eva Rodriguez', status: 'offline', color: '#f59e0b' },
  { id: '6', name: 'Frank Lee', status: 'online', color: '#ef4444' },
];

export function PresenceAvatarsPage() {
  const [users, setUsers] = useState(DEMO_USERS.slice(0, 4));
  const [count, setCount] = useState(12);

  return (
    <DocPage title="PresenceAvatars + RealtimeIndicator" description="Show who's online with animated avatar stacks. RealtimeIndicator shows live user count." importNames="PresenceAvatars, RealtimeIndicator">
      <DocSection title="PresenceAvatars — sizes">
        <ExampleBlock code={`<PresenceAvatars users={users} size="sm" />`} previewClassName="flex-col gap-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <div key={s} className="flex items-center gap-4">
              <span className="text-xs text-gray-500 w-6">{s}</span>
              <PresenceAvatars users={DEMO_USERS} size={s} max={5} />
            </div>
          ))}
        </ExampleBlock>
      </DocSection>

      <DocSection title="Animated add/remove">
        <ExampleBlock code={`<PresenceAvatars users={users} showStatus showTooltip />`} previewClassName="flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Button size="sm" variant="soft-emerald" onClick={() => {
              const next = DEMO_USERS.find(u => !users.find(u2 => u2.id === u.id));
              if (next) setUsers(p => [...p, next]);
            }}>+ User</Button>
            <Button size="sm" variant="soft-rose" onClick={() => setUsers(p => p.slice(0,-1))}>- User</Button>
          </div>
          <PresenceAvatars users={users} size="md" max={6} showStatus showTooltip />
        </ExampleBlock>
      </DocSection>

      <DocSection title="RealtimeIndicator">
        <ExampleBlock code={`<RealtimeIndicator count={12} label="online" color="green" />`} previewClassName="flex-row flex-wrap gap-6">
          <RealtimeIndicator count={count} label="online" color="green" />
          <RealtimeIndicator count={count} label="viewers" color="blue" />
          <RealtimeIndicator label="Live" color="amber" />
          <RealtimeIndicator count={count} label="connected" color="green" size="md" />
          <div className="flex gap-2">
            <Button size="sm" variant="dark" onClick={() => setCount(c => c+1)}>+</Button>
            <Button size="sm" variant="dark" onClick={() => setCount(c => Math.max(0,c-1))}>-</Button>
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── StreamingText ─────────────────────────────────────────────────────────────

const AI_RESPONSE = `I've analyzed your codebase and found 3 opportunities to improve performance:

1. **Memoize expensive calculations** — The UserList component re-renders on every parent update.
2. **Virtualize long lists** — Your DataTable loads all 10,000 rows into the DOM at once.
3. **Lazy-load route components** — All pages are bundled together, adding 340kb to initial load.

Want me to generate the optimized code for any of these?`;

const CODE_SAMPLE = `export function useOptimizedList<T>(items: T[]) {
  return useMemo(() =>
    items.filter(Boolean).sort(byDate),
    [items]
  );
}`;

export function StreamingTextPage() {
  const [key, setKey] = useState(0);
  return (
    <DocPage title="StreamingText + StreamingMessage" description="Type-out animations for AI responses. StreamingMessage is a full chat bubble. StreamingCode for code blocks." importNames="StreamingText, StreamingMessage, StreamingCode">
      <DocSection title="StreamingText — inline">
        <ExampleBlock code={`<StreamingText text="Hello world" speed={20} cursor />`}>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-gray-200 text-sm leading-relaxed">
              <StreamingText key={key} text="Building beautiful UIs shouldn't require installing 10 different libraries. crispui gives you everything — components, icons, animations, and background effects — in a single package." speed={15} cursor />
            </p>
          </div>
          <Button size="sm" variant="dark" className="mt-2" onClick={() => setKey(k => k+1)}>Replay</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="StreamingMessage — AI chat">
        <ExampleBlock code={`<StreamingMessage role="assistant" text={response} speed={12} />`} previewClassName="flex-col gap-3">
          <StreamingMessage key={key} role="user" text="Can you analyze my codebase for performance issues?" speed={30} />
          <StreamingMessage key={key} role="assistant" name="CrispAI" text={AI_RESPONSE} speed={10} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="StreamingCode">
        <ExampleBlock code={`<StreamingCode code={snippet} language="TypeScript" speed={8} />`}>
          <StreamingCode key={key} code={CODE_SAMPLE} language="TypeScript" speed={8} />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Notification ──────────────────────────────────────────────────────────────

export function NotificationPage() {
  const [notifs, setNotifs] = useState<NotificationItem[]>([
    { id: '1', title: 'New comment on your PR', description: 'Alice left a review on #142', time: '2m ago', read: false, type: 'info' },
    { id: '2', title: 'Deployment succeeded', description: 'v1.2.0 is live on production', time: '15m ago', read: false, type: 'success' },
    { id: '3', title: 'Storage 90% full', description: 'Upgrade your plan to avoid interruptions', time: '1h ago', read: false, type: 'warning' },
    { id: '4', title: 'Build failed', description: 'Type error in Button.tsx line 42', time: '2h ago', read: true, type: 'error' },
    { id: '5', title: 'Alice mentioned you', description: 'in #general: "check out @you\'s PR"', time: '3h ago', read: true, type: 'info' },
  ]);

  return (
    <DocPage title="NotificationBell" description="Bell icon with unread count badge, dropdown panel, mark as read, and clear actions." importNames="NotificationBell">
      <DocSection title="Notification bell">
        <ExampleBlock code={`<NotificationBell notifications={notifs} onMarkRead={id => ...} onClear={id => ...} />`} previewClassName="pb-80">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900 border border-gray-800">
            <p className="text-sm text-gray-400">Click the bell →</p>
            <NotificationBell
              notifications={notifs}
              onMarkRead={id => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
              onMarkAllRead={() => setNotifs(prev => prev.map(n => ({ ...n, read: true })))}
              onClear={id => setNotifs(prev => prev.filter(n => n.id !== id))}
              onClearAll={() => setNotifs([])}
            />
            <div className="flex gap-2 ml-auto">
              <Button size="sm" variant="dark" onClick={() => setNotifs(prev => [...prev, {
                id: Date.now().toString(),
                title: 'New notification',
                description: 'Something just happened',
                time: 'just now',
                read: false,
                type: 'info' as const,
              }])}>+ Add</Button>
            </div>
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── PhoneInput ────────────────────────────────────────────────────────────────

export function PhoneInputPage() {
  return (
    <DocPage title="PhoneInput" description="Phone number input with 50+ country flag selector, dial code, searchable dropdown, and full keyboard support." importNames="PhoneInput">
      <DocSection title="Basic">
        <ExampleBlock code={`<PhoneInput label="Phone number" defaultCountry="US" />`} previewClassName="flex-col gap-3 pb-56">
          <PhoneInput label="Phone number" defaultCountry="US" hint="Select your country and enter your number" />
        </ExampleBlock>
      </DocSection>
      <DocSection title="Sizes">
        <ExampleBlock code={`<PhoneInput size="sm" />\n<PhoneInput size="md" />\n<PhoneInput size="lg" />`} previewClassName="flex-col gap-3 pb-52">
          <PhoneInput size="sm" defaultCountry="GB" label="Small" />
          <PhoneInput size="md" defaultCountry="IN" label="Medium" />
          <PhoneInput size="lg" defaultCountry="JP" label="Large" />
        </ExampleBlock>
      </DocSection>
      <DocSection title="States">
        <ExampleBlock code={`<PhoneInput error="Invalid phone number" />\n<PhoneInput disabled />`} previewClassName="flex-col gap-3">
          <PhoneInput label="With error" error="Please enter a valid phone number" defaultCountry="US" />
          <PhoneInput label="Disabled" disabled defaultCountry="DE" />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── RichTextEditor ────────────────────────────────────────────────────────────

export function RichTextEditorPage() {
  const [html, setHtml] = useState('<p>Start <strong>writing</strong> here…</p>');
  return (
    <DocPage title="RichTextEditor" description="WYSIWYG editor with full toolbar: headings, lists, blockquote, code, links, alignment, undo/redo, and clear format. Zero dependencies." importNames="RichTextEditor">
      <DocSection title="Full toolbar">
        <ExampleBlock code={`<RichTextEditor value={html} onChange={setHtml} label="Content" />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <RichTextEditor value={html} onChange={setHtml} label="Content" hint="Supports bold, italic, headings, lists, links and more" />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Minimal toolbar">
        <ExampleBlock code={`<RichTextEditor toolbar={['bold', 'italic', 'underline', 'separator', 'link']} />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <RichTextEditor toolbar={['bold', 'italic', 'underline', 'strikethrough', 'separator', 'link', 'unlink', 'separator', 'undo', 'redo']} label="Comment" placeholder="Write a comment…" minHeight={100} />
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── CodeEditor ────────────────────────────────────────────────────────────────

const DEMO_CODE = `import { useState } from 'react';
import { Button } from '@crispui/react';

interface Props {
  title: string;
  count?: number;
}

export function Counter({ title, count = 0 }: Props) {
  const [value, setValue] = useState(count);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-400">Count: {value}</p>
      <Button onClick={() => setValue(v => v + 1)}>
        Increment
      </Button>
    </div>
  );
}`;

export function CodeEditorPage() {
  const [code, setCode] = useState(DEMO_CODE);
  return (
    <DocPage title="CodeEditor" description="Syntax-highlighted code editor with line numbers, tab handling, auto-indent, and zero external dependencies. Supports tsx, ts, js, css, html, json, bash." importNames="CodeEditor">
      <DocSection title="TypeScript / TSX">
        <ExampleBlock code={`<CodeEditor language="tsx" value={code} onChange={setCode} />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <CodeEditor language="tsx" value={code} onChange={setCode} label="Component" />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="JSON">
        <ExampleBlock code={`<CodeEditor language="json" />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <CodeEditor language="json" value={`{\n  "name": "@crispui/react",\n  "version": "0.1.0",\n  "dependencies": {\n    "framer-motion": "^12.0.0",\n    "tailwindcss": "^4.0.0"\n  }\n}`} minLines={8} readOnly label="package.json" />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="CSS">
        <ExampleBlock code={`<CodeEditor language="css" />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <CodeEditor language="css" value={`.button {\n  background: oklch(0.6 0.2 250);\n  color: white;\n  border-radius: 0.75rem;\n  padding: 0.5rem 1rem;\n  font-weight: 600;\n  transition: all 0.15s ease;\n}\n\n.button:hover {\n  background: oklch(0.65 0.2 250);\n  transform: translateY(-1px);\n}`} minLines={10} label="styles.css" />
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── JsonViewer ────────────────────────────────────────────────────────────────

const DEMO_JSON = {
  user: {
    id: 'usr_01HX',
    name: 'Alice Chen',
    email: 'alice@example.com',
    role: 'staff_engineer',
    verified: true,
    score: 9.8,
    tags: ['react', 'typescript', 'design-systems'],
    address: {
      city: 'San Francisco',
      country: 'US',
      zip: '94105',
    },
    preferences: {
      theme: 'dark',
      notifications: { email: true, push: false, sms: null },
    },
  },
  meta: { version: 2, createdAt: '2024-01-15T10:30:00Z' },
};

export function JsonViewerPage() {
  return (
    <DocPage title="JsonViewer" description="Interactive collapsible JSON tree with syntax colors, copy to clipboard, type hints, and configurable expand depth." importNames="JsonViewer">
      <DocSection title="Nested object">
        <ExampleBlock code={`<JsonViewer data={user} expandDepth={2} />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <JsonViewer data={DEMO_JSON} expandDepth={2} rootName="response" />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Array">
        <ExampleBlock code={`<JsonViewer data={items} expandDepth={1} />`} previewClassName="flex-col w-full">
          <div className="w-full">
            <JsonViewer
              data={[
                { id: 1, name: 'Button', variants: ['solid', 'outline', 'ghost'], count: 12 },
                { id: 2, name: 'Input', variants: ['outline', 'filled', 'flushed', 'glass'], count: 8 },
                { id: 3, name: 'Card', variants: ['default', 'glass', 'gradient', 'glow'], count: 11 },
              ]}
              expandDepth={1}
              rootName="components"
            />
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── VirtualList ───────────────────────────────────────────────────────────────

export function VirtualListPage() {
  const ITEMS = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item #${i + 1}`,
    email: `user${i}@example.com`,
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'inactive',
  }));

  return (
    <DocPage title="VirtualList" description="Virtualized list that renders only visible rows — handles 10,000+ items with no performance hit. Fixed row height, overscan, and end-reached callback." importNames="VirtualList">
      <DocSection title="10,000 items — no lag">
        <ExampleBlock code={`<VirtualList\n  items={tenThousandItems}\n  itemHeight={52}\n  height={360}\n  renderItem={(item, i) => <Row item={item} />}\n/>`} previewClassName="flex-col w-full">
          <div className="w-full">
            <VirtualList
              items={ITEMS}
              itemHeight={52}
              height={360}
              className="rounded-xl border border-gray-800 bg-gray-950"
              itemClassName="border-b border-gray-800/60 last:border-0 px-4 w-full"
              keyExtractor={item => (item as typeof ITEMS[0]).id}
              renderItem={(item) => {
                const i = item as typeof ITEMS[0];
                const color = i.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : i.status === 'pending' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-700 text-gray-500';
                return (
                  <div className="flex items-center gap-3 w-full py-2">
                    <div className="w-7 h-7 rounded-full bg-crisp-500/15 flex items-center justify-center text-xs font-semibold text-crisp-400 shrink-0">
                      {String(i.id + 1).slice(-2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200 font-medium truncate">{i.name}</p>
                      <p className="text-xs text-gray-600 truncate">{i.email}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${color}`}>{i.status}</span>
                  </div>
                );
              }}
            />
            <p className="text-xs text-gray-600 mt-2 text-center">Scroll to see 10,000 items rendered virtually</p>
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── FloatingActionButton ──────────────────────────────────────────────────────

export function FloatingActionButtonPage() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const FAB_ACTIONS: FabAction[] = [
    {
      id: 'edit', label: 'Edit',
      color: 'bg-violet-600 hover:bg-violet-500',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
      onClick: () => setLastAction('Edit clicked'),
    },
    {
      id: 'share', label: 'Share',
      color: 'bg-sky-600 hover:bg-sky-500',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>,
      onClick: () => setLastAction('Share clicked'),
    },
    {
      id: 'delete', label: 'Delete',
      color: 'bg-rose-600 hover:bg-rose-500',
      icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
      onClick: () => setLastAction('Delete clicked'),
    },
  ];

  return (
    <DocPage title="FloatingActionButton" description="FAB with animated speed-dial menu, backdrop, icon transition, and configurable position/color. Can also be used as a standalone button." importNames="FloatingActionButton">
      <DocSection title="Speed-dial FAB">
        <ExampleBlock code={`<FloatingActionButton actions={actions} position="bottom-right" />`} previewClassName="relative h-64 bg-gray-900/30 rounded-xl">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-sm text-gray-600">{lastAction ?? 'Click the FAB in the corner'}</p>
          </div>
          <div className="absolute inset-0">
            <FloatingActionButton actions={FAB_ACTIONS} position="bottom-right" label="" className="absolute" />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Standalone">
        <ExampleBlock code={`<FloatingActionButton onClick={handleClick} color="bg-emerald-600" />`} previewClassName="relative h-32">
          <div className="relative h-full w-full">
            <FloatingActionButton
              onClick={() => setLastAction('Standalone FAB clicked')}
              color="bg-emerald-600"
              position="bottom-right"
              className="absolute"
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>}
            />
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── MentionInput ──────────────────────────────────────────────────────────────

const MENTION_USERS = [
  { id: '1', name: 'Alice Chen',    username: 'alice',   role: 'Staff Engineer' },
  { id: '2', name: 'Bob Martinez',  username: 'bob',     role: 'Designer' },
  { id: '3', name: 'Carol White',   username: 'carol',   role: 'Product Manager' },
  { id: '4', name: 'David Kim',     username: 'dkim',    role: 'Frontend Engineer' },
  { id: '5', name: 'Emma Johnson',  username: 'emmaj',   role: 'Backend Engineer' },
  { id: '6', name: 'Frank Liu',     username: 'fliu',    role: 'DevOps' },
  { id: '7', name: 'Grace Park',    username: 'gracep',  role: 'QA Engineer' },
  { id: '8', name: 'Henry Brown',   username: 'hbrown',  role: 'Data Scientist' },
];

export function MentionInputPage() {
  const [value, setValue] = useState('');
  return (
    <DocPage title="MentionInput" description="Textarea with @mention autocomplete — fuzzy search by name or username, keyboard navigation, animated dropdown, and character count." importNames="MentionInput">
      <DocSection title="Basic">
        <ExampleBlock code={`<MentionInput users={users} placeholder="Type @ to mention…" />`} previewClassName="flex-col w-full pb-48">
          <div className="w-full">
            <MentionInput
              users={MENTION_USERS}
              value={value}
              onChange={setValue}
              label="Comment"
              hint="Type @ to mention a teammate"
              placeholder="Write a comment… use @ to mention someone"
            />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="With character limit">
        <ExampleBlock code={`<MentionInput users={users} maxLength={280} />`} previewClassName="flex-col w-full pb-48">
          <div className="w-full">
            <MentionInput
              users={MENTION_USERS}
              maxLength={280}
              rows={3}
              label="Status update"
              placeholder="What's on your mind? @ to mention…"
            />
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}
