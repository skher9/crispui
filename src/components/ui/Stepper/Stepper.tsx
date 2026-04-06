import { forwardRef, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';
import type { HTMLAttributes } from 'react';

interface StepperCtx {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'outlined' | 'dots';
  steps: number;
}
const StepperContext = createContext<StepperCtx>({ activeStep: 0, orientation: 'horizontal', variant: 'default', steps: 0 });

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outlined' | 'dots';
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep, orientation = 'horizontal', variant = 'default', className, children, ...props }, ref) => {
    const steps = Array.isArray(children) ? children.length : 1;
    return (
      <StepperContext.Provider value={{ activeStep, orientation, variant, steps }}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    );
  },
);
Stepper.displayName = 'Stepper';

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  error?: boolean;
  optional?: boolean;
}

export const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ index, label, description, icon, error, optional, className, children, ...props }, ref) => {
    const { activeStep, orientation, steps } = useContext(StepperContext);
    const isCompleted = index < activeStep;
    const isActive = index === activeStep;
    const isLast = index === steps - 1;

    const CircleContent = () => {
      if (isCompleted) return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
      if (error) return <span className="text-sm font-bold">!</span>;
      if (icon) return <>{icon}</>;
      return <span className="text-xs font-bold">{index + 1}</span>;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-col items-center flex-1' : 'flex-row gap-4',
          className,
        )}
        {...props}
      >
        {/* Circle + connector row */}
        <div className={cn('flex', orientation === 'horizontal' ? 'w-full items-center' : 'flex-col items-center')}>
          <motion.div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-medium text-sm transition-all',
              isCompleted && 'bg-crisp-600 text-white',
              isActive && 'bg-crisp-500/20 border-2 border-crisp-500 text-crisp-300',
              !isCompleted && !isActive && 'bg-gray-800 border border-gray-600 text-gray-500',
              error && 'bg-rose-500/15 border-rose-500 text-rose-400',
            )}
            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CircleContent />
          </motion.div>

          {!isLast && (
            <div className={cn(
              'bg-gray-700 relative overflow-hidden',
              orientation === 'horizontal' ? 'h-0.5 flex-1 mx-2' : 'w-0.5 flex-1 my-2',
            )}>
              <motion.div
                className="absolute inset-0 bg-crisp-500"
                initial={{ scaleX: orientation === 'horizontal' ? 0 : 1, scaleY: orientation === 'vertical' ? 0 : 1 }}
                animate={{
                  scaleX: orientation === 'horizontal' ? (isCompleted ? 1 : 0) : 1,
                  scaleY: orientation === 'vertical' ? (isCompleted ? 1 : 0) : 1,
                }}
                style={{ transformOrigin: orientation === 'horizontal' ? 'left' : 'top' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>

        {/* Label */}
        <div className={cn(
          orientation === 'horizontal' ? 'text-center mt-2' : 'pb-6',
        )}>
          {label && (
            <p className={cn('text-sm font-medium', isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-500')}>
              {label}
              {optional && <span className="ml-1 text-xs text-gray-500">(optional)</span>}
            </p>
          )}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    );
  },
);
Step.displayName = 'Step';
