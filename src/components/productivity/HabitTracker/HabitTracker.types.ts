export interface HabitDefinition {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface HabitTrackerProps {
  habits: HabitDefinition[];
  storageKey?: string;
  onCompletionChange?: (habitId: string, date: string, completed: boolean) => void;
  weekStartDay?: 0 | 1; // 0 = Sunday, 1 = Monday
  className?: string;
}
