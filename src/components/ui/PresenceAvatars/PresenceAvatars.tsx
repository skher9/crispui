import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PresenceUser {
  id: string;
  name: string;
  avatar?: string;
  color?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
  cursor?: { x: number; y: number };
  initials?: string;
}

// ─── PresenceAvatars ──────────────────────────────────────────────────────────

export interface PresenceAvatarsProps {
  users: PresenceUser[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const sizeMap = {
  xs: { avatar: 'w-6 h-6 text-[9px]', status: 'w-1.5 h-1.5', offset: '-space-x-1.5', text: 'text-[9px]' },
  sm: { avatar: 'w-8 h-8 text-xs', status: 'w-2 h-2', offset: '-space-x-2', text: 'text-xs' },
  md: { avatar: 'w-10 h-10 text-sm', status: 'w-2.5 h-2.5', offset: '-space-x-2.5', text: 'text-sm' },
  lg: { avatar: 'w-12 h-12 text-base', status: 'w-3 h-3', offset: '-space-x-3', text: 'text-base' },
};

const statusColor = {
  online:  'bg-emerald-400',
  away:    'bg-amber-400',
  busy:    'bg-rose-400',
  offline: 'bg-gray-600',
};

const DEFAULT_COLORS = ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899'];

function Avatar({ user, size, showStatus, showTooltip, idx }: {
  user: PresenceUser; size: 'xs' | 'sm' | 'md' | 'lg';
  showStatus: boolean; showTooltip: boolean; idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const s = sizeMap[size];
  const color = user.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
  const initials = user.initials ?? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, delay: idx * 0.04 }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ zIndex: hovered ? 50 : 10 - idx }}
    >
      <div
        className={cn('rounded-full border-2 border-gray-950 flex items-center justify-center font-semibold text-white shrink-0 overflow-hidden', s.avatar)}
        style={{ background: user.avatar ? undefined : color }}
      >
        {user.avatar
          ? <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
          : initials
        }
      </div>

      {showStatus && user.status && (
        <span className={cn('absolute bottom-0 right-0 rounded-full border-2 border-gray-950', s.status, statusColor[user.status])} />
      )}

      {showTooltip && hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 shadow-xl">
            <p className="font-medium">{user.name}</p>
            {user.status && <p className="text-gray-500 capitalize">{user.status}</p>}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function PresenceAvatars({
  users, max = 5, size = 'sm', showStatus = true,
  showTooltip = true, className,
}: PresenceAvatarsProps) {
  const s = sizeMap[size];
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <div className={cn('flex items-center', s.offset, className)}>
      <AnimatePresence>
        {visible.map((user, i) => (
          <Avatar key={user.id} user={user} size={size} showStatus={showStatus} showTooltip={showTooltip} idx={i} />
        ))}
      </AnimatePresence>

      {overflow > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn('rounded-full border-2 border-gray-950 flex items-center justify-center bg-gray-800 text-gray-400 font-semibold shrink-0', s.avatar, s.text)}
        >
          +{overflow}
        </motion.div>
      )}
    </div>
  );
}

// ─── RealtimeIndicator ────────────────────────────────────────────────────────

export interface RealtimeIndicatorProps {
  count?: number;
  label?: string;
  pulse?: boolean;
  color?: 'green' | 'blue' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

const indicatorColor = {
  green: { dot: 'bg-emerald-400', pulse: 'bg-emerald-400', text: 'text-emerald-400' },
  blue:  { dot: 'bg-crisp-400', pulse: 'bg-crisp-400', text: 'text-crisp-400' },
  amber: { dot: 'bg-amber-400', pulse: 'bg-amber-400', text: 'text-amber-400' },
};

export function RealtimeIndicator({ count, label, pulse = true, color = 'green', size = 'sm', className }: RealtimeIndicatorProps) {
  const c = indicatorColor[color];
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className="relative flex items-center justify-center">
        {pulse && (
          <span className={cn('absolute inline-flex rounded-full opacity-75 animate-ping', c.pulse, size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5')} />
        )}
        <span className={cn('relative inline-flex rounded-full', c.dot, size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5')} />
      </div>
      <span className={cn('font-medium', c.text, size === 'sm' ? 'text-xs' : 'text-sm')}>
        {count !== undefined && <><AnimatedCount value={count} /> {label ?? 'online'}</>}
        {count === undefined && (label ?? 'Live')}
      </span>
    </div>
  );
}

function AnimatedCount({ value }: { value: number }) {
  return <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>{value}</motion.span>;
}
