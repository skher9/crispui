import { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Drawer, DrawerHeader, DrawerBody, DrawerFooter,
  Tabs, TabList, Tab, TabPanel,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tooltip, Alert, Switch, Input,
  CommandPalette, useCommandPalette,
  ToastProvider, useToast,
} from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

// ── Modal ─────────────────────────────────────────────────────────────────

export function ModalPage() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <DocPage title="Modal" description="An accessible dialog with animated entrance, backdrop blur, ESC-to-close, and compound sub-components for layout." importNames="Modal, ModalHeader, ModalBody, ModalFooter">
      <DocSection title="Basic modal">
        <ExampleBlock code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <h2 className="text-lg font-semibold">Dialog title</h2>
    <p className="text-sm text-gray-500">Supporting description text.</p>
  </ModalHeader>
  <ModalBody>
    <p>Modal body content goes here.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Confirm</Button>
  </ModalFooter>
</Modal>`}>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalHeader>
              <h2 className="text-lg font-semibold text-gray-900">Dialog title</h2>
              <p className="text-sm text-gray-500">Supporting description text.</p>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-gray-600">Modal body content goes here. You can place any React component inside.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </ModalFooter>
          </Modal>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Confirm dialog pattern">
        <ExampleBlock code={`<Modal open={open} onClose={() => setOpen(false)} size="sm">
  <ModalHeader>
    <h2 className="text-lg font-semibold">Delete project?</h2>
  </ModalHeader>
  <ModalBody>
    <Alert variant="warning" title="This cannot be undone">
      All files, settings, and history will be permanently deleted.
    </Alert>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" onClick={() => setOpen(false)}>Yes, delete</Button>
  </ModalFooter>
</Modal>`}>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Delete project</Button>
          <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} size="sm">
            <ModalHeader>
              <h2 className="text-lg font-semibold text-gray-900">Delete project?</h2>
            </ModalHeader>
            <ModalBody>
              <Alert variant="warning" title="This cannot be undone">All files, settings and history will be permanently deleted.</Alert>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(false)}>Yes, delete</Button>
            </ModalFooter>
          </Modal>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <Callout variant="info">Available sizes: <code className="font-mono text-xs">sm</code> (384px), <code className="font-mono text-xs">md</code> (448px), <code className="font-mono text-xs">lg</code> (512px), <code className="font-mono text-xs">xl</code> (672px), <code className="font-mono text-xs">full</code> (95vw).</Callout>
      </DocSection>

      <PropsTable props={[
        { name: 'open', type: 'boolean', required: true, description: 'Controls modal visibility.' },
        { name: 'onClose', type: '() => void', required: true, description: 'Called when backdrop is clicked or ESC is pressed.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Max-width of the modal panel.' },
        { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop calls onClose.' },
        { name: 'showClose', type: 'boolean', default: 'true', description: 'Whether to render the × close button.' },
      ]} />
    </DocPage>
  );
}

// ── Drawer ─────────────────────────────────────────────────────────────────

export function DrawerPage() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<'right' | 'left' | 'bottom'>('right');
  return (
    <DocPage title="Drawer" description="A side panel that slides in from any edge. Uses spring physics for natural feel. Same compound layout sub-components as Modal." importNames="Drawer, DrawerHeader, DrawerBody, DrawerFooter">
      <DocSection title="Sides">
        <ExampleBlock code={`const [open, setOpen] = useState(false);

<Button onClick={() => setSide('right') || setOpen(true)}>Right drawer</Button>
<Button onClick={() => setSide('left') || setOpen(true)}>Left drawer</Button>
<Button onClick={() => setSide('bottom') || setOpen(true)}>Bottom sheet</Button>

<Drawer open={open} onClose={() => setOpen(false)} side={side}>
  <DrawerHeader onClose={() => setOpen(false)}>
    <p className="font-semibold">Settings</p>
  </DrawerHeader>
  <DrawerBody>…</DrawerBody>
  <DrawerFooter>
    <Button onClick={() => setOpen(false)}>Done</Button>
  </DrawerFooter>
