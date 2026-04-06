export type PomodoroPhase = 'work' | 'break' | 'longBreak';

export interface PomodoroTimerProps {
  workMinutes?: number;
  breakMinutes?: number;
  longBreakMinutes?: number;
  longBreakEvery?: number;
  onPhaseChange?: (phase: PomodoroPhase) => void;
  className?: string;
}
