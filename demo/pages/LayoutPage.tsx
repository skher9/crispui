import { Stack, HStack, Grid, Container } from '@crispui/react';
import { DocPage, DocSection } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

// ── Stack ─────────────────────────────────────────────────────────────────────

export function StackPage() {
  return (
    <DocPage title="Stack / HStack / VStack" description="Flexbox layout primitives with gap, alignment, and wrap control. HStack and VStack are row/col shortcuts." importNames="Stack, HStack, VStack">
      <DocSection title="HStack (horizontal)">
        <ExampleBlock code={`<HStack gap={3}>
  <Box />
  <Box />
  <Box />
</HStack>`}>
          <HStack gap={3}>
            {[1, 2, 3].map(i => (
              <div key={i} className="w-16 h-16 rounded-lg bg-crisp-500/30 border border-crisp-500/50 flex items-center justify-center text-crisp-300 text-sm font-medium">{i}</div>
            ))}
          </HStack>
        </ExampleBlock>
      </DocSection>

      <DocSection title="VStack (vertical)">
        <ExampleBlock code={`<Stack direction="col" gap={2} align="start">
  <div>Row 1</div>
  <div>Row 2</div>
  <div>Row 3</div>
</Stack>`} previewClassName="flex-col items-start">
          <Stack direction="col" gap={2} align="start">
            {['Row 1', 'Row 2', 'Row 3'].map(row => (
              <div key={row} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300">{row}</div>
            ))}
          </Stack>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'direction', type: "'row' | 'col'", default: "'col'", description: 'Flex direction (Stack only — use HStack/VStack for shortcuts).' },
        { name: 'gap', type: 'number', default: '4', description: 'Gap between children (maps to Tailwind gap-*).' },
        { name: 'align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", default: "'stretch'", description: 'align-items value.' },
        { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", default: "'start'", description: 'justify-content value.' },
        { name: 'wrap', type: 'boolean', default: 'false', description: 'flex-wrap: wrap.' },
      ]} />
    </DocPage>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────

export function GridPage() {
  return (
    <DocPage title="Grid" description="CSS Grid wrapper with column count and gap control." importNames="Grid">
      <DocSection title="3-column grid">
        <ExampleBlock code={`<Grid cols={3} gap={4}>
  <Card>Cell 1</Card>
  <Card>Cell 2</Card>
  <Card>Cell 3</Card>
  <Card>Cell 4</Card>
  <Card>Cell 5</Card>
  <Card>Cell 6</Card>
</Grid>`} previewClassName="flex-col items-stretch w-full">
          <Grid cols={3} gap={3}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-6 text-sm text-gray-300 text-center">Cell {i + 1}</div>
            ))}
          </Grid>
        </ExampleBlock>
      </DocSection>

      <DocSection title="Responsive (responsive prop)">
        <ExampleBlock code={`<Grid cols={3} gap={4} responsive>
  {/* starts at 1 col on mobile, goes to 3 on sm: */}
  ...
</Grid>`} previewClassName="flex-col items-stretch w-full">
          <Grid cols={3} gap={3} responsive>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-6 text-sm text-gray-300 text-center">Responsive {i + 1}</div>
            ))}
          </Grid>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'cols', type: '1 | 2 | 3 | 4 | 6 | 12', description: 'Number of columns.' },
        { name: 'gap', type: '2 | 3 | 4 | 6 | 8', default: '4', description: 'Gap between grid cells.' },
        { name: 'responsive', type: 'boolean', default: 'false', description: 'Halves the column count on sm: breakpoint.' },
      ]} />
    </DocPage>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────

export function ContainerPage() {
  return (
    <DocPage title="Container" description="A centered max-width wrapper that adds consistent horizontal padding." importNames="Container">
      <DocSection title="Sizes">
        <ExampleBlock code={`<Container size="md">
  <p>Centered, max-width md (768px).</p>
</Container>

<Container size="xl">
  <p>Centered, max-width xl (1280px).</p>
</Container>`} previewClassName="flex-col items-stretch w-full gap-3">
          <Container size="md" className="bg-gray-800 border border-gray-700 rounded-lg py-3">
            <p className="text-sm text-gray-300 text-center">md container</p>
          </Container>
          <Container size="lg" className="bg-gray-800 border border-gray-700 rounded-lg py-3">
            <p className="text-sm text-gray-300 text-center">lg container</p>
          </Container>
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'", default: "'xl'", description: 'Maximum width of the container.' },
        { name: 'center', type: 'boolean', default: 'true', description: 'Centers the container horizontally with mx-auto.' },
        { name: 'px', type: 'boolean', default: 'true', description: 'Adds horizontal padding.' },
      ]} />
    </DocPage>
  );
}
