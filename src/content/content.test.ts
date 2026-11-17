import { describe, it, expect } from 'vitest';
import { MODULES, ALL_QUESTIONS } from './index';
import { CASES } from './cases';
import { GLOSSARY } from './glossary';
import type { Block, ToolId } from './types';

const ALL_TOOLS: ToolId[] = [
  'vitals', 'febrile-infant', 'eos-triage', 'cchd-screen', 'qpqs', 'murmur-quiz', 'bronchiolitis-disposition', 'bronchiolitis-sorter',
  'westley', 'stridor-sorter', 'aom', 'centor', 'growth-explorer', 'weight-velocity', 'catch-up', 'asthma-severity', 'asthma-control',
  'pram', 'cds', 'maintenance', 'ort-plan', 'ge-sorter', 'milestones', 'mchat',
];

function blockText(b: Block): string[] {
  switch (b.type) {
    case 'text': return [b.md];
    case 'list': return [b.title ?? '', ...b.items];
    case 'table': return [b.caption ?? '', ...b.head, ...b.rows.flat(), b.note ?? ''];
    case 'callout': return [b.title, b.md ?? '', ...(b.items ?? [])];
    case 'cards': return b.cards.flatMap((c) => [c.title, c.md ?? '', ...(c.items ?? [])]);
    case 'steps': return [b.title ?? '', ...b.items.flatMap((i) => [i.title, i.md])];
    default: return [];
  }
}

/** Teaching text only — excludes answer options, which deliberately contain wrong choices. */
const teachingStrings = (): string[] => [
  ...MODULES.flatMap((m) => [
    ...m.bottomLine,
    ...m.sections.flatMap((s) => s.blocks.flatMap(blockText)),
    ...m.pitfalls.map((p) => p.fact),
    ...m.questions.map((q) => q.explanation),
    ...m.flashcards.map((f) => f.back),
  ]),
  ...CASES.flatMap((c) => c.stages.map((s) => s.teaching)),
  ...GLOSSARY.map((g) => g.definition),
];

const allStrings = (): string[] => [
  ...MODULES.flatMap((m) => [
    m.title, m.tagline, ...m.objectives, ...m.bottomLine,
    ...m.sections.flatMap((s) => [s.title, ...s.blocks.flatMap(blockText)]),
    ...m.pitfalls.flatMap((p) => [p.myth, p.fact]),
    ...m.updates.map((u) => u.md),
    ...m.questions.flatMap((q) => [q.stem, q.explanation, ...q.options]),
    ...m.flashcards.flatMap((f) => [f.front, f.back]),
  ]),
  ...CASES.flatMap((c) => c.stages.flatMap((s) => [s.narrative, s.question, s.teaching, ...s.options.flatMap((o) => [o.text, o.feedback])])),
  ...GLOSSARY.flatMap((g) => [g.term, g.definition]),
];

describe('content integrity', () => {
  it('module slugs are unique', () => {
    const slugs = MODULES.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('question, flashcard, case, and section ids are unique', () => {
    const q = ALL_QUESTIONS.map((x) => x.id);
    expect(new Set(q).size).toBe(q.length);
    const f = MODULES.flatMap((m) => m.flashcards.map((x) => x.id));
    expect(new Set(f).size).toBe(f.length);
    const c = CASES.map((x) => x.id);
    expect(new Set(c).size).toBe(c.length);
    for (const m of MODULES) {
      const s = m.sections.map((x) => x.id);
      expect(new Set(s).size, m.slug).toBe(s.length);
    }
  });

  it('every module is complete enough to master', () => {
    for (const m of MODULES) {
      expect(m.questions.length, m.slug).toBeGreaterThanOrEqual(8);
      expect(m.flashcards.length, m.slug).toBeGreaterThanOrEqual(6);
      expect(m.pitfalls.length, m.slug).toBeGreaterThanOrEqual(4);
      expect(m.references.length, m.slug).toBeGreaterThanOrEqual(4);
      expect(m.bottomLine.length, m.slug).toBeGreaterThanOrEqual(5);
    }
  });

  it('questions are well formed', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3);
      expect(new Set(q.options).size, `${q.id} duplicate options`).toBe(q.options.length);
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(q.options.length);
      expect(q.explanation.length, q.id).toBeGreaterThan(40);
      // options are shuffled at render time, so explanations must not refer to letters/positions
      expect(q.explanation, q.id).not.toMatch(/\b(option|choice|answer) [A-E]\b/i);
      expect(q.options.join(' '), q.id).not.toMatch(/all of the above|none of the above/i);
      if (q.ref) expect(q.module.references.some((r) => r.id === q.ref), `${q.id} → ${q.ref}`).toBe(true);
    }
  });

  it('section references resolve and every reference is cited', () => {
    for (const m of MODULES) {
      const ids = new Set(m.references.map((r) => r.id));
      const cited = new Set<string>();
      for (const s of m.sections) for (const r of s.refs ?? []) {
        expect(ids.has(r), `${m.slug}/${s.id} → ${r}`).toBe(true);
        cited.add(r);
      }
      for (const q of m.questions) if (q.ref) cited.add(q.ref);
      for (const r of m.references) expect(cited.has(r.id), `${m.slug}: reference "${r.id}" is never cited`).toBe(true);
    }
  });

  it('reference URLs are https', () => {
    for (const m of MODULES) for (const r of m.references) if (r.url) expect(r.url, r.id).toMatch(/^https:\/\//);
  });

  it('every tool is embedded somewhere, exactly once', () => {
    const used = MODULES.flatMap((m) => m.sections.flatMap((s) => s.blocks.filter((b) => b.type === 'tool').map((b) => (b as { id: ToolId }).id)));
    expect(new Set(used).size).toBe(used.length);
    expect(new Set(used)).toEqual(new Set(ALL_TOOLS));
  });

  it('cases have exactly one correct option per stage', () => {
    for (const c of CASES) {
      expect(MODULES.some((m) => m.slug === c.module), c.id).toBe(true);
      expect(c.stages.length, c.id).toBeGreaterThanOrEqual(2);
      for (const [i, s] of c.stages.entries()) {
        expect(s.options.filter((o) => o.correct).length, `${c.id} stage ${i}`).toBe(1);
        expect(s.options.length, `${c.id} stage ${i}`).toBeGreaterThanOrEqual(3);
        for (const o of s.options) expect(o.feedback.length, `${c.id} stage ${i}`).toBeGreaterThan(10);
      }
    }
  });

  it('glossary terms are unique and link to real modules', () => {
    const t = GLOSSARY.map((g) => g.term.toLowerCase());
    expect(new Set(t).size).toBe(t.length);
    for (const g of GLOSSARY) if (g.module) expect(MODULES.some((m) => m.slug === g.module), g.term).toBe(true);
  });

  it('bold markers are balanced', () => {
    for (const s of allStrings()) expect((s.match(/\*\*/g) ?? []).length % 2, s).toBe(0);
  });

  it('no boilerplate disclaimers or outdated product advice', () => {
    const text = allStrings().join('\n');
    expect(text).not.toMatch(/educational purposes only|not for clinical use|educational tool only/i);
    // palivizumab may only appear as discontinued/no longer recommended
    for (const s of teachingStrings()) if (/palivizumab/i.test(s)) expect(s, s).toMatch(/discontinued|no longer|not recommended|—|Palivizumab \(Synagis\)/i);
    // cefotaxime is unavailable in the US — only mention as such
    for (const s of teachingStrings()) if (/cefotaxime/i.test(s)) expect(s, s).toMatch(/unavailable/i);
  });
});
