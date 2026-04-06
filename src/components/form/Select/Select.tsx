import { forwardRef, useId, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  badge?: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  creatable?: boolean;         // allow typing new values
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  maxSelected?: number;
  noOptionsText?: string;
  createText?: (input: string) => string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
}

const sizeMap = {
  sm: { trigger: 'min-h-8 text-xs px-3 rounded-lg', option: 'px-3 py-1.5 text-xs', label: 'text-xs' },
  md: { trigger: 'min-h-10 text-sm px-3.5 rounded-xl', option: 'px-3 py-2 text-sm', label: 'text-sm' },
  lg: { trigger: 'min-h-12 text-base px-4 rounded-xl', option: 'px-4 py-2.5 text-base', label: 'text-sm' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-crisp-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={cn('w-4 h-4 text-gray-500 transition-transform duration-150', open && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────

export const Select = forwardRef<HTMLDivElement, SelectProps>(({
  options, value, defaultValue, onChange,
  multiple = false, searchable = false, clearable = false,
  creatable = false, loading = false, disabled = false,
  placeholder = 'Select…', label, hint, error,
  size = 'md', maxSelected, noOptionsText = 'No options',
  createText = (v) => `Create "${v}"`,
  id: propId, className, wrapperClassName,
}, ref) => {
  const genId = useId();
  const id = propId ?? genId;
  const s = sizeMap[size];

  // State
  const initVal = (): string[] => {
    const v = value ?? defaultValue;
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };
  const [selected, setSelected] = useState<string[]>(initVal);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelected(Array.isArray(value) ? value : value ? [value] : []);
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search when opening
  useEffect(() => {
    if (open && searchable) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open, searchable]);

  const toggle = useCallback((val: string) => {
    setSelected(prev => {
      let next: string[];
      if (multiple) {
        if (prev.includes(val)) {
          next = prev.filter(v => v !== val);
        } else {
          if (maxSelected && prev.length >= maxSelected) return prev;
          next = [...prev, val];
        }
      } else {
        next = prev[0] === val ? [] : [val];
        setOpen(false);
        setSearch('');
      }
      onChange?.(multiple ? next : (next[0] ?? ''));
      return next;
    });
  }, [multiple, maxSelected, onChange]);

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
    onChange?.(multiple ? [] : '');
  };

  const removeTag = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(val);
  };

  // Filter + group options
  const q = search.toLowerCase();
  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q)
  );

  const groups = filtered.reduce<Record<string, SelectOption[]>>((acc, opt) => {
    const g = opt.group ?? '';
    (acc[g] = acc[g] ?? []).push(opt);
    return acc;
  }, {});

  const selectedOptions = selected.map(v => options.find(o => o.value === v)).filter(Boolean) as SelectOption[];
  const hasValue = selected.length > 0;

  return (
    <div ref={wrapperClassName ? undefined : ref} className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={id} className={cn('font-medium text-gray-200', s.label)}>
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <div
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => !disabled && setOpen(o => !o)}
          className={cn(
            'w-full flex items-center gap-2 flex-wrap border bg-gray-900 cursor-pointer transition-all duration-150 py-1.5 pr-9',
            s.trigger,
            error ? 'border-rose-500 focus-within:border-rose-500' : 'border-gray-700 hover:border-gray-500 focus-within:border-crisp-500',
            open && !error && 'border-crisp-500 ring-2 ring-crisp-500/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
        >
          {/* Tags (multiple) */}
          {multiple && selectedOptions.map(opt => (
            <span key={opt.value} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-crisp-500/15 text-crisp-300 text-xs font-medium">
              {opt.label}
              <button type="button" onClick={e => removeTag(opt.value, e)} className="hover:text-crisp-100 transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}

          {/* Single value */}
          {!multiple && hasValue && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {selectedOptions[0]?.avatar && (
                <img src={selectedOptions[0].avatar} className="w-5 h-5 rounded-full shrink-0" alt="" />
              )}
              {selectedOptions[0]?.icon && (
                <span className="shrink-0 text-gray-400">{selectedOptions[0].icon}</span>
              )}
              <span className="truncate text-gray-100">{selectedOptions[0]?.label}</span>
              {selectedOptions[0]?.badge && (
                <span className="ml-auto shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400">
                  {selectedOptions[0].badge}
                </span>
              )}
            </div>
          )}

          {/* Placeholder */}
          {!hasValue && !(multiple && selected.length > 0) && (
            <span className="text-gray-600 flex-1 select-none">{placeholder}</span>
          )}

          {/* Count badge for multiple */}
          {multiple && selected.length > 3 && (
            <span className="text-xs text-gray-500">+{selected.length - 3} more</span>
          )}
        </div>

        {/* Right icons */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && (
            <svg className="animate-spin w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {clearable && hasValue && !loading && (
            <button type="button" onClick={clear} className="text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <ChevronIcon open={open} />
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.13 }}
              className="absolute z-50 w-full mt-1.5 rounded-xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/40 overflow-hidden"
            >
              {/* Search */}
              {(searchable || creatable) && (
                <div className="p-2 border-b border-gray-800">
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search…"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-crisp-500"
                  />
                </div>
              )}

              <ul role="listbox" aria-multiselectable={multiple} className="max-h-60 overflow-y-auto py-1">
                {/* Creatable option */}
                {creatable && search && !options.find(o => o.label.toLowerCase() === search.toLowerCase()) && (
                  <li
                    role="option"
                    onClick={() => {
                      toggle(search);
                      if (!multiple) setSearch('');
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer text-crisp-400 hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {createText(search)}
                  </li>
                )}

                {filtered.length === 0 && !creatable && (
                  <li className="px-3 py-4 text-sm text-gray-500 text-center">{noOptionsText}</li>
                )}

                {Object.entries(groups).map(([group, opts]) => (
                  <div key={group}>
                    {group && (
                      <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                        {group}
                      </p>
                    )}
                    {opts.map(opt => {
                      const isSelected = selected.includes(opt.value);
                      return (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => !opt.disabled && toggle(opt.value)}
                          className={cn(
                            'flex items-center gap-2.5 cursor-pointer transition-colors',
                            s.option,
                            opt.disabled && 'opacity-40 cursor-not-allowed',
                            isSelected ? 'bg-crisp-500/10 text-crisp-300' : 'text-gray-200 hover:bg-gray-800',
                          )}
                        >
                          {opt.avatar && <img src={opt.avatar} className="w-6 h-6 rounded-full shrink-0" alt="" />}
                          {opt.icon && <span className="shrink-0 text-gray-400 w-4 h-4">{opt.icon}</span>}
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{opt.label}</p>
                            {opt.description && <p className="text-xs text-gray-500 truncate">{opt.description}</p>}
                          </div>
                          {opt.badge && (
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-400">
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && <CheckIcon />}
                        </li>
                      );
                    })}
                  </div>
                ))}
              </ul>

              {/* Multi footer */}
              {multiple && selected.length > 0 && (
                <div className="px-3 py-2 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{selected.length} selected{maxSelected ? ` / ${maxSelected}` : ''}</span>
                  <button type="button" onClick={clear} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    Clear all
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(error || hint) && (
        <p className={cn('text-xs', error ? 'text-rose-400' : 'text-gray-500')}>{error ?? hint}</p>
      )}
    </div>
  );
});
Select.displayName = 'Select';
