import { useState } from 'react';

// ── Simple JSX/TSX tokenizer ───────────────────────────────────────────────

type TKind =
  | 'comment' | 'string' | 'jsx-component' | 'jsx-html-tag'
  | 'keyword' | 'number' | 'prop' | 'identifier' | 'plain';

const RULES: { kind: TKind; re: RegExp }[] = [
  { kind: 'comment',       re: /^\/\/[^\n]*|^\/\*[\s\S]*?\*\// },
  { kind: 'string',        re: /^`(?:[^`\\]|\\.)*`|^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/ },
  { kind: 'jsx-component', re: /^<\/?[A-Z][a-zA-Z.]*/ },
  { kind: 'jsx-html-tag',  re: /^<\/?[a-z][a-zA-Z-]*/ },
  { kind: 'keyword',       re: /^(?:import|export|from|const|let|var|function|return|if|else|true|false|null|undefined|type|interface|default|async|await|extends|of|in|new|class|typeof|void|throw|try|catch|for|while)\b/ },
  { kind: 'number',        re: /^\b\d+(?:\.\d+)?\b/ },
  { kind: 'prop',          re: /^[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*=)/ },
  { kind: 'identifier',    re: /^[a-zA-Z_$][a-zA-Z0-9_$]*/ },
  { kind: 'plain',         re: /^[\s\S]/ },
];

const COLORS: Record<TKind, string> = {
  comment:        'text-gray-500 italic',
  string:         'text-emerald-400',
  'jsx-component':'text-sky-400',
  'jsx-html-tag': 'text-blue-300',
  keyword:        'text-violet-400',
  number:         'text-orange-400',
  prop:           'text-amber-300',
  identifier:     'text-gray-200',
  plain:          'text-gray-400',
};

function tokenize(code: string): { kind: TKind; value: string }[] {
  const tokens: { kind: TKind; value: string }[] = [];
  let remaining = code;
  while (remaining.length > 0) {
    let matched = false;
    for (const { kind, re } of RULES) {
      const m = remaining.match(re);
      if (m) {
        tokens.push({ kind, value: m[0] });
        remaining = remaining.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) { tokens.push({ kind: 'plain', value: remaining[0] }); remaining = remaining.slice(1); }
  }
  return tokens;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export function CodeBlock({ code, language = 'tsx', showLineNumbers = true, maxHeight = '420px' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenize(code.trim());
  const lines = (() => {
    const result: { kind: TKind; value: string }[][] = [[]];
    for (const t of tokens) {
      const parts = t.value.split('\n');
      result[result.length - 1].push({ ...t, value: parts[0] });
      for (let i = 1; i < parts.length; i++) {
        result.push(parts[i] ? [{ kind: t.kind, value: parts[i] }] : []);
      }
    }
    return result;
  })();

  const copy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-gray-950">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-gray-900/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-gray-600 font-mono ml-1">{language}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-200 transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.06]"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code body */}
      <div className="overflow-auto" style={{ maxHeight }}>
        <pre className="text-sm font-mono leading-relaxed p-4 min-w-0">
          {lines.map((lineTokens, li) => (
            <div key={li} className="flex">
              {showLineNumbers && (
                <span className="select-none w-8 text-right mr-4 text-gray-700 flex-shrink-0 text-xs leading-relaxed">
                  {li + 1}
                </span>
              )}
              <span className="flex-1">
                {lineTokens.map((t, ti) => (
                  <span key={ti} className={COLORS[t.kind]}>{t.value}</span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
