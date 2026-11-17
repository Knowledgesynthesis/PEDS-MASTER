import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, ClipboardCheck, FileText, Repeat, Sparkles, Wrench } from 'lucide-react';
import { MODULES, ALL_QUESTIONS } from '@/content';
import { CASES } from '@/content/cases';
import { useMastery } from '@/lib/useMastery';
import { useProgressStore } from '@/store/useProgressStore';
import { moduleColor } from '@/lib/theme';
import { ProgressBar } from '@/components/ui/Inputs';
import { buttonClass } from '@/components/ui/buttonClass';
import { RichText } from '@/components/content/RichText';
import { cn } from '@/lib/utils';

const TOOL_COUNT = new Set(MODULES.flatMap((m) => m.sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === 'tool' ? [b.id] : []))))).size;

const RECENT = MODULES.flatMap((m) => m.updates.filter((u) => Number(u.year) >= 2025).map((u) => ({ ...u, module: m }))).sort((a, b) => Number(b.year) - Number(a.year));

export default function Home() {
  const { byModule, total, mastered, answered, due } = useMastery();
  const visited = useProgressStore((s) => s.visited);
  const lastSlug = Object.entries(visited).sort((a, b) => b[1] - a[1])[0]?.[0];
  const last = MODULES.find((m) => m.slug === lastSlug);
  const nextUp = MODULES.find((m) => byModule[m.slug].mastered < byModule[m.slug].total * 0.8) ?? MODULES[0];
  const resume = last ?? nextUp;
  const cardsTotal = MODULES.reduce((a, m) => a + m.flashcards.length, 0);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Pediatrics, evidence first</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Learn it, test it, apply it — until it sticks.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {MODULES.length} modules built on current AAP, NAEPP/GINA, IDSA, AHA, CDC and NICE guidance, with {TOOL_COUNT} interactive tools, {ALL_QUESTIONS.length} questions,{' '}
          {cardsTotal} flashcards and {CASES.length} branching cases. Every recommendation links to its source.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={`/${resume.slug}`} className={buttonClass('default', 'lg')}>
            {last ? `Continue: ${last.short}` : 'Start with Module 0'} <ArrowRight className="h-4 w-4" />
          </Link>
          {due > 0 ? (
            <Link to="/assessment?source=due" className={buttonClass('outline', 'lg')}>
              <Repeat className="h-4 w-4" /> Review {due} due
            </Link>
          ) : (
            <Link to="/assessment" className={buttonClass('outline', 'lg')}>
              <ClipboardCheck className="h-4 w-4" /> Build an exam
            </Link>
          )}
        </div>
        {answered > 0 && (
          <div className="mt-6 max-w-md space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Overall mastery</span>
              <span>
                {mastered}/{total} questions
              </span>
            </div>
            <ProgressBar value={mastered / total} />
          </div>
        )}
      </section>

      <section aria-labelledby="method" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <h2 id="method" className="sr-only">
          How to use
        </h2>
        {[
          { icon: BookOpen, title: '1 · Learn', text: 'Bottom line first, then the evidence. Tables over prose.' },
          { icon: Wrench, title: '2 · Use the tools', text: 'Scores, pathways and calculators embedded where you need them.' },
          { icon: Brain, title: '3 · Retrieve', text: 'Questions and flashcards with spaced review of what you miss.' },
          { icon: FileText, title: '4 · Apply', text: 'Multi-step cases where each decision changes what happens next.' },
        ].map((s) => (
          <div key={s.title} className="rounded-xl border bg-card p-4">
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-2 font-semibold">{s.title}</p>
            <p className="text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="path" className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 id="path" className="text-xl font-bold tracking-tight">
            Learning path
          </h2>
          <span className="text-xs text-muted-foreground">Foundations first; others in any order</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {MODULES.map((m, i) => {
            const s = byModule[m.slug];
            const Icon = m.icon;
            const c = moduleColor[m.color];
            return (
              <Link key={m.slug} to={`/${m.slug}`} className="group flex flex-col rounded-xl border bg-card p-4 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-10 w-10 flex-none items-center justify-center rounded-lg', c.bg)}>
                    <Icon className={cn('h-5 w-5', c.text)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      Module {i} · {m.minutes} min
                    </p>
                    <p className="font-semibold leading-tight group-hover:text-primary">{m.title}</p>
                  </div>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <ProgressBar value={s.total ? s.mastered / s.total : 0} barClass={c.bar} />
                  <span className="whitespace-nowrap">
                    {s.mastered}/{s.total}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="new" className="rounded-xl border border-violet-500/40 bg-violet-500/[0.05] p-5 sm:p-6">
        <h2 id="new" className="flex items-center gap-2 text-lg font-bold text-violet-800 dark:text-violet-300">
          <Sparkles className="h-5 w-5" /> What changed in 2025–2026
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {RECENT.map((u, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 h-fit rounded bg-violet-500/15 px-1.5 py-0.5 text-xs font-semibold text-violet-800 dark:text-violet-300">{u.year}</span>
              <span>
                <RichText md={u.md} />{' '}
                <Link to={`/${u.module.slug}`} className="text-primary hover:underline">
                  {u.module.short} →
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
