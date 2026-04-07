import { useState } from 'react';
import {
  Typography, Kbd,
  AspectRatio,
  Chip,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage as BreadcrumbPageCrumb, BreadcrumbSeparator,
  Skeleton, SkeletonCard, SkeletonText,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  Toggle, ToggleGroup, ToggleGroupItem,
  Rating,
  Pagination,
  Stepper, Step,
  Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTime,
  HoverCard, HoverCardTrigger, HoverCardContent,
  NumberInput,
  Autocomplete,
  SimpleDropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  ScrollArea,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Calendar, DatePicker,
  TreeView, TreeItem,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel,
  Button, Badge, Avatar,
} from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

// ── Typography ────────────────────────────────────────────────────────────────

export function TypographyPage() {
  return (
    <DocPage title="Typography" description="Semantic text components from h1 to caption. All variants auto-select the correct HTML tag." importNames="Typography">
      <DocSection title="Heading scale">
        <ExampleBlock code={`<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>`} previewClassName="flex-col items-start gap-2">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Body & utility">
        <ExampleBlock code={`<Typography variant="lead">Lead paragraph — larger intro text.</Typography>
<Typography variant="body1">Body 1 — default paragraph size.</Typography>
<Typography variant="body2">Body 2 — smaller body text.</Typography>
<Typography variant="muted">Muted — helper text and secondary info.</Typography>
<Typography variant="caption">Caption — labels and fine print.</Typography>
<Typography variant="overline">Overline · Section Label</Typography>
<Typography variant="code">const x = 42;</Typography>
<Typography variant="blockquote">Great design is making something memorable and meaningful.</Typography>`} previewClassName="flex-col items-start gap-3">
          <Typography variant="lead">Lead paragraph — larger intro text.</Typography>
          <Typography variant="body1">Body 1 — default paragraph size with comfortable line-height.</Typography>
          <Typography variant="body2">Body 2 — smaller body text for secondary content.</Typography>
          <Typography variant="muted">Muted — helper text and secondary info.</Typography>
          <Typography variant="caption">Caption — labels and fine print.</Typography>
          <Typography variant="overline">Overline · Section Label</Typography>
          <Typography variant="code">const x = 42;</Typography>
          <Typography variant="blockquote">Great design is making something memorable and meaningful.</Typography>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'variant', type: "'h1'–'h6' | 'body1' | 'body2' | 'lead' | 'muted' | 'caption' | 'label' | 'overline' | 'code' | 'blockquote'", required: true, description: 'Visual style. Automatically maps to the semantic HTML tag.' },
        { name: 'as', type: 'React.ElementType', description: 'Override the rendered HTML element.' },
      ]} />
    </DocPage>
  );
}

// ── Kbd ───────────────────────────────────────────────────────────────────────

