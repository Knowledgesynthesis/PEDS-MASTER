import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nextState, type ItemState } from '@/lib/srs';

interface CaseResult {
  firstTryCorrect: number;
  total: number;
  at: number;
}

interface ProgressStore {
  questions: Record<string, ItemState>;
  cards: Record<string, ItemState>;
  cases: Record<string, CaseResult>;
  visited: Record<string, number>;
  recordQuestion: (id: string, correct: boolean) => void;
  recordCard: (id: string, known: boolean) => void;
  recordCase: (id: string, firstTryCorrect: number, total: number) => void;
  markVisited: (slug: string) => void;
  reset: () => void;
}

const empty = { questions: {}, cards: {}, cases: {}, visited: {} };

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      ...empty,
      recordQuestion: (id, correct) =>
        set((s) => ({ questions: { ...s.questions, [id]: nextState(s.questions[id], correct, Date.now()) } })),
      recordCard: (id, known) =>
        set((s) => ({ cards: { ...s.cards, [id]: nextState(s.cards[id], known, Date.now()) } })),
      recordCase: (id, firstTryCorrect, total) =>
        set((s) => ({ cases: { ...s.cases, [id]: { firstTryCorrect, total, at: Date.now() } } })),
      markVisited: (slug) => set((s) => ({ visited: { ...s.visited, [slug]: Date.now() } })),
      reset: () => set({ ...empty }),
    }),
    { name: 'peds-progress', version: 2, migrate: () => ({ ...empty }) as ProgressStore }
  )
);
