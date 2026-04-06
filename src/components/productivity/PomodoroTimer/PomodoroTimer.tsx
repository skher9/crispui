import { useState, useCallback } from 'react';
import { cn } from '../../../utils/cn';
import { useInterval } from '../../../hooks/useInterval';
import type { PomodoroTimerProps, PomodoroPhase } from './PomodoroTimer.types';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const phaseLabels: Record<PomodoroPhase, string> = {
  work: 'Focus',
  break: 'Short Break',
  longBreak: 'Long Break',
};

const phaseColors: Record<PomodoroPhase, string> = {
  work: 'stroke-crisp-500',
  break: 'stroke-emerald-500',
  longBreak: 'stroke-sky-500',
};

const phaseBg: Record<PomodoroPhase, string> = {
  work: 'bg-crisp-50 border-crisp-100',
  break: 'bg-emerald-50 border-emerald-100',
  longBreak: 'bg-sky-50 border-sky-100',
};

export function PomodoroTimer({
  workMinutes = 25,
  breakMinutes = 5,
  longBreakMinutes = 15,
  longBreakEvery = 4,
  onPhaseChange,
  className,
}: PomodoroTimerProps) {
  const [phase, setPhase] = useState<PomodoroPhase>('work');
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);

  const totalSeconds = useCallback(() => {
    if (phase === 'work') return workMinutes * 60;
    if (phase === 'break') return breakMinutes * 60;
    return longBreakMinutes * 60;
  }, [phase, workMinutes, breakMinutes, longBreakMinutes]);

  const advancePhase = useCallback(() => {
    setRunning(false);
    if (phase === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      const next: PomodoroPhase = newCycles % longBreakEvery === 0 ? 'longBreak' : 'break';
      setPhase(next);
      setSecondsLeft((next === 'longBreak' ? longBreakMinutes : breakMinutes) * 60);
      onPhaseChange?.(next);
    } else {
      setPhase('work');
      setSecondsLeft(workMinutes * 60);
      onPhaseChange?.('work');
    }
  }, [phase, cycles, longBreakEvery, workMinutes, breakMinutes, longBreakMinutes, onPhaseChange]);

  useInterval(
    () => {
      if (secondsLeft <= 1) {
        advancePhase();
      } else {
        setSecondsLeft((s) => s - 1);
      }
    },
    running ? 1000 : null,
  );

  const progress = secondsLeft / totalSeconds();
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  const reset = () => {
    setRunning(false);
    setSecondsLeft(totalSeconds());
  };

  const switchPhase = (p: PomodoroPhase) => {
    setPhase(p);
    setRunning(false);
    const secs =
      p === 'work' ? workMinutes * 60 : p === 'break' ? breakMinutes * 60 : longBreakMinutes * 60;
    setSecondsLeft(secs);
  };

  return (
    <div className={cn('flex flex-col items-center gap-6 p-8 rounded-2xl border', phaseBg[phase], className)}>
      {/* Phase selector */}
      <div className="flex gap-2">
        {(['work', 'break', 'longBreak'] as PomodoroPhase[]).map((p) => (
          <button
            key={p}
            onClick={() => switchPhase(p)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
              phase === p
                ? 'bg-white shadow-sm text-gray-800'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {phaseLabels[p]}
          </button>
        ))}
      </div>

      {/* SVG ring */}
      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-200"
          />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className={cn('transition-all duration-1000', phaseColors[phase])}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold tabular-nums text-gray-800">
            {minutes}:{seconds}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">{phaseLabels[phase]}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-white transition-all"
          aria-label="Reset"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className={cn(
            'px-8 py-2.5 rounded-full font-semibold text-sm text-white transition-all shadow-sm',
            phase === 'work'
              ? 'bg-crisp-600 hover:bg-crisp-700'
              : phase === 'break'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-sky-600 hover:bg-sky-700',
          )}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <span className="text-xs text-gray-400 w-12 text-center">#{cycles + 1}</span>
      </div>
    </div>
  );
}
