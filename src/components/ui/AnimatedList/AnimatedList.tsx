import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── AnimatedList ─────────────────────────────────────────────────────────────

export interface AnimatedListProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  animation?: 'slideUp' | 'slideLeft' | 'fadeScale' | 'flip';
  stagger?: number;
  className?: string;
  itemClassName?: string;
}

const variants = {
  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -12, scale: 0.97 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -20 },
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.9 },
  },
  flip: {
    initial: { opacity: 0, rotateX: -30, y: 10 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    exit:    { opacity: 0, rotateX: 20 },
  },
};

export function AnimatedList<T>({
  items, renderItem, keyExtractor,
  animation = 'slideUp', stagger = 0.05,
  className, itemClassName,
}: AnimatedListProps<T>) {
  const v = variants[animation];
  return (
    <div className={cn('flex flex-col', className)}>
      <AnimatePresence initial={false}>
        {items.map((item, i) => (
          <motion.div
            key={keyExtractor ? keyExtractor(item, i) : i}
            initial={v.initial}
            animate={v.animate}
            exit={v.exit}
            transition={{ duration: 0.22, delay: i * stagger, ease: 'easeOut' }}
            className={itemClassName}
            layout
          >
            {renderItem(item, i)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── ActivityFeed ─────────────────────────────────────────────────────────────

export interface ActivityItem {
  id: string;
  user: { name: string; avatar?: string };
  action: string;
  target?: string;
  time: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  maxItems?: number;
  className?: string;
  showAvatar?: boolean;
}

export function ActivityFeed({ items, maxItems, className, showAvatar = true }: ActivityFeedProps) {
  const displayed = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className={cn('flex flex-col gap-0', className)}>
      <AnimatePresence initial={false}>
        {displayed.map((item, _i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 16, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -16, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-start gap-3 py-3 border-b border-gray-800/60 last:border-0"
          >
            {showAvatar && (
              item.user.avatar
                ? <img src={item.user.avatar} className="w-8 h-8 rounded-full shrink-0 mt-0.5" alt={item.user.name} />
                : (
                  <div className="w-8 h-8 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-xs font-semibold text-white"
                    style={{ background: item.color ?? 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {item.user.name[0]}
                  </div>
                )
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-gray-100">{item.user.name}</span>
                {' '}{item.action}
                {item.target && <span className="text-crisp-400 font-medium"> {item.target}</span>}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{item.time}</p>
            </div>
            {item.icon && (
              <div className="shrink-0 text-gray-600 mt-0.5">{item.icon}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