export function KbdPage() {
  return (
    <DocPage title="Kbd" description="Keyboard key display for shortcut documentation." importNames="Kbd">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Kbd>⌘</Kbd>
<Kbd>K</Kbd>
<span>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette</span>`}>
          <span className="text-sm text-gray-300">Press</span>
          <Kbd>⌘</Kbd>
          <span className="text-sm text-gray-300">+</span>
          <Kbd>K</Kbd>
          <span className="text-sm text-gray-300">to open the command palette</span>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Sizes">
        <ExampleBlock code={`<Kbd size="sm">⌘K</Kbd>
<Kbd size="md">⌘K</Kbd>
<Kbd size="lg">⌘K</Kbd>`} previewClassName="items-end">
          <Kbd size="sm">⌘K</Kbd>
          <Kbd size="md">⌘K</Kbd>
          <Kbd size="lg">⌘K</Kbd>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the key badge.' },
      ]} />
    </DocPage>
  );
}

// ── AspectRatio ───────────────────────────────────────────────────────────────

export function AspectRatioPage() {
  return (
    <DocPage title="AspectRatio" description="Maintains a fixed width-to-height ratio for any child content — images, videos, embeds." importNames="AspectRatio">
      <DocSection title="16:9 (widescreen)">
        <ExampleBlock code={`<AspectRatio ratio={16 / 9} className="w-64 rounded-xl overflow-hidden">
  <img src="..." alt="..." className="w-full h-full object-cover" />
</AspectRatio>`} previewClassName="flex-col items-start">
          <AspectRatio ratio={16 / 9} className="w-64 rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">16 : 9</div>
          </AspectRatio>
        </ExampleBlock>
      </DocSection>
      <DocSection title="1:1 (square)">
        <ExampleBlock code={`<AspectRatio ratio={1} className="w-40 rounded-xl overflow-hidden">
  <img src="..." className="w-full h-full object-cover" />
</AspectRatio>`} previewClassName="flex-col items-start">
          <AspectRatio ratio={1} className="w-40 rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">1 : 1</div>
          </AspectRatio>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'ratio', type: 'number', default: '16/9', description: 'Width-to-height ratio (e.g. 16/9, 4/3, 1).' },
      ]} />
    </DocPage>
  );
}

// ── Chip ──────────────────────────────────────────────────────────────────────

export function ChipPage() {
  const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind', 'Framer']);
  return (
    <DocPage title="Chip" description="Compact interactive label for tags, filters, and selections. Supports icons, avatars, and delete." importNames="Chip">
      <DocSection title="Variants">
        <ExampleBlock code={`<Chip>Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="destructive">Destructive</Chip>`}>
          <Chip>Default</Chip>
          <Chip variant="primary">Primary</Chip>
          <Chip variant="success">Success</Chip>
          <Chip variant="warning">Warning</Chip>
          <Chip variant="destructive">Destructive</Chip>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Deletable chips">
        <ExampleBlock code={`const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind']);

{chips.map(c => (
  <Chip key={c} variant="primary" onDelete={() => setChips(prev => prev.filter(x => x !== c))}>
    {c}
  </Chip>
))}`}>
          {chips.map(c => (
            <Chip key={c} variant="primary" onDelete={() => setChips(p => p.filter(x => x !== c))}>{c}</Chip>
          ))}
        </ExampleBlock>
      </DocSection>
      <DocSection title="With avatar & icon">
        <ExampleBlock code={`<Chip variant="default" avatar={<Avatar size="xs" fallback="AB" />}>Alice B.</Chip>
<Chip variant="primary" icon={<StarIcon />}>Featured</Chip>`}>
          <Chip variant="default" avatar={<Avatar size="xs" fallback="AB" color="sky" />}>Alice B.</Chip>
          <Chip variant="primary" icon={<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.5a.56.56 0 011.04 0l2.12 5.11a.56.56 0 00.48.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.38a.56.56 0 01-.84.61l-4.72-2.88a.56.56 0 00-.59 0l-4.72 2.88a.56.56 0 01-.84-.61l1.28-5.38a.56.56 0 00-.18-.56L3.5 9.89a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.47-.35L11.48 3.5z" /></svg>}>Featured</Chip>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Color style.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Chip size.' },
        { name: 'onDelete', type: '(e: MouseEvent) => void', description: 'Renders a × button that calls this when clicked.' },
        { name: 'icon', type: 'ReactNode', description: 'Icon rendered before the label.' },
        { name: 'avatar', type: 'ReactNode', description: 'Avatar rendered at the leading edge.' },
        { name: 'onClick', type: '(e: MouseEvent) => void', description: 'Makes the chip interactive/clickable.' },
      ]} />
    </DocPage>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

export function BreadcrumbPage() {
  return (
    <DocPage title="Breadcrumb" description="Navigation trail showing the current page location within the hierarchy." importNames="Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator">
      <DocSection title="Basic">
        <ExampleBlock code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPageCrumb>Components</BreadcrumbPageCrumb>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPageCrumb>Components</BreadcrumbPageCrumb></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Custom separator">
        <ExampleBlock code={`<Breadcrumb separator={<ChevronRight />}>...</Breadcrumb>`}>
          <Breadcrumb separator={<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Settings</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPageCrumb>Profile</BreadcrumbPageCrumb></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

export function SkeletonPage() {
  return (
    <DocPage title="Skeleton" description="Placeholder loading state for content while data is being fetched." importNames="Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar">
      <DocSection title="Variants">
        <ExampleBlock code={`<Skeleton variant="text" width="60%" />
<Skeleton variant="rounded" height={80} />
<Skeleton variant="circular" width={48} height={48} />`} previewClassName="flex-col items-stretch gap-3 w-full max-w-xs">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rounded" height={80} />
          <div><Skeleton variant="circular" width={48} height={48} /></div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Multi-line text">
        <ExampleBlock code={`<SkeletonText lines={4} />`} previewClassName="flex-col items-stretch w-full max-w-xs">
          <SkeletonText lines={4} />
        </ExampleBlock>
      </DocSection>
      <DocSection title="Card preset">
        <ExampleBlock code={`<SkeletonCard />`} previewClassName="flex-col items-stretch w-full max-w-xs">
          <SkeletonCard />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'variant', type: "'text' | 'rectangular' | 'circular' | 'rounded'", default: "'rounded'", description: 'Shape of the skeleton.' },
        { name: 'width', type: 'string | number', description: 'Width override.' },
        { name: 'height', type: 'string | number', description: 'Height override.' },
        { name: 'lines', type: 'number', description: 'Renders N stacked lines (text skeleton).' },
      ]} />
    </DocPage>
  );
}

// ── Collapsible ───────────────────────────────────────────────────────────────

export function CollapsiblePage() {
  return (
    <DocPage title="Collapsible" description="Show/hide content with an animated panel. Lower-level primitive than Accordion — use when you need one standalone toggle." importNames="Collapsible, CollapsibleTrigger, CollapsibleContent">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Collapsible defaultOpen>
  <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-sm font-medium text-white">
    What is crispui?
    <ChevronIcon />
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p className="pt-3 text-sm text-gray-400">
      crispui is a React + TypeScript component library...
    </p>
  </CollapsibleContent>
</Collapsible>`} previewClassName="flex-col items-stretch w-full max-w-sm">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
              What is crispui?
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="pt-3 text-sm text-gray-400 leading-relaxed">
                crispui is a React + TypeScript component library with 50+ production-ready components, Framer Motion animations, and full dark mode support.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state (uncontrolled).' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes.' },
      ]} />
    </DocPage>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────

