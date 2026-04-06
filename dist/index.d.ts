import { ClassValue } from 'clsx';
import { ForwardRefExoticComponent } from 'react';
import { InputHTMLAttributes } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';

export declare function AnimatedCounter({ from, to, duration, format, prefix, suffix, className, }: AnimatedCounterProps): JSX_2.Element;

export declare interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    format?: (n: number) => string;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export declare function cn(...inputs: ClassValue[]): string;

export declare type ColorToken = 'crisp' | 'emerald' | 'rose' | 'amber' | 'sky';

export declare interface ColumnDef<T> {
    key: keyof T;
    header: string;
    sortable?: boolean;
    render?: (value: T[keyof T], row: T) => ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

export declare function DataTable<T extends Record<string, unknown>>({ data, columns, rowKey, pageSize, onRowClick, loading, emptyMessage, className, }: DataTableProps<T>): JSX_2.Element;

export declare interface DataTableProps<T extends Record<string, unknown>> {
    data: T[];
    columns: ColumnDef<T>[];
    rowKey: keyof T;
    pageSize?: number;
    onRowClick?: (row: T) => void;
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
}

export declare interface FormStepContextValue {
    currentStep: number;
    totalSteps: number;
    next: () => void;
    back: () => void;
    goTo: (step: number) => void;
    visitedSteps: Set<number>;
}

export declare interface HabitDefinition {
    id: string;
    name: string;
    icon?: string;
    color?: string;
}

export declare function HabitTracker({ habits, storageKey, onCompletionChange, weekStartDay, className, }: HabitTrackerProps): JSX_2.Element;

export declare interface HabitTrackerProps {
    habits: HabitDefinition[];
    storageKey?: string;
    onCompletionChange?: (habitId: string, date: string, completed: boolean) => void;
    weekStartDay?: 0 | 1;
    className?: string;
}

export declare const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftAddon?: ReactNode;
    rightAddon?: ReactNode;
    inputSize?: Size;
    variant?: InputVariant;
    wrapperClassName?: string;
}

export declare type InputVariant = 'outline' | 'filled' | 'flushed';

export declare function KanbanBoard({ initialColumns, storageKey, onBoardChange, cardRenderer, className, }: KanbanBoardProps): JSX_2.Element;

export declare interface KanbanBoardProps {
    initialColumns: KanbanColumn[];
    storageKey?: string;
    onBoardChange?: (columns: KanbanColumn[]) => void;
    cardRenderer?: (card: KanbanCard, columnId: string) => ReactNode;
    className?: string;
}

export declare interface KanbanCard {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    priority?: 'low' | 'medium' | 'high';
}

export declare interface KanbanColumn {
    id: string;
    title: string;
    color?: string;
    cards: KanbanCard[];
}

export declare function MultiStepForm({ steps, onComplete, onStepChange, allowBackNavigation, className, }: MultiStepFormProps): JSX_2.Element;

export declare interface MultiStepFormProps {
    steps: StepDefinition[];
    onComplete?: () => void;
    onStepChange?: (step: number) => void;
    allowBackNavigation?: boolean;
    className?: string;
}

export declare function PageTransition({ children, variant, duration, className, }: PageTransitionProps): JSX_2.Element;

export declare interface PageTransitionProps {
    children: ReactNode;
    variant?: TransitionVariant;
    duration?: number;
    className?: string;
}

export declare type PomodoroPhase = 'work' | 'break' | 'longBreak';

export declare function PomodoroTimer({ workMinutes, breakMinutes, longBreakMinutes, longBreakEvery, onPhaseChange, className, }: PomodoroTimerProps): JSX_2.Element;

export declare interface PomodoroTimerProps {
    workMinutes?: number;
    breakMinutes?: number;
    longBreakMinutes?: number;
    longBreakEvery?: number;
    onPhaseChange?: (phase: PomodoroPhase) => void;
    className?: string;
}

export declare type Size = 'sm' | 'md' | 'lg';

export declare function Skeleton({ variant, width, height, lines, className }: SkeletonProps): JSX_2.Element;

export declare function SkeletonAvatar({ size }: {
    size?: number;
}): JSX_2.Element;

export declare function SkeletonCard(): JSX_2.Element;

export declare interface SkeletonProps {
    variant?: 'line' | 'circle' | 'rect';
    width?: string | number;
    height?: string | number;
    lines?: number;
    className?: string;
}

export declare function SkeletonText({ lines }: {
    lines?: number;
}): JSX_2.Element;

export declare function StatCard({ title, value, delta, deltaType, icon, variant, loading, className, }: StatCardProps): JSX_2.Element;

export declare interface StatCardProps {
    title: string;
    value: string | number;
    delta?: string | number;
    deltaType?: 'increase' | 'decrease' | 'neutral';
    icon?: ReactNode;
    variant?: ColorToken;
    loading?: boolean;
    className?: string;
}

export declare interface StepDefinition {
    id: string;
    title: string;
    description?: string;
    content: ReactNode;
    validate?: () => boolean | Promise<boolean>;
}

export declare type TransitionVariant = 'fade' | 'slideUp' | 'slideLeft';

export declare function useFormStepContext(): FormStepContextValue;

export declare function useInterval(callback: () => void, delay: number | null): void;

export declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void];

export declare type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

export { }
