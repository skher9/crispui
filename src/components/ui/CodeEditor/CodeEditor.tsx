import { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CodeLanguage = 'tsx' | 'ts' | 'js' | 'jsx' | 'css' | 'html' | 'json' | 'bash' | 'text';

export interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  language?: CodeLanguage;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  lineNumbers?: boolean;
  minLines?: number;
  maxLines?: number;
  tabSize?: number;
  placeholder?: string;
  className?: string;
}

// ─── Tokenizer ────────────────────────────────────────────────────────────────

type TokenType = 'keyword' | 'string' | 'comment' | 'number' | 'operator' | 'function' | 'type' | 'tag' | 'attr' | 'plain';

interface Token { type: TokenType; value: string }

const JS_KEYWORDS = new Set([
  'const','let','var','function','return','if','else','for','while','do','switch','case','break',
  'continue','class','extends','new','this','super','import','export','default','from','of','in',
  'typeof','instanceof','void','delete','throw','try','catch','finally','async','await','static',
  'get','set','null','undefined','true','false','type','interface','enum','implements',
]);

const JS_TYPES = new Set(['string','number','boolean','object','any','never','unknown','void','Promise','Array','Record','Partial','Required','Pick','Omit','React','ReactNode','ReactElement']);

function tokenizeJS(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    // Comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }
    // String: ', ", `
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    // Number
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.xXa-fA-F_]/.test(line[j])) j++;
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }
    // Identifier / keyword
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      // Function call: word(
      const afterWord = line[j];
      if (afterWord === '(') {
        tokens.push({ type: 'function', value: word });
      } else if (JS_KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (JS_TYPES.has(word) || /^[A-Z]/.test(word)) {
        tokens.push({ type: 'type', value: word });
      } else {
        tokens.push({ type: 'plain', value: word });
      }
      i = j;
      continue;
    }
    // Operator
    if (/[=+\-*/<>!&|^~%?:,;.[\]{}()]/.test(line[i])) {
      tokens.push({ type: 'operator', value: line[i] });
      i++;
      continue;
    }
    // Whitespace / other
    let j = i;
    while (j < line.length && !/[a-zA-Z_$\d"'`=+\-*/<>!&|^~%?:,;.[\]{}()\/]/.test(line[j])) j++;
    if (j === i) j++;
    tokens.push({ type: 'plain', value: line.slice(i, j) });
    i = j;
  }
  return tokens;
}

function tokenizeCSS(line: string): Token[] {
  if (line.trim().startsWith('/*') || line.trim().startsWith('//')) {
    return [{ type: 'comment', value: line }];
  }
  const propMatch = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.*)$/);
  if (propMatch) {
    return [
      { type: 'plain', value: propMatch[1] },
      { type: 'attr', value: propMatch[2] },
      { type: 'operator', value: propMatch[3] },
      { type: 'string', value: propMatch[4] },
    ];
  }
  return [{ type: 'plain', value: line }];
}

function tokenizeHTML(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '<') {
      let j = i + 1;
      // Comment
      if (line.slice(i, i + 4) === '<!--') {
        const end = line.indexOf('-->', i);
        tokens.push({ type: 'comment', value: line.slice(i, end === -1 ? undefined : end + 3) });
        i = end === -1 ? line.length : end + 3;
        continue;
      }
      tokens.push({ type: 'operator', value: '<' });
      if (line[j] === '/') { tokens.push({ type: 'operator', value: '/' }); j++; }
      // Tag name
      const tagStart = j;
      while (j < line.length && /[\w-]/.test(line[j])) j++;
      tokens.push({ type: 'tag', value: line.slice(tagStart, j) });
      i = j;
      continue;
    }
    if (line[i] === '>' || line[i] === '/') {
      tokens.push({ type: 'operator', value: line[i] });
      i++; continue;
    }
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i]; let j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1; continue;
    }
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w-]/.test(line[j])) j++;
      tokens.push({ type: 'attr', value: line.slice(i, j) });
      i = j; continue;
    }
    tokens.push({ type: 'plain', value: line[i] });
    i++;
  }
  return tokens;
}

