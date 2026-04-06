import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  separator?: boolean;
  onSelect: () => void;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

interface Position { x: number; y: number; }

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [pos, setPos] = useState<Position | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setPos(null), []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 220);
    const y = Math.min(e.clientY, window.innerHeight - items.length * 40 - 20);
    setPos({ x, y });
  };

  useEffect(() => {
    if (!pos) return;
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', h);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', esc); };
  }, [pos, close]);

  return (
    <>
      <div ref={containerRef} onContextMenu={handleContextMenu} className={cn('select-none', className)}>
        {children}
      </div>
      <AnimatePresence>
        {pos && (
          <motion.div
            ref={menuRef}
            style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999 }}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="w-52 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-900/15 overflow-hidden py-1"
          >
            {items.map((item, i) => (
              <div key={item.id}>
                {item.separator && i > 0 && <div className="my-1 border-t border-gray-100" />}
                <button
                  disabled={item.disabled}
                  onClick={() => { item.onSelect(); close(); }}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors',
                    item.variant === 'destructive'
                      ? 'text-rose-600 hover:bg-rose-50'
                      : 'text-gray-700 hover:bg-gray-50',
                    item.disabled && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon && <span className="w-4 h-4 flex items-center justify-center opacity-70">{item.icon}</span>}
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <kbd className="text-[10px] text-gray-400 font-mono">{item.shortcut}</kbd>
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