</Drawer>`}>
          <div className="flex gap-2 flex-wrap">
            {(['right', 'left', 'bottom'] as const).map(s => (
              <Button key={s} variant="outline" size="sm" onClick={() => { setSide(s); setOpen(true); }}>
                {s.charAt(0).toUpperCase() + s.slice(1)} drawer
              </Button>
            ))}
          </div>
          <Drawer open={open} onClose={() => setOpen(false)} side={side} size="md">
            <DrawerHeader onClose={() => setOpen(false)}>
              <p className="font-semibold text-gray-900">Settings panel</p>
              <p className="text-xs text-gray-400 mt-0.5">Opened from the {side}</p>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-4">
                <Switch label="Notifications" defaultChecked />
                <Switch label="Auto-save" defaultChecked />
                <Input label="Display name" placeholder="Your name" />
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </DrawerFooter>
          </Drawer>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'open', type: 'boolean', required: true, description: 'Controls drawer visibility.' },
        { name: 'onClose', type: '() => void', required: true, description: 'Called when backdrop clicked or ESC pressed.' },
        { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Edge the drawer slides in from.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Width (horizontal) or height (vertical).' },
        { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop calls onClose.' },
      ]} />
    </DocPage>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────

export function TabsPage() {
  return (
    <DocPage title="Tabs" description="Three visual variants with a Framer Motion animated indicator. Fully keyboard navigable and ARIA-compliant." importNames="Tabs, TabList, Tab, TabPanel">
      <DocSection title="Line variant (animated underline)">
        <ExampleBlock code={`<Tabs defaultTab="overview" variant="line">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="analytics" badge={3}>Analytics</Tab>
    <Tab id="reports">Reports</Tab>
  </TabList>
  <TabPanel id="overview"><p>Overview content</p></TabPanel>
  <TabPanel id="analytics"><p>Analytics content</p></TabPanel>
  <TabPanel id="reports"><p>Reports content</p></TabPanel>
</Tabs>`} previewClassName="flex-col items-stretch">
          <Tabs defaultTab="overview" variant="line">
            <TabList>
              <Tab id="overview">Overview</Tab>
              <Tab id="analytics" badge={3}>Analytics</Tab>
              <Tab id="reports">Reports</Tab>
              <Tab id="settings">Settings</Tab>
            </TabList>
            <div className="mt-4 p-4 rounded-xl bg-gray-800/50 border border-white/5">
              <TabPanel id="overview"><p className="text-sm text-gray-400">Overview panel — summary metrics and recent activity.</p></TabPanel>
              <TabPanel id="analytics"><p className="text-sm text-gray-400">Analytics panel — charts and trend data.</p></TabPanel>
              <TabPanel id="reports"><p className="text-sm text-gray-400">Reports panel — downloadable exports.</p></TabPanel>
              <TabPanel id="settings"><p className="text-sm text-gray-400">Settings panel — configuration options.</p></TabPanel>
            </div>
          </Tabs>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Pill variant (spring selection)">
        <ExampleBlock code={`<Tabs defaultTab="all" variant="pill">
  <TabList>
    <Tab id="all">All</Tab>
    <Tab id="active">Active</Tab>
    <Tab id="paused">Paused</Tab>
    <Tab id="archived">Archived</Tab>
  </TabList>
</Tabs>`}>
          <Tabs defaultTab="all" variant="pill">
            <TabList>
              <Tab id="all">All</Tab>
              <Tab id="active">Active</Tab>
              <Tab id="paused">Paused</Tab>
              <Tab id="archived">Archived</Tab>
            </TabList>
          </Tabs>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Enclosed variant">
        <ExampleBlock code={`<Tabs defaultTab="details" variant="enclosed">
  <TabList>
    <Tab id="details">Details</Tab>
    <Tab id="history">History</Tab>
    <Tab id="notes">Notes</Tab>
  </TabList>
</Tabs>`}>
          <Tabs defaultTab="details" variant="enclosed">
            <TabList>
              <Tab id="details">Details</Tab>
              <Tab id="history">History</Tab>
              <Tab id="notes">Notes</Tab>
            </TabList>
          </Tabs>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="Tabs Props" props={[
        { name: 'defaultTab', type: 'string', description: 'Uncontrolled initially active tab id.' },
        { name: 'activeTab', type: 'string', description: 'Controlled active tab id.' },
        { name: 'onTabChange', type: '(id: string) => void', description: 'Called when active tab changes.' },
        { name: 'variant', type: "'line' | 'pill' | 'enclosed'", default: "'line'", description: 'Visual style.' },
      ]} />
      <PropsTable title="Tab Props" props={[
        { name: 'id', type: 'string', required: true, description: 'Unique identifier, linked to TabPanel.' },
        { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered before label.' },
        { name: 'badge', type: 'string | number', description: 'Pill badge shown after label.' },
      ]} />
    </DocPage>
  );
}

// ── Accordion ──────────────────────────────────────────────────────────────

export function AccordionPage() {
  return (
    <DocPage title="Accordion" description="Animated expand/collapse with Framer Motion height transition. Three variants, single or multiple open items." importNames="Accordion, AccordionItem, AccordionTrigger, AccordionContent">
      <DocSection title="Default (card style)">
        <ExampleBlock code={`<Accordion defaultOpen="q1">
  <AccordionItem id="q1">
    <AccordionTrigger>What is crispui?</AccordionTrigger>
    <AccordionContent>
      A React + TypeScript component library with Tailwind CSS v4 and Framer Motion.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem id="q2">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes — all components use ARIA attributes and keyboard navigation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`} previewClassName="flex-col items-stretch">
          <Accordion defaultOpen="q1">
            {[
              { id: 'q1', q: 'What is crispui?', a: 'A React + TypeScript component library built with Tailwind CSS v4 and Framer Motion.' },
              { id: 'q2', q: 'Is it accessible?', a: 'Yes — all components include ARIA attributes, keyboard navigation, and focus management.' },
              { id: 'q3', q: 'How do animations work?', a: 'Height transitions use Framer Motion AnimatePresence, while the chevron uses layout animation.' },
            ].map(item => (
              <AccordionItem key={item.id} id={item.id}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Bordered variant + multiple open">
        <Callout variant="tip">Pass <code className="font-mono text-xs">multiple</code> to allow more than one item open at once.</Callout>
        <ExampleBlock code={`<Accordion variant="bordered" multiple defaultOpen={['b1', 'b2']}>
  <AccordionItem id="b1">…</AccordionItem>
  <AccordionItem id="b2">…</AccordionItem>
