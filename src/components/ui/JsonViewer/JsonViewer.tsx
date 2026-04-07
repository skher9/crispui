import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JsonViewerProps {
  data: unknown;
  defaultExpanded?: boolean;
  expandDepth?: number;    // auto-expand up to this depth
  className?: string;
  rootName?: string;
  showDataTypes?: boolean;
  showCopyButton?: boolean;
  indent?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function preview(value: unknown): string {
  const type = getType(value);
  if (type === 'array') return `[${(value as unknown[]).length}]`;
  if (type === 'object') {
    const keys = Object.keys(value as object);
    return `{${keys.length > 3 ? keys.slice(0, 3).join(', ') + '…' : keys.join(', ')}}`;
  }
  return '';
}

// ─── JsonNode ─────────────────────────────────────────────────────────────────

interface JsonNodeProps {
  name: string | null;
  value: unknown;
  depth: number;
  expandDepth: number;
  showDataTypes: boolean;
  isLast: boolean;
}

function JsonNode({ name, value, depth, expandDepth, showDataTypes, isLast }: JsonNodeProps) {
  const type = getType(value);
  const isExpandable = type === 'object' || type === 'array';
  const [expanded, setExpanded] = useState(depth < expandDepth);

  const renderPrimitive = () => {
    if (type === 'null') return <span className="text-rose-400">null</span>;
    if (type === 'undefined') return <span className="text-gray-500">undefined</span>;
    if (type === 'boolean') return <span className="text-amber-400">{String(value)}</span>;
    if (type === 'number') return <span className="text-sky-400">{String(value)}</span>;
    if (type === 'string') return <span className="text-emerald-400">"{value as string}"</span>;
    return <span className="text-gray-300">{String(value)}</span>;
  };

  const entries = isExpandable
    ? type === 'array'
      ? (value as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
      : Object.entries(value as object)
    : [];

  const bracketOpen = type === 'array' ? '[' : '{';
  const bracketClose = type === 'array' ? ']' : '}';

  return (
    <div className={cn('font-mono text-xs leading-relaxed', depth > 0 && 'ml-4')}>
      <div className="flex items-start gap-1 group">
        {/* Expand toggle */}
        {isExpandable ? (
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="shrink-0 w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors mt-0.5 rounded"
          >
            <svg
              className={cn('w-2.5 h-2.5 transition-transform duration-150', expanded && 'rotate-90')}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Key */}
        {name !== null && (
          <>
            <span className={cn('shrink-0', type === 'array' ? 'text-amber-400' : 'text-violet-400')}>
              {type === 'array' || /^\d+$/.test(name) ? <span className="text-amber-400">{name}</span> : `"${name}"`}
            </span>
            <span className="text-gray-600 shrink-0">:</span>
          </>
        )}

        {/* Value or bracket + preview */}
        {isExpandable ? (
          <span className="text-gray-500">
            <span>{bracketOpen}</span>
            {!expanded && (
              <span className="text-gray-600 ml-1 italic">{preview(value)}</span>
            )}
            {!expanded && <span>{bracketClose}</span>}
            {showDataTypes && (
              <span className="ml-2 text-[10px] text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {type}
              </span>
            )}
          </span>
        ) : (
          <span>
            {renderPrimitive()}
            {!isLast && <span className="text-gray-700">,</span>}
            {showDataTypes && (
              <span className="ml-2 text-[10px] text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {type}
              </span>
            )}
          </span>
        )}
      </div>

      {/* Expanded children */}
      {isExpandable && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="ml-4 border-l border-gray-800 pl-2 mt-0.5">
                {entries.map(([k, v], i) => (
                  <JsonNode
                    key={k}
                    name={k}
                    value={v}
                    depth={depth + 1}
                    expandDepth={expandDepth}
                    showDataTypes={showDataTypes}
                    isLast={i === entries.length - 1}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 shrink-0" />
                <span className="text-gray-500">{bracketClose}</span>
                {!isLast && <span className="text-gray-700">,</span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── JsonViewer ───────────────────────────────────────────────────────────────

export function JsonViewer({
  data, expandDepth = 2, className,
  rootName = 'root', showDataTypes = true, showCopyButton = true,
}: JsonViewerProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className={cn('rounded-xl border border-gray-800 bg-gray-950 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/60">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="text-xs text-gray-400 font-mono">{rootName}</span>
        </div>
        {showCopyButton && (
          <button
            type="button"
            onClick={copy}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy JSON
              </>
            )}
          </button>
        )}
      </div>

      {/* Tree */}
      <div className="p-4 overflow-auto max-h-[480px]">
        <JsonNode
          name={null}
          value={data}
          depth={0}
          expandDepth={expandDepth}
          showDataTypes={showDataTypes}
          isLast={true}
        />
      </div>
    </div>
  );
}
