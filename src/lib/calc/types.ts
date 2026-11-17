import type { Tone } from '@/content/types';

export interface Verdict {
  tone: Tone;
  title: string;
  points?: string[];
  note?: string;
}
