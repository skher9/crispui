import { createContext, forwardRef, useContext, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { FormHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from 'react';

// ── Context ────────────────────────────────────────────────────────────────

interface FormFieldContextValue {
  id: string;
  name?: string;
  error?: string;
  required?: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField() {
  return useContext(FormFieldContext);
}

// ── Form ───────────────────────────────────────────────────────────────────

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  gap?: 'sm' | 'md' | 'lg';
}

const gapClasses = { sm: 'gap-4', md: 'gap-5', lg: 'gap-6' };

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, gap = 'md', children, ...props }, ref) => (
    <form ref={ref} className={cn('flex flex-col', gapClasses[gap], className)} {...props}>
      {children}
    </form>
  ),
);
Form.displayName = 'Form';

// ── FormField ──────────────────────────────────────────────────────────────

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  error?: string;
  required?: boolean;
}

export function FormField({ name, error, required, children, className, ...props }: FormFieldProps) {
  const id = useId();
  return (
    <FormFieldContext.Provider value={{ id, name, error, required }}>
      <div className={cn('flex flex-col gap-1.5', className)} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
}

// ── FormLabel ──────────────────────────────────────────────────────────────

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(FormFieldContext);
    return (
      <label
        ref={ref}
        htmlFor={ctx?.id}
        className={cn('text-sm font-medium text-gray-700', className)}
        {...props}
      >
        {children}
        {ctx?.required && <span className="text-rose-500 ml-1">*</span>}
      </label>
    );
  },
);
FormLabel.displayName = 'FormLabel';

// ── FormMessage ────────────────────────────────────────────────────────────

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'error' | 'success' | 'warning' | 'hint';
}

const msgStyles = {
  error:   'text-rose-500',
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  hint:    'text-gray-400',
};

const msgIcons = {
  error:   '⊗',
  success: '✓',
  warning: '⚠',
  hint:    '',
};

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, variant = 'hint', children, ...props }, ref) => {
    const ctx = useContext(FormFieldContext);
    const message = children ?? ctx?.error;
    const resolvedVariant = ctx?.error && !children ? 'error' : variant;
    if (!message) return null;
    return (
      <p ref={ref} className={cn('text-xs flex items-center gap-1', msgStyles[resolvedVariant], className)} {...props}>
        {msgIcons[resolvedVariant] && <span aria-hidden>{msgIcons[resolvedVariant]}</span>}
        {message}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

// ── FormSection ────────────────────────────────────────────────────────────

export interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function FormSection({ title, description, children, className, ...props }: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {(title || description) && (
        <div className="pb-2 border-b border-gray-100">
          {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

// ── FormRow ────────────────────────────────────────────────────────────────

export interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3;
}

const colClasses = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-3' };

export function FormRow({ cols = 2, children, className, ...props }: FormRowProps) {
  return (
    <div className={cn('grid gap-4', colClasses[cols], className)} {...props}>
      {children}
    </div>
  );
}
