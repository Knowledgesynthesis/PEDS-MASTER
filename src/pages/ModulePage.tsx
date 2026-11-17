import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, Target, Lightbulb, ArrowRight, ArrowLeft, ExternalLink, Sparkles, Eye } from 'lucide-react';
import type { Module, Section } from '@/content/types';
import { MODULES } from '@/content';
import { Blocks } from '@/components/content/Blocks';
import { RichText } from '@/components/content/RichText';
import { Quiz } from '@/components/content/Quiz';
import { Flashcards } from '@/components/content/Flashcards';
import { ProgressBar } from '@/components/ui/Inputs';
import { buttonClass } from '@/components/ui/buttonClass';
import { useProgressStore } from '@/store/useProgressStore';
import { useMastery } from '@/lib/useMastery';
import { moduleColor } from '@/lib/theme';
import { cn, CONTENT_REVIEWED } from '@/lib/utils';

type Tab = 'learn' | 'practice' | 'cards' | 'pitfalls' | 'sources';

function SectionRefs({ section, module, onJump }: { section: Section; module: Module; onJump: (id: string) => void }) {
  if (!section.refs?.length) return null;
  return (
    <p className="mt-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      <span>Sources:</span>
      {section.refs.map((r) => {
        const idx = module.references.findIndex((x) => x.id === r);
        const ref = module.references[idx];
        if (!ref) return null;
        return (
          <button key={r} type="button" title={ref.citation} onClick={() => onJump(r)} className="rounded bg-muted px-1.5 py-0.5 font-medium hover:bg-accent hover:text-foreground">
            [{idx + 1}]
          </button>
        );
      })}
    </p>
  );
}

function PitfallCard({ myth, fact }: { myth: string; fact: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">Common belief</p>
      <p className="mt-1 text-sm font-medium">
        <RichText md={myth} />
      </p>
      {open ? (
        <div className="mt-3 border-t pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Evidence</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <RichText md={fact} />
          </p>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          <Eye className="h-4 w-4" /> What’s wrong with it?
        </button>
      )}
    </div>
  );
}

