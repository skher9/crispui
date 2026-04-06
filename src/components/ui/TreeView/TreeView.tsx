import { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

interface TreeCtx {
  selected: string | null;
  expanded: Set<string>;
  onSelect: (id: string) => void;
  onExpand: (id: string) => void;
}
const TreeContext = createContext<TreeCtx>({ selected: null, expanded: new Set(), onSelect: () => {}, onExpand: () => {} });

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  defaultSelected?: string;
  defaultExpanded?: string[];
  onSelect?: (id: string) => void;
}

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  ({ defaultSelected, defaultExpanded = [], onSelect, className, children, ...props }, ref) => {
    const [selected, setSelected] = useState<string | null>(defaultSelected ?? null);
    const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));

    const handleSelect = useCallback((id: string) => { setSelected(id); onSelect?.(id); }, [onSelect]);
    const handleExpand = useCallback((id: string) => {
      setExpanded(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }, []);

    return (
      <TreeContext.Provider value={{ selected, expanded, onSelect: handleSelect, onExpand: handleExpand }}>
        <div ref={ref} role="tree" className={cn('text-sm', className)} {...props}>
          {children}
        </div>
      </TreeContext.Provider>
    );
  },
);
TreeView.displayName = 'TreeView';

export interface TreeItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  level?: number;
  hasChildren?: boolean;
}

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  ({ id, label, icon, level = 0, hasChildren, className, children, ...props }, ref) => {
    const { selected, expanded, onSelect, onExpand } = useContext(TreeContext);
    const isExpanded = expanded.has(id);
    const isSelected = selected === id;

    return (
      <div ref={ref} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected} {...props}>
        <div
          onClick={() => {
            onSelect(id);
            if (hasChildren || children) onExpand(id);
          }}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          className={cn(
            'flex items-center gap-2 h-8 pr-3 rounded-lg cursor-pointer transition-colors',
            isSelected ? 'bg-crisp-500/15 text-crisp-300' : 'text-gray-300 hover:bg-gray-800',
            className,
          )}
        >
          {(hasChildren || children) ? (
            <motion.svg
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="w-3.5 h-3.5 text-gray-500 shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </motion.svg>
          ) : (
            <span className="w-3.5 h-3.5 shrink-0" />
          )}
          {icon && <span className="w-4 h-4 shrink-0 text-gray-400">{icon}</span>}
          <span className="truncate text-sm">{label}</span>
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
TreeItem.displayName = 'TreeItem';
