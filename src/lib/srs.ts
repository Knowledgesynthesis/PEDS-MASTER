/**
 * Leitner-style spaced repetition.
 * A wrong answer sends an item back to box 1 (due now); a right answer
 * promotes it one box and pushes the next review further out.
 */
export const BOX_INTERVAL_DAYS = [0, 0, 1, 3, 7, 21] as const; // index = box (1–5)
export const MAX_BOX = 5;
const DAY = 24 * 60 * 60 * 1000;

export interface ItemState {
  seen: number;
  correct: number;
  box: number;
  due: number;
  last: number;
  lastCorrect: boolean;
}

export function nextState(prev: ItemState | undefined, wasCorrect: boolean, now: number): ItemState {
  const box = wasCorrect ? Math.min(MAX_BOX, (prev?.box ?? 1) + 1) : 1;
  return {
    seen: (prev?.seen ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (wasCorrect ? 1 : 0),
    box,
    due: now + BOX_INTERVAL_DAYS[box] * DAY,
    last: now,
    lastCorrect: wasCorrect,
  };
}

export function isDue(s: ItemState | undefined, now: number): boolean {
  return !!s && s.due <= now;
}

/** Mastered = last attempt correct and promoted at least twice (box ≥ 3). */
export function isMastered(s: ItemState | undefined): boolean {
  return !!s && s.lastCorrect && s.box >= 3;
}
