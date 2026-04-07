import { CodeBlock } from './CodeBlock';

export interface DocPageProps {
  title: string;
  description: string;
  importPath?: string;
  /** import { X } from ... */
  importNames?: string;
  children: React.ReactNode;
}

export function DocPage({ title, description, importPath = '@crispui/react', importNames, children }: DocPageProps) {
  const importSnippet = importNames
    ? `import { ${importNames} } from '${importPath}';`
    : `import { ... } from '${importPath}';`;

  return (
    <div>
      {/* Title block */}
      <div className="mb-8 pb-6 border-b border-white/[0.07]">
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">{title}</h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{description}</p>
        {importNames && (
          <div className="mt-4">
            <CodeBlock code={importSnippet} language="tsx" showLineNumbers={false} maxHeight="60px" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export function DocSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-gray-100 mb-1">{title}</h2>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      {!description && <div className="mb-4" />}
      {children}
    </div>
  );
}

export function Callout({ variant = 'info', children }: { variant?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info:    { border: 'border-sky-500/30',    bg: 'bg-sky-500/10',    icon: '💡', text: 'text-sky-300' },
    warning: { border: 'border-amber-500/30',  bg: 'bg-amber-500/10',  icon: '⚠️', text: 'text-amber-300' },
    tip:     { border: 'border-emerald-500/30',bg: 'bg-emerald-500/10',icon: '✅', text: 'text-emerald-300' },
  }[variant];

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles.border} ${styles.bg} mb-6 text-sm`}>
      <span className="flex-shrink-0 mt-0.5">{styles.icon}</span>
      <span className={styles.text}>{children}</span>
    </div>
  );
}
