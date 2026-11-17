import { useMemo, useState } from 'react';
import { RotateCcw, Check, X } from 'lucide-react';
import type { Flashcard } from '@/content/types';
import { RichText } from './RichText';
import { Button } from '@/components/ui/Button';
import { useProgressStore } from '@/store/useProgressStore';
import { isDue, isMastered } from '@/lib/srs';
import { cn } from '@/lib/utils';

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const state = useProgressStore((s) => s.cards);
  const recordCard = useProgressStore((s) => s.recordCard);
  const [filter, setFilter] = useState<'all' | 'due'>('all');
  const [startedAt] = useState(() => Date.now());

  const deck = useMemo(
    () => (filter === 'all' ? cards : cards.filter((c) => !state[c.id] || isDue(state[c.id], startedAt))),
    // deck is fixed for a session so cards don't vanish mid-review
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, cards, startedAt]
  );
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = deck[i];
  const known = cards.filter((c) => state[c.id]?.lastCorrect).length;
  const mastered = cards.filter((c) => isMastered(state[c.id])).length;

  const rate = (k: boolean) => {
    if (!card) return;
    recordCard(card.id, k);
    setFlipped(false);
    setI((n) => n + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
          {(['all', 'due'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setI(0);
                setFlipped(false);
              }}
              className={cn('rounded-md px-3 py-1', filter === f ? 'bg-card shadow-sm font-medium' : 'text-muted-foreground')}
            >
              {f === 'all' ? `All (${cards.length})` : 'New + due'}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Known {known}/{cards.length} · mastered {mastered}
        </span>
      </div>

      {!card ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <p className="font-semibold">Deck complete.</p>
          <p className="mt-1 text-sm text-muted-foreground">Cards you marked “Again” come back first next time.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setI(0);
              setFlipped(false);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Go again
          </Button>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="flip-card block w-full text-left"
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? 'Show question side' : 'Reveal answer'}
          >
            <div className={cn('flip-inner relative min-h-[13rem]', flipped && 'flipped')}>
              <div aria-hidden={flipped} className="flip-face absolute inset-0 flex flex-col justify-center rounded-xl border-2 bg-card p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Card {i + 1} of {deck.length} · tap to flip
                </p>
                <p className="text-lg font-medium leading-snug">
                  <RichText md={card.front} />
                </p>
              </div>
              <div aria-hidden={!flipped} className="flip-face flip-back absolute inset-0 flex flex-col justify-center overflow-y-auto rounded-xl border-2 border-primary/40 bg-primary/[0.05] p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Answer</p>
                <p className="text-base leading-relaxed">
                  <RichText md={card.back} />
                </p>
              </div>
            </div>
          </button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => rate(false)} disabled={!flipped}>
              <X className="h-4 w-4" /> Again
            </Button>
            <Button onClick={() => rate(true)} disabled={!flipped}>
              <Check className="h-4 w-4" /> Knew it
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
