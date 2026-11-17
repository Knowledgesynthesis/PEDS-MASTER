import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, MapPin } from 'lucide-react';
import { CASES } from '@/content/cases';
import { moduleBySlug } from '@/content';
import type { ClinicalCase } from '@/content/types';
import { RichText } from '@/components/content/RichText';
import { Button } from '@/components/ui/Button';
import { buttonClass } from '@/components/ui/buttonClass';
import { ProgressBar } from '@/components/ui/Inputs';
import { useProgressStore } from '@/store/useProgressStore';
import { moduleColor } from '@/lib/theme';
import { cn, hashString, shuffle } from '@/lib/utils';

function CasePlayer({ c, onExit }: { c: ClinicalCase; onExit: () => void }) {
  const recordCase = useProgressStore((s) => s.recordCase);
  const [stage, setStage] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [firstTry, setFirstTry] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const s = c.stages[stage];
  const order = shuffle(s.options.map((_, i) => i), hashString(c.id) + stage);
  const solved = picks.some((p) => s.options[p].correct);
  const mod = moduleBySlug(c.module);

  const pick = (i: number) => {
    if (solved || picks.includes(i)) return;
    const next = [...picks, i];
    setPicks(next);
    if (picks.length === 0) setFirstTry((f) => [...f, s.options[i].correct]);
  };

  const advance = () => {
    if (stage + 1 < c.stages.length) {
      setStage(stage + 1);
      setPicks([]);
    } else {
      recordCase(c.id, firstTry.filter(Boolean).length, c.stages.length);
      setDone(true);
    }
  };

  if (done) {
    const score = firstTry.filter(Boolean).length;
    return (
      <div className="space-y-4 rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">{c.title}</p>
        <p className="text-3xl font-bold">
          {score}/{c.stages.length} <span className="text-lg font-normal text-muted-foreground">right first time</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={onExit}>
            <ArrowLeft className="h-4 w-4" /> All cases
          </Button>
          {mod && (
            <Link to={`/${mod.slug}`} className={buttonClass('outline')}>
              Review {mod.short}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <button type="button" onClick={onExit} className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Cases
        </button>
        <ProgressBar value={stage / c.stages.length} />
        <span className="whitespace-nowrap">
          Step {stage + 1}/{c.stages.length}
        </span>
      </div>
      <div className="space-y-4 rounded-xl border bg-card p-5">
        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {c.setting}
          </p>
          <h2 className="text-lg font-semibold">{c.title}</h2>
        </div>
        <p className="leading-relaxed">
          <RichText md={s.narrative} />
        </p>
        {s.data && (
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {s.data.map((d) => (
              <div key={d.label} className="rounded-lg bg-muted/60 px-3 py-2">
                <dt className="text-xs text-muted-foreground">{d.label}</dt>
                <dd className="font-semibold">{d.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="font-medium">{s.question}</p>
        <div className="space-y-2">
          {order.map((i) => {
            const o = s.options[i];
            const chosen = picks.includes(i);
            return (
              <div key={i}>
                <button
                  type="button"
                  disabled={solved || chosen}
                  onClick={() => pick(i)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition-colors disabled:cursor-default',
                    !chosen && !solved && 'hover:border-primary/50 hover:bg-accent/50',
                    chosen && o.correct && 'border-emerald-500 bg-emerald-500/10',
                    chosen && !o.correct && 'border-red-500 bg-red-500/10',
                    solved && !chosen && 'opacity-60'
                  )}
                >
                  {chosen ? o.correct ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" /> : <XCircle className="mt-0.5 h-4 w-4 flex-none text-red-500" /> : <span className="mt-0.5 h-4 w-4 flex-none rounded-full border" />}
                  <span>{o.text}</span>
                </button>
                {chosen && (
                  <p className="mt-1 pl-11 text-sm text-muted-foreground" aria-live="polite">
                    <RichText md={o.feedback} />
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {!solved && picks.length > 0 && <p className="text-sm text-muted-foreground">Try another option.</p>}
        {solved && (
          <div className="rounded-lg border border-primary/40 bg-primary/[0.06] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Teaching point</p>
            <p className="mt-1 text-sm">
              <RichText md={s.teaching} />
            </p>
            <div className="mt-3 flex justify-end">
              <Button onClick={advance} autoFocus>
                {stage + 1 < c.stages.length ? 'Continue' : 'Finish case'} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Cases() {
  const [active, setActive] = useState<ClinicalCase | null>(null);
  const results = useProgressStore((s) => s.cases);

  if (active) {
    return (
      <div className="mx-auto max-w-3xl">
        <CasePlayer key={active.id} c={active} onExit={() => setActive(null)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex items-start gap-3">
        <FileText className="mt-1 h-7 w-7 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Clinical cases</h1>
          <p className="text-muted-foreground">Multi-step scenarios: each decision reveals what happens next. Wrong answers explain why — then let you try again.</p>
        </div>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {CASES.map((c) => {
          const mod = moduleBySlug(c.module);
          const r = results[c.id];
          const Icon = mod?.icon ?? FileText;
          return (
            <button key={c.id} type="button" onClick={() => setActive(c)} className="flex items-start gap-3 rounded-xl border bg-card p-4 text-left transition-shadow hover:shadow-md">
              <div className={cn('flex h-10 w-10 flex-none items-center justify-center rounded-lg', mod ? moduleColor[mod.color].bg : 'bg-muted')}>
                <Icon className={cn('h-5 w-5', mod ? moduleColor[mod.color].text : '')} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs text-muted-foreground">
                  {mod?.short} · {c.setting} · {c.stages.length} steps
                </p>
                {r && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <RotateCcw className="h-3 w-3" /> Last: {r.firstTryCorrect}/{r.total} first-try
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
