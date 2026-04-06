import { createContext, useContext, useState } from 'react';
import { cn } from '../../../utils/cn';
import type { MultiStepFormProps, FormStepContextValue, StepDefinition } from './MultiStepForm.types';

const FormStepContext = createContext<FormStepContextValue | null>(null);

export function useFormStepContext() {
  const ctx = useContext(FormStepContext);
  if (!ctx) throw new Error('useFormStepContext must be used within MultiStepForm');
  return ctx;
}

function StepIndicator({
  steps,
  currentStep,
  visitedSteps,
  allowBack,
  goTo,
}: {
  steps: StepDefinition[];
  currentStep: number;
  visitedSteps: Set<number>;
  allowBack: boolean;
  goTo: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isCompleted = visitedSteps.has(i) && i < currentStep;
        const isCurrent = i === currentStep;
        const isReachable = allowBack && visitedSteps.has(i);

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => isReachable && goTo(i)}
              disabled={!isReachable}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all flex-shrink-0',
                isCompleted
                  ? 'bg-crisp-500 text-white cursor-pointer hover:bg-crisp-600'
                  : isCurrent
                    ? 'bg-crisp-600 text-white ring-4 ring-crisp-100'
                    : 'bg-gray-100 text-gray-400',
                isReachable && !isCurrent && 'cursor-pointer',
              )}
              aria-label={`Go to step ${i + 1}: ${step.title}`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </button>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-1 transition-colors', i < currentStep ? 'bg-crisp-400' : 'bg-gray-200')} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function MultiStepForm({
  steps,
  onComplete,
  onStepChange,
  allowBackNavigation = true,
  className,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  const [validating, setValidating] = useState(false);

  const goTo = (step: number) => {
    setCurrentStep(step);
    setVisitedSteps((prev) => new Set([...prev, step]));
    onStepChange?.(step);
  };

  const next = async () => {
    const step = steps[currentStep];
    if (step.validate) {
      setValidating(true);
      const ok = await step.validate();
      setValidating(false);
      if (!ok) return;
    }
    if (currentStep < steps.length - 1) {
      goTo(currentStep + 1);
    } else {
      onComplete?.();
    }
  };

  const back = () => {
    if (currentStep > 0) goTo(currentStep - 1);
  };

  const ctx: FormStepContextValue = {
    currentStep,
    totalSteps: steps.length,
    next,
    back,
    goTo,
    visitedSteps,
  };

  const step = steps[currentStep];

  return (
    <FormStepContext.Provider value={ctx}>
      <div className={cn('bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden', className)}>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            visitedSteps={visitedSteps}
            allowBack={allowBackNavigation}
            goTo={goTo}
          />
          <div className="mt-4">
            <h3 className="text-base font-semibold text-gray-800">{step.title}</h3>
            {step.description && (
              <p className="text-sm text-gray-400 mt-0.5">{step.description}</p>
            )}
          </div>
        </div>

        {/* Step content */}
        <div className="px-6 py-5">
          <PageTransitionInner key={step.id}>
            {step.content}
          </PageTransitionInner>
        </div>

        {/* Footer actions */}
        <div className="px-6 pb-6 flex justify-between items-center">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{currentStep + 1} of {steps.length}</span>
            <button
              onClick={next}
              disabled={validating}
              className="px-5 py-2 bg-crisp-600 hover:bg-crisp-700 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-70 shadow-sm"
            >
              {validating
                ? 'Validating…'
                : currentStep === steps.length - 1
                  ? 'Complete'
                  : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </FormStepContext.Provider>
  );
}

// Small inline fade transition for step content
function PageTransitionInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[fadeIn_250ms_ease-out_forwards]">
      {children}
    </div>
  );
}
