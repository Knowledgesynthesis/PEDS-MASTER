import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClipboardCheck, ArrowLeft, ArrowRight, RotateCcw, Play, Flag } from 'lucide-react';
import { MODULES, ALL_QUESTIONS, sourceFor, type TaggedQuestion } from '@/content';
import { QuestionCard } from '@/components/content/QuestionCard';
import { Button } from '@/components/ui/Button';
import { Choice, ProgressBar } from '@/components/ui/Inputs';
import { useProgressStore } from '@/store/useProgressStore';
import { isDue, isMastered } from '@/lib/srs';
import { cn, shuffle } from '@/lib/utils';

type Mode = 'tutor' | 'exam';
type Source = 'all' | 'unseen' | 'due';

export default function Assessment() {
  const [params] = useSearchParams();
  const progress = useProgressStore((s) => s.questions);
  const record = useProgressStore((s) => s.recordQuestion);
  const [selected, setSelected] = useState<Set<string>>(new Set(MODULES.map((m) => m.slug)));
  const [count, setCount] = useState<number>(20);
  const [mode, setMode] = useState<Mode>('tutor');
  const [source, setSource] = useState<Source>((params.get('source') as Source) || 'all');
  const [session, setSession] = useState<{ qs: TaggedQuestion[]; seed: number } | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const pool = useMemo(() => {
    const now = Date.now();
    return ALL_QUESTIONS.filter((q) => selected.has(q.module.slug)).filter((q) => {
      const s = progress[q.id];
      if (source === 'unseen') return !s;
      if (source === 'due') return isDue(s, now) && !isMastered(s);
      return true;
    });
  }, [selected, source, progress]);

  const start = () => {
    const seed = Date.now() % 100000;
    const qs = shuffle(pool, seed).slice(0, count === 0 ? pool.length : count);
    setSession({ qs, seed });
    setIdx(0);
    setAnswers({});
    setSubmitted(false);
  };

  const toggle = (slug: string) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex items-start gap-3">
          <ClipboardCheck className="mt-1 h-7 w-7 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Exam builder</h1>
            <p className="text-muted-foreground">Mix modules, choose feedback mode, and target what you have missed.</p>
          </div>
        </header>
        <div className="space-y-5 rounded-xl border bg-card p-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Modules</p>
              <div className="flex gap-2 text-xs">
                <button type="button" className="text-primary hover:underline" onClick={() => setSelected(new Set(MODULES.map((m) => m.slug)))}>
                  All
                </button>
                <button type="button" className="text-primary hover:underline" onClick={() => setSelected(new Set())}>
                  None
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {MODULES.map((m) => (
                <button
                  key={m.slug}
                  type="button"
                  aria-pressed={selected.has(m.slug)}
                  onClick={() => toggle(m.slug)}
                  className={cn('rounded-full border px-3 py-1 text-sm', selected.has(m.slug) ? 'border-primary bg-primary/10 font-medium' : 'text-muted-foreground hover:bg-accent')}
                >
                  {m.short}
                </button>
              ))}
            </div>
          </div>
          <Choice
            label="Questions from"
            value={source}
            onChange={setSource}
            options={[
              { value: 'all', label: 'All' },
              { value: 'unseen', label: 'Not yet attempted' },
              { value: 'due', label: 'Missed / due for review' },
            ]}
          />
          <Choice
            label="Length"
            value={count}
            onChange={setCount}
            columns={4}
            options={[
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 40, label: '40' },
              { value: 0, label: 'All available' },
            ]}
          />
          <Choice
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'tutor', label: 'Tutor', hint: 'Explanation after each answer' },
              { value: 'exam', label: 'Exam', hint: 'Score and explanations at the end' },
            ]}
          />
          <div className="flex items-center justify-between gap-3 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              {pool.length} question{pool.length === 1 ? '' : 's'} available
            </p>
            <Button onClick={start} disabled={pool.length === 0}>
              <Play className="h-4 w-4" /> Start
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const qs = session.qs;
  const q = qs[idx];
  const answered = q ? answers[q.id] !== undefined : false;
  const finished = submitted || (mode === 'tutor' && idx >= qs.length);

  const choose = (oi: number) => {
    if (mode === 'tutor') {
      if (answered) return;
      setAnswers((a) => ({ ...a, [q.id]: oi }));
      record(q.id, oi === q.answer);
    } else {
      setAnswers((a) => ({ ...a, [q.id]: oi }));
    }
  };

  const submitExam = () => {
    qs.forEach((x) => record(x.id, answers[x.id] === x.answer));
    setSubmitted(true);
  };

  if (finished) {
    const correct = qs.filter((x) => answers[x.id] === x.answer).length;
    const pct = Math.round((correct / qs.length) * 100);
    const byMod = MODULES.map((m) => {
      const mq = qs.filter((x) => x.module.slug === m.slug);
      return { m, n: mq.length, c: mq.filter((x) => answers[x.id] === x.answer).length };
    }).filter((r) => r.n > 0);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">Score</p>
          <p className="text-4xl font-bold">
            {correct}/{qs.length} <span className="text-2xl text-muted-foreground">({pct}%)</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button onClick={() => setSession(null)}>
              <RotateCcw className="h-4 w-4" /> New exam
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="tbl">
            <thead>
              <tr>
                <th>Module</th>
                <th>Score</th>
                <th className="w-1/2">Performance</th>
              </tr>
            </thead>
            <tbody>
              {byMod.map((r) => (
                <tr key={r.m.slug}>
                  <td>{r.m.short}</td>
                  <td>
                    {r.c}/{r.n}
                  </td>
                  <td>
                    <ProgressBar value={r.c / r.n} barClass={r.c / r.n >= 0.8 ? 'bg-emerald-500' : r.c / r.n >= 0.6 ? 'bg-amber-500' : 'bg-red-500'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-lg font-semibold">Review</h2>
        <div className="space-y-4">
          {qs.map((x, i) => (
            <details key={x.id} className="rounded-xl border bg-card p-4" open={answers[x.id] !== x.answer}>
              <summary className="cursor-pointer text-sm font-medium">
                <span className={answers[x.id] === x.answer ? 'text-emerald-600' : 'text-red-600'}>{answers[x.id] === x.answer ? '✓' : '✗'}</span> Q{i + 1} · {x.module.short}
              </summary>
              <div className="mt-3">
                <QuestionCard q={x} seed={session.seed} selected={answers[x.id] ?? null} reveal source={sourceFor(x)} />
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <button type="button" className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => setSession(null)}>
          <ArrowLeft className="h-3.5 w-3.5" /> Setup
        </button>
        <ProgressBar value={(mode === 'exam' ? Object.keys(answers).length : idx) / qs.length} />
        <span className="whitespace-nowrap">
          {idx + 1}/{qs.length}
        </span>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <QuestionCard
          q={q}
          seed={session.seed}
          selected={answers[q.id] ?? null}
          onSelect={choose}
          reveal={mode === 'tutor' && answered}
          label={q.module.short}
          number={`Question ${idx + 1}`}
          source={sourceFor(q)}
        />
        <div className="mt-4 flex flex-wrap justify-between gap-2">
          {mode === 'exam' ? (
            <>
              <Button variant="outline" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              <div className="flex gap-2">
                {idx < qs.length - 1 && (
                  <Button variant={answered ? 'default' : 'outline'} onClick={() => setIdx((i) => i + 1)}>
                    {answered ? 'Next' : 'Skip'} <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                <Button variant={idx === qs.length - 1 ? 'default' : 'secondary'} onClick={submitExam}>
                  <Flag className="h-4 w-4" /> Submit ({Object.keys(answers).length}/{qs.length})
                </Button>
              </div>
            </>
          ) : (
            answered && (
              <Button className="ml-auto" onClick={() => setIdx((i) => i + 1)} autoFocus>
                {idx + 1 < qs.length ? 'Next' : 'See results'} <ArrowRight className="h-4 w-4" />
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