export function TogglePage() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [align, setAlign] = useState('left');

  return (
    <DocPage title="Toggle & ToggleGroup" description="A two-state button. ToggleGroup coordinates single or multiple selection across a set of items." importNames="Toggle, ToggleGroup, ToggleGroupItem">
      <DocSection title="Toggle">
        <ExampleBlock code={`const [bold, setBold] = useState(false);

<Toggle pressed={bold} onPressedChange={setBold} variant="outline">
  <BoldIcon />
  Bold
</Toggle>`}>
          <Toggle pressed={bold} onPressedChange={setBold} variant="outline" size="md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8a4 4 0 000-8H6v8zm0 0h9a4 4 0 010 8H6v-8z" /></svg>
            Bold
          </Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic} variant="outline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>
            Italic
          </Toggle>
        </ExampleBlock>
      </DocSection>
      <DocSection title="ToggleGroup — single">
        <ExampleBlock code={`<ToggleGroup type="single" value={align} onValueChange={setAlign} variant="outline">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`}>
          <ToggleGroup type="single" value={align} onValueChange={v => setAlign(v as string)} variant="outline">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </ExampleBlock>
      </DocSection>
      <PropsTable title="Toggle Props" props={[
        { name: 'pressed', type: 'boolean', description: 'Controlled pressed state.' },
        { name: 'defaultPressed', type: 'boolean', default: 'false', description: 'Initial pressed state.' },
        { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Called when state changes.' },
        { name: 'variant', type: "'default' | 'outline' | 'ghost'", default: "'default'", description: 'Visual style.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Size.' },
      ]} />
      <PropsTable title="ToggleGroup Props" props={[
        { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or multiple items can be active.' },
        { name: 'value', type: 'string | string[]', description: 'Controlled selected value(s).' },
        { name: 'onValueChange', type: '(value: string | string[]) => void', description: 'Called when selection changes.' },
      ]} />
    </DocPage>
  );
}

// ── Rating ────────────────────────────────────────────────────────────────────

export function RatingPage() {
  const [val, setVal] = useState(3);
  return (
    <DocPage title="Rating" description="Star rating input with configurable max, sizes, and read-only display mode." importNames="Rating">
      <DocSection title="Interactive">
        <ExampleBlock code={`const [val, setVal] = useState(3);

<Rating value={val} onChange={setVal} />`}>
          <div className="flex flex-col gap-4">
            <Rating value={val} onChange={setVal} />
            <Rating value={val} onChange={setVal} size="lg" max={10} />
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Read-only display">
        <ExampleBlock code={`<Rating value={4.5} readOnly />
<Rating value={2} readOnly size="sm" />`} previewClassName="flex-col items-start gap-3">
          <Rating value={4} readOnly />
          <Rating value={2} readOnly size="sm" />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'value', type: 'number', description: 'Controlled rating value.' },
        { name: 'defaultValue', type: 'number', default: '0', description: 'Initial value (uncontrolled).' },
        { name: 'max', type: 'number', default: '5', description: 'Maximum number of stars.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size.' },
        { name: 'readOnly', type: 'boolean', default: 'false', description: 'Disables interaction.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims and disables.' },
        { name: 'onChange', type: '(value: number) => void', description: 'Called when rating changes.' },
      ]} />
    </DocPage>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

