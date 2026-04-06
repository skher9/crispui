import { useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import type { KanbanBoardProps, KanbanCard, KanbanColumn } from './KanbanBoard.types';

const priorityColors: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

const defaultColors = [
  'bg-crisp-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-sky-500',
];

function CardView({ card }: { card: KanbanCard }) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing select-none">
      <p className="text-sm font-medium text-gray-800">{card.title}</p>
      {card.description && (
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{card.description}</p>
      )}
      <div className="flex flex-wrap gap-1 mt-2">
        {card.priority && (
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', priorityColors[card.priority])}>
            {card.priority}
          </span>
        )}
        {card.tags?.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function KanbanBoard({
  initialColumns,
  storageKey,
  onBoardChange,
  cardRenderer,
  className,
}: KanbanBoardProps) {
  const [storedColumns, setStoredColumns] = useLocalStorage<KanbanColumn[]>(
    storageKey ?? '__crispui_kanban__',
    initialColumns,
  );
  const [columns, setColumns] = useState<KanbanColumn[]>(
    storageKey ? storedColumns : initialColumns,
  );
  const [dragOver, setDragOver] = useState<string | null>(null);

  const draggingCard = useRef<{ cardId: string; fromColumnId: string } | null>(null);

  const updateColumns = (next: KanbanColumn[]) => {
    setColumns(next);
    if (storageKey) setStoredColumns(next);
    onBoardChange?.(next);
  };

  const handleDragStart = (cardId: string, fromColumnId: string) => {
    draggingCard.current = { cardId, fromColumnId };
  };

  const handleDrop = (toColumnId: string) => {
    if (!draggingCard.current) return;
    const { cardId, fromColumnId } = draggingCard.current;
    if (fromColumnId === toColumnId) {
      setDragOver(null);
      return;
    }

    let movedCard: KanbanCard | undefined;
    const next = columns.map((col) => {
      if (col.id === fromColumnId) {
        const card = col.cards.find((c) => c.id === cardId);
        movedCard = card;
        return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
      }
      return col;
    });

    if (movedCard) {
      const withCard = next.map((col) => {
        if (col.id === toColumnId) return { ...col, cards: [...col.cards, movedCard!] };
        return col;
      });
      updateColumns(withCard);
    }

    draggingCard.current = null;
    setDragOver(null);
  };

  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-2', className)}>
      {columns.map((col, colIdx) => (
        <div
          key={col.id}
          onDragOver={(e) => { e.preventDefault(); setDragOver(col.id); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={() => handleDrop(col.id)}
          className={cn(
            'flex-shrink-0 w-64 rounded-xl p-3 transition-colors',
            dragOver === col.id ? 'bg-crisp-50 ring-2 ring-crisp-300' : 'bg-gray-50',
          )}
        >
          {/* Column header */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn('w-2.5 h-2.5 rounded-full', col.color ?? defaultColors[colIdx % defaultColors.length])} />
            <span className="text-sm font-semibold text-gray-700">{col.title}</span>
            <span className="ml-auto text-xs text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
              {col.cards.length}
            </span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2">
            {col.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card.id, col.id)}
              >
                {cardRenderer ? cardRenderer(card, col.id) : <CardView card={card} />}
              </div>
            ))}
          </div>

          {col.cards.length === 0 && (
            <div className="text-xs text-gray-400 text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
              Drop cards here
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
