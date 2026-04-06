import { forwardRef, useRef, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress: number; // 0-100
  status: 'uploading' | 'done' | 'error';
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  maxFiles?: number;
  variant?: 'dropzone' | 'button' | 'avatar';
  disabled?: boolean;
  label?: string;
  hint?: string;
  onFilesChange?: (files: UploadedFile[]) => void;
  onUpload?: (file: File) => Promise<void>;
  className?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-gray-700 transition-colors text-gray-500 hover:text-gray-200">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(({
  accept = '*/*',
  multiple = false,
  maxSize,
  maxFiles,
  variant = 'dropzone',
  disabled = false,
  label,
  hint,
  onFilesChange,
  onUpload,
  className,
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

  const processFiles = useCallback(async (rawFiles: FileList | null) => {
    if (!rawFiles) return;
    setError(null);

    const list = Array.from(rawFiles);

    if (maxFiles && files.length + list.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newUploads: UploadedFile[] = list.map(file => {
      if (maxSize && file.size > maxSize) {
        return { id: Math.random().toString(36).slice(2), file, progress: 0, status: 'error' as const, error: `File too large (max ${formatBytes(maxSize)})` };
      }
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      return { id: Math.random().toString(36).slice(2), file, preview, progress: 0, status: 'uploading' as const };
    });

    const updated = multiple ? [...files, ...newUploads] : newUploads;
    setFiles(updated);
    onFilesChange?.(updated);

    // Simulate or real upload
    for (const upload of newUploads) {
      if (upload.status === 'error') continue;
      if (onUpload) {
        try {
          await onUpload(upload.file);
          setFiles(prev => prev.map(f => f.id === upload.id ? { ...f, progress: 100, status: 'done' } : f));
        } catch {
          setFiles(prev => prev.map(f => f.id === upload.id ? { ...f, status: 'error', error: 'Upload failed' } : f));
        }
      } else {
        // Simulate progress
        for (let p = 10; p <= 100; p += 10) {
          await new Promise(r => setTimeout(r, 80));
          setFiles(prev => prev.map(f => f.id === upload.id ? { ...f, progress: p, status: p === 100 ? 'done' : 'uploading' } : f));
        }
      }
    }
  }, [files, multiple, maxSize, maxFiles, onUpload, onFilesChange]);

  const removeFile = (id: string) => {
    setFiles(prev => {
      const next = prev.filter(f => f.id !== id);
      onFilesChange?.(next);
      return next;
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  if (variant === 'button') {
    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)}>
        {label && <label className="text-sm font-medium text-gray-200">{label}</label>}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-sm text-gray-300 hover:border-crisp-500 hover:text-crisp-300 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          {label ?? 'Upload file'}
        </button>
        <input ref={inputRef} id={id} type="file" accept={accept} multiple={multiple} className="hidden" onChange={e => processFiles(e.target.files)} />
        <FileList files={files} onRemove={removeFile} />
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    );
  }

  if (variant === 'avatar') {
    const current = files[0];
    return (
      <div ref={ref} className={cn('flex flex-col items-center gap-3', className)}>
        {label && <label className="text-sm font-medium text-gray-200">{label}</label>}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-700 hover:border-crisp-500 transition-colors overflow-hidden bg-gray-900 group"
        >
          {current?.preview
            ? <img src={current.preview} className="w-full h-full object-cover" alt="avatar" />
            : (
              <div className="flex flex-col items-center justify-center h-full gap-1 text-gray-500 group-hover:text-crisp-400 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span className="text-[10px]">Upload</span>
              </div>
            )
          }
          {current?.status === 'uploading' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <svg className="animate-spin w-6 h-6 text-crisp-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => processFiles(e.target.files)} />
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    );
  }

  // Dropzone variant (default)
  return (
    <div ref={ref} className={cn('flex flex-col gap-3', className)}>
      {label && <label className="text-sm font-medium text-gray-200">{label}</label>}
      <div
        onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer',
          dragging ? 'border-crisp-500 bg-crisp-500/10' : 'border-gray-700 bg-gray-900/50 hover:border-gray-500',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center transition-colors', dragging ? 'bg-crisp-500/20 text-crisp-400' : 'bg-gray-800 text-gray-500')}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">
            <span className="text-crisp-400 font-medium">Click to upload</span> or drag & drop
          </p>
          {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
          {maxSize && <p className="text-xs text-gray-500">Max {formatBytes(maxSize)}</p>}
        </div>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={e => processFiles(e.target.files)} />
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <FileList files={files} onRemove={removeFile} />
    </div>
  );
});
FileUpload.displayName = 'FileUpload';

function FileList({ files, onRemove }: { files: UploadedFile[]; onRemove: (id: string) => void }) {
  if (!files.length) return null;
  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence>
        {files.map(f => (
          <motion.li
            key={f.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800"
          >
            {f.preview
              ? <img src={f.preview} className="w-10 h-10 rounded-lg object-cover shrink-0" alt="" />
              : <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 text-gray-500"><FileIcon /></div>
            }
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 truncate">{f.file.name}</p>
              <p className="text-xs text-gray-500">{formatBytes(f.file.size)}</p>
              {f.status === 'uploading' && (
                <div className="mt-1.5 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-crisp-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${f.progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              )}
              {f.status === 'error' && <p className="text-xs text-rose-400 mt-0.5">{f.error}</p>}
            </div>
            <div className="shrink-0">
              {f.status === 'done' && <span className="text-emerald-400"><CheckIcon /></span>}
              {f.status === 'uploading' && (
                <svg className="animate-spin w-4 h-4 text-crisp-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              <XIcon onClick={() => onRemove(f.id)} />
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