export default function ModulePage({ module: m }: { module: Module }) {
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as Tab) || 'learn';
  const sectionParam = params.get('s');
  const markVisited = useProgressStore((s) => s.markVisited);
  const stats = useMastery().byModule[m.slug];
  const tabsRef = useRef<HTMLDivElement>(null);
  const [highlightRef, setHighlightRef] = useState<string | null>(null);
  const idx = MODULES.findIndex((x) => x.slug === m.slug);
  const prev = MODULES[idx - 1];
  const next = MODULES[idx + 1];
  const color = moduleColor[m.color];
  const Icon = m.icon;

  useEffect(() => {
    markVisited(m.slug);
  }, [m.slug, markVisited]);

  useEffect(() => {
    if (tab !== 'learn' || !sectionParam) return;
    // Lazily loaded tools above the target change the layout after first paint,
    // so re-align a few times until the user takes over scrolling.
    let userScrolled = false;
    const stop = () => {
      userScrolled = true;
    };
    const align = () => {
      if (!userScrolled) document.getElementById(`sec-${sectionParam}`)?.scrollIntoView({ block: 'start' });
    };
    const timers = [50, 400, 1000, 2000].map((t) => window.setTimeout(align, t));
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, [tab, sectionParam, m.slug]);

  const setTab = (t: Tab) => {
    const p = new URLSearchParams();
    if (t !== 'learn') p.set('tab', t);
    setParams(p);
    tabsRef.current?.scrollIntoView({ block: 'start' });
  };

  const jumpToRef = (id: string) => {
    setTab('sources');
    setHighlightRef(id);
    setTimeout(() => document.getElementById(`ref-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  };

  const scrollToSection = (id: string) => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const TABS: { id: Tab; label: string; count?: number }[] = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice', count: m.questions.length },
    { id: 'cards', label: 'Flashcards', count: m.flashcards.length },
    { id: 'pitfalls', label: 'Pitfalls', count: m.pitfalls.length },
    { id: 'sources', label: 'Sources', count: m.references.length },
  ];

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-4">
        <div className="flex items-start gap-4">
          <div className={cn('flex h-12 w-12 flex-none items-center justify-center rounded-xl', color.bg)}>
            <Icon className={cn('h-6 w-6', color.text)} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Module {idx}</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{m.title}</h1>
            <p className="mt-1 text-muted-foreground">{m.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> ~{m.minutes} min
          </span>
          <span>Reviewed {CONTENT_REVIEWED}</span>
          <span className="inline-flex min-w-[10rem] flex-1 items-center gap-2">
            <ProgressBar value={stats.total ? stats.mastered / stats.total : 0} barClass={color.bar} className="max-w-[10rem]" />
            {stats.mastered}/{stats.total} mastered
          </span>
        </div>
      </header>

      <div ref={tabsRef} className="sticky top-14 z-30 -mx-4 scroll-mt-14 border-b bg-background/95 px-4 backdrop-blur">
        <div role="tablist" aria-label="Module sections" className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors',
                tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t.label}
              {t.count !== undefined && <span className="ml-1.5 rounded-full bg-muted px-1.5 text-xs">{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {tab === 'learn' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-5">
            <section className="rounded-xl border bg-card p-5 md:col-span-3">
              <h2 className="mb-3 flex items-center gap-2 font-semibold">
                <Lightbulb className="h-4 w-4 text-amber-500" /> Bottom line
              </h2>
              <ul className="space-y-2 text-sm">
                {m.bottomLine.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={cn('mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full', color.bar)} />
                    <span>
                      <RichText md={b} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <div className="space-y-4 md:col-span-2">
              <section className="rounded-xl border bg-card p-5">
                <h2 className="mb-3 flex items-center gap-2 font-semibold">
                  <Target className="h-4 w-4 text-primary" /> You will be able to
                </h2>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {m.objectives.map((o, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <RichText md={o} />
                    </li>
                  ))}
                </ul>
              </section>
              {m.updates.length > 0 && (
                <section className="rounded-xl border border-violet-500/40 bg-violet-500/[0.06] p-5">
                  <h2 className="mb-3 flex items-center gap-2 font-semibold text-violet-800 dark:text-violet-300">
                    <Sparkles className="h-4 w-4" /> What changed
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {m.updates.map((u, i) => (
                      <li key={i}>
                        <span className="mr-1.5 rounded bg-violet-500/15 px-1.5 py-0.5 text-xs font-semibold text-violet-800 dark:text-violet-300">{u.year}</span>
                        <RichText md={u.md} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            {m.sections.map((s, i) => (
              <button key={s.id} type="button" onClick={() => scrollToSection(s.id)} className="rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">
                {i + 1}. {s.title}
              </button>
            ))}
          </nav>

          {m.sections.map((s, i) => (
            <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-32 rounded-xl border bg-card p-5 sm:p-6">
              <h2 className="mb-4 text-lg font-semibold sm:text-xl">
                <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                {s.title}
              </h2>
              <Blocks blocks={s.blocks} />
              <SectionRefs section={s} module={m} onJump={jumpToRef} />
            </section>
          ))}

          <div className="rounded-xl border-2 border-dashed border-primary/40 p-6 text-center">
            <p className="font-semibold">Done reading? Lock it in.</p>
            <p className="mt-1 text-sm text-muted-foreground">Retrieval practice beats re-reading. Missed questions return on a spaced schedule.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" className={buttonClass()} onClick={() => setTab('practice')}>
                Practice {m.questions.length} questions <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className={buttonClass('outline')} onClick={() => setTab('pitfalls')}>
                Check the pitfalls
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'practice' && <Quiz key={m.slug} questions={m.questions} references={m.references} />}
      {tab === 'cards' && <Flashcards key={m.slug} cards={m.flashcards} />}
      {tab === 'pitfalls' && (
        <div className="grid gap-3 md:grid-cols-2">
          {m.pitfalls.map((p, i) => (
            <PitfallCard key={`${m.slug}-${i}`} myth={p.myth} fact={p.fact} />
          ))}
        </div>
      )}
      {tab === 'sources' && (
        <ol className="space-y-3">
          {m.references.map((r, i) => (
            <li
              key={r.id}
              id={`ref-${r.id}`}
              className={cn('flex gap-3 rounded-lg border bg-card p-4 text-sm transition-colors', highlightRef === r.id && 'border-primary ring-1 ring-primary')}
            >
              <span className="font-semibold text-muted-foreground">[{i + 1}]</span>
              <span className="min-w-0">
                {r.citation}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-1 text-primary hover:underline">
                    Link <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-wrap justify-between gap-3 border-t pt-6">
        {prev ? (
          <Link to={`/${prev.slug}`} className={buttonClass('outline')}>
            <ArrowLeft className="h-4 w-4" /> {prev.short}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/${next.slug}`} className={buttonClass('outline')}>
            {next.short} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link to="/cases" className={buttonClass()}>
            Apply it: clinical cases <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
