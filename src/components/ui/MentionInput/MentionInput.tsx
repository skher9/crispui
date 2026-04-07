import { forwardRef, useId, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MentionUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role?: string;
}

export interface MentionInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onMention?: (user: MentionUser) => void;
  users: MentionUser[];
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  triggerChar?: string;   // default '@'
  id?: string;
  className?: string;
}

// ─── MentionInput ─────────────────────────────────────────────────────────────

export const MentionInput = forwardRef<HTMLTextAreaElement, MentionInputProps>(({
  value: controlledValue, onChange, onMention, users,
  placeholder = 'Write something… use @ to mention someone',
  label, hint, error, disabled = false,
  maxLength, rows = 4, triggerChar = '@',
  id: propId, className,
}, ref) => {
  const genId = useId();
  const id = propId ?? genId;

  const [value, setValue] = useState(controlledValue ?? '');
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionStart, setMentionStart] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // sync controlled
  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  const filteredUsers = mentionQuery !== null
    ? users.filter(u =>
        u.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(mentionQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const cursor = e.target.selectionStart;
    setValue(val);
    onChange?.(val);

    // Detect @ trigger
    const before = val.slice(0, cursor);
    const match = before.match(new RegExp(`\\${triggerChar}([\\w]*)$`));
    if (match) {
      setMentionQuery(match[1]);
      setMentionStart(cursor - match[0].length);
      setActiveIdx(0);
    } else {
      setMentionQuery(null);
    }
  }, [onChange, triggerChar]);

  const insertMention = useCallback((user: MentionUser) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const cursor = ta.selectionStart;
    const before = value.slice(0, mentionStart);
    const after = value.slice(cursor);
    const mention = `${triggerChar}${user.username} `;
    const next = before + mention + after;
    setValue(next);
    onChange?.(next);
    onMention?.(user);
    setMentionQuery(null);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = ta.selectionEnd = mentionStart + mention.length;
    });
  }, [value, mentionStart, triggerChar, onChange, onMention]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mentionQuery === null || filteredUsers.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => (i + 1) % filteredUsers.length); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => (i - 1 + filteredUsers.length) % filteredUsers.length); }
    if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); insertMention(filteredUsers[activeIdx]); }
    if (e.key === 'Escape') setMentionQuery(null);
  };

  // Render highlighted text with @mention styling
  const highlighted = value.replace(
    new RegExp(`\\${triggerChar}([\\w]+)`, 'g'),
    `<mark class="bg-crisp-500/20 text-crisp-300 rounded px-0.5">$&</mark>`,
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-200">{label}</label>}

      <div className="relative">
        <div className={cn(
          'relative rounded-xl border bg-gray-900 transition-all duration-150',
          error ? 'border-rose-500' : isFocused ? 'border-crisp-500 ring-2 ring-crisp-500/20' : 'border-gray-700',
          disabled && 'opacity-50',
          className,
        )}>
          {/* Hidden highlighted layer */}
          <div
            aria-hidden
            className="absolute inset-0 px-3 py-2.5 text-sm font-inherit pointer-events-none whitespace-pre-wrap break-words text-transparent"
            dangerouslySetInnerHTML={{ __html: highlighted + '<br/>' }}
            style={{ fontFamily: 'inherit', lineHeight: '1.5' }}
          />

          {/* Actual textarea */}
          <textarea
            ref={node => {
              (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            }}
            id={id}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => { setIsFocused(false); setTimeout(() => setMentionQuery(null), 150); }}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            className="relative w-full bg-transparent px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none resize-none"
            style={{ lineHeight: '1.5' }}
          />
        </div>

        {/* Footer: char count */}
        {maxLength && (
          <div className="flex justify-end mt-1">
            <span className={cn('text-xs', value.length >= maxLength ? 'text-rose-400' : 'text-gray-600')}>
              {value.length} / {maxLength}
            </span>
          </div>
        )}

        {/* Mention dropdown */}
        <AnimatePresence>
          {mentionQuery !== null && filteredUsers.length > 0 && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.13 }}
              className="absolute z-50 left-0 bottom-full mb-2 w-full max-w-xs rounded-xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/50 overflow-hidden"
            >
              <div className="px-3 py-1.5 border-b border-gray-800 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                Mention someone
              </div>
              <ul className="max-h-52 overflow-y-auto py-1">
                {filteredUsers.map((user, i) => (
                  <li
                    key={user.id}
                    onMouseDown={() => insertMention(user)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors',
                      i === activeIdx ? 'bg-crisp-500/10 text-crisp-300' : 'text-gray-200 hover:bg-gray-800',
                    )}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} className="w-7 h-7 rounded-full shrink-0" alt={user.name} />
                    ) : (
                      <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white bg-gradient-to-br from-crisp-500 to-violet-600">
                        {user.name[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">@{user.username}{user.role ? ` · ${user.role}` : ''}</p>
                    </div>
                    {i === activeIdx && (
                      <span className="text-[10px] text-gray-600 shrink-0">↵</span>
                    )}
                  </li>
                ))}
              </ul>
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
MentionInput.displayName = 'MentionInput';
