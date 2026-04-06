import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  mode?: 'single' | 'range';
  disabledDates?: Date[];
  showOutsideDays?: boolean;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, value, defaultValue, onChange, minDate, maxDate, disabledDates = [], showOutsideDays = false, ...props }, ref) => {
    const [selected, setSelected] = useState<Date | undefined>(value ?? defaultValue);
    const [viewYear, setViewYear] = useState((value ?? defaultValue ?? new Date()).getFullYear());
    const [viewMonth, setViewMonth] = useState((value ?? defaultValue ?? new Date()).getMonth());
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');

    const today = new Date();
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const daysInPrev = getDaysInMonth(viewYear, viewMonth - 1);

    const navigate = (delta: number) => {
      let m = viewMonth + delta;
      let y = viewYear;
      if (m > 11) { m = 0; y++; }
      if (m < 0) { m = 11; y--; }
      setViewMonth(m);
      setViewYear(y);
    };

    const selectDate = (d: Date) => {
      if (minDate && d < minDate) return;
      if (maxDate && d > maxDate) return;
      if (disabledDates.some(dd => isSameDay(dd, d))) return;
      setSelected(d);
      onChange?.(d);
    };

    const cells: { date: Date; outside: boolean }[] = [];
    // Prev month filler
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ date: new Date(viewYear, viewMonth - 1, daysInPrev - i), outside: true });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), outside: false });
    }
    // Next month filler
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(viewYear, viewMonth + 1, d), outside: true });
    }

    return (
      <div ref={ref} className={cn('w-[280px] select-none rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-xl', className)} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => setView(v => v === 'days' ? 'months' : 'days')}
            className="text-sm font-semibold text-white hover:text-crisp-400 transition-colors"
          >
            {MONTHS[viewMonth]} {viewYear}
          </button>
          <button onClick={() => navigate(1)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'days' ? (
            <motion.div key="days" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-[10px] font-semibold text-gray-500 py-1">{d}</div>
                ))}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {cells.map(({ date, outside }, i) => {
                  const isToday = isSameDay(date, today);
                  const isSelected = selected ? isSameDay(date, selected) : false;
                  const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate) || disabledDates.some(dd => isSameDay(dd, date));
                  if (outside && !showOutsideDays) return <div key={i} />;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectDate(date)}
                      disabled={!!isDisabled}
                      className={cn(
                        'w-full aspect-square flex items-center justify-center text-xs rounded-lg transition-all',
                        outside && 'text-gray-600',
                        !outside && !isSelected && !isToday && 'text-gray-200 hover:bg-gray-800',
                        isToday && !isSelected && 'text-crisp-400 font-bold',
                        isSelected && 'bg-crisp-600 text-white font-semibold hover:bg-crisp-700',
                        isDisabled && 'opacity-30 cursor-not-allowed pointer-events-none',
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="months" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m, i) => (
                  <button key={m} type="button"
                    onClick={() => { setViewMonth(i); setView('days'); }}
                    className={cn('py-2 text-xs rounded-lg transition-colors text-gray-200 hover:bg-gray-800', i === viewMonth && 'bg-crisp-600 text-white hover:bg-crisp-700')}
                  >{m.slice(0, 3)}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {selected && (
          <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {selected.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <button type="button" onClick={() => { setSelected(undefined); onChange?.(undefined as unknown as Date); }}
              className="text-xs text-gray-500 hover:text-rose-400 transition-colors">Clear</button>
          </div>
        )}
      </div>
    );
  },
);
Calendar.displayName = 'Calendar';

// DatePicker = Calendar in a popover
export interface DatePickerProps extends Omit<CalendarProps, 'className'> {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function DatePicker({ label, placeholder = 'Pick a date', className, error, value, onChange, ...rest }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(value);
  const ref = useRef<HTMLDivElement>(null);

  function useRef<T>(initial: T | null) { return { current: initial } as React.MutableRefObject<T>; }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className="text-sm font-medium text-gray-200">{label}</label>}
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className={cn(
            'w-full flex items-center justify-between px-3 h-10 rounded-xl border text-sm transition-colors text-left',
            error ? 'border-rose-500' : 'border-gray-700 hover:border-gray-500',
            selected ? 'text-gray-100' : 'text-gray-500',
            'bg-gray-900',
          )}
        >
          {selected ? selected.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : placeholder}
          <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-1"
            >
              <Calendar
                {...rest}
                value={selected}
                onChange={d => { setSelected(d); onChange?.(d); setOpen(false); }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}
