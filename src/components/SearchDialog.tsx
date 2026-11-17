import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, FileText } from 'lucide-react';
import { MODULES } from '@/content';
import { GLOSSARY } from '@/content/glossary';
import { stripMd } from '@/lib/text';
import { cn } from '@/lib/utils';

interface Hit {
  kind: 'section' | 'term' | 'fact';
  title: string;
  context: string;
  to: string;
  hay: string;
}

function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const m of MODULES) {
    hits.push({ kind: 'section', title: m.title, context: m.tagline, to: `/${m.slug}`, hay: `${m.title} ${m.tagline}`.toLowerCase() });
    for (const s of m.sections) {
      const text = s.blocks
        .map((b) => {
          if (b.type === 'text') return b.md;
          if (b.type === 'list') return b.items.join(' ');
          if (b.type === 'callout') return `${b.title} ${b.md ?? ''} ${(b.items ?? []).join(' ')}`;
          if (b.type === 'table') return `${b.caption ?? ''} ${b.rows.flat().join(' ')}`;
          if (b.type === 'cards') return b.cards.map((c) => `${c.title} ${(c.items ?? []).join(' ')} ${c.md ?? ''}`).join(' ');
          if (b.type === 'steps') return b.items.map((i) => `${i.title} ${i.md}`).join(' ');
          return '';
        })
        .join(' ');
      hits.push({ kind: 'section', title: s.title, context: m.short, to: `/${m.slug}?s=${s.id}`, hay: stripMd(`${s.title} ${text}`).toLowerCase() });
    }
    for (const f of m.flashcards) {
      hits.push({ kind: 'fact', title: stripMd(f.front), context: stripMd(f.back), to: `/${m.slug}?tab=cards`, hay: stripMd(`${f.front} ${f.back}`).toLowerCase() });
    }
  }
  for (const g of GLOSSARY) {
    hits.push({ kind: 'term', title: g.term, context: stripMd(g.definition), to: `/glossary?q=${encodeURIComponent(g.term)}`, hay: `${g.term} ${stripMd(g.definition)}`.toLowerCase() });
  }
  return hits;
}

const ICON = { section: Layers, term: BookOpen, fact: FileText };

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const index = useMemo(buildIndex, []);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index
      .filter((h) => terms.every((t) => h.hay.includes(t)))
      .sort((a, b) => Number(b.title.toLowerCase().includes(terms[0])) - Number(a.title.toLowerCase().includes(terms[0])))
      .slice(0, 30);
  }, [q, index]);

  if (!open) return null;
  const go = (h: Hit) => {
    navigate(h.to);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-[10vh]" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border bg-popover shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
              if (e.key === 'Enter' && results[active]) go(results[active]);
            }}
            placeholder="Search topics, doses, scores, terms…"
            className="h-12 w-full bg-transparent text-sm outline-none"
            aria-label="Search query"
          />
          <button type="button" onClick={onClose} className="rounded p-1 text-muted-foreground hover:bg-accent" aria-label="Close search">
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {q && results.length === 0 && <li className="p-4 text-center text-sm text-muted-foreground">No matches.</li>}
          {!q && <li className="p-4 text-center text-sm text-muted-foreground">Try “dexamethasone”, “PRAM”, “bulging”, or “4-2-1”.</li>}
          {results.map((h, i) => {
            const Icon = ICON[h.kind];
            return (
              <li key={`${h.to}-${h.title}-${i}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(h)}
                  className={cn('flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left', i === active ? 'bg-accent' : '')}
                >
                  <Icon className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{h.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{h.context}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
