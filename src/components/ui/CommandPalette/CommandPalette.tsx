import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import { useDebounce } from '../../../hooks/useDebounce';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  group?: string;
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

function groupItems(items: CommandItem[]): CommandGroup[] {
  const groups: Record<string, CommandItem[]> = {};
  for (const item of items) {
    const g = item.group ?? '_default';
    if (!groups[g]) groups[g] = [];
    groups[g].push(item);
  }
  return Object.entries(groups).map(([id, items]) => ({
    id,
    label: id === '_default' ? '' : id,
    items,
  }));
}

function scoreItem(item: CommandItem, query: string): number {
  const q = query.toLowerCase();
  const label = item.label.toLowerCase();
  const desc = item.description?.toLowerCase() ?? '';
  const keywords = item.keywords?.join(' ').toLowerCase() ?? '';
  if (label === q) return 100;
  if (label.startsWith(q)) return 80;
  if (label.includes(q)) return 60;
  if (desc.includes(q) || keywords.includes(q)) return 40;
  return 0;
}

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = 'Search commands…',
  emptyMessage = 'No results found.',
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 80);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter + sort
  const filtered = debouncedQuery
    ? items
        .map(item => ({ item, score: scoreItem(item, debouncedQuery) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(x => x.item)
    : items;

  const groups = groupItems(filtered);
  const flatItems = groups.flatMap(g => g.items);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flatItems[activeIndex]?.onSelect();
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  let flatIdx = 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4">
          <motion.div
            className="absolute inset-0 bg-gray-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.div
            className={cn('relative w-full max-w-xl bg-white rounded-2xl shadow-2xl shadow-gray-900/25 overflow-hidden', className)}
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            onKeyDown={handleKeyDown}
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-400">{emptyMessage}</div>
              ) : (
                groups.map(group => (
                  <div key={group.id}>
                    {group.label && (
                      <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {group.label}
                      </div>
                    )}
                    {group.items.map(item => {
                      const idx = flatIdx++;
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={item.id}
                          data-active={isActive}
                          onClick={() => { item.onSelect(); onClose(); }}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75',
                            isActive ? 'bg-crisp-50' : 'hover:bg-gray-50',
                          )}
                        >
                          {item.icon && (
                            <span className={cn('w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 text-sm', isActive ? 'bg-crisp-100 text-crisp-600' : 'bg-gray-100 text-gray-500')}>
                              {item.icon}
                            </span>
                          )}
                          <span className="flex-1 min-w-0">
                            <span className={cn('text-sm font-medium block', isActive ? 'text-crisp-700' : 'text-gray-800')}>
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="text-xs text-gray-400 truncate block">{item.description}</span>
                            )}
                          </span>
                          {item.shortcut && (
                            <span className="flex items-center gap-1 flex-shrink-0">
                              {item.shortcut.map(k => (
                                <kbd key={k} className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">{k}</kbd>
                              ))}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><kbd className="bg-gray-200 px-1 rounded font-mono">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-gray-200 px-1 rounded font-mono">↵</kbd> select</span>
              </div>
              <span className="text-[10px] text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── useCommandPalette ──────────────────────────────────────────────────────

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return { open, setOpen, toggle: () => setOpen(o => !o) };
}
