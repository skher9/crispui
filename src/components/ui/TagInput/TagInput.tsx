import { forwardRef, useState, useRef, useId, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  allowDuplicates?: boolean;
  validate?: (tag: string) => boolean | string; // return string for error, true for ok
  suggestions?: string[];
  separators?: string[]; // keys that create a tag, default: Enter, comma
  className?: string;
  id?: string;
}

const sizeMap = {
  sm: 'text-xs min-h-8 px-2 py-1 gap-1 rounded-lg',
  md: 'text-sm min-h-10 px-3 py-1.5 gap-1.5 rounded-xl',
  lg: 'text-base min-h-12 px-4 py-2 gap-2 rounded-xl',
};
const tagSize = {
  sm: 'text-xs px-1.5 py-0.5 rounded-md gap-1',
  md: 'text-xs px-2 py-0.5 rounded-md gap-1.5',
  lg: 'text-sm px-2.5 py-1 rounded-lg gap-1.5',
};

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(({
  value, defaultValue = [], onChange, placeholder = 'Add tag…',
  label, hint, error, max, size = 'md', disabled = false,
  allowDuplicates = false, validate, suggestions = [],
  separators = ['Enter', ','], className, id: propId,
}, ref) => {
  const genId = useId();
  const id = propId ?? genId;
  const [tags, setTags] = useState<string[]>(value ?? defaultValue);
  const [input, setInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const controlled = value !== undefined;
  const currentTags = controlled ? value! : tags;

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (!allowDuplicates && currentTags.includes(tag)) {
      setValidationError('Duplicate tag');
      return;
    }
    if (max && currentTags.length >= max) {
      setValidationError(`Max ${max} tags`);
      return;
    }
    if (validate) {
      const result = validate(tag);
      if (result !== true) { setValidationError(typeof result === 'string' ? result : 'Invalid tag'); return; }
    }
    setValidationError(null);
    const next = [...currentTags, tag];
    if (!controlled) setTags(next);
    onChange?.(next);
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (i: number) => {
    const next = currentTags.filter((_, idx) => idx !== i);
    if (!controlled) setTags(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (separators.includes(e.key)) { e.preventDefault(); addTag(input); return; }
    if (e.key === 'Backspace' && !input && currentTags.length > 0) removeTag(currentTags.length - 1);
  };

  const filteredSuggestions = suggestions.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !currentTags.includes(s)
  );

  const displayError = error ?? validationError;

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-200">{label}</label>}
      <div
        className={cn(
          'flex items-center flex-wrap w-full border bg-gray-900 transition-all cursor-text',
          sizeMap[size],
          displayError ? 'border-rose-500' : 'border-gray-700 hover:border-gray-500 focus-within:border-crisp-500 focus-within:ring-2 focus-within:ring-crisp-500/20',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {currentTags.map((tag, i) => (
            <motion.span
              key={tag + i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className={cn('inline-flex items-center shrink-0 bg-crisp-500/15 text-crisp-300 font-medium', tagSize[size])}
            >
              {tag}
              {!disabled && (
                <button type="button" onClick={() => removeTag(i)} className="hover:text-crisp-100 transition-colors ml-0.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </motion.span>
          ))}
        </AnimatePresence>

        <div className="relative flex-1 min-w-[100px]">
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setShowSuggestions(true); setValidationError(null); }}
            onKeyDown={handleKeyDown}
            onBlur={() => { if (input) addTag(input); setTimeout(() => setShowSuggestions(false), 150); }}
            onFocus={() => input && setShowSuggestions(true)}
            placeholder={currentTags.length === 0 ? placeholder : ''}
            disabled={disabled || (!!max && currentTags.length >= max)}
            className="w-full bg-transparent text-gray-100 placeholder-gray-600 focus:outline-none text-sm py-0.5"
          />

          {/* Suggestions */}
          <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 top-full mt-1 z-50 w-full min-w-[160px] rounded-xl border border-gray-700 bg-gray-900 shadow-xl py-1"
              >
                {filteredSuggestions.slice(0, 8).map(s => (
                  <li key={s}
                    onMouseDown={() => { addTag(s); setShowSuggestions(false); }}
                    className="px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 cursor-pointer transition-colors">
                    {s}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {max && (
          <span className="text-xs text-gray-600 shrink-0 ml-1">{currentTags.length}/{max}</span>
        )}
      </div>

      {displayError && <p className="text-xs text-rose-400">{displayError}</p>}
      {!displayError && hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
});
TagInput.displayName = 'TagInput';
