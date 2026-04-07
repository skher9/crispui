import { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  value?: string;           // HTML string
  onChange?: (html: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  toolbar?: ToolbarItem[];
  className?: string;
  editorClassName?: string;
}

export type ToolbarItem =
  | 'bold' | 'italic' | 'underline' | 'strikethrough'
  | 'h1' | 'h2' | 'h3'
  | 'ul' | 'ol' | 'blockquote' | 'code'
  | 'link' | 'unlink'
  | 'alignLeft' | 'alignCenter' | 'alignRight'
  | 'separator'
  | 'undo' | 'redo'
  | 'clearFormat';

export const DEFAULT_TOOLBAR: ToolbarItem[] = [
  'bold', 'italic', 'underline', 'strikethrough', 'separator',
  'h1', 'h2', 'h3', 'separator',
  'ul', 'ol', 'blockquote', 'code', 'separator',
  'alignLeft', 'alignCenter', 'alignRight', 'separator',
  'link', 'unlink', 'separator',
  'undo', 'redo', 'separator',
  'clearFormat',
];

// ─── Toolbar button definitions ───────────────────────────────────────────────

interface ToolbarDef {
  label: string;
  command?: string;
  value?: string;
  icon: React.ReactNode;
}

const TOOL_DEFS: Partial<Record<ToolbarItem, ToolbarDef>> = {
  bold:        { label: 'Bold (⌘B)',       command: 'bold',           icon: <span className="font-bold text-sm">B</span> },
  italic:      { label: 'Italic (⌘I)',     command: 'italic',         icon: <span className="italic text-sm">I</span> },
  underline:   { label: 'Underline (⌘U)',  command: 'underline',      icon: <span className="underline text-sm">U</span> },
  strikethrough:{ label: 'Strikethrough',  command: 'strikeThrough',  icon: <span className="line-through text-sm">S</span> },
  h1:          { label: 'Heading 1',       command: 'formatBlock',    value: 'h1', icon: <span className="text-xs font-bold">H1</span> },
  h2:          { label: 'Heading 2',       command: 'formatBlock',    value: 'h2', icon: <span className="text-xs font-bold">H2</span> },
  h3:          { label: 'Heading 3',       command: 'formatBlock',    value: 'h3', icon: <span className="text-xs font-bold">H3</span> },
  ul:          { label: 'Bullet list',     command: 'insertUnorderedList', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg> },
  ol:          { label: 'Numbered list',   command: 'insertOrderedList', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg> },
  blockquote:  { label: 'Blockquote',      command: 'formatBlock',    value: 'blockquote', icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm14 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg> },
  code:        { label: 'Inline code',     command: 'formatBlock',    value: 'pre', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
  link:        { label: 'Insert link',     command: 'createLink',     icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
  unlink:      { label: 'Remove link',     command: 'unlink',         icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg> },
  alignLeft:   { label: 'Align left',     command: 'justifyLeft',    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h10.5m-10.5 5.25h16.5" /></svg> },
  alignCenter: { label: 'Align center',   command: 'justifyCenter',  icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg> },
  alignRight:  { label: 'Align right',    command: 'justifyRight',   icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h6m-6 5.25h16.5" /></svg> },
  undo:        { label: 'Undo (⌘Z)',      command: 'undo',           icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg> },
  redo:        { label: 'Redo (⌘⇧Z)',    command: 'redo',           icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg> },
  clearFormat: { label: 'Clear format',   command: 'removeFormat',   icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> },
};

// ─── RichTextEditor ───────────────────────────────────────────────────────────

export function RichTextEditor({
  value = '', onChange, placeholder = 'Start writing…',
  label, hint, error, disabled = false,
  minHeight = 160, maxHeight,
  toolbar = DEFAULT_TOOLBAR,
  className, editorClassName,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  // Write initial HTML once
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    const cmds = ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight'];
    cmds.forEach(cmd => {
      try { if (document.queryCommandState(cmd)) formats.add(cmd); } catch { /* ignore */ }
    });
    setActiveFormats(formats);
  }, []);

  const exec = useCallback((command: string, value?: string) => {
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (!url) return;
      document.execCommand('createLink', false, url);
    } else {
      document.execCommand(command, false, value);
    }
    editorRef.current?.focus();
    updateActiveFormats();
    onChange?.(editorRef.current?.innerHTML ?? '');
  }, [onChange, updateActiveFormats]);

  const handleInput = useCallback(() => {
    updateActiveFormats();
    onChange?.(editorRef.current?.innerHTML ?? '');
  }, [onChange, updateActiveFormats]);

  const isActive = (item: ToolbarItem) => {
    const def = TOOL_DEFS[item];
    if (!def?.command) return false;
    return activeFormats.has(def.command);
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-gray-200">{label}</label>}

      <div className={cn(
        'rounded-xl border transition-all duration-150 bg-gray-900 overflow-hidden',
        error ? 'border-rose-500' : isFocused ? 'border-crisp-500 ring-2 ring-crisp-500/20' : 'border-gray-700',
        disabled && 'opacity-50 pointer-events-none',
      )}>
        {/* Toolbar */}
        <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5 border-b border-gray-800 bg-gray-900/80">
          {toolbar.map((item, i) => {
            if (item === 'separator') {
              return <div key={i} className="w-px h-5 bg-gray-700 mx-1" />;
            }
            const def = TOOL_DEFS[item];
            if (!def) return null;
            const active = isActive(item);
            return (
              <button
                key={item}
                type="button"
                title={def.label}
                onMouseDown={e => { e.preventDefault(); exec(def.command!, def.value); }}
                className={cn(
                  'w-7 h-7 flex items-center justify-center rounded-md transition-colors text-sm',
                  active
                    ? 'bg-crisp-500/20 text-crisp-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800',
                )}
              >
                {def.icon}
              </button>
            );
          })}
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data-placeholder={placeholder}
          style={{ minHeight, maxHeight, overflowY: maxHeight ? 'auto' : undefined }}
          className={cn(
            'px-4 py-3 text-sm text-gray-100 focus:outline-none',
            'prose prose-invert prose-sm max-w-none',
            '[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-600 [&:empty]:before:pointer-events-none',
            // Heading styles
            '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-4 [&_h1]:mb-2',
            '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-3 [&_h2]:mb-2',
            '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-2 [&_h3]:mb-1',
            // List styles
            '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2',
            '[&_li]:text-gray-300 [&_li]:my-0.5',
            // Blockquote
            '[&_blockquote]:border-l-4 [&_blockquote]:border-crisp-500 [&_blockquote]:pl-4 [&_blockquote]:my-3 [&_blockquote]:text-gray-400 [&_blockquote]:italic',
            // Code
            '[&_pre]:bg-gray-800 [&_pre]:rounded-lg [&_pre]:px-3 [&_pre]:py-2 [&_pre]:my-2 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:text-crisp-300',
            // Links
            '[&_a]:text-crisp-400 [&_a]:underline [&_a]:underline-offset-2',
            editorClassName,
          )}
        />
      </div>

      {(error || hint) && (
        <p className={cn('text-xs', error ? 'text-rose-400' : 'text-gray-500')}>{error ?? hint}</p>
      )}
    </div>
  );
}
