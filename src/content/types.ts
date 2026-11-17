import type { LucideIcon } from 'lucide-react';

/** Inline text supports **bold** and line breaks. */
export type MD = string;

export type Tone = 'danger' | 'warn' | 'info' | 'success' | 'update' | 'neutral';

export type ToolId =
  | 'vitals'
  | 'febrile-infant'
  | 'eos-triage'
  | 'cchd-screen'
  | 'qpqs'
  | 'murmur-quiz'
  | 'bronchiolitis-disposition'
  | 'bronchiolitis-sorter'
  | 'westley'
  | 'stridor-sorter'
  | 'aom'
  | 'centor'
  | 'growth-explorer'
  | 'weight-velocity'
  | 'catch-up'
  | 'asthma-severity'
  | 'asthma-control'
  | 'pram'
  | 'cds'
  | 'maintenance'
  | 'ort-plan'
  | 'ge-sorter'
  | 'milestones'
  | 'mchat';

export type Block =
  | { type: 'text'; md: MD }
  | { type: 'list'; title?: string; items: MD[]; ordered?: boolean }
  | { type: 'table'; caption?: string; head: string[]; rows: MD[][]; note?: MD }
  | { type: 'callout'; tone: Tone; title: string; md?: MD; items?: MD[] }
  | { type: 'cards'; cards: { title: string; tone?: Tone; md?: MD; items?: MD[] }[] }
  | { type: 'steps'; title?: string; items: { title: string; md: MD }[] }
  | { type: 'tool'; id: ToolId };

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
  /** Reference ids from the module's reference list. */
  refs?: string[];
}

export interface Question {
  id: string;
  stem: MD;
  options: string[];
  answer: number;
  explanation: MD;
  ref?: string;
}

export interface Flashcard {
  id: string;
  front: MD;
  back: MD;
}

export interface Pitfall {
  myth: MD;
  fact: MD;
}

export interface Update {
  year: string;
  md: MD;
}

export interface Reference {
  id: string;
  citation: string;
  url?: string;
}

export type ModuleColor =
  | 'slate' | 'red' | 'pink' | 'sky' | 'orange' | 'violet' | 'amber' | 'emerald' | 'cyan' | 'indigo';

export interface Module {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  color: ModuleColor;
  minutes: number;
  objectives: MD[];
  bottomLine: MD[];
  sections: Section[];
  pitfalls: Pitfall[];
  updates: Update[];
  questions: Question[];
  flashcards: Flashcard[];
  references: Reference[];
}

/** Multi-step clinical case. */
export interface CaseOption {
  text: string;
  correct: boolean;
  feedback: MD;
}

export interface CaseStage {
  narrative: MD;
  data?: { label: string; value: string }[];
  question: string;
  options: CaseOption[];
  teaching: MD;
}

export interface ClinicalCase {
  id: string;
  title: string;
  module: string;
  setting: string;
  stages: CaseStage[];
}

export interface GlossaryTerm {
  term: string;
  definition: MD;
  module?: string;
}
