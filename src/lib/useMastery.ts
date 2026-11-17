import { useMemo } from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import { isDue, isMastered } from '@/lib/srs';
import { ALL_QUESTIONS, MODULES } from '@/content';
import type { Module } from '@/content/types';

export interface ModuleStats {
  total: number;
  answered: number;
  mastered: number;
  due: number;
}

export function statsFor(m: Module, questions: ReturnType<typeof useProgressStore.getState>['questions'], now: number): ModuleStats {
  let answered = 0;
  let mastered = 0;
  let due = 0;
  for (const q of m.questions) {
    const s = questions[q.id];
    if (s) answered++;
    if (isMastered(s)) mastered++;
    if (isDue(s, now) && !isMastered(s)) due++;
  }
  return { total: m.questions.length, answered, mastered, due };
}

export function useMastery() {
  const questions = useProgressStore((s) => s.questions);
  return useMemo(() => {
    const now = Date.now();
    const byModule = Object.fromEntries(MODULES.map((m) => [m.slug, statsFor(m, questions, now)])) as Record<string, ModuleStats>;
    const total = ALL_QUESTIONS.length;
    const mastered = Object.values(byModule).reduce((a, s) => a + s.mastered, 0);
    const answered = Object.values(byModule).reduce((a, s) => a + s.answered, 0);
    const due = ALL_QUESTIONS.filter((q) => isDue(questions[q.id], now) && !isMastered(questions[q.id])).length;
    return { byModule, total, mastered, answered, due };
  }, [questions]);
}
