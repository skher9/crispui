import { useState, useMemo, useCallback, useRef } from 'react';
import { cn } from '../../../utils/cn';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type SortDir = 'asc' | 'desc' | null;

export interface DataGridColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: number;
  minWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  pinned?: 'left' | 'right';
  hidden?: boolean;
  align?: 'left' | 'center' | 'right';
  renderCell?: (row: T, value: unknown) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  valueGetter?: (row: T) => unknown;
}

export interface DataGridProps<T = Record<string, unknown>> {
  rows: T[];
  columns: DataGridColumn<T>[];
  rowKey?: keyof T | ((row: T) => string);
  height?: number | string;
  pageSize?: number;
  pageSizeOptions?: number[];
  selectable?: boolean;
  multiSelect?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyText?: string;
  density?: 'compact' | 'normal' | 'comfortable';
  stripedRows?: boolean;
  showColumnBorder?: boolean;
  stickyHeader?: boolean;
  exportable?: boolean;
  className?: string;
  getRowClassName?: (row: T) => string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getVal<T>(row: T, col: DataGridColumn<T>): unknown {
  if (col.valueGetter) return col.valueGetter(row);
  return (row as Record<string, unknown>)[col.key];
}

function exportCsv<T>(rows: T[], columns: DataGridColumn<T>[]) {
  const visibleCols = columns.filter(c => !c.hidden);
  const header = visibleCols.map(c => `"${c.header}"`).join(',');
  const dataRows = rows.map(r => visibleCols.map(c => `"${String(getVal(r, c) ?? '')}"`).join(','));
  const csv = [header, ...dataRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'export.csv'; a.click();
  URL.revokeObjectURL(url);
}

const densityMap = {
  compact: 'h-8 text-xs',
  normal: 'h-10 text-sm',
  comfortable: 'h-12 text-sm',
};

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir: SortDir }) {
  return (
    <span className="flex flex-col gap-[1px] opacity-40">
      <svg className={cn('w-2.5 h-2.5', dir === 'asc' && 'opacity-100 text-crisp-400')} fill="currentColor" viewBox="0 0 10 6">
        <path d="M5 0L10 6H0z" />
      </svg>
      <svg className={cn('w-2.5 h-2.5 rotate-180', dir === 'desc' && 'opacity-100 text-crisp-400')} fill="currentColor" viewBox="0 0 10 6">
        <path d="M5 0L10 6H0z" />
      </svg>
    </span>
  );
}

// ─── Column Filter ────────────────────────────────────────────────────────────

function ColumnFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-crisp-500 mt-1"
      placeholder="Filter…"
      value={value}
      onChange={e => onChange(e.target.value)}
      onClick={e => e.stopPropagation()}
    />
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar<T>({
  globalFilter, setGlobalFilter,
  density, setDensity,
  columns, toggleColumn,
  exportable, rows, allColumns,
}: {
  globalFilter: string;
  setGlobalFilter: (v: string) => void;
  density: 'compact' | 'normal' | 'comfortable';
  setDensity: (d: 'compact' | 'normal' | 'comfortable') => void;
  columns: DataGridColumn<T>[];
  allColumns: DataGridColumn<T>[];
  toggleColumn: (key: string) => void;
  exportable: boolean;
  rows: T[];
}) {
  const [showCols, setShowCols] = useState(false);
  const colRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 flex-wrap">
      {/* Global search */}
      <div className="relative flex-1 min-w-[140px] max-w-xs">
        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          className="w-full h-8 bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-3 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-crisp-500"
          placeholder="Search all columns…"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Density */}
        <div className="flex items-center rounded-lg border border-gray-700 overflow-hidden">
          {(['compact', 'normal', 'comfortable'] as const).map(d => (
            <button key={d} type="button" onClick={() => setDensity(d)}
              className={cn('px-2 py-1 text-[10px] transition-colors', density === d ? 'bg-gray-700 text-gray-200' : 'text-gray-500 hover:text-gray-300')}>
              {d === 'compact' ? 'S' : d === 'normal' ? 'M' : 'L'}
            </button>
          ))}
        </div>

        {/* Column visibility */}
        <div ref={colRef} className="relative">
          <button type="button" onClick={() => setShowCols(v => !v)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-gray-700 text-xs text-gray-400 hover:text-gray-200 hover:border-gray-500 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15M3 9h18M3 15h18" />
            </svg>
            Columns
          </button>
          {showCols && (
            <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-xl border border-gray-700 bg-gray-900 shadow-xl p-2">
              {allColumns.map(col => (
                <label key={col.key} className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-gray-800 text-xs text-gray-300">
                  <input type="checkbox" checked={!col.hidden} onChange={() => toggleColumn(col.key)}
                    className="w-3.5 h-3.5 rounded border-gray-600 accent-crisp-500" />
                  {col.header}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Export */}
        {exportable && (
          <button type="button" onClick={() => exportCsv(rows, columns)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-gray-700 text-xs text-gray-400 hover:text-gray-200 hover:border-gray-500 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            CSV
          </button>
        )}
      </div>
    </div>
  );
}

// ─── DataGrid ─────────────────────────────────────────────────────────────────

export function DataGrid<T extends Record<string, unknown>>({
  rows,
  columns: initialColumns,
  rowKey,
  height = 400,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  selectable = false,
  multiSelect = true,
  onSelectionChange,
  onRowClick,
  loading = false,
  emptyText = 'No data',
  density = 'normal',
  stripedRows = false,
  showColumnBorder = false,
  stickyHeader = true,
  exportable = true,
  className,
  getRowClassName,
}: DataGridProps<T>) {
  const [columns, setColumns] = useState(initialColumns);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [currentDensity, setCurrentDensity] = useState(density);

  const getRowId = useCallback((row: T, idx: number): string => {
    if (!rowKey) return String(idx);
    if (typeof rowKey === 'function') return rowKey(row);
    return String(row[rowKey]);
  }, [rowKey]);

  const visibleColumns = columns.filter(c => !c.hidden);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return rows;
    const col = columns.find(c => c.key === sortKey);
    return [...rows].sort((a, b) => {
      const va = col ? getVal(a, col) : (a as Record<string,unknown>)[sortKey];
      const vb = col ? getVal(b, col) : (b as Record<string,unknown>)[sortKey];
      const cmp = String(va ?? '').localeCompare(String(vb ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir, columns]);

  // Filter
  const filtered = useMemo(() => {
    return sorted.filter(row => {
      // Global
      if (globalFilter) {
        const q = globalFilter.toLowerCase();
        const matches = visibleColumns.some(col => String(getVal(row, col) ?? '').toLowerCase().includes(q));
        if (!matches) return false;
      }
      // Column filters
      for (const [key, val] of Object.entries(columnFilters)) {
        if (!val) continue;
        const col = columns.find(c => c.key === key);
        if (col && !String(getVal(row, col) ?? '').toLowerCase().includes(val.toLowerCase())) return false;
      }
      return true;
    });
  }, [sorted, globalFilter, columnFilters, columns, visibleColumns]);

  // Paginate
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key); setSortDir('asc');
    }
    setPage(0);
  };

  const toggleColumn = (key: string) => {
    setColumns(prev => prev.map(c => c.key === key ? { ...c, hidden: !c.hidden } : c));
  };

  const toggleSelect = (id: string, _row: T) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (multiSelect) {
        next.has(id) ? next.delete(id) : next.add(id);
      } else {
        if (next.has(id)) next.clear(); else { next.clear(); next.add(id); }
      }
      const selectedRows = paged.filter((r, i) => next.has(getRowId(r, i)));
      onSelectionChange?.(selectedRows);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paged.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const ids = new Set(paged.map((r, i) => getRowId(r, i)));
      setSelected(ids);
      onSelectionChange?.(paged);
    }
  };

  const rowH = densityMap[currentDensity];

  // Column resizing
  const resizeRef = useRef<{ key: string; startX: number; startW: number } | null>(null);

  const startResize = (e: React.MouseEvent, key: string, currentWidth: number) => {
    e.stopPropagation();
    resizeRef.current = { key, startX: e.clientX, startW: currentWidth };
    const onMove = (me: MouseEvent) => {
      if (!resizeRef.current) return;
      const diff = me.clientX - resizeRef.current.startX;
      setColumns(prev => prev.map(c => c.key === key ? { ...c, width: Math.max(c.minWidth ?? 60, resizeRef.current!.startW + diff) } : c));
    };
    const onUp = () => { resizeRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div className={cn('flex flex-col rounded-xl border border-gray-800 bg-gray-950 overflow-hidden', className)}>
      <Toolbar
        globalFilter={globalFilter} setGlobalFilter={v => { setGlobalFilter(v); setPage(0); }}
        density={currentDensity} setDensity={setCurrentDensity}
        columns={visibleColumns} allColumns={columns} toggleColumn={toggleColumn}
        exportable={exportable} rows={filtered}
      />

      {/* Table */}
      <div style={{ height, overflow: 'auto' }} className="relative">
        <table className="w-full border-collapse table-fixed" style={{ minWidth: visibleColumns.reduce((s, c) => s + (c.width ?? 150), selectable ? 40 : 0) }}>
          <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
            <tr className="bg-gray-900 border-b border-gray-800">
              {selectable && (
                <th className="w-10 px-3">
                  {multiSelect && (
                    <input type="checkbox" checked={selected.size === paged.length && paged.length > 0}
                      onChange={toggleAll} className="rounded border-gray-600 accent-crisp-500 w-4 h-4" />
                  )}
                </th>
              )}
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  style={{ width: col.width ?? 150, minWidth: col.minWidth ?? 60, textAlign: col.align ?? 'left' }}
                  className={cn('relative px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider select-none',
                    col.sortable !== false && 'cursor-pointer hover:text-gray-200',
                    showColumnBorder && 'border-r border-gray-800',
                  )}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.renderHeader ? col.renderHeader() : col.header}
                    {col.sortable !== false && <SortIcon dir={sortKey === col.key ? sortDir : null} />}
                  </div>
                  {col.filterable && (
                    <ColumnFilter value={columnFilters[col.key] ?? ''} onChange={v => { setColumnFilters(prev => ({ ...prev, [col.key]: v })); setPage(0); }} />
                  )}
                  {col.resizable !== false && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-crisp-500/50 transition-colors"
                      onMouseDown={e => startResize(e, col.key, col.width ?? 150)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: pageSize }, (_, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  {selectable && <td className="px-3 py-2"><div className="h-3 w-4 bg-gray-800 rounded animate-pulse" /></td>}
                  {visibleColumns.map(col => (
                    <td key={col.key} className="px-3 py-2">
                      <div className="h-3 bg-gray-800 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center text-sm text-gray-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paged.map((row, idx) => {
                const id = getRowId(row, idx);
                const isSelected = selected.has(id);
                return (
                  <tr
                    key={id}
                    onClick={() => { onRowClick?.(row); if (selectable) toggleSelect(id, row); }}
                    className={cn(
                      'border-b border-gray-800/50 transition-colors',
                      onRowClick || selectable ? 'cursor-pointer' : '',
                      isSelected ? 'bg-crisp-500/10' : stripedRows && idx % 2 === 1 ? 'bg-gray-900/40' : 'hover:bg-gray-900/60',
                      getRowClassName?.(row),
                    )}
                  >
                    {selectable && (
                      <td className="px-3" onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(id, row)}
                          className="rounded border-gray-600 accent-crisp-500 w-4 h-4" />
                      </td>
                    )}
                    {visibleColumns.map(col => {
                      const val = getVal(row, col);
                      return (
                        <td
                          key={col.key}
                          style={{ textAlign: col.align ?? 'left' }}
                          className={cn('px-3 text-gray-300 truncate', rowH, showColumnBorder && 'border-r border-gray-800/50')}
                        >
                          {col.renderCell ? col.renderCell(row, val) : String(val ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{filtered.length} rows</span>
          {selected.size > 0 && <span className="text-crisp-400">{selected.size} selected</span>}
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPage(0); }}
            className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-gray-400 focus:outline-none"
          >
            {pageSizeOptions.map(n => <option key={n} value={n}>{n} / page</option>)}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" disabled={page === 0} onClick={() => setPage(0)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 disabled:opacity-30 hover:bg-gray-800 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" /></svg>
          </button>
          <button type="button" disabled={page === 0} onClick={() => setPage(p => p - 1)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 disabled:opacity-30 hover:bg-gray-800 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <span className="px-3 text-xs text-gray-400">{page + 1} / {Math.max(1, totalPages)}</span>
          <button type="button" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 disabled:opacity-30 hover:bg-gray-800 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
          <button type="button" disabled={page >= totalPages - 1} onClick={() => setPage(totalPages - 1)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 disabled:opacity-30 hover:bg-gray-800 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