export function PaginationPage() {
  const [page, setPage] = useState(5);
  return (
    <DocPage title="Pagination" description="Page navigation with ellipsis, boundary pages, and three visual variants." importNames="Pagination">
      <DocSection title="Variants">
        <ExampleBlock code={`<Pagination page={page} count={20} onChange={setPage} variant="outlined" />
<Pagination page={page} count={20} onChange={setPage} variant="filled" />
<Pagination page={page} count={20} onChange={setPage} variant="ghost" />`} previewClassName="flex-col items-start gap-4">
          <Pagination page={page} count={20} onChange={setPage} variant="outlined" />
          <Pagination page={page} count={20} onChange={setPage} variant="filled" />
          <Pagination page={page} count={20} onChange={setPage} variant="ghost" />
        </ExampleBlock>
      </DocSection>
      <DocSection title="Sizes">
        <ExampleBlock code={`<Pagination page={3} count={10} onChange={() => {}} size="sm" />
<Pagination page={3} count={10} onChange={() => {}} size="md" />
<Pagination page={3} count={10} onChange={() => {}} size="lg" />`} previewClassName="flex-col items-start gap-3">
          <Pagination page={3} count={10} onChange={() => {}} size="sm" />
          <Pagination page={3} count={10} onChange={() => {}} size="md" />
          <Pagination page={3} count={10} onChange={() => {}} size="lg" />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'page', type: 'number', required: true, description: 'Current page (1-indexed).' },
        { name: 'count', type: 'number', required: true, description: 'Total number of pages.' },
        { name: 'onChange', type: '(page: number) => void', required: true, description: 'Called when user navigates.' },
        { name: 'siblingCount', type: 'number', default: '1', description: 'Pages shown on each side of the current page.' },
        { name: 'boundaryCount', type: 'number', default: '1', description: 'Pages shown at the start and end.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size.' },
        { name: 'variant', type: "'outlined' | 'filled' | 'ghost'", default: "'outlined'", description: 'Visual style.' },
        { name: 'showFirstLast', type: 'boolean', default: 'false', description: 'Show « / » first and last buttons.' },
      ]} />
    </DocPage>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────────────

