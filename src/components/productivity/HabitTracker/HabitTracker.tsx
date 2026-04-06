import { useMemo } from 'react';
import { cn } from '../../../utils/cn';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import type { HabitTrackerProps } from './HabitTracker.types';

type Completions = Record<string, Record<string, boolean>>;

function getWeekDates(weekStartDay: 0 | 1 = 1): Date[] {
  const today = new Date();
  const day = today.getDay();
  const diff = (day - weekStartDay + 7) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function HabitTracker({
  habits,
  storageKey = '__crispui_habits__',
  onCompletionChange,
  weekStartDay = 1,
  className,
}: HabitTrackerProps) {
  const [completions, setCompletions] = useLocalStorage<Completions>(storageKey, {});

  const weekDates = useMemo(() => getWeekDates(weekStartDay), [weekStartDay]);
  const todayKey = dateKey(new Date());

  const streaks = useMemo(() => {
    const result: Record<string, number> = {};
    for (const habit of habits) {
      let streak = 0;
      const d = new Date();
      while (true) {
        const key = dateKey(d);
        if (completions[habit.id]?.[key]) {
          streak++;
          d.setDate(d.getDate() - 1);
        } else {
          break;
        }
      }
      result[habit.id] = streak;
    }
    return result;
  }, [habits, completions]);

  const toggle = (habitId: string, date: string) => {
    const current = completions[habitId]?.[date] ?? false;
    const next: Completions = {
      ...completions,
      [habitId]: { ...(completions[habitId] ?? {}), [date]: !current },
    };
    setCompletions(next);
    onCompletionChange?.(habitId, date, !current);
  };

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden', className)}>
      {/* Header row */}
      <div className="grid gap-0" style={{ gridTemplateColumns: '1fr repeat(7, 2.5rem)' }}>
        <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
          Habit
        </div>
        {weekDates.map((d) => {
          const key = dateKey(d);
          const isToday = key === todayKey;
          return (
            <div
              key={key}
              className={cn(
                'flex flex-col items-center py-3 border-b border-gray-100 text-xs',
                isToday ? 'bg-crisp-50' : '',
              )}
            >
              <span className={cn('font-medium', isToday ? 'text-crisp-600' : 'text-gray-400')}>
                {DAY_SHORT[d.getDay()]}
              </span>
              <span className={cn('font-bold', isToday ? 'text-crisp-700' : 'text-gray-600')}>
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Habit rows */}
      {habits.map((habit, idx) => (
        <div
          key={habit.id}
          className={cn(
            'grid gap-0 items-center',
            idx < habits.length - 1 ? 'border-b border-gray-50' : '',
          )}
          style={{ gridTemplateColumns: '1fr repeat(7, 2.5rem)' }}
        >
          <div className="flex items-center gap-2.5 px-4 py-3">
            {habit.icon && <span className="text-lg">{habit.icon}</span>}
            <div>
              <p className="text-sm font-medium text-gray-700">{habit.name}</p>
              {streaks[habit.id] > 0 && (
                <p className="text-xs text-amber-500 font-medium">🔥 {streaks[habit.id]} day streak</p>
              )}
            </div>
          </div>
          {weekDates.map((d) => {
            const key = dateKey(d);
            const isToday = key === todayKey;
            const done = completions[habit.id]?.[key] ?? false;
            const isFuture = key > todayKey;
            return (
              <div
                key={key}
                className={cn('flex items-center justify-center py-3', isToday ? 'bg-crisp-50' : '')}
              >
                <button
                  onClick={() => !isFuture && toggle(habit.id, key)}
                  disabled={isFuture}
                  className={cn(
                    'w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all',
                    done
                      ? 'bg-crisp-500 border-crisp-500 text-white'
                      : isFuture
                        ? 'border-gray-100 cursor-default'
                        : 'border-gray-200 hover:border-crisp-400',
                  )}
                  aria-label={`${done ? 'Unmark' : 'Mark'} ${habit.name} for ${key}`}
                >
                  {done && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