</Accordion>`} previewClassName="flex-col items-stretch">
          <Accordion variant="bordered" multiple defaultOpen={['b1']}>
            {['Can I open multiple?', 'Can I set a default?', 'Flush variant?'].map((q, i) => (
              <AccordionItem key={i} id={`b${i + 1}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>Yes — see the relevant prop in the table below.</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="Accordion Props" props={[
        { name: 'variant', type: "'default' | 'bordered' | 'flush'", default: "'default'", description: "default: card-style with shadow. bordered: single border container. flush: bottom border only." },
        { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple items to be open simultaneously.' },
        { name: 'defaultOpen', type: 'string | string[]', description: 'Item id(s) to open on initial render.' },
      ]} />
    </DocPage>
  );
}

// ── Tooltip ────────────────────────────────────────────────────────────────

export function TooltipPage() {
  return (
    <DocPage title="Tooltip" description="Hover tooltip with configurable placement, delay, and rich content. Animated with Framer Motion." importNames="Tooltip">
      <DocSection title="Placements">
        <ExampleBlock code={`<Tooltip content="Top tooltip" placement="top">
  <Button variant="outline" size="sm">Top</Button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button variant="outline" size="sm">Right</Button>
</Tooltip>`}>
          {(['top', 'bottom', 'left', 'right'] as const).map(p => (
            <Tooltip key={p} content={`${p.charAt(0).toUpperCase() + p.slice(1)} tooltip`} placement={p}>
              <Button variant="outline" size="sm">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
            </Tooltip>
          ))}
        </ExampleBlock>
      </DocSection>

      <DocSection title="Rich content">
        <ExampleBlock code={`<Tooltip
  content={
    <span>
      Requires <strong>Pro plan</strong> —
      <a href="#">upgrade now</a>
    </span>
  }
  placement="top"
>
  <Button size="sm" disabled>Pro feature</Button>
</Tooltip>`}>
          <Tooltip content={<span>Requires <strong>Pro plan</strong> to use this feature.</span>} placement="top">
            <Button size="sm" variant="outline">Pro feature</Button>
          </Tooltip>
        </ExampleBlock>
      </DocSection>

      <Callout variant="warning">
        Wrap the child in a DOM element — <code className="font-mono text-xs">Tooltip</code> attaches mouse events via <code className="font-mono text-xs">onMouseEnter/Leave</code> on the wrapper span.
      </Callout>

      <PropsTable props={[
        { name: 'content', type: 'ReactNode', required: true, description: 'Tooltip content — can be any React node.' },
        { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred placement relative to the trigger.' },
        { name: 'delay', type: 'number', default: '120', description: 'Delay in ms before the tooltip appears.' },
      ]} />
    </DocPage>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────

function ToastDemoInner() {
  const { toast } = useToast();
  return (
    <DocPage title="Toast" description="Auto-dismissing notifications with 5 variants, optional action button, configurable position, and animated slide-in." importNames="ToastProvider, useToast">
      <Callout variant="info">
        Wrap your app root with <code className="font-mono text-xs">{'<ToastProvider>'}</code> once. Then call <code className="font-mono text-xs">useToast()</code> from any component.
      </Callout>

      <DocSection title="Usage">
        <ExampleBlock code={`// 1. Wrap your app
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// 2. Call from any component
const { toast } = useToast();

toast({ title: 'Saved!', message: 'Changes saved.', variant: 'success' });
toast({ message: 'Action failed.', variant: 'destructive' });
toast({
  message: 'File deleted.',
  action: { label: 'Undo', onClick: handleUndo },
});`}>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="success" onClick={() => toast({ title: 'Saved!', message: 'Your changes have been saved.', variant: 'success' })}>Success</Button>
            <Button size="sm" variant="destructive" onClick={() => toast({ title: 'Error', message: 'Something went wrong.', variant: 'destructive' })}>Error</Button>
            <Button size="sm" variant="warning" onClick={() => toast({ title: 'Warning', message: 'Trial expires in 3 days.', variant: 'warning' })}>Warning</Button>
            <Button size="sm" variant="secondary" onClick={() => toast({ title: 'Update available', message: 'New version ready.', variant: 'info' })}>Info</Button>
            <Button size="sm" variant="outline" onClick={() => toast({ message: 'File deleted.', action: { label: 'Undo', onClick: () => toast({ message: 'File restored!', variant: 'success' }) } })}>With action</Button>
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="ToastProvider Props" props={[
        { name: 'position', type: "'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'", default: "'top-right'", description: 'Where toasts appear on screen.' },
      ]} />
      <PropsTable title="toast() Options" props={[
        { name: 'message', type: 'string', required: true, description: 'Main message text.' },
        { name: 'title', type: 'string', description: 'Bold title above the message.' },
        { name: 'variant', type: "'default' | 'success' | 'warning' | 'destructive' | 'info'", default: "'default'", description: 'Color and icon.' },
        { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms. Set to 0 to disable.' },
        { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Optional action button rendered below the message.' },
      ]} />
    </DocPage>
  );
}

export function ToastPage() {
  return (
    <ToastProvider>
      <ToastDemoInner />
    </ToastProvider>
  );
}

// ── CommandPalette ─────────────────────────────────────────────────────────

export function CommandPalettePage() {
  const { open, setOpen } = useCommandPalette();

  const items = [
    { id: 'new', label: 'New document', description: 'Create a blank document', icon: '📄', shortcut: ['⌘', 'N'], group: 'Actions', onSelect: () => {} },
    { id: 'open', label: 'Open file', icon: '📂', shortcut: ['⌘', 'O'], group: 'Actions', onSelect: () => {} },
    { id: 'settings', label: 'Settings', icon: '⚙️', shortcut: ['⌘', ','], group: 'Navigate', onSelect: () => {} },
    { id: 'docs', label: 'Documentation', icon: '📚', group: 'Navigate', onSelect: () => {} },
    { id: 'dark', label: 'Toggle dark mode', icon: '🌙', group: 'Appearance', onSelect: () => {} },
    { id: 'logout', label: 'Sign out', icon: '🚪', group: 'Account', onSelect: () => {} },
  ];

  return (
    <DocPage title="Command Palette" description="A ⌘K-triggered search overlay with fuzzy matching, grouped results, keyboard navigation, and shortcut badges." importNames="CommandPalette, useCommandPalette">
      <Callout variant="tip">
        <code className="font-mono text-xs">useCommandPalette()</code> automatically registers the ⌘K / Ctrl+K global shortcut. Press it anywhere on this page.
      </Callout>

      <DocSection title="Usage">
        <ExampleBlock code={`// useCommandPalette auto-registers ⌘K
const { open, setOpen } = useCommandPalette();

const items = [
  { id: 'new',  label: 'New document', icon: '📄',
    shortcut: ['⌘', 'N'], group: 'Actions',
    onSelect: () => router.push('/new') },
  { id: 'docs', label: 'Documentation', icon: '📚',
    group: 'Navigate', onSelect: openDocs },
];

<Button onClick={() => setOpen(true)}>Open palette</Button>

<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={items}
  placeholder="Search commands…"
/>`}>
          <Button onClick={() => setOpen(true)} leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }>Open palette</Button>
          <kbd className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded font-mono border border-gray-700">⌘K</kbd>
          <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'open', type: 'boolean', required: true, description: 'Controls palette visibility.' },
        { name: 'onClose', type: '() => void', required: true, description: 'Called when ESC pressed or backdrop clicked.' },
        { name: 'items', type: 'CommandItem[]', required: true, description: 'Array of command items.' },
        { name: 'placeholder', type: 'string', default: "'Search commands…'", description: 'Input placeholder text.' },
        { name: 'emptyMessage', type: 'string', default: "'No results found.'", description: 'Shown when no items match the query.' },
      ]} />
      <PropsTable title="CommandItem" props={[
        { name: 'id', type: 'string', required: true, description: 'Unique identifier.' },
        { name: 'label', type: 'string', required: true, description: 'Display label.' },
        { name: 'description', type: 'string', description: 'Secondary text.' },
        { name: 'icon', type: 'ReactNode', description: 'Icon or emoji.' },
        { name: 'shortcut', type: 'string[]', description: 'Keyboard shortcut keys shown on the right.' },
        { name: 'group', type: 'string', description: 'Group label for sectioning items.' },
        { name: 'keywords', type: 'string[]', description: 'Extra search terms.' },
        { name: 'onSelect', type: '() => void', required: true, description: 'Called when item is activated.' },
      ]} />
    </DocPage>
  );
}