export function StepperPage() {
  const [active, setActive] = useState(1);
  return (
    <DocPage title="Stepper" description="Multi-step progress indicator. Horizontal or vertical, animated connector fill." importNames="Stepper, Step">
      <DocSection title="Horizontal">
        <ExampleBlock code={`<Stepper activeStep={1}>
  <Step index={0} label="Account" description="Basic info" />
  <Step index={1} label="Profile" description="Details" />
  <Step index={2} label="Review" description="Confirm" />
</Stepper>`} previewClassName="flex-col items-stretch w-full">
          <Stepper activeStep={active}>
            <Step index={0} label="Account" description="Basic info" />
            <Step index={1} label="Profile" description="Your details" />
            <Step index={2} label="Review" description="Confirm & submit" />
          </Stepper>
          <div className="flex gap-2 mt-6">
            <Button size="sm" variant="outline" onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0}>Back</Button>
            <Button size="sm" onClick={() => setActive(a => Math.min(2, a + 1))} disabled={active === 2}>Next</Button>
          </div>
        </ExampleBlock>
      </DocSection>
      <DocSection title="Vertical">
        <ExampleBlock code={`<Stepper activeStep={1} orientation="vertical">
  <Step index={0} label="Choose plan" />
  <Step index={1} label="Payment" />
  <Step index={2} label="Confirmation" />
</Stepper>`} previewClassName="flex-col items-start">
          <Stepper activeStep={1} orientation="vertical">
            <Step index={0} label="Choose plan" description="Select a pricing tier" />
            <Step index={1} label="Payment" description="Enter card details" />
            <Step index={2} label="Confirmation" description="You're all set!" />
          </Stepper>
        </ExampleBlock>
      </DocSection>
      <PropsTable title="Stepper Props" props={[
        { name: 'activeStep', type: 'number', required: true, description: 'Index of the currently active step.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction.' },
      ]} />
      <PropsTable title="Step Props" props={[
        { name: 'index', type: 'number', required: true, description: 'Zero-based step index.' },
        { name: 'label', type: 'string', description: 'Step label.' },
        { name: 'description', type: 'string', description: 'Helper text below the label.' },
        { name: 'icon', type: 'ReactNode', description: 'Custom icon inside the circle.' },
        { name: 'error', type: 'boolean', default: 'false', description: 'Marks step as errored.' },
        { name: 'optional', type: 'boolean', default: 'false', description: 'Adds "(optional)" tag.' },
      ]} />
    </DocPage>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────

export function TimelinePage() {
  return (
    <DocPage title="Timeline" description="Vertical activity feed with dots, icons, timestamps, and content." importNames="Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTime">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<Timeline>
  <TimelineItem>
    <TimelineDot color="primary" />
    <TimelineContent>
      <TimelineTime>2 hours ago</TimelineTime>
      <p>Component library released</p>
    </TimelineContent>
  </TimelineItem>
</Timeline>`} previewClassName="flex-col items-start">
          <Timeline>
            {[
              { color: 'primary' as const, time: '2 hours ago', text: 'Component library v0.1.0 released' },
              { color: 'success' as const, time: 'Yesterday', text: 'All TypeScript checks passing' },
              { color: 'warning' as const, time: '3 days ago', text: 'Dark mode design system completed' },
              { color: 'default' as const, time: 'Last week', text: 'Project kicked off' },
            ].map((item, i) => (
              <TimelineItem key={i}>
                <TimelineDot color={item.color} />
                <TimelineContent>
                  <TimelineTime>{item.time}</TimelineTime>
                  <p className="text-sm text-gray-200">{item.text}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ExampleBlock>
      </DocSection>
      <PropsTable title="TimelineDot Props" props={[
        { name: 'color', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", default: "'primary'", description: 'Dot color.' },
        { name: 'icon', type: 'ReactNode', description: 'Custom icon inside the dot.' },
      ]} />
    </DocPage>
  );
}

// ── HoverCard ─────────────────────────────────────────────────────────────────

export function HoverCardPage() {
  return (
    <DocPage title="HoverCard" description="A floating card that appears on hover — useful for user profiles, link previews, and rich tooltips." importNames="HoverCard, HoverCardTrigger, HoverCardContent">
      <DocSection title="Basic usage">
        <Callout variant="tip">HoverCard opens after a short delay to avoid accidental triggers.</Callout>
        <ExampleBlock code={`<HoverCard>
  <HoverCardTrigger>
    <Button variant="outline">@crispui</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar fallback="CR" color="crisp" />
      <div>
        <p className="font-semibold text-white">crispui</p>
        <p className="text-xs text-gray-400">React component library</p>
      </div>
    </div>
    <p className="mt-2 text-xs text-gray-400">50+ components · Dark mode · TypeScript</p>
  </HoverCardContent>
</HoverCard>`} previewClassName="pb-40">
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="outline">@crispui</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3">
                <Avatar fallback="CR" color="crisp" />
                <div>
                  <p className="font-semibold text-white text-sm">crispui</p>
                  <p className="text-xs text-gray-400">React component library</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">50+ components · Dark mode · TypeScript · Framer Motion</p>
            </HoverCardContent>
          </HoverCard>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'openDelay', type: 'number', default: '200', description: 'Milliseconds before the card opens.' },
        { name: 'closeDelay', type: 'number', default: '100', description: 'Milliseconds before the card closes.' },
      ]} />
    </DocPage>
  );
}

// ── NumberInput ───────────────────────────────────────────────────────────────

export function NumberInputPage() {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(99);
  return (
    <DocPage title="NumberInput" description="Stepper input with +/− buttons, min/max clamping, prefix/suffix, and keyboard support." importNames="NumberInput">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<NumberInput label="Quantity" value={qty} onChange={setQty} min={1} max={99} />
<NumberInput label="Price" value={price} onChange={setPrice} prefix="$" min={0} step={5} />`} previewClassName="flex-col items-stretch gap-4 w-full max-w-xs">
          <NumberInput label="Quantity" value={qty} onChange={setQty} min={1} max={99} />
          <NumberInput label="Price" value={price} onChange={setPrice} prefix="$" min={0} step={5} />
          <NumberInput label="Temperature" value={22} suffix="°C" min={-50} max={50} />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'value', type: 'number', description: 'Controlled value.' },
        { name: 'onChange', type: '(value: number) => void', description: 'Called with the new numeric value.' },
        { name: 'min', type: 'number', description: 'Minimum value.' },
        { name: 'max', type: 'number', description: 'Maximum value.' },
        { name: 'step', type: 'number', default: '1', description: 'Step amount for +/− buttons.' },
        { name: 'precision', type: 'number', default: '0', description: 'Decimal places.' },
        { name: 'prefix', type: 'string', description: 'Symbol shown before the value (e.g. "$").' },
        { name: 'suffix', type: 'string', description: 'Symbol shown after the value (e.g. "kg").' },
        { name: 'label', type: 'string', description: 'Label above the input.' },
        { name: 'error', type: 'string', description: 'Error message.' },
      ]} />
    </DocPage>
  );
}

// ── Autocomplete ──────────────────────────────────────────────────────────────

