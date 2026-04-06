import { StatCard, DataTable, AnimatedCounter } from '@crispui/react';
import type { ColumnDef } from '@crispui/react';
import { DocPage, DocSection } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

type User = { id: number; name: string; role: string; status: string };

const USERS: User[] = [
  { id: 1, name: 'Alice Chen', role: 'Engineer', status: 'active' },
  { id: 2, name: 'Bob Ross', role: 'Designer', status: 'active' },
  { id: 3, name: 'Carol White', role: 'PM', status: 'inactive' },
  { id: 4, name: 'Dave Brown', role: 'Engineer', status: 'active' },
];

const COLUMNS: ColumnDef<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (_value, row: User) => (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${row.status === 'active' ? 'text-emerald-400' : 'text-gray-500'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'active' ? 'bg-emerald-400' : 'bg-gray-500'}`} />
        {row.status}
      </span>
    ),
  },
];

// ── StatCard ──────────────────────────────────────────────────────────────────

export function StatCardPage() {
  return (
    <DocPage title="StatCard" description="Metric card with title, value, delta indicator, and optional icon." importNames="StatCard, AnimatedCounter">
      <DocSection title="Basic stats">
        <ExampleBlock code={`<StatCard title="Total Users" value={12450} delta={8.2} deltaType="increase" />
<StatCard title="MRR" value="$48,230" delta={3.1} deltaType="increase" />
<StatCard title="Churn" value="2.4%" delta={0.3} deltaType="decrease" />`} previewClassName="flex-col items-stretch gap-3 w-full max-w-xs">
          <StatCard title="Total Users" value={12450} delta={8.2} deltaType="increase" />
          <StatCard title="MRR" value="$48,230" delta={3.1} deltaType="increase" />
          <StatCard title="Churn" value="2.4%" delta={0.3} deltaType="decrease" />
        </ExampleBlock>
      </DocSection>

      <DocSection title="AnimatedCounter">
        <ExampleBlock code={`<AnimatedCounter from={0} to={12450} duration={1500} />
<AnimatedCounter from={0} to={99} suffix="%" />`} previewClassName="flex-col items-start gap-3">
          <div className="text-4xl font-bold text-crisp-400">
            <AnimatedCounter from={0} to={12450} duration={1500} />
          </div>
          <div className="text-4xl font-bold text-emerald-400">
            <AnimatedCounter from={0} to={99} suffix="%" />
          </div>
        </ExampleBlock>
      </DocSection>

      <PropsTable title="StatCard Props" props={[
        { name: 'title', type: 'string', required: true, description: 'Metric label.' },
        { name: 'value', type: 'string | number', required: true, description: 'The displayed value.' },
        { name: 'delta', type: 'string | number', description: 'Change value shown as a badge.' },
        { name: 'deltaType', type: "'increase' | 'decrease' | 'neutral'", description: 'Determines badge color.' },
        { name: 'icon', type: 'ReactNode', description: 'Optional icon in the top-right.' },
        { name: 'variant', type: 'ColorToken', description: 'Color theme.' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Shows skeleton loading state.' },
      ]} />
      <PropsTable title="AnimatedCounter Props" props={[
        { name: 'from', type: 'number', default: '0', description: 'Starting value.' },
        { name: 'to', type: 'number', required: true, description: 'Target value.' },
        { name: 'duration', type: 'number', default: '1000', description: 'Animation duration in ms.' },
        { name: 'prefix', type: 'string', description: 'Prepended to the value (e.g. "$").' },
        { name: 'suffix', type: 'string', description: 'Appended to the value (e.g. "%").' },
      ]} />
    </DocPage>
  );
}

// ── DataTable ─────────────────────────────────────────────────────────────────

export function DataTablePage() {
  return (
    <DocPage title="DataTable" description="Sortable, selectable table with custom cell renderers and pagination." importNames="DataTable">
      <DocSection title="Basic table">
        <ExampleBlock code={`type User = { id: number; name: string; role: string; status: string };

const columns: ColumnDef<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status', render: row => <StatusBadge status={row.status} /> },
];

<DataTable data={users} columns={columns} rowKey="id" />`} previewClassName="flex-col items-stretch w-full">
          <DataTable data={USERS} columns={COLUMNS} rowKey="id" />
        </ExampleBlock>
      </DocSection>

      <PropsTable props={[
        { name: 'data', type: 'T[]', required: true, description: 'Array of row objects.' },
        { name: 'columns', type: 'ColumnDef<T>[]', required: true, description: 'Column definitions.' },
        { name: 'rowKey', type: 'keyof T', required: true, description: 'Unique key field for row identity.' },
        { name: 'sortable', type: 'boolean', default: 'true', description: 'Enables column header click to sort.' },
        { name: 'selectable', type: 'boolean', default: 'false', description: 'Adds a checkbox column for row selection.' },
        { name: 'onRowClick', type: '(row: T) => void', description: 'Called when a row is clicked.' },
        { name: 'pageSize', type: 'number', description: 'Enables pagination with this page size.' },
        { name: 'emptyMessage', type: 'string', default: "'No data'", description: 'Message shown when data array is empty.' },
      ]} />
    </DocPage>
  );
}
