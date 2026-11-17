import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ToolFrame, ProgressBar } from '@/components/ui/Inputs';
import { RichText } from '@/components/content/RichText';
import { cn, shuffle } from '@/lib/utils';

/* ---------------- Evidence sorter: "would you do it?" ---------------- */

export type EvidenceVerdict = 'do' | 'selective' | 'dont';

export interface EvidenceItem {
  name: string;
  verdict: EvidenceVerdict;
  why: string;
}

const VERDICT_LABEL: Record<EvidenceVerdict, string> = { do: 'Do routinely', selective: 'Selected cases only', dont: "Don't do" };

export function EvidenceSorter({ title, subtitle, items, source }: { title: string; subtitle: string; items: EvidenceItem[]; source: string }) {
  const [answers, setAnswers] = useState<Record<number, EvidenceVerdict>>({});
  const score = items.filter((it, i) => answers[i] === it.verdict).length;
  const done = Object.keys(answers).length;
  return (
    <ToolFrame title={title} subtitle={subtitle} source={source}>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <ProgressBar value={done / items.length} />
        <span className="whitespace-nowrap">
          {score}/{done} right
        </span>
        {done > 0 && (
          <button type="button" className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => setAnswers({})}>
            <RotateCcw className="h-3 w-3" /> reset
          </button>
        )}
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => {
          const a = answers[i];
          const answered = a !== undefined;
          const right = a === it.verdict;
          return (
            <li key={it.name} className={cn('rounded-lg border p-3', answered && (right ? 'border-emerald-500/50' : 'border-red-500/50'))}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium">{it.name}</span>
                <div className="flex flex-wrap gap-1">
                  {(['do', 'selective', 'dont'] as EvidenceVerdict[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      disabled={answered}
                      onClick={() => setAnswers((s) => ({ ...s, [i]: v }))}
                      className={cn(
                        'rounded-md border px-2 py-1 text-xs transition-colors disabled:cursor-default',
                        !answered && 'hover:bg-accent',
                        answered && v === it.verdict && 'border-emerald-500 bg-emerald-500/15 font-semibold',
                        answered && v === a && v !== it.verdict && 'border-red-500 bg-red-500/15 line-through'
                      )}
                    >
                      {VERDICT_LABEL[v]}
                    </button>
                  ))}
                </div>
              </div>
              {answered && (
                <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
                  {right ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" /> : <XCircle className="mt-0.5 h-4 w-4 flex-none text-red-500" />}
                  <span>
                    <RichText md={it.why} />
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </ToolFrame>
  );
}

/* ---------------- Case sorter: vignette → pick the diagnosis ---------------- */

export interface SorterCase {
  vignette: string;
  answer: string;
  explanation: string;
}

export function CaseSorter({ title, subtitle, cases, choices, source }: { title: string; subtitle: string; cases: SorterCase[]; choices: string[]; source: string }) {
  const [seed, setSeed] = useState(1);
  const order = useMemo(() => shuffle(cases, seed), [cases, seed]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const c = order[i];
  const finished = i >= order.length;

  const choose = (opt: string) => {
    if (pick) return;
    setPick(opt);
    if (opt === c.answer) setScore((s) => s + 1);
  };
  const next = () => {
    setPick(null);
    setI((n) => n + 1);
  };
  const restart = () => {
    setSeed((s) => s + 1);
    setI(0);
    setPick(null);
    setScore(0);
  };

  return (
    <ToolFrame title={title} subtitle={subtitle} source={source}>
      {finished ? (
        <div className="space-y-3 text-center">
          <p className="text-xl font-bold">
            {score}/{order.length}
          </p>
          <Button variant="outline" onClick={restart}>
            <RotateCcw className="h-4 w-4" /> New order
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="whitespace-nowrap">
              {i + 1}/{order.length}
            </span>
            <ProgressBar value={i / order.length} />
            <span className="whitespace-nowrap">Score {score}</span>
          </div>
          <p className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
            <RichText md={c.vignette} />
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {choices.map((opt) => {
              const isAns = opt === c.answer;
              const chosen = opt === pick;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={!!pick}
                  onClick={() => choose(opt)}
                  className={cn(
                    'rounded-lg border-2 px-3 py-2 text-left text-sm transition-colors disabled:cursor-default',
                    !pick && 'hover:border-primary/60 hover:bg-accent/50',
                    pick && isAns && 'border-emerald-500 bg-emerald-500/10',
                    pick && chosen && !isAns && 'border-red-500 bg-red-500/10',
                    pick && !isAns && !chosen && 'opacity-60'
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {pick && (
            <div className={cn('rounded-lg border p-3 text-sm', pick === c.answer ? 'border-emerald-500/40 bg-emerald-500/[0.07]' : 'border-red-500/40 bg-red-500/[0.07]')}>
              <p className="font-semibold">{pick === c.answer ? 'Correct' : `Answer: ${c.answer}`}</p>
              <p className="mt-1">
                <RichText md={c.explanation} />
              </p>
              <div className="mt-3 flex justify-end">
                <Button size="sm" onClick={next}>
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </ToolFrame>
  );
}