export function AutocompletePage() {
  const FRAMEWORKS = [
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'vue', label: 'Vue', group: 'Frontend' },
    { value: 'svelte', label: 'Svelte', group: 'Frontend' },
    { value: 'angular', label: 'Angular', group: 'Frontend' },
    { value: 'next', label: 'Next.js', group: 'Meta-frameworks' },
    { value: 'nuxt', label: 'Nuxt', group: 'Meta-frameworks' },
    { value: 'remix', label: 'Remix', group: 'Meta-frameworks' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    { value: 'bun', label: 'Bun', group: 'Backend' },
    { value: 'deno', label: 'Deno', group: 'Backend' },
  ];

  return (
    <DocPage title="Autocomplete" description="Filterable combobox with grouped options, keyboard navigation, custom renderers, and freeSolo mode." importNames="Autocomplete">
      <DocSection title="With grouped options">
        <ExampleBlock code={`<Autocomplete
  label="Framework"
  placeholder="Search frameworks…"
  options={[
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'next', label: 'Next.js', group: 'Meta-frameworks' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
  ]}
  onChange={(value, option) => console.log(value, option)}
/>`} previewClassName="flex-col items-stretch w-full max-w-xs pb-52">
          <Autocomplete
            label="Framework"
            placeholder="Search frameworks…"
            options={FRAMEWORKS}
            hint="Grouped by category. Type to filter."
          />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'options', type: 'AutocompleteOption[]', required: true, description: 'Array of { value, label, group?, disabled? }.' },
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'onChange', type: '(value: string, option?: AutocompleteOption) => void', description: 'Called when an option is selected.' },
        { name: 'onInputChange', type: '(value: string) => void', description: 'Called on every keystroke.' },
        { name: 'freeSolo', type: 'boolean', default: 'false', description: 'Allows typing a value not in the options list.' },
        { name: 'clearable', type: 'boolean', default: 'true', description: 'Shows a × button to clear the input.' },
        { name: 'filterOptions', type: '(options, input) => options', description: 'Custom filter function.' },
        { name: 'renderOption', type: '(option) => ReactNode', description: 'Custom option renderer.' },
        { name: 'noOptionsText', type: 'string', default: "'No options'", description: 'Text shown when no options match.' },
      ]} />
    </DocPage>
  );
}

// ── DropdownMenu ──────────────────────────────────────────────────────────────

export function DropdownMenuPage() {
  return (
    <DocPage title="DropdownMenu" description="A positioned menu that opens on click. Supports items, separators, labels, checkbox items, and keyboard navigation." importNames="SimpleDropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem">
      <DocSection title="Basic dropdown">
        <ExampleBlock code={`<SimpleDropdownMenu trigger={<Button variant="outline">Options ▾</Button>}>
  <DropdownMenuLabel>Account</DropdownMenuLabel>
  <DropdownMenuItem>Profile</DropdownMenuItem>
  <DropdownMenuItem>Settings</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
</SimpleDropdownMenu>`} previewClassName="pb-44">
          <SimpleDropdownMenu trigger={<Button variant="outline">Options ▾</Button>}>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>} shortcut="⌘P">Profile</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘S">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
          </SimpleDropdownMenu>
        </ExampleBlock>
      </DocSection>
      <DocSection title="With checkbox items">
        <Callout variant="tip">Use <code className="font-mono text-xs">DropdownMenuCheckboxItem</code> for persistent toggle state in menus.</Callout>
        <ExampleBlock code={`<SimpleDropdownMenu trigger={<Button variant="outline">View ▾</Button>}>
  <DropdownMenuLabel>Display</DropdownMenuLabel>
  <DropdownMenuCheckboxItem checked={notifications} onCheckedChange={setNotifications}>
    Notifications
  </DropdownMenuCheckboxItem>
</SimpleDropdownMenu>`} previewClassName="pb-36">
          <SimpleDropdownMenu trigger={<Button variant="outline">View settings ▾</Button>}>
            <DropdownMenuLabel>Display</DropdownMenuLabel>
            <DropdownMenuItem>Show toolbar</DropdownMenuItem>
            <DropdownMenuItem>Compact mode</DropdownMenuItem>
          </SimpleDropdownMenu>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── ScrollArea ────────────────────────────────────────────────────────────────

export function ScrollAreaPage() {
  return (
    <DocPage title="ScrollArea" description="Custom styled scrollbar for overflowing content. Vertical, horizontal, or both." importNames="ScrollArea">
      <DocSection title="Vertical scroll">
        <ExampleBlock code={`<ScrollArea maxHeight={200} className="w-64 rounded-xl border border-gray-700">
  {items.map(item => <div key={item} className="px-4 py-2">{item}</div>)}
</ScrollArea>`} previewClassName="flex-col items-start">
          <ScrollArea maxHeight={200} className="w-64 rounded-xl border border-gray-700 bg-gray-900">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="px-4 py-2 text-sm text-gray-300 border-b border-gray-800 last:border-0">
                Item {i + 1} — scroll to see more
              </div>
            ))}
          </ScrollArea>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'maxHeight', type: 'string | number', description: 'Max height before scroll activates.' },
        { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Scroll direction.' },
      ]} />
    </DocPage>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

