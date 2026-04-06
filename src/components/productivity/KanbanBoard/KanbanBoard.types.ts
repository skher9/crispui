import type { ReactNode } from 'react';

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
}

export interface KanbanBoardProps {
  initialColumns: KanbanColumn[];
  storageKey?: string;
  onBoardChange?: (columns: KanbanColumn[]) => void;
  cardRenderer?: (card: KanbanCard, columnId: string) => ReactNode;
  className?: string;
}
