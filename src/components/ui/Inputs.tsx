import React, { useId } from 'react';
import { cn } from '@/lib/utils';
import { toneClass } from '@/lib/theme';
import type { Verdict } from '@/lib/calc/types';
import { RichText } from '@/components/content/RichText';

export interface ChoiceOption<T extends string | number> {
  value: T;
  label: string;
  hint?: string;
}

/** Accessible segmented control (radio group semantics). */
export function Choice<T extends string | number>({
  label,
  value,
  onChange,
  options,
  columns,
  hint,
}: {
  label: string;
  value: T | null;
  onChange: (v: T) => void;
  options: ChoiceOption<T>[];
  columns?: 2 | 3 | 4 | 5;
  hint?: string;
}) {
  const id = useId();
  const cols = columns ?? (options.length <= 3 ? options.length : options.length === 4 ? 2 : 3);
  const grid = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5' }[cols as 1 | 2 | 3 | 4 | 5];
  return (
    <fieldset className="space-y-1.5">
      <legend id={id} className="text-sm font-medium">
        {label}
      </legend>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div role="radiogroup" aria-labelledby={id} className={cn('grid grid-cols-1 gap-1.5', grid)}>
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={cn(
                'rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                active
                  ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                  : 'border-input bg-card hover:bg-accent'
              )}
            >
              <span className="font-medium">{o.label}</span>
              {o.hint && <span className="block text-xs text-muted-foreground">{o.hint}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  unit,
  placeholder,
  min,
  max,
  step,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex items-stretch overflow-hidden rounded-lg border border-input bg-card focus-within:ring-2 focus-within:ring-ring">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step ?? 'any'}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent px-3 py-2 text-sm outline-none"
        />
        {unit && <span className="flex items-center whitespace-nowrap border-l bg-muted px-3 text-xs text-muted-foreground">{unit}</span>}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Check({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm transition-colors',
        checked ? 'border-primary bg-primary/10' : 'border-input bg-card hover:bg-accent'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
      />
      <span>
        <span className="font-medium">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
    </label>
  );
}


/** Result panel announced to screen readers. */
export function Result({ verdict, empty }: { verdict: Verdict | null; empty?: string }) {
  if (!verdict) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground" aria-live="polite">
        {empty ?? 'Enter the inputs to see the result.'}
      </div>
    );
  }
  const t = toneClass[verdict.tone];
  return (
    <div className={cn('rounded-lg border p-4', t.box)} aria-live="polite">
      <p className={cn('font-semibold', t.title)}>{verdict.title}</p>
      {verdict.points && verdict.points.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm">
          {verdict.points.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className={cn('mt-2 h-1.5 w-1.5 flex-none rounded-full', t.dot)} />
              <span>
                <RichText md={p} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {verdict.note && (
        <p className="mt-2 text-xs text-muted-foreground">
          <RichText md={verdict.note} />
        </p>
      )}
    </div>
  );
}

export function ToolFrame({
  title,
  subtitle,
  children,
  source,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  source?: string;
}) {
  return (
    <div data-tool={title} className="rounded-xl border-2 border-primary/30 bg-card shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b bg-primary/[0.06] px-5 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Interactive</p>
          <h4 className="font-semibold leading-tight">{title}</h4>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-4 p-5">{children}</div>
      {source && <p className="border-t px-5 py-2 text-xs text-muted-foreground">Basis: {source}</p>}
    </div>
  );
}

export function ProgressBar({ value, className, barClass }: { value: number; className?: string; barClass?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={cn('h-full rounded-full bg-primary transition-all', barClass)} style={{ width: `${pct}%` }} />
    </div>
  );
}