export function CarouselPage() {
  const SLIDES = [
    { bg: 'from-crisp-900 to-crisp-800', title: 'Slide One', sub: 'Smooth animated transitions' },
    { bg: 'from-violet-900 to-violet-800', title: 'Slide Two', sub: 'Loop, autoPlay, keyboard nav' },
    { bg: 'from-emerald-900 to-emerald-800', title: 'Slide Three', sub: 'Dot indicators included' },
  ];
  return (
    <DocPage title="Carousel" description="Animated slide carousel with prev/next controls, dot indicators, autoPlay, and loop support." importNames="Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots">
      <DocSection title="Basic carousel">
        <ExampleBlock code={`<Carousel loop>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselDots />
</Carousel>`} previewClassName="flex-col items-stretch w-full max-w-sm">
          <Carousel loop>
            <CarouselContent>
              {SLIDES.map((s, i) => (
                <CarouselItem key={i}>
                  <div className={`h-40 rounded-xl bg-gradient-to-br ${s.bg} flex flex-col items-center justify-center gap-1`}>
                    <p className="text-white font-bold text-lg">{s.title}</p>
                    <p className="text-gray-300 text-sm">{s.sub}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
          </Carousel>
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'loop', type: 'boolean', default: 'true', description: 'Whether to loop back to the start.' },
        { name: 'autoPlay', type: 'boolean', default: 'false', description: 'Auto-advance slides.' },
        { name: 'interval', type: 'number', default: '4000', description: 'Milliseconds between auto-advances.' },
        { name: 'defaultIndex', type: 'number', default: '0', description: 'Initial slide index.' },
        { name: 'onIndexChange', type: '(index: number) => void', description: 'Called when slide changes.' },
      ]} />
    </DocPage>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────

export function TablePage() {
  const data = [
    { name: 'Alice Chen', role: 'Engineer', status: 'Active', joined: 'Jan 2023' },
    { name: 'Bob Ross', role: 'Designer', status: 'Active', joined: 'Mar 2023' },
    { name: 'Carol White', role: 'PM', status: 'Inactive', joined: 'Jun 2022' },
    { name: 'Dave Brown', role: 'Engineer', status: 'Active', joined: 'Sep 2023' },
  ];
  return (
    <DocPage title="Table" description="Semantic HTML table with styled header, body, and footer. Hover states and selected row support." importNames="Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption">
      <DocSection title="Basic table">
        <ExampleBlock code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.name}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`} previewClassName="flex-col items-stretch w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-gray-400">{row.role}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === 'Active' ? 'success' : 'secondary'} size="sm" dot>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{row.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Calendar / DatePicker ─────────────────────────────────────────────────────

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <DocPage title="Calendar & DatePicker" description="Standalone calendar with month/year navigation. DatePicker wraps it in a popover with a trigger button." importNames="Calendar, DatePicker">
      <DocSection title="Calendar">
        <ExampleBlock code={`const [date, setDate] = useState<Date>();

<Calendar value={date} onChange={setDate} />`} previewClassName="flex-col items-start">
          <Calendar value={date} onChange={setDate} />
          {date && <p className="text-xs text-gray-400 mt-2">Selected: {date.toLocaleDateString()}</p>}
        </ExampleBlock>
      </DocSection>
      <DocSection title="DatePicker (popover)">
        <ExampleBlock code={`<DatePicker
  label="Appointment date"
  placeholder="Pick a date"
  onChange={d => console.log(d)}
/>`} previewClassName="flex-col items-start w-full max-w-xs">
          <DatePicker label="Appointment date" placeholder="Pick a date" />
        </ExampleBlock>
      </DocSection>
      <PropsTable title="Calendar Props" props={[
        { name: 'value', type: 'Date', description: 'Controlled selected date.' },
        { name: 'onChange', type: '(date: Date) => void', description: 'Called when user selects a date.' },
        { name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
        { name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
        { name: 'showOutsideDays', type: 'boolean', default: 'false', description: 'Show days from adjacent months.' },
      ]} />
    </DocPage>
  );
}

// ── TreeView ──────────────────────────────────────────────────────────────────

export function TreeViewPage() {
  return (
    <DocPage title="TreeView" description="Hierarchical tree with animated expand/collapse, selection, and custom icons." importNames="TreeView, TreeItem">
      <DocSection title="File tree example">
        <ExampleBlock code={`<TreeView defaultExpanded={['src', 'components']}>
  <TreeItem id="src" label="src" hasChildren>
    <TreeItem id="components" label="components" hasChildren>
      <TreeItem id="button" label="Button.tsx" />
      <TreeItem id="input" label="Input.tsx" />
    </TreeItem>
    <TreeItem id="index" label="index.ts" />
  </TreeItem>
</TreeView>`} previewClassName="flex-col items-start w-full max-w-xs">
          <TreeView defaultExpanded={['src', 'components', 'ui']} className="w-full">
            <TreeItem id="src" label="src" hasChildren>
              <TreeItem id="components" label="components" hasChildren>
                <TreeItem id="ui" label="ui" hasChildren>
                  <TreeItem id="button" label="Button.tsx" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>} />
                  <TreeItem id="input" label="Input.tsx" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>} />
                  <TreeItem id="modal" label="Modal.tsx" icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>} />
                </TreeItem>
                <TreeItem id="forms" label="form" hasChildren>
                  <TreeItem id="checkbox" label="Checkbox.tsx" />
                </TreeItem>
              </TreeItem>
              <TreeItem id="index" label="index.ts" />
            </TreeItem>
            <TreeItem id="public" label="public" hasChildren>
              <TreeItem id="favicon" label="favicon.ico" />
            </TreeItem>
          </TreeView>
        </ExampleBlock>
      </DocSection>
      <PropsTable title="TreeItem Props" props={[
        { name: 'id', type: 'string', required: true, description: 'Unique identifier for selection/expand tracking.' },
        { name: 'label', type: 'string', required: true, description: 'Display label.' },
        { name: 'hasChildren', type: 'boolean', default: 'false', description: 'Shows expand arrow even without children rendered.' },
        { name: 'icon', type: 'ReactNode', description: 'Icon rendered beside the label.' },
        { name: 'level', type: 'number', default: '0', description: 'Indentation depth (auto-managed when nested).' },
      ]} />
    </DocPage>
  );
}

// ── NavigationMenu ────────────────────────────────────────────────────────────

export function NavigationMenuPage() {
  return (
    <DocPage title="NavigationMenu" description="Horizontal nav bar with animated hover dropdowns — great for site headers." importNames="NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink">
      <DocSection title="Basic usage">
        <ExampleBlock code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger value="docs">Docs</NavigationMenuTrigger>
      <NavigationMenuContent value="docs">
        <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
        <NavigationMenuLink href="#">Components</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`} previewClassName="flex-col items-start pt-40 pb-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger value="docs">Docs</NavigationMenuTrigger>
                <NavigationMenuContent value="docs">
                  <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
                  <NavigationMenuLink href="#">Components</NavigationMenuLink>
                  <NavigationMenuLink href="#">Examples</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger value="components">Components</NavigationMenuTrigger>
                <NavigationMenuContent value="components">
                  <NavigationMenuLink href="#">Button</NavigationMenuLink>
                  <NavigationMenuLink href="#">Input</NavigationMenuLink>
                  <NavigationMenuLink href="#">Modal</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Blog</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Menubar ───────────────────────────────────────────────────────────────────

export function MenubarPage() {
  return (
    <DocPage title="Menubar" description="Desktop-style application menu bar with File, Edit, View-style menus." importNames="Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel">
      <DocSection title="Basic menubar">
        <ExampleBlock code={`<Menubar>
  <MenubarMenu value="file">
    <MenubarTrigger value="file">File</MenubarTrigger>
    <MenubarContent value="file">
      <MenubarItem shortcut="⌘N">New File</MenubarItem>
      <MenubarItem shortcut="⌘O">Open…</MenubarItem>
      <MenubarSeparator />
      <MenubarItem shortcut="⌘S">Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`} previewClassName="flex-col items-start pt-40 pb-8">
          <Menubar>
            <MenubarMenu value="file">
              <MenubarTrigger value="file">File</MenubarTrigger>
              <MenubarContent value="file">
                <MenubarItem shortcut="⌘N">New File</MenubarItem>
                <MenubarItem shortcut="⌘O">Open…</MenubarItem>
                <MenubarSeparator />
                <MenubarItem shortcut="⌘S">Save</MenubarItem>
                <MenubarItem shortcut="⇧⌘S">Save As…</MenubarItem>
                <MenubarSeparator />
                <MenubarItem destructive>Exit</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu value="edit">
              <MenubarTrigger value="edit">Edit</MenubarTrigger>
              <MenubarContent value="edit">
                <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
                <MenubarItem shortcut="⌘Y">Redo</MenubarItem>
                <MenubarSeparator />
                <MenubarItem shortcut="⌘X">Cut</MenubarItem>
                <MenubarItem shortcut="⌘C">Copy</MenubarItem>
                <MenubarItem shortcut="⌘V">Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu value="view">
              <MenubarTrigger value="view">View</MenubarTrigger>
              <MenubarContent value="view">
                <MenubarLabel>Appearance</MenubarLabel>
                <MenubarItem>Zoom In</MenubarItem>
                <MenubarItem>Zoom Out</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Full Screen</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}
