import type { Module, Question, Reference } from './types';
import { foundations } from './modules/foundations';
import { neonatal } from './modules/neonatal';
import { chd } from './modules/chd';
import { bronchiolitis } from './modules/bronchiolitis';
import { airway } from './modules/airway';
import { ent } from './modules/ent';
import { growth } from './modules/growth';
import { asthma } from './modules/asthma';
import { fluids } from './modules/fluids';
import { development } from './modules/development';

/** Recommended learning order. */
export const MODULES: Module[] = [foundations, neonatal, chd, bronchiolitis, airway, ent, growth, asthma, fluids, development];

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);

export interface TaggedQuestion extends Question {
  module: Module;
}

export const ALL_QUESTIONS: TaggedQuestion[] = MODULES.flatMap((m) => m.questions.map((q) => ({ ...q, module: m })));

export function sourceFor(q: TaggedQuestion): string | undefined {
  if (!q.ref) return undefined;
  return q.module.references.find((r: Reference) => r.id === q.ref)?.citation;
}
