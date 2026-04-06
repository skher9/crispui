import { useState } from 'react';
import {
  Badge, Avatar, Card, CardHeader, CardTitle, CardDescription, CardContent,
  Alert, Progress, Separator, Spinner, LoadingOverlay, EmptyState,
} from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

// ── Badge ─────────────────────────────────────────────────────────────────────

export function BadgePage() {
  return (
    <DocPage title="Badge" description="Small status label for counts, states, and categories. Six semantic variants, three sizes." importNames="Badge">
      <DocSection title="Variants">
        <ExampleBlock code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>`}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`} previewClassName="items-end">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </ExampleBlock>
      </DocSection>

      <DocSection title="With dot indicator">
        <ExampleBlock code={`<Badge variant="success" dot>Online</Badge>
<Badge variant="destructive" dot>Offline</Badge>
<Badge variant="warning" dot>Away</Badge>`}>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="destructive" dot>Offline</Badge>
          <Badge variant="warning" dot>Away</Badge>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Color variant.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Badge size.' },
        { name: 'dot', type: 'boolean', default: 'false', description: 'Renders a small colored circle before the text.' },
      ]} />
    </DocPage>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

export function AvatarPage() {
  return (
    <DocPage title="Avatar" description="User avatar with image support, initials fallback, status indicator, and color schemes." importNames="Avatar">
      <DocSection title="Image & fallback">
        <ExampleBlock code={`<Avatar src="https://i.pravatar.cc/80?img=1" alt="Alice" />
<Avatar fallback="BR" color="emerald" />
<Avatar />  {/* anonymous fallback */}`}>
          <Avatar src="https://i.pravatar.cc/80?img=1" alt="Alice" />
          <Avatar fallback="BR" color="emerald" />
          <Avatar fallback="CD" color="rose" />
          <Avatar />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Color schemes">
        <ExampleBlock code={`<Avatar fallback="A" color="crisp" />
<Avatar fallback="B" color="sky" />
<Avatar fallback="C" color="rose" />
<Avatar fallback="D" color="amber" />
<Avatar fallback="E" color="emerald" />`}>
          <Avatar fallback="A" color="crisp" />
          <Avatar fallback="B" color="sky" />
          <Avatar fallback="C" color="rose" />
          <Avatar fallback="D" color="amber" />
          <Avatar fallback="E" color="emerald" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<Avatar size="xs" fallback="XS" />
<Avatar size="sm" fallback="SM" />
<Avatar size="md" fallback="MD" />
<Avatar size="lg" fallback="LG" />
<Avatar size="xl" fallback="XL" />`} previewClassName="items-end">
          <Avatar size="xs" fallback="XS" />
          <Avatar size="sm" fallback="SM" />
          <Avatar size="md" fallback="MD" />
          <Avatar size="lg" fallback="LG" />
          <Avatar size="xl" fallback="XL" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Status indicator">
        <ExampleBlock code={`<Avatar fallback="ON" status="online" />
<Avatar fallback="AW" status="away" />
<Avatar fallback="BS" status="busy" />
<Avatar fallback="OF" status="offline" />`}>
          <Avatar fallback="ON" status="online" />
          <Avatar fallback="AW" status="away" />
          <Avatar fallback="BS" status="busy" />
          <Avatar fallback="OF" status="offline" />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'src', type: 'string', description: 'Image URL.' },
        { name: 'alt', type: 'string', description: 'Alt text for the image.' },
        { name: 'fallback', type: 'string', description: 'Text (initials) shown when no image is provided.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar diameter.' },
        { name: 'color', type: "'crisp' | 'emerald' | 'rose' | 'amber' | 'sky' | 'gray'", default: "'crisp'", description: 'Background color scheme for initials fallback.' },
        { name: 'status', type: "'online' | 'offline' | 'away' | 'busy'", description: 'Status dot shown at the bottom-right.' },
      ]} />
    </DocPage>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

export function CardPage() {
  return (
    <DocPage title="Card" description="A surface container with header, content, and footer slots. Supports hover elevation and variants." importNames="Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter">
      <DocSection title="Basic card">
        <ExampleBlock code={`<Card className="w-72">
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
    <CardDescription>Last updated 3 days ago</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Redesign the onboarding flow.</p>
  </CardContent>
</Card>`} previewClassName="flex-col items-start">
          <Card className="w-72 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Project Alpha</CardTitle>
              <CardDescription>Last updated 3 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Redesign the onboarding flow and reduce drop-off by 20%.</p>
            </CardContent>
          </Card>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'variant', type: "'default' | 'outline' | 'ghost'", default: "'default'", description: 'Visual style.' },
        { name: 'hoverable', type: 'boolean', default: 'false', description: 'Adds a lift shadow on hover.' },
        { name: 'noPadding', type: 'boolean', default: 'false', description: 'Removes default padding from CardContent.' },
      ]} />
    </DocPage>
  );
}

// ── Alert ─────────────────────────────────────────────────────────────────────

export function AlertPage() {
  return (
    <DocPage title="Alert" description="Contextual feedback messages with icon, title, and dismissal. Five semantic variants." importNames="Alert">
      <DocSection title="Variants">
        <ExampleBlock code={`<Alert variant="info" title="Info">Your plan renews in 3 days.</Alert>
<Alert variant="success" title="Success">Profile saved successfully.</Alert>
<Alert variant="warning" title="Warning">Your trial ends tomorrow.</Alert>
<Alert variant="destructive" title="Error">Failed to connect.</Alert>
<Alert>A neutral system message.</Alert>`} previewClassName="flex-col items-stretch gap-3">
          <Alert variant="info" title="Info">Your plan renews in 3 days.</Alert>
          <Alert variant="success" title="Success">Profile saved successfully.</Alert>
          <Alert variant="warning" title="Warning">Your trial ends tomorrow.</Alert>
          <Alert variant="destructive" title="Error">Failed to connect — check your network.</Alert>
          <Alert>A neutral system message.</Alert>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Custom icon">
        <ExampleBlock code={`<Alert variant="info" title="Custom icon" icon={<span>✨</span>}>
  You can pass any ReactNode as icon, or false to hide it.
</Alert>`} previewClassName="flex-col items-stretch">
          <Alert variant="info" title="Custom icon" icon={<span>✨</span>}>
            You can pass any ReactNode as icon, or <code className="font-mono text-xs">false</code> to hide it entirely.
          </Alert>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Color and icon preset.' },
        { name: 'title', type: 'string', description: 'Bold heading rendered above the message.' },
        { name: 'icon', type: 'ReactNode | false', description: 'Custom icon. Pass false to hide the icon entirely.' },
      ]} />
    </DocPage>
  );
}

// ── Progress ──────────────────────────────────────────────────────────────────

export function ProgressPage() {
  const [val] = useState(40);
  return (
    <DocPage title="Progress" description="Animated linear progress bar with four color variants and an optional label." importNames="Progress">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Progress value={40} label="Uploading…" />
<Progress value={75} variant="success" />
<Progress value={90} variant="warning" label="Storage" />`} previewClassName="flex-col items-stretch gap-4 w-full max-w-sm">
          <Progress value={val} label="Uploading…" />
          <Progress value={75} variant="success" />
          <Progress value={90} variant="warning" label="Storage" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Variants">
        <ExampleBlock code={`<Progress value={60} variant="default" />
<Progress value={60} variant="success" />
<Progress value={60} variant="warning" />
<Progress value={60} variant="destructive" />`} previewClassName="flex-col items-stretch gap-3 w-full max-w-sm">
          <Progress value={60} />
          <Progress value={60} variant="success" />
          <Progress value={60} variant="warning" />
          <Progress value={60} variant="destructive" />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'value', type: 'number', description: 'Progress percentage (0–100).' },
        { name: 'variant', type: "'default' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Fill color.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height.' },
        { name: 'label', type: 'string', description: 'Text rendered above the bar.' },
        { name: 'showValue', type: 'boolean', default: 'false', description: 'Shows the numeric percentage.' },
      ]} />
    </DocPage>
  );
}

