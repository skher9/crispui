import type { ReactNode } from 'react';

export interface StepDefinition {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  validate?: () => boolean | Promise<boolean>;
}

export interface FormStepContextValue {
  currentStep: number;
  totalSteps: number;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  visitedSteps: Set<number>;
}

export interface MultiStepFormProps {
  steps: StepDefinition[];
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
  allowBackNavigation?: boolean;
  className?: string;
}
