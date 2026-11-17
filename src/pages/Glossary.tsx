import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import { GLOSSARY } from '@/content/glossary';
import { MODULES, moduleBySlug } from '@/content';
import { RichText } from '@/components/content/RichText';
import { stripMd } from '@/lib/text';
import { cn } from '@/lib/utils';

export default function Glossary() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [mod, setMod] = useState<string>('all');

  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => (mod === 'all' || t.module === mod) && (!needle || `${t.term} ${stripMd(t.definition)}`.toLowerCase().includes(needle)));
  }, [q, mod]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex items-start gap-3">
        <BookOpen className="mt-1 h-7 w-7 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Glossary</h1>
          <p className="text-muted-foreground">{GLOSSARY.length} high-yield terms, scores, and doses — each linked to its module.</p>
        </div>
      </header>
      <div className="space-y-3 rounded-xl border bg-card p-4">
        <label className="relative block">
          <span className="sr-only">Search terms</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms or definitions…"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {[{ slug: 'all', short: 'All' }, ...MODULES].map((m) => (
            <button
              key={m.slug}
              type="button"
              aria-pressed={mod === m.slug}
              onClick={() => setMod(m.slug)}
              className={cn('rounded-full border px-3 py-1 text-xs', mod === m.slug ? 'border-primary bg-primary/10 font-medium' : 'text-muted-foreground hover:bg-accent')}
            >
              {m.short}
            </button>
          ))}
        </div>
      </div>
      {terms.length === 0 ? (
        <p className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">No terms match.</p>
      ) : (
        <dl className="divide-y rounded-xl border bg-card">
          {terms.map((t) => {
            const m = t.module ? moduleBySlug(t.module) : undefined;
            return (
              <div key={t.term} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
                <dt className="font-semibold sm:w-56 sm:flex-none">{t.term}</dt>
                <dd className="flex-1 text-sm text-muted-foreground">
                  <RichText md={t.definition} />
                  {m && (
                    <Link to={`/${m.slug}`} className="ml-2 whitespace-nowrap text-xs font-medium text-primary hover:underline">
                      {m.short} →
                    </Link>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}
