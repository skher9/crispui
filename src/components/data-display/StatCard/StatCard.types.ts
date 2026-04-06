import type { ReactNode } from 'react';
import type { ColorToken } from '../../../types';

export interface StatCardProps {
  title: string;
  value: string | number;
  delta?: string | number;
  deltaType?: 'increase' | 'decrease' | 'neutral';
  icon?: ReactNode;
  variant?: ColorToken;
  loading?: boolean;
  className?: string;
}
