import { forwardRef, useState, useRef, useId, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export interface AutocompleteOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option?: AutocompleteOption) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  multiple?: false;
  freeSolo?: boolean;
  size?: 'sm' | 'md' | 'lg';
  filterOptions?: (options: AutocompleteOption[], input: string) => AutocompleteOption[];
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  noOptionsText?: string;
  id?: string;
}

const sizeMap = {
  sm: 'h-8 text-xs px-3 rounded-lg',
  md: 'h-10 text-sm px-3 rounded-xl',
  lg: 'h-12 text-base px-4 rounded-xl',
};

function defaultFilter(opts: AutocompleteOption[], input: string) {
  const q = input.toLowerCase();
  return opts.filter(o => o.label.toLowerCase().includes(q));
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({
    options, value: controlledValue, defaultValue = '', onChange, onInputChange,
    placeholder, label, hint, error, disabled, clearable = true, freeSolo,
    size = 'md', filterOptions = defaultFilter, renderOption, noOptionsText = 'No options',
    id: propId,
  }, ref) => {
    const genId = useId();
    const id = propId ?? genId;
    const [inputVal, setInputVal] = useState(controlledValue ?? defaultValue);
    const [open, setOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const filtered = filterOptions(options, inputVal);

    const select = useCallback((opt: AutocompleteOption) => {
      setInputVal(opt.label);
      setOpen(false);
      onChange?.(opt.value, opt);
    }, [onChange]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVal(e.target.value);
      setOpen(true);
      setActiveIdx(-1);
      onInputChange?.(e.target.value);
      if (freeSolo) onChange?.(e.target.value);
    };

    const handleKey = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); select(filtered[activeIdx]); }
      if (e.key === 'Escape') setOpen(false);
    };

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Group options
    const groups = filtered.reduce<Record<string, AutocompleteOption[]>>((acc, opt) => {
      const g = opt.group ?? '';
      (acc[g] = acc[g] ?? []).push(opt);
      return acc;
    }, {});

    const s = sizeMap[size];

    return (
      <div className="flex flex-col gap-1.5" ref={containerRef}>
        {label && <label htmlFor={id} className="text-sm font-medium text-gray-200">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            value={inputVal}
            onChange={handleInput}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'w-full bg-gray-900 border text-gray-100 placeholder-gray-500 transition-colors focus:outline-none pr-8',
              s,
              error ? 'border-rose-500' : 'border-gray-700 hover:border-gray-500 focus:border-crisp-500',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {clearable && inputVal && (
              <button type="button" onClick={() => { setInputVal(''); onChange?.(''); setOpen(false); }}
                className="text-gray-500 hover:text-gray-300 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg className={cn('w-4 h-4 text-gray-500 transition-transform', open && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-1 rounded-xl border border-gray-700 bg-gray-900 shadow-xl shadow-black/30 overflow-hidden"
              >
                <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
                  {filtered.length === 0 ? (
                    <li className="px-3 py-2 text-sm text-gray-500">{noOptionsText}</li>
                  ) : (
                    Object.entries(groups).map(([group, opts]) => (
                      <div key={group}>
                        {group && <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">{group}</p>}
                        {opts.map(opt => {
                          const idx = filtered.indexOf(opt);
                          return (
                            <li
                              key={opt.value}
                              role="option"
                              aria-selected={idx === activeIdx}
                              onClick={() => !opt.disabled && select(opt)}
                              className={cn(
                                'flex items-center px-3 py-2 text-sm cursor-pointer transition-colors',
                                opt.disabled && 'opacity-40 cursor-not-allowed',
                                idx === activeIdx ? 'bg-crisp-500/15 text-crisp-300' : 'text-gray-200 hover:bg-gray-800',
                              )}
                            >
                              {renderOption ? renderOption(opt) : opt.label}
                            </li>
                          );
                        })}
                      </div>
                    ))
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {(error || hint) && <p className={cn('text-xs', error ? 'text-rose-400' : 'text-gray-500')}>{error ?? hint}</p>}
      </div>
    );
  },
);
Autocomplete.displayName = 'Autocomplete';
