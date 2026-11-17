import { useMemo, useState } from 'react';
import { RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import type { Question, Reference } from '@/content/types';
import { QuestionCard } from './QuestionCard';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/Inputs';
import { useProgressStore } from '@/store/useProgressStore';
import { isMastered } from '@/lib/srs';

function refLabel(refs: Reference[], id?: string) {
  if (!id) return undefined;
  return refs.find((r) => r.id === id)?.citation;
}

/** Tutor-mode quiz: immediate feedback, results feed spaced repetition. */
export function Quiz({ questions, references }: { questions: Question[]; references: Reference[] }) {
  const record = useProgressStore((s) => s.recordQuestion);
  const progress = useProgressStore((s) => s.questions);
  const [pool, setPool] = useState<Question[]>(questions);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [round, setRound] = useState(0);

  const q = pool[idx];
  const done = idx >= pool.length;
  const correctCount = pool.filter((x) => answers[x.id] === x.answer).length;
  const mastered = useMemo(() => questions.filter((x) => isMastered(progress[x.id])).length, [questions, progress]);

  const select = (oi: number) => {
    if (!q || answers[q.id] !== undefined) return;
    setAnswers((a) => ({ ...a, [q.id]: oi }));
    record(q.id, oi === q.answer);
  };

  const restart = (subset: Question[]) => {
    setPool(subset);
    setIdx(0);
    setAnswers({});
    setRound((r) => r + 1);
  };

  if (done) {
    const missed = pool.filter((x) => answers[x.id] !== x.answer);
    const pct = pool.length ? Math.round((correctCount / pool.length) * 100) : 0;
    return (
      <div className="space-y-4 rounded-xl border bg-card p-6 text-center">
        <Trophy className="mx-auto h-10 w-10 text-amber-500" />
        <p className="text-2xl font-bold">
          {correctCount}/{pool.length} <span className="text-muted-foreground">({pct}%)</span>
        </p>
        <p className="text-sm text-muted-foreground">
          {pct >= 85
            ? 'Strong. Missed items are queued for spaced review.'
            : 'Re-read the sections tied to your misses, then retry them.'}{' '}
          Mastered in this module: {mastered}/{questions.length}.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {missed.length > 0 && (
            <Button onClick={() => restart(missed)}>
              <RotateCcw className="h-4 w-4" /> Retry {missed.length} missed
            </Button>
          )}
          <Button variant="outline" onClick={() => restart(questions)}>
            Restart all
          </Button>
        </div>
      </div>
    );
  }

  const answered = answers[q.id] !== undefined;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="whitespace-nowrap">
          {idx + 1} / {pool.length}
        </span>
        <ProgressBar value={idx / pool.length} />
        <span className="whitespace-nowrap">Mastered {mastered}/{questions.length}</span>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <QuestionCard
          q={q}
          seed={round}
          selected={answers[q.id] ?? null}
          onSelect={select}
          reveal={answered}
          source={refLabel(references, q.ref)}
        />
        {answered && (
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIdx((i) => i + 1)} autoFocus>
              {idx + 1 < pool.length ? 'Next' : 'See results'} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