// ── Separator ─────────────────────────────────────────────────────────────────

export function SeparatorPage() {
  return (
    <DocPage title="Separator" description="A thin divider line for visually separating content. Horizontal or vertical." importNames="Separator">
      <DocSection title="Horizontal">
        <ExampleBlock code={`<div className="space-y-3">
  <p>Section A</p>
  <Separator />
  <p>Section B</p>
</div>`} previewClassName="flex-col items-stretch w-full max-w-xs">
          <p className="text-sm text-gray-400">Section A</p>
          <Separator />
          <p className="text-sm text-gray-400">Section B</p>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Vertical">
        <ExampleBlock code={`<div className="flex items-center gap-3 h-6">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
</div>`}>
          <span className="text-sm text-gray-400">Home</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-gray-400">Docs</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-gray-400">Blog</span>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the separator.' },
        { name: 'decorative', type: 'boolean', default: 'true', description: 'When true, hides from screen readers.' },
      ]} />
    </DocPage>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────

export function SpinnerPage() {
  return (
    <DocPage title="Spinner" description="Lightweight SVG loading indicator. Four sizes and five color variants." importNames="Spinner, LoadingOverlay">
      <DocSection title="Sizes">
        <ExampleBlock code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`} previewClassName="items-end gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Variants">
        <ExampleBlock code={`<Spinner variant="default" />
<Spinner variant="primary" />
<Spinner variant="success" />
<Spinner variant="warning" />
<Spinner variant="destructive" />`}>
          <div className="bg-gray-900 p-2 rounded"><Spinner variant="default" /></div>
          <div className="bg-gray-900 p-2 rounded"><Spinner variant="success" /></div>
          <div className="bg-gray-900 p-2 rounded"><Spinner variant="destructive" /></div>
          <div className="bg-gray-900 p-2 rounded"><Spinner variant="muted" /></div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="LoadingOverlay">
        <Callout variant="tip">
          Wrap any container with <code className="font-mono text-xs">LoadingOverlay</code> to block interaction while content loads.
        </Callout>
        <ExampleBlock code={`<div className="relative w-64 h-32 rounded-xl border">
  <p className="p-4">Your content here</p>
  <LoadingOverlay loading />
</div>`} previewClassName="flex-col items-start">
          <div className="relative w-64 h-32 rounded-xl border border-gray-700">
            <p className="p-4 text-sm text-gray-400">Your content here</p>
            <LoadingOverlay visible />
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="Spinner Props" props={[
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Diameter of the spinner.' },
        { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Color variant.' },
      ]} />
      <PropsTable title="LoadingOverlay Props" props={[
        { name: 'loading', type: 'boolean', required: true, description: 'When true, renders the overlay with a centered spinner.' },
        { name: 'blur', type: 'boolean', default: 'false', description: 'Applies a backdrop blur to the covered content.' },
      ]} />
    </DocPage>
  );
}

// ── EmptyState ────────────────────────────────────────────────────────────────

export function EmptyStatePage() {
  return (
    <DocPage title="EmptyState" description="Zero-data placeholder with icon, heading, description, and an optional action button." importNames="EmptyState">
      <DocSection title="Basic usage">
        <ExampleBlock code={`import { Button } from '@crispui/react';

<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  action={<Button size="sm">New project</Button>}
/>`} previewClassName="flex-col items-stretch">
          <EmptyState
            title="No projects yet"
            description="Create your first project to get started."
            action={<button className="mt-2 px-4 py-2 text-sm font-medium bg-crisp-600 text-white rounded-lg hover:bg-crisp-700 transition-colors">New project</button>}
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Custom icon">
        <ExampleBlock code={`<EmptyState
  icon={<span className="text-4xl">🔍</span>}
  title="No results found"
  description="Try adjusting your search filters."
/>`} previewClassName="flex-col items-stretch">
          <EmptyState
            icon={<span className="text-4xl">🔍</span>}
            title="No results found"
            description="Try adjusting your search filters."
          />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'title', type: 'string', required: true, description: 'Main heading.' },
        { name: 'description', type: 'string', description: 'Supporting text below the heading.' },
        { name: 'action', type: 'ReactNode', description: 'Action element rendered below the description (e.g. a Button).' },
        { name: 'icon', type: 'ReactNode', description: 'Custom icon or emoji rendered above the title.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls padding and text sizes.' },
      ]} />
    </DocPage>
  );
}