function tokenizeLine(line: string, lang: CodeLanguage): Token[] {
  if (lang === 'css') return tokenizeCSS(line);
  if (lang === 'html') return tokenizeHTML(line);
  if (lang === 'json') {
    // Simple JSON: strings, numbers, booleans, null
    const tokens: Token[] = [];
    const rest = line;
    const jsonRe = /"([^"\\]|\\.)*"|-?\d+(\.\d+)?([eE][+-]?\d+)?|true|false|null|[{}[\]:,]/g;
    let last = 0;
    for (const m of rest.matchAll(jsonRe)) {
      if (m.index > last) tokens.push({ type: 'plain', value: rest.slice(last, m.index) });
      const v = m[0];
      if (v.startsWith('"')) tokens.push({ type: 'string', value: v });
      else if (/^-?\d/.test(v)) tokens.push({ type: 'number', value: v });
      else if (v === 'true' || v === 'false' || v === 'null') tokens.push({ type: 'keyword', value: v });
      else tokens.push({ type: 'operator', value: v });
      last = m.index + v.length;
    }
    if (last < rest.length) tokens.push({ type: 'plain', value: rest.slice(last) });
    return tokens;
  }
  if (lang === 'bash') {
    if (line.trim().startsWith('#')) return [{ type: 'comment', value: line }];
    const cmd = line.match(/^(\s*)([\w.-]+)(.*)/);
    if (cmd) return [
      { type: 'plain', value: cmd[1] },
      { type: 'function', value: cmd[2] },
      { type: 'plain', value: cmd[3] },
    ];
    return [{ type: 'plain', value: line }];
  }
  if (lang === 'text') return [{ type: 'plain', value: line }];
  return tokenizeJS(line);
}

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:  'text-violet-400',
  string:   'text-emerald-400',
  comment:  'text-gray-500 italic',
  number:   'text-amber-400',
  operator: 'text-gray-400',
  function: 'text-sky-400',
  type:     'text-cyan-400',
  tag:      'text-rose-400',
  attr:     'text-amber-300',
  plain:    'text-gray-200',
};

function HighlightedLine({ line, lang }: { line: string; lang: CodeLanguage }) {
  if (!line) return <span>&nbsp;</span>;
  const tokens = tokenizeLine(line, lang);
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={TOKEN_COLORS[t.type]}>{t.value}</span>
      ))}
    </>
  );
}

// ─── CodeEditor ───────────────────────────────────────────────────────────────

export function CodeEditor({
  value = '', onChange, language = 'tsx',
  label, hint, error, disabled = false, readOnly = false,
  lineNumbers = true, minLines = 5, maxLines,
  tabSize = 2, placeholder = '// Start typing…',
  className,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, minLines);

  // Sync scroll between textarea and highlight
  const syncScroll = useCallback(() => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  useEffect(() => {
    const ta = textareaRef.current;
    ta?.addEventListener('scroll', syncScroll);
    return () => ta?.removeEventListener('scroll', syncScroll);
  }, [syncScroll]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab → insert spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const spaces = ' '.repeat(tabSize);
      const next = value.slice(0, start) + spaces + value.slice(end);
      onChange?.(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + tabSize;
      });
    }
    // Enter → auto-indent
    if (e.key === 'Enter') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const currentLine = value.slice(0, start).split('\n').pop() ?? '';
      const indent = currentLine.match(/^(\s*)/)?.[1] ?? '';
      const extra = /[{(\[]$/.test(currentLine.trimEnd()) ? ' '.repeat(tabSize) : '';
      const insert = '\n' + indent + extra;
      const next = value.slice(0, start) + insert + value.slice(ta.selectionEnd);
      onChange?.(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + insert.length;
      });
    }
  };

  const lineHeight = 22; // px per line
  const minHeight = minLines * lineHeight;
  const maxHeight = maxLines ? maxLines * lineHeight : undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-gray-200">{label}</label>}

      <div className={cn(
        'rounded-xl border overflow-hidden transition-all duration-150 bg-gray-950',
        error ? 'border-rose-500' : isFocused ? 'border-crisp-500 ring-2 ring-crisp-500/20' : 'border-gray-800',
        disabled && 'opacity-50',
      )}>
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/60">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-xs text-gray-600 font-mono">{language}</span>
        </div>

        {/* Editor body */}
        <div
          className="relative flex overflow-auto font-mono text-sm"
          style={{ minHeight, maxHeight }}
        >
          {/* Line numbers */}
          {lineNumbers && (
            <div className="select-none shrink-0 px-3 pt-3 pb-3 text-right border-r border-gray-800 bg-gray-950/60" style={{ minWidth: 44 }}>
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="text-gray-700 leading-[22px] text-xs">{i + 1}</div>
              ))}
            </div>
          )}

          {/* Highlight layer + textarea overlay */}
          <div className="relative flex-1 min-w-0">
            {/* Syntax-highlighted display */}
            <pre
              ref={highlightRef}
              aria-hidden
              className="absolute inset-0 p-3 overflow-hidden pointer-events-none whitespace-pre leading-[22px] text-sm"
            >
              {value
                ? lines.map((line, i) => (
                    <div key={i}>
                      <HighlightedLine line={line} lang={language} />
                    </div>
                  ))
                : <span className="text-gray-600">{placeholder}</span>
              }
            </pre>

            {/* Transparent textarea on top */}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => onChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              readOnly={readOnly}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              className={cn(
                'absolute inset-0 w-full h-full p-3 bg-transparent text-transparent caret-gray-200 resize-none focus:outline-none font-mono text-sm leading-[22px] whitespace-pre overflow-auto',
                (disabled || readOnly) && 'cursor-not-allowed',
              )}
            />
          </div>
        </div>
      </div>

      {(error || hint) && (
        <p className={cn('text-xs', error ? 'text-rose-400' : 'text-gray-500')}>{error ?? hint}</p>
      )}
    </div>
  );
}
