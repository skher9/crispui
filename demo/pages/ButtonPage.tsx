import { useState } from 'react';
import { Button, Badge } from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

export function ButtonPage() {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DocPage
      title="Button"
      description="Triggers an action or event. Built with class-variance-authority — every combination of variant and size is fully typed."
      importNames="Button, buttonVariants"
    >
      <DocSection title="Variants" description="8 semantic variants covering every use case.">
        <ExampleBlock
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes" description="6 sizes from xs to xl, plus icon-only.">
        <ExampleBlock
          code={`<Button size="xs">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">XLarge</Button>
<Button size="icon" aria-label="Add">
  <PlusIcon />
</Button>`}
          previewClassName="items-end"
        >
          <Button size="xs">XSmall</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">XLarge</Button>
          <Button size="icon" title="Add">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Icons">
        <ExampleBlock
          code={`<Button leftIcon={<UploadIcon />}>Upload file</Button>
<Button rightIcon={<ArrowRightIcon />} variant="outline">Continue</Button>
<Button
  leftIcon={<CheckIcon />}
  variant="success"
>
  Approve
</Button>`}
        >
          <Button leftIcon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}>Upload file</Button>
          <Button rightIcon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>} variant="outline">Continue</Button>
          <Button leftIcon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>} variant="success">Approve</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Loading state" description="Pass loading={true} to show a spinner and disable interaction.">
        <Callout variant="warning">
          When <code className="font-mono text-xs bg-white/5 px-1 rounded">loading</code> is true, the button is automatically disabled — don't also pass <code className="font-mono text-xs bg-white/5 px-1 rounded">disabled</code>.
        </Callout>
        <ExampleBlock
          code={`const [loading, setLoading] = useState(false);

<Button
  loading={loading}
  onClick={() => {
    setLoading(true);
    // reset after async op
    setTimeout(() => setLoading(false), 2000);
  }}
>
  {loading ? 'Saving…' : 'Save changes'}
</Button>`}
        >
          <Button loading={loading} onClick={handleLoad}>
            {loading ? 'Saving…' : 'Save changes'}
          </Button>
          <Button disabled>Disabled</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Composed with other components">
        <ExampleBlock
          code={`// Button + Badge combo — useful for notification CTAs
<Button variant="secondary">
  Notifications
  <Badge variant="destructive" size="sm">3</Badge>
</Button>

// Outline ghost for toolbars
<div className="flex border border-gray-200 rounded-xl divide-x divide-gray-200 overflow-hidden">
  <Button variant="ghost" size="sm" className="rounded-none">Bold</Button>
  <Button variant="ghost" size="sm" className="rounded-none">Italic</Button>
  <Button variant="ghost" size="sm" className="rounded-none">Underline</Button>
</div>`}
        >
          <Button variant="secondary">
            Notifications
            <Badge variant="destructive" size="sm">3</Badge>
          </Button>
          <div className="flex border border-gray-700 rounded-xl divide-x divide-gray-700 overflow-hidden">
            <Button variant="ghost" size="sm" className="rounded-none">Bold</Button>
            <Button variant="ghost" size="sm" className="rounded-none">Italic</Button>
            <Button variant="ghost" size="sm" className="rounded-none">Underline</Button>
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'destructive' | 'link'", default: "'default'", description: 'Visual style of the button.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'", default: "'md'", description: 'Size of the button. icon renders a square.' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the button. Do not combine with disabled.' },
        { name: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before the label. Hidden during loading.' },
        { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after the label. Hidden during loading.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
        { name: 'className', type: 'string', description: 'Extra Tailwind classes merged via cn().' },
        { name: '...rest', type: 'ButtonHTMLAttributes', description: 'All native button props are forwarded.' },
      ]} />
    </DocPage>
  );
}
