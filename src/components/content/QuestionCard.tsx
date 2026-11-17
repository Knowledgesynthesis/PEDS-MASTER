import { useMemo } from 'react';
import { CheckCircle2, XCircle, BookMarked } from 'lucide-react';
import type { Question } from '@/content/types';
import { RichText } from './RichText';
import { cn, hashString, shuffle } from '@/lib/utils';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function QuestionCard({
  q,
  seed = 0,
  selected,
  onSelect,
  reveal,
  label,
  source,
  number,
}: {
  q: Question;
  seed?: number;
  selected: number | null;
  onSelect?: (originalIndex: number) => void;
  reveal: boolean;
  label?: string;
  source?: string;
  number?: string;
}) {
  const order = useMemo(
    () => shuffle(q.options.map((_, i) => i), hashString(q.id) + seed),
    [q.id, q.options, seed]
  );
  const locked = reveal || !onSelect;
  const isCorrect = selected === q.answer;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {number && <span className="font-semibold text-foreground">{number}</span>}
        {label && <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">{label}</span>}
      </div>
      <p className="text-base font-medium leading-relaxed">
        <RichText md={q.stem} />
      </p>
      <div className="space-y-2" role="radiogroup" aria-label="Answer options">
        {order.map((oi, pos) => {
          const chosen = selected === oi;
          const right = reveal && oi === q.answer;
          const wrong = reveal && chosen && oi !== q.answer;
          return (
            <button
              key={oi}
              type="button"
              role="radio"
              aria-checked={chosen}
              disabled={locked}
              onClick={() => onSelect?.(oi)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-colors disabled:cursor-default',
                !reveal && chosen && 'border-primary bg-primary/5',
                !reveal && !chosen && 'border-border hover:border-primary/50 hover:bg-accent/50',
                right && 'border-emerald-500 bg-emerald-500/10',
                wrong && 'border-red-500 bg-red-500/10',
                reveal && !right && !wrong && 'border-border opacity-70'
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 flex-none items-center justify-center rounded-full border text-xs font-semibold',
                  chosen && !reveal && 'border-primary bg-primary text-primary-foreground',
                  right && 'border-emerald-500 bg-emerald-500 text-white',
                  wrong && 'border-red-500 bg-red-500 text-white'
                )}
              >
                {right ? <CheckCircle2 className="h-4 w-4" /> : wrong ? <XCircle className="h-4 w-4" /> : LETTERS[pos]}
              </span>
              <span className="pt-0.5">{q.options[oi]}</span>
            </button>
          );
        })}
      </div>
      {reveal && (
        <div
          className={cn(
            'rounded-lg border p-4',
            selected === null
              ? 'border-border bg-muted/40'
              : isCorrect
                ? 'border-emerald-500/40 bg-emerald-500/[0.07]'
                : 'border-red-500/40 bg-red-500/[0.07]'
          )}
          aria-live="polite"
        >
          <p className="mb-1 font-semibold">
            {selected === null ? 'Not answered' : isCorrect ? 'Correct' : 'Not quite'}
            <span className="font-normal text-muted-foreground"> — answer: {q.options[q.answer]}</span>
          </p>
          <p className="text-sm leading-relaxed">
            <RichText md={q.explanation} />
          </p>
          {source && (
            <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
              <BookMarked className="mt-0.5 h-3.5 w-3.5 flex-none" />
              {source}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
