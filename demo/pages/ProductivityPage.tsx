import { PomodoroTimer, KanbanBoard, HabitTracker } from '@crispui/react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';
import { PropsTable } from '../components/PropsTable';

const COLUMNS = [
  { id: 'todo', title: 'To Do', cards: [
    { id: '1', title: 'Design system tokens', tags: ['design'], priority: 'high' as const },
    { id: '2', title: 'Write component tests', tags: ['dev'], priority: 'medium' as const },
  ]},
  { id: 'in-progress', title: 'In Progress', cards: [
    { id: '3', title: 'Build Kanban board', description: 'Drag and drop', tags: ['dev'], priority: 'high' as const },
  ]},
  { id: 'done', title: 'Done', cards: [
    { id: '4', title: 'Project setup', tags: ['dev'] },
  ]},
];

const HABITS = [
  { id: '1', name: 'Exercise', icon: '💪', target: 5, completedDays: [0, 1, 3, 5] },
  { id: '2', name: 'Read', icon: '📚', target: 7, completedDays: [0, 1, 2, 3, 4] },
  { id: '3', name: 'Meditate', icon: '🧘', target: 7, completedDays: [1, 2, 4, 6] },
];

export function PomodoroPage() {
  return (
    <DocPage title="PomodoroTimer" description="A full Pomodoro productivity timer with work/break cycles, session count, and alarm sound." importNames="PomodoroTimer">
      <DocSection title="Basic usage">
        <Callout variant="tip">The timer plays a soft chime when the session ends. Make sure your volume is on.</Callout>
        <ExampleBlock code={`<PomodoroTimer
  workMinutes={25}
  breakMinutes={5}
  onSessionComplete={type => console.log('done:', type)}
/>`} previewClassName="flex-col items-center">
          <PomodoroTimer workMinutes={25} breakMinutes={5} />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'workMinutes', type: 'number', default: '25', description: 'Work session duration in minutes.' },
        { name: 'breakMinutes', type: 'number', default: '5', description: 'Break session duration in minutes.' },
        { name: 'longBreakMinutes', type: 'number', default: '15', description: 'Long break duration after every 4 sessions.' },
        { name: 'onSessionComplete', type: "(type: 'work' | 'break') => void", description: 'Callback fired when a session ends.' },
      ]} />
    </DocPage>
  );
}

export function KanbanPage() {
  return (
    <DocPage title="KanbanBoard" description="A drag-and-drop Kanban board with priority badges, tags, and add-card functionality." importNames="KanbanBoard">
      <DocSection title="Basic usage">
        <ExampleBlock code={`const columns = [
  { id: 'todo', title: 'To Do', cards: [
    { id: '1', title: 'Design tokens', tags: ['design'], priority: 'high' },
  ]},
  { id: 'in-progress', title: 'In Progress', cards: [] },
  { id: 'done', title: 'Done', cards: [] },
];

<KanbanBoard initialColumns={columns} />`} previewClassName="flex-col items-stretch w-full overflow-x-auto">
          <KanbanBoard initialColumns={COLUMNS} />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'initialColumns', type: 'KanbanColumn[]', required: true, description: 'Initial column and card data.' },
        { name: 'onCardMove', type: '(cardId: string, fromCol: string, toCol: string) => void', description: 'Called when a card is moved.' },
        { name: 'onCardAdd', type: '(colId: string, card: KanbanCard) => void', description: 'Called when a new card is added.' },
      ]} />
    </DocPage>
  );
}

export function HabitTrackerPage() {
  return (
    <DocPage title="HabitTracker" description="Weekly habit tracking grid with completion marking and streak visualization." importNames="HabitTracker">
      <DocSection title="Basic usage">
        <ExampleBlock code={`const habits = [
  { id: '1', name: 'Exercise', icon: '💪', target: 5, completedDays: [0, 1, 3] },
  { id: '2', name: 'Read', icon: '📚', target: 7, completedDays: [0, 1, 2, 3, 4] },
];

<HabitTracker habits={habits} />`} previewClassName="flex-col items-stretch w-full">
          <HabitTracker habits={HABITS} />
        </ExampleBlock>
      </DocSection>
      <PropsTable props={[
        { name: 'habits', type: 'Habit[]', required: true, description: 'Array of habit definitions with completion data.' },
        { name: 'onToggle', type: '(habitId: string, day: number) => void', description: 'Called when a day cell is toggled.' },
      ]} />
    </DocPage>
  );
}
