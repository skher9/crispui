import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

export interface ExampleBlockProps {
  title?: string;
  description?: string;
  code: string;
  language?: string;
  /** If true, code tab is shown by default */
  defaultTab?: 'preview' | 'code';
  /** Extra classes on the preview wrapper */
  previewClassName?: string;
  children: React.ReactNode;
}

export function ExampleBlock({
  title,
  description,
  code,
  language = 'tsx',
  defaultTab = 'preview',
  previewClassName,
  children,
}: ExampleBlockProps) {
  const [tab, setTab] = useState<'preview' | 'code'>(defaultTab);

  return (
    <div className="rounded-2xl border border-white/[0.07] mb-6">
      {/* Card header */}
      {(title || description) && (
        <div className="px-5 pt-4 pb-2">
          {title && <p className="text-sm font-semibold text-gray-200">{title}</p>}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 pt-2 border-b border-white/[0.06]">
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors capitalize
              ${tab === t
                ? 'text-crisp-400 border-b-2 border-crisp-500 -mb-px'
                : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            {t === 'code' ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'preview' ? (
        <div className={`relative p-8 bg-gray-900/30 min-h-[100px] flex items-center justify-start flex-wrap gap-4 ${previewClassName ?? ''}`}>
          {children}
        </div>
      ) : (
        <div className="rounded-b-2xl overflow-hidden border-0">
          <CodeBlock code={code} language={language} />
        </div>
      )}
    </div>
  );
}
