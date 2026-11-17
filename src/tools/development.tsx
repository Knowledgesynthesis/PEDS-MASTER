import { useState } from 'react';
import { Choice, Check, NumberField, Result, ToolFrame } from '@/components/ui/Inputs';
import { num, cn } from '@/lib/utils';
import { CDC_MILESTONES, milestoneVerdict, mchatVerdict, type Domain } from '@/lib/calc/development';

const DOMAIN_COLOR: Record<Domain, string> = {
  'Social/emotional': 'text-orange-600 dark:text-orange-400',
  'Language/communication': 'text-violet-600 dark:text-violet-400',
  Cognitive: 'text-sky-600 dark:text-sky-400',
  'Movement/physical': 'text-emerald-600 dark:text-emerald-400',
};

export function MilestoneTool() {
  const [ageIdx, setAgeIdx] = useState(4);
  const [missing, setMissing] = useState<Set<number>>(new Set());
  const [regression, setRegression] = useState(false);
  const [concern, setConcern] = useState(false);
  const set = CDC_MILESTONES[ageIdx];
  const toggle = (i: number) =>
    setMissing((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  const verdict = milestoneVerdict(set.age, set.items.filter((_, i) => missing.has(i)), regression, concern);
  const domains = Array.from(new Set(set.items.map((m) => m.domain)));
  return (
    <ToolFrame title="Milestone checker" subtitle="Tap any milestone the child has NOT yet reached" source="Zubler JM et al. Evidence-Informed Milestones for Developmental Surveillance Tools. Pediatrics 2022;149:e2021052138 (CDC/AAP)">
      <Choice
        label="Visit age"
        value={ageIdx}
        onChange={(v) => {
          setAgeIdx(v);
          setMissing(new Set());
        }}
        columns={4}
        options={CDC_MILESTONES.map((m, i) => ({ value: i, label: m.label }))}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {domains.map((d) => (
          <div key={d}>
            <p className={cn('mb-2 text-sm font-semibold', DOMAIN_COLOR[d])}>{d}</p>
            <div className="space-y-1.5">
              {set.items.map((m, i) =>
                m.domain === d ? (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={missing.has(i)}
                    onClick={() => toggle(i)}
                    className={cn(
                      'flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                      missing.has(i) ? 'border-red-500/60 bg-red-500/10' : 'border-input bg-card hover:bg-accent'
                    )}
                  >
                    <span className={cn('mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded border text-[10px] font-bold', missing.has(i) ? 'border-red-500 bg-red-500 text-white' : 'border-emerald-500 bg-emerald-500 text-white')}>
                      {missing.has(i) ? '✕' : '✓'}
                    </span>
                    <span>{m.text}</span>
                  </button>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Check label="Loss of skills previously present" checked={regression} onChange={setRegression} />
        <Check label="Parent or caregiver is concerned" checked={concern} onChange={setConcern} />
      </div>
      <Result verdict={verdict} />
    </ToolFrame>
  );
}

export function MchatTool() {
  const [total, setTotal] = useState('');
  const [fu, setFu] = useState('');
  const t = num(total);
  const f = num(fu);
  const valid = t !== null && t >= 0 && t <= 20 && Number.isInteger(t);
  return (
    <ToolFrame title="M-CHAT-R/F interpreter" subtitle="Autism screening at 18 and 24 months (valid 16–30 months)" source="Robins DL et al. Pediatrics 2014;133:37; Hyman SL et al. AAP Clinical Report on ASD, Pediatrics 2020;145:e20193447">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="M-CHAT-R total (0–20)" value={total} onChange={setTotal} />
        {valid && t! >= 3 && t! <= 7 && <NumberField label="Follow-Up interview score" value={fu} onChange={setFu} hint="Leave blank if not yet done" />}
      </div>
      <Result verdict={valid ? mchatVerdict(t!, t! >= 3 && t! <= 7 ? f : null) : null} empty="Enter the total score (0–20)." />
    </ToolFrame>
  );
}
