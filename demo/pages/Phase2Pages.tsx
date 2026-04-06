import { useState } from 'react';
import {
  // Background effects
  ParticleField, AuroraBackground, GridPattern, BeamEffect,
  GradientMesh, SpotlightEffect, NoiseTexture, StarField,
  // New components
  ColorPicker, ColorPickerPopover,
  Chart, Sparkline,
  DataGrid,
  FileUpload,
  // Sections
  HeroCenter, HeroSplit, FeatureBento, LogoStrip, TestimonialGrid, CtaBanner, StatsBanner,
  // Existing
  Button,
} from '@crispui/react';
import type { DataGridColumn } from '@crispui/react';
import { DocPage, DocSection } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';

// ── Background Effects ────────────────────────────────────────────────────────

export function BackgroundEffectsPage() {
  return (
    <DocPage title="Background Effects" description="Drop-in visual backgrounds — particles, aurora, grid patterns, beams, gradients, and more." importNames="ParticleField, AuroraBackground, GridPattern, BeamEffect, GradientMesh, SpotlightEffect, NoiseTexture, StarField">
      <DocSection title="ParticleField">
        <ExampleBlock code={`<ParticleField color="#6366f1" count={60} />`} previewClassName="p-0 h-48">
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-950">
            <ParticleField color="#6366f1" count={60} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">Hover to interact</div>
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="AuroraBackground">
        <ExampleBlock code={`<AuroraBackground className="h-48 rounded-xl bg-gray-950">
  <div className="flex items-center justify-center h-full text-white">Aurora</div>
</AuroraBackground>`} previewClassName="p-0">
          <AuroraBackground className="h-48 rounded-xl bg-gray-950 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-1">Aurora Background</p>
              <p className="text-sm text-gray-400">Animated gradient blobs</p>
            </div>
          </AuroraBackground>
        </ExampleBlock>
      </DocSection>

      <DocSection title="GridPattern">
        <div className="grid grid-cols-3 gap-3">
          {(['dots', 'lines', 'cross'] as const).map(v => (
            <ExampleBlock key={v} code={`<GridPattern variant="${v}" />`} previewClassName="p-0">
              <GridPattern variant={v} className="h-32 rounded-xl bg-gray-950 flex items-center justify-center">
                <span className="text-xs text-gray-400">{v}</span>
              </GridPattern>
            </ExampleBlock>
          ))}
        </div>
      </DocSection>

      <DocSection title="BeamEffect">
        <ExampleBlock code={`<BeamEffect beamCount={6} color="#6366f1" />`} previewClassName="p-0">
          <BeamEffect beamCount={8} color="#6366f1" className="h-48 rounded-xl bg-gray-950 flex items-center justify-center">
            <p className="text-white font-semibold">Beam Effect</p>
          </BeamEffect>
        </ExampleBlock>
      </DocSection>

      <DocSection title="GradientMesh">
        <ExampleBlock code={`<GradientMesh colors={['#6366f1','#8b5cf6','#06b6d4']} />`} previewClassName="p-0">
          <GradientMesh className="h-48 rounded-xl bg-gray-950 flex items-center justify-center">
            <p className="text-white font-semibold">Gradient Mesh</p>
          </GradientMesh>
        </ExampleBlock>
      </DocSection>

      <DocSection title="SpotlightEffect">
        <ExampleBlock code={`<SpotlightEffect size={300} color="#6366f1" opacity={0.2} />`} previewClassName="p-0">
          <SpotlightEffect size={300} color="#6366f1" opacity={0.2} className="h-48 rounded-xl bg-gray-950 flex items-center justify-center border border-gray-800">
            <p className="text-white font-semibold">Move cursor here</p>
          </SpotlightEffect>
        </ExampleBlock>
      </DocSection>

      <DocSection title="StarField">
        <ExampleBlock code={`<StarField count={120} speed={0.4} twinkle />`} previewClassName="p-0">
          <div className="relative h-48 rounded-xl overflow-hidden bg-gray-950">
            <StarField count={120} speed={0.4} twinkle className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white font-semibold">Star Field</p>
            </div>
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="NoiseTexture">
        <ExampleBlock code={`<NoiseTexture opacity={0.06}><div className="h-24 bg-crisp-900/40 rounded-xl" /></NoiseTexture>`} previewClassName="p-0">
          <NoiseTexture opacity={0.06} className="rounded-xl overflow-hidden">
            <AuroraBackground className="h-48 rounded-xl bg-gray-950 flex items-center justify-center">
              <p className="text-white font-semibold">Noise + Aurora combined</p>
            </AuroraBackground>
          </NoiseTexture>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── ColorPicker ───────────────────────────────────────────────────────────────

export function ColorPickerPage() {
  const [color, setColor] = useState('#6366f1');
  return (
    <DocPage title="ColorPicker" description="HSV color picker with hex/RGB input, hue slider, swatches, and popover variant." importNames="ColorPicker, ColorPickerPopover">
      <DocSection title="Inline picker">
        <ExampleBlock code={`<ColorPicker value={color} onChange={setColor} />`} previewClassName="items-start">
          <div className="flex items-start gap-8">
            <ColorPicker value={color} onChange={setColor} />
            <div className="flex flex-col gap-2">
              <div className="w-20 h-20 rounded-2xl border border-gray-700" style={{ background: color }} />
              <p className="text-xs font-mono text-gray-400">{color}</p>
            </div>
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBlock code={`<ColorPicker size="sm" />\n<ColorPicker size="md" />\n<ColorPicker size="lg" />`} previewClassName="flex-row items-start gap-6 flex-wrap">
          <ColorPicker size="sm" />
          <ColorPicker size="md" />
          <ColorPicker size="lg" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Popover variant">
        <ExampleBlock code={`<ColorPickerPopover label="Brand color" value={color} onChange={setColor} />`}>
          <ColorPickerPopover label="Brand color" defaultValue="#6366f1" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="RGB format">
        <ExampleBlock code={`<ColorPicker showSwatches={false} />`}>
          <ColorPicker size="sm" showSwatches={false} />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Charts ────────────────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const lineData = MONTHS.map((label, i) => ({ label, value: 1200 + Math.sin(i * 0.8) * 400 + i * 80 }));
const barData = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((label) => ({ label, value: 30 + Math.random() * 70 | 0 }));
const pieData = [
  { label: 'Direct', value: 4200 },
  { label: 'Organic', value: 3100 },
  { label: 'Paid', value: 2400 },
  { label: 'Referral', value: 1800 },
  { label: 'Social', value: 900 },
];

export function ChartPage() {
  return (
    <DocPage title="Chart" description="SVG-based charts — Line, Bar, Area, Pie, Donut, Sparkline. Animated on mount, interactive tooltips. No external dependencies." importNames="Chart, Sparkline">
      <DocSection title="Line Chart">
        <ExampleBlock code={`<Chart type="line" data={data} title="Monthly Revenue" animated />`}>
          <Chart type="line" data={lineData} title="Monthly Revenue" animated showGrid showLabels showTooltip />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Area Chart">
        <ExampleBlock code={`<Chart type="area" data={data} color="#8b5cf6" />`}>
          <Chart type="area" data={lineData} color="#8b5cf6" title="Visitors" animated showGrid showLabels showTooltip />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Bar Chart">
        <ExampleBlock code={`<Chart type="bar" data={data} colors={['#6366f1','#8b5cf6',...]} />`}>
          <Chart type="bar" data={barData} title="Weekly signups" animated showGrid showLabels showTooltip
            colors={['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899']} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Pie & Donut">
        <ExampleBlock code={`<Chart type="donut" data={pieData} showLegend />`} previewClassName="flex-row gap-8 flex-wrap">
          <Chart type="pie" data={pieData} showLegend title="Traffic sources" height={220} />
          <Chart type="donut" data={pieData} showLegend title="Revenue split" height={220} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Sparkline">
        <ExampleBlock code={`<Sparkline data={[10,25,15,30,20,35]} color="#6366f1" />`} previewClassName="flex-row items-center gap-6 flex-wrap">
          {[
            { data: [10, 25, 15, 30, 20, 35, 28, 40], color: '#6366f1', label: '+23%' },
            { data: [40, 30, 35, 20, 25, 15, 10, 18], color: '#ef4444', label: '-12%' },
            { data: [20, 22, 19, 25, 28, 30, 27, 32], color: '#10b981', label: '+8%' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-900 border border-gray-800">
              <Sparkline data={s.data} color={s.color} width={100} height={40} />
              <span className="text-sm font-semibold" style={{ color: s.color }}>{s.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-900 border border-gray-800">
            <Sparkline data={[10,25,15,30,20,35]} type="bar" color="#8b5cf6" width={100} height={40} />
            <span className="text-sm font-semibold text-violet-400">Bar</span>
          </div>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── DataGrid ──────────────────────────────────────────────────────────────────

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  revenue: number;
}

const USERS: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: ['Alice Chen', 'Bob Martinez', 'Carol White', 'David Kim', 'Eva Rodriguez', 'Frank Lee', 'Grace Taylor', 'Henry Brown'][i % 8],
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer', 'Manager'][i % 4],
  status: ['Active', 'Active', 'Inactive', 'Active', 'Pending'][i % 5],
  joined: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
  revenue: Math.round(1200 + Math.random() * 8000),
}));

const STATUS_COLOR: Record<string, string> = {
  Active: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  Inactive: 'text-gray-500 bg-gray-800 border-gray-700',
  Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
};

const GRID_COLUMNS: DataGridColumn<User>[] = [
  { key: 'id', header: 'ID', width: 60, sortable: true },
  { key: 'name', header: 'Name', width: 160, sortable: true, filterable: true },
  { key: 'email', header: 'Email', width: 200, sortable: true, filterable: true },
  {
    key: 'role', header: 'Role', width: 110, sortable: true, filterable: true,
    renderCell: (_, v) => <span className="px-2 py-0.5 rounded-full text-xs border border-crisp-500/30 text-crisp-400 bg-crisp-500/10">{String(v)}</span>,
  },
  {
    key: 'status', header: 'Status', width: 100, sortable: true,
    renderCell: (_, v) => <span className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_COLOR[String(v)] ?? ''}`}>{String(v)}</span>,
  },
  { key: 'joined', header: 'Joined', width: 110, sortable: true },
  {
    key: 'revenue', header: 'Revenue', width: 110, sortable: true, align: 'right',
    renderCell: (_, v) => <span className="font-mono text-sm">${Number(v).toLocaleString()}</span>,
  },
];

export function DataGridPage() {
  const [selected, setSelected] = useState<User[]>([]);
  return (
    <DocPage title="DataGrid" description="Full-featured data grid with sorting, filtering, pagination, row selection, column resizing, column visibility, density toggle, and CSV export. Zero dependencies." importNames="DataGrid">
      <DocSection title="Full featured">
        <ExampleBlock code={`<DataGrid rows={users} columns={columns} selectable exportable />`} previewClassName="p-0 overflow-hidden">
          <DataGrid
            rows={USERS}
            columns={GRID_COLUMNS}
            rowKey="id"
            selectable
            multiSelect
            exportable
            pageSize={8}
            pageSizeOptions={[5, 8, 15, 25]}
            onSelectionChange={rows => setSelected(rows as User[])}
            onRowClick={row => console.log('row clicked', row)}
          />
        </ExampleBlock>
        {selected.length > 0 && (
          <p className="text-sm text-crisp-400 mt-2">{selected.length} row{selected.length > 1 ? 's' : ''} selected</p>
        )}
      </DocSection>

      <DocSection title="Loading state">
        <ExampleBlock code={`<DataGrid rows={[]} columns={columns} loading />`} previewClassName="p-0 overflow-hidden">
          <DataGrid rows={[]} columns={GRID_COLUMNS.slice(0, 5)} loading height={250} pageSize={5} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Striped + compact">
        <ExampleBlock code={`<DataGrid stripedRows density="compact" />`} previewClassName="p-0 overflow-hidden">
          <DataGrid
            rows={USERS.slice(0, 8)}
            columns={GRID_COLUMNS.slice(0, 5)}
            rowKey="id"
            stripedRows
            density="compact"
            height={260}
            pageSize={8}
            exportable={false}
          />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── FileUpload ────────────────────────────────────────────────────────────────

export function FileUploadPage() {
  return (
    <DocPage title="FileUpload" description="Full-featured file upload with dropzone, button, and avatar variants. Includes drag & drop, multi-file, image preview, progress tracking, size validation, and animated file list." importNames="FileUpload">
      <DocSection title="Dropzone">
        <ExampleBlock code={`<FileUpload variant="dropzone" multiple maxSize={5 * 1024 * 1024} />`}>
          <FileUpload variant="dropzone" multiple maxSize={5 * 1024 * 1024} label="Upload files" hint="PNG, JPG, PDF up to 5MB" accept="image/*,.pdf" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Button trigger">
        <ExampleBlock code={`<FileUpload variant="button" multiple />`}>
          <FileUpload variant="button" multiple label="Attachments" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="Avatar uploader">
        <ExampleBlock code={`<FileUpload variant="avatar" />`}>
          <FileUpload variant="avatar" label="Profile photo" hint="Click to change" accept="image/*" />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Section Components ────────────────────────────────────────────────────────

export function SectionsPage() {
  return (
    <DocPage title="Pre-built Sections" description="Drop-in page sections with animations built in — hero, bento, testimonials, stats, CTA, logo strip." importNames="HeroCenter, HeroSplit, FeatureBento, LogoStrip, TestimonialGrid, CtaBanner, StatsBanner">
      <DocSection title="HeroCenter">
        <ExampleBlock code={`<HeroCenter
  badge="New — v1.0 released"
  title="Build faster"
  titleHighlight="ship confidently"
  description="One library for icons, animations, components, and background effects."
  actions={[{ label: 'Get started', variant: 'primary' }, { label: 'View docs', variant: 'secondary' }]}
  background="aurora"
/>`} previewClassName="p-0">
          <div className="rounded-xl overflow-hidden">
            <HeroCenter
              badge="Now in beta"
              title="Everything your UI needs,"
              titleHighlight="one import."
              description="Icons, animated icons, components, background effects. No stitching required."
              actions={[
                { label: 'Get started →', variant: 'primary' },
                { label: 'View on GitHub', variant: 'secondary' },
              ]}
              background="aurora"
            />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="HeroCenter — particles">
        <ExampleBlock code={`<HeroCenter background="particles" />`} previewClassName="p-0">
          <div className="rounded-xl overflow-hidden">
            <HeroCenter
              title="Made for dark SaaS"
              titleHighlight="UIs."
              description="Linear, Vercel, Raycast aesthetic — out of the box."
              actions={[{ label: 'Start building', variant: 'primary' }]}
              background="particles"
            />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="HeroSplit">
        <ExampleBlock code={`<HeroSplit title="Ship faster" titleHighlight="with crispui" actions={[...]} />`} previewClassName="p-0">
          <div className="rounded-xl overflow-hidden">
            <HeroSplit
              title="Ship your SaaS"
              titleHighlight="in days, not weeks."
              description="Production-ready components with animations, icons, and background effects built in."
              actions={[
                { label: 'Get started →', variant: 'primary' },
                { label: 'Live demo', variant: 'secondary' },
              ]}
              visual={
                <div className="h-72 rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden relative">
                  <AuroraBackground className="absolute inset-0" />
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Your app preview</p>
                  </div>
                </div>
              }
            />
          </div>
        </ExampleBlock>
      </DocSection>

      <DocSection title="FeatureBento">
        <ExampleBlock code={`<FeatureBento items={bentoItems} />`} previewClassName="flex-col">
          <FeatureBento items={[
            { title: 'Motion-first', description: 'Framer Motion baked in. Every component animates by default.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, color: '#6366f1', badge: 'Built in' },
            { title: '993 Icons', description: 'iconsax icon library with 6 variants each — linear, outline, broken, bold, bulk, twotone.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>, color: '#8b5cf6' },
            { title: 'Background FX', description: 'Particles, aurora, beams, gradient mesh, spotlight, star field — wrap any section.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>, color: '#06b6d4', badge: 'Unique' },
            { title: 'Full DataGrid', description: 'Sorting, filtering, pagination, selection, resize, CSV export — no AG Grid needed.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375z" /></svg>, color: '#10b981' },
            { title: 'TypeScript-first', description: 'Full type safety. Every prop, variant, and event is typed.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>, color: '#f59e0b' },
            { title: 'One install', description: 'npm install @crispui/react — done. Icons, animations, charts, everything included.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>, color: '#ec4899', badge: 'Key feature', span: 'full' as const },
          ]} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="TestimonialGrid">
        <ExampleBlock code={`<TestimonialGrid testimonials={testimonials} columns={3} />`} previewClassName="flex-col">
          <TestimonialGrid testimonials={[
            { quote: "crispui replaced 6 different libraries in our project. The DataGrid alone saved us 2 weeks.", author: "Sarah K.", role: "Engineering Lead", company: "Acme Inc.", rating: 5 },
            { quote: "The animated icons are something I've never seen bundled in a UI library before. Genuinely impressive.", author: "Marcus L.", role: "Frontend Dev", company: "TechCo", rating: 5 },
            { quote: "Background effects look incredible and they're just a component import away. Love it.", author: "Priya S.", role: "Design Engineer", company: "Startup XYZ", rating: 5 },
          ]} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="StatsBanner">
        <ExampleBlock code={`<StatsBanner stats={[{ value: '50+', label: 'Components' }, ...]} />`} previewClassName="flex-col">
          <StatsBanner stats={[
            { value: '50+', label: 'Components' },
            { value: '993', label: 'Icons' },
            { value: '8', label: 'Background effects' },
            { value: '1', label: 'Install', suffix: ' pkg' },
          ]} />
        </ExampleBlock>
      </DocSection>

      <DocSection title="CtaBanner">
        <ExampleBlock code={`<CtaBanner title="Ready to ship?" variant="glow" actions={[...]} />`} previewClassName="flex-col">
          <CtaBanner
            title="Ready to build something great?"
            description="Install crispui and go from design to production in minutes."
            variant="glow"
            actions={[
              { label: 'npm install @crispui/react', variant: 'primary' },
              { label: 'Read docs', variant: 'secondary' },
            ]}
          />
        </ExampleBlock>
      </DocSection>

      <DocSection title="LogoStrip">
        <ExampleBlock code={`<LogoStrip logos={companies} label="Trusted by teams at" />`} previewClassName="flex-col">
          <LogoStrip
            label="Trusted by teams at"
            logos={[
              { name: 'Vercel' }, { name: 'Linear' }, { name: 'Raycast' },
              { name: 'Notion' }, { name: 'Figma' }, { name: 'Stripe' },
              { name: 'GitHub' }, { name: 'Resend' },
            ]}
          />
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}

// ── Button Variants ───────────────────────────────────────────────────────────

export function ButtonVariantsPage() {
  return (
    <DocPage title="Button — All Variants" description="All 15 button variants across light, dark, premium, and soft categories." importNames="Button">
      <DocSection title="Premium variants">
        <ExampleBlock code={`<Button variant="glow">Glow</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="glass">Glass</Button>
<Button variant="soft">Soft</Button>`} previewClassName="flex-row flex-wrap gap-3 bg-gray-900 p-6 rounded-xl">
          <Button variant="glow">Glow</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="soft-rose">Soft Rose</Button>
          <Button variant="soft-emerald">Soft Emerald</Button>
          <Button variant="soft-amber">Soft Amber</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Dark variants">
        <ExampleBlock code={`<Button variant="dark">Dark</Button>
<Button variant="dark-outline">Dark Outline</Button>
<Button variant="dark-ghost">Dark Ghost</Button>`} previewClassName="flex-row flex-wrap gap-3 bg-gray-900 p-6 rounded-xl">
          <Button variant="dark">Dark</Button>
          <Button variant="dark-outline">Dark Outline</Button>
          <Button variant="dark-ghost">Dark Ghost</Button>
          <Button variant="dark-destructive">Dark Destructive</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="All sizes">
        <ExampleBlock code={`<Button size="xs">XS</Button> <Button size="sm">SM</Button> ...`} previewClassName="flex-row flex-wrap items-center gap-3">
          <Button size="xs" variant="gradient">XSmall</Button>
          <Button size="sm" variant="gradient">Small</Button>
          <Button size="md" variant="gradient">Medium</Button>
          <Button size="lg" variant="gradient">Large</Button>
          <Button size="xl" variant="gradient">XLarge</Button>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Loading states">
        <ExampleBlock code={`<Button loading>Loading...</Button>`} previewClassName="flex-row gap-3">
          <Button loading>Loading</Button>
          <Button loading variant="gradient">Saving</Button>
          <Button loading variant="dark">Processing</Button>
        </ExampleBlock>
      </DocSection>
    </DocPage>
  );
}
