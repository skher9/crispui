import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VirtualListProps<T = unknown> {
  items: T[];
  itemHeight: number;           // px — fixed row height
  height: number | string;      // container height
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;            // extra rows above/below viewport
  keyExtractor?: (item: T, index: number) => string | number;
  onEndReached?: () => void;    // called when near bottom
  endReachedThreshold?: number; // px from bottom
  emptyState?: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

// ─── VirtualList ──────────────────────────────────────────────────────────────

export function VirtualList<T>({
  items, itemHeight, height, renderItem,
  overscan = 5, keyExtractor,
  onEndReached, endReachedThreshold = 200,
  emptyState, className, itemClassName,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(
    typeof height === 'number' ? height : 400
  );
  const endCalledRef = useRef(false);

  // Measure actual container height for string values (e.g. "100%")
  useLayoutEffect(() => {
    if (typeof height === 'number') { setContainerHeight(height); return; }
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  const totalHeight = items.length * itemHeight;

  // Calculate visible window
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + overscan * 2;
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop: st, scrollHeight, clientHeight } = e.currentTarget;
    setScrollTop(st);

    // End reached
    if (onEndReached && !endCalledRef.current) {
      if (scrollHeight - st - clientHeight < endReachedThreshold) {
        endCalledRef.current = true;
        onEndReached();
      }
    }
    if (endCalledRef.current && scrollHeight - st - clientHeight > endReachedThreshold * 2) {
      endCalledRef.current = false;
    }
  }, [onEndReached, endReachedThreshold]);

  if (items.length === 0) {
    return (
      <div className={cn('flex items-center justify-center', className)} style={{ height }}>
        {emptyState ?? <p className="text-sm text-gray-500">No items</p>}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn('overflow-auto', className)}
      style={{ height }}
    >
      {/* Full-height spacer to enable scrollbar */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Only render visible rows, offset by their position */}
        <div style={{ position: 'absolute', top: startIndex * itemHeight, left: 0, right: 0 }}>
          {visibleItems.map((item, i) => {
            const absoluteIndex = startIndex + i;
            const key = keyExtractor ? keyExtractor(item, absoluteIndex) : absoluteIndex;
            return (
              <div
                key={key}
                style={{ height: itemHeight }}
                className={cn('flex items-center', itemClassName)}
              >
                {renderItem(item, absoluteIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── useVirtualList (hook) ────────────────────────────────────────────────────
// For headless usage — returns windowed slice + spacer heights

export function useVirtualList<T>(items: T[], itemHeight: number, containerHeight: number, overscan = 5) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + overscan * 2;
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount);
  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, i) => ({
    item,
    index: startIndex + i,
  }));

  const totalHeight = items.length * itemHeight;
  const offsetTop = startIndex * itemHeight;

  return { visibleItems, totalHeight, offsetTop, setScrollTop };
}
