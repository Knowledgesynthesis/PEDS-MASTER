import type { Verdict } from './types';

/* ---------------- Bronchiolitis disposition (AAP 2014, NICE NG9 2021) ---------------- */

export interface BronchInput {
  ageMonths: number;
  gaWeeks: number;
  comorbidity: boolean; // hsCHD, chronic lung disease, neuromuscular, immunodeficiency, Down syndrome
  spo2: number | null; // sustained, room air
  rr: number | null;
  wob: 'mild' | 'moderate' | 'severe';
  intake: 'normal' | 'reduced' | 'poor'; // ≥75%, 50–75%, <50% of usual
  apnea: boolean;
  lethargy: boolean;
  illnessDay: number | null;
  safetyConcern: boolean; // caregiver unable to cope, distance, no follow-up
}

/** NICE: oxygen threshold 92% if <6 weeks or underlying condition, else 90% (matches AAP 2014). */
export function o2Threshold(ageMonths: number, comorbidity: boolean): number {
  return ageMonths < 1.5 || comorbidity ? 92 : 90;
}

export function bronchiolitisDisposition(i: BronchInput): Verdict {
  const critical: string[] = [];
  const admit: string[] = [];
  const caution: string[] = [];
  const thr = o2Threshold(i.ageMonths, i.comorbidity);

  if (i.apnea) critical.push('Apnea reported or observed.');
  if (i.lethargy) critical.push('Lethargy / exhaustion.');
  if (i.wob === 'severe') critical.push('Severe work of breathing (grunting, marked retractions, head bobbing).');
  if (i.spo2 !== null && i.spo2 < 88) critical.push(`SpO₂ ${i.spo2}% — significant hypoxemia.`);
  if (i.rr !== null && i.rr > 70) critical.push(`RR ${i.rr} (>70).`);

  if (i.spo2 !== null && i.spo2 < thr && i.spo2 >= 88) admit.push(`Persistent SpO₂ ${i.spo2}% (< ${thr}% threshold for this infant) → supplemental oxygen.`);
  if (i.intake === 'poor') admit.push('Intake <50% of usual or clinical dehydration → NG or IV hydration (NG is as effective as IV).');
  if (i.wob === 'moderate') admit.push('Moderate work of breathing.');
  if (i.rr !== null && i.rr > 60 && i.rr <= 70) admit.push(`RR ${i.rr} (>60).`);

  const premature = i.gaWeeks < 35;
  if (i.ageMonths < 2) caution.push('Age <2 months (apnea risk; highest admission rates).');
  if (premature) caution.push(`Born at ${i.gaWeeks} weeks (<35 wk).`);
  if (i.comorbidity) caution.push('Comorbidity (hemodynamically significant CHD, chronic lung disease, neuromuscular disease, immunodeficiency, Down syndrome).');
  if (i.illnessDay !== null && i.illnessDay <= 3) caution.push(`Illness day ${i.illnessDay}: symptoms usually peak on days 3–5, so expect worsening.`);
  if (i.intake === 'reduced') caution.push('Intake 50–75% of usual: monitor closely.');
  if (i.safetyConcern) caution.push('Caregiver/safety-net concern.');

  if (critical.length) {
    return {
      tone: 'danger',
      title: 'Escalate: high-acuity bronchiolitis',
      points: [
        ...critical,
        'Start oxygen; high-flow nasal cannula or CPAP for those failing standard oxygen; involve PICU.',
        'Check for alternative/complicating diagnoses (pneumothorax, myocarditis, sepsis) if atypical.',
      ],
    };
  }
  if (admit.length) {
    return {
      tone: 'warn',
      title: 'Admit for supportive care',
      points: [...admit, ...caution, 'Supportive care only: no bronchodilators, steroids, epinephrine, or antibiotics.'],
    };
  }
  if (caution.length >= 2 || i.safetyConcern) {
    return {
      tone: 'info',
      title: 'Borderline: observe before deciding',
      points: [...caution, 'Observe a feed and a sleep period (desaturation is common asleep); discharge only with a clear safety net.'],
    };
  }
  return {
    tone: 'success',
    title: 'Home with supportive care',
    points: [
      ...caution,
      'Small frequent feeds; superficial nasal suctioning before feeds if congested.',
      'Return for: breathing pauses, blue color, hard/fast breathing, feeding <half of usual, fewer wet diapers.',
      'Expected course: worst days 3–5; cough lasts 2–4 weeks.',
    ],
  };
}

/* ---------------- Westley croup score ---------------- */

export interface WestleyInput {
  consciousness: 0 | 5;
  cyanosis: 0 | 4 | 5;
  stridor: 0 | 1 | 2;
  airEntry: 0 | 1 | 2;
  retractions: 0 | 1 | 2 | 3;
}

export function westleyScore(i: WestleyInput) {
  return i.consciousness + i.cyanosis + i.stridor + i.airEntry + i.retractions;
}

export function westleyVerdict(score: number): Verdict {
  if (score <= 2)
    return {
      tone: 'success',
      title: `Westley ${score}: mild croup`,
      points: [
        'Single dose oral **dexamethasone** (0.15–0.6 mg/kg; 0.6 mg/kg max 16 mg is traditional — lower doses are non-inferior).',
        'Discharge with return precautions: stridor at rest, retractions, drooling, color change, exhaustion.',
        'Humidified/mist air has no proven benefit.',
      ],
    };
  if (score <= 5)
    return {
      tone: 'warn',
      title: `Westley ${score}: moderate croup`,
      points: [
        'Oral dexamethasone now; keep the child calm on the caregiver’s lap.',
        'Nebulized epinephrine if stridor at rest or significant retractions.',
        'Observe 2–4 h after epinephrine (effect wanes by ~2 h); discharge if no stridor at rest.',
      ],
    };
  if (score <= 11)
    return {
      tone: 'danger',
      title: `Westley ${score}: severe croup`,
      points: [
        '**Nebulized epinephrine** now (racemic 2.25% 0.05 mL/kg, max 0.5 mL, or L-epinephrine 1 mg/mL 0.5 mL/kg, max 5 mL); repeat as needed.',
        'Dexamethasone (PO; IM/IV if vomiting or unable to swallow).',
        'Oxygen if hypoxemic; admit if repeated epinephrine needed or persistent stridor at rest.',
      ],
    };
  return {
    tone: 'danger',
    title: `Westley ${score}: impending respiratory failure`,
    points: [
      'Nebulized epinephrine, oxygen, parenteral dexamethasone; call the most experienced airway team (anesthesia/ENT/PICU).',
      'If intubation is needed, use an endotracheal tube 0.5–1 size smaller than predicted.',
      'Heliox may bridge selected patients.',
    ],
  };
}

/* ---------------- PRAM asthma exacerbation score ---------------- */

export interface PramInput {
  suprasternal: 0 | 2;
  scalene: 0 | 2;
  airEntry: 0 | 1 | 2 | 3;
  wheeze: 0 | 1 | 2 | 3;
  spo2: 0 | 1 | 2;
}

export function pramScore(i: PramInput) {
  return i.suprasternal + i.scalene + i.airEntry + i.wheeze + i.spo2;
}

export function pramVerdict(score: number): Verdict {
  if (score <= 3)
    return {
      tone: 'success',
      title: `PRAM ${score}: mild exacerbation`,
      points: [
        'Albuterol MDI + spacer (e.g. 5 puffs if <20 kg, 10 puffs if ≥20 kg; or 0.15 mg/kg nebulized, min 2.5 mg).',
        'Add an oral corticosteroid if the response to the first SABA dose is incomplete.',
        'Reassess at 60 min; discharge if sustained PRAM ≤3.',
      ],
    };
  if (score <= 7)
    return {
      tone: 'warn',
      title: `PRAM ${score}: moderate exacerbation`,
      points: [
        'Albuterol every 20 min × 3 **plus ipratropium** × 3 in the first hour (reduces admissions).',
        '**Systemic corticosteroid within 1 h:** dexamethasone 0.3–0.6 mg/kg (max 16 mg) × 1–2 doses, or prednisolone 1–2 mg/kg/day (max 40–60 mg) × 3–5 days.',
        'Oxygen to SpO₂ ≥92%. Reassess after each round.',
      ],
    };
  return {
    tone: 'danger',
    title: `PRAM ${score}: severe exacerbation`,
    points: [
      'Continuous/back-to-back albuterol + ipratropium; oxygen.',
      'Systemic corticosteroid (IV if unable to take PO).',
      '**IV magnesium sulfate** 40–75 mg/kg (max 2 g) over 20 min if poor response to initial therapy.',
      'PICU involvement; avoid sedation; CXR only if suspected complication (pneumothorax, consolidation).',
    ],
  };
}

/* ---------------- Asthma severity (NAEPP EPR-3) + preferred step (EPR-4 2020) ---------------- */

export type AgeGroup = '0-4' | '5-11' | '12+';
export type Level = 0 | 1 | 2 | 3; // intermittent, mild, moderate, severe persistent

export const LEVEL_NAME = ['Intermittent', 'Mild persistent', 'Moderate persistent', 'Severe persistent'] as const;

export const AWAKENING_OPTIONS: Record<AgeGroup, string[]> = {
  '0-4': ['0', '1–2×/month', '3–4×/month', '>1×/week'],
  '5-11': ['≤2×/month', '3–4×/month', '>1×/week, not nightly', 'Often, 7×/week'],
  '12+': ['≤2×/month', '3–4×/month', '>1×/week, not nightly', 'Often, 7×/week'],
};

export const SYMPTOM_OPTIONS = ['≤2 days/week', '>2 days/week, not daily', 'Daily', 'Throughout the day'];
export const SABA_OPTIONS = ['≤2 days/week', '>2 days/week, not daily', 'Daily', 'Several times per day'];
export const INTERFERENCE_OPTIONS = ['None', 'Minor limitation', 'Some limitation', 'Extremely limited'];

export function fev1Level(age: AgeGroup, fev1: number | null): Level | null {
  if (fev1 === null || age === '0-4') return null;
  if (fev1 >= 80) return 0; // intermittent and mild both >80%; impairment by other features
  if (fev1 >= 60) return 2;
  return 3;
}

export interface SeverityInput {
  age: AgeGroup;
  symptoms: Level;
  awakenings: Level;
  saba: Level;
  interference: Level;
  fev1: number | null;
  exacerbationRisk: boolean; // 5+: ≥2 OCS courses/yr. 0–4: ≥2 OCS in 6 mo or ≥4 wheeze episodes/yr + risk factors
}

export function classifySeverity(i: SeverityInput): Level {
  const levels: Level[] = [i.symptoms, i.awakenings, i.saba, i.interference];
  const f = fev1Level(i.age, i.fev1);
  if (f !== null) levels.push(f);
  let level = Math.max(...levels) as Level;
  if (i.exacerbationRisk && level === 0) level = 1;
  return level;
}

export function initialStep(age: AgeGroup, level: Level): string {
  const table: Record<AgeGroup, string[]> = {
    '0-4': ['Step 1', 'Step 2', 'Step 3 (consider short OCS course)', 'Step 3 (consider short OCS course)'],
    '5-11': ['Step 1', 'Step 2', 'Step 3 (consider short OCS course)', 'Step 3 or 4 (consider short OCS course)'],
    '12+': ['Step 1', 'Step 2', 'Step 3', 'Step 4 or 5 (consider short OCS course)'],
  };
  return table[age][level];
}

/** NAEPP 2020 Focused Update preferred therapy by step. */
export const STEPS: Record<AgeGroup, { step: number; preferred: string; notes?: string }[]> = {
  '0-4': [
    { step: 1, preferred: 'PRN SABA; plus a short course of daily ICS at the onset of each respiratory infection for recurrent viral-triggered wheeze' },
    { step: 2, preferred: 'Daily low-dose ICS + PRN SABA', notes: 'Alternative: daily montelukast (boxed warning: neuropsychiatric effects) or cromolyn' },
    { step: 3, preferred: 'Daily medium-dose ICS + PRN SABA' },
    { step: 4, preferred: 'Daily medium-dose ICS-LABA + PRN SABA', notes: 'Alternative: medium-dose ICS + montelukast' },
    { step: 5, preferred: 'Daily high-dose ICS-LABA + PRN SABA' },
    { step: 6, preferred: 'Daily high-dose ICS-LABA + oral corticosteroid + PRN SABA' },
  ],
  '5-11': [
    { step: 1, preferred: 'PRN SABA', notes: 'GINA 2026 no longer endorses SABA-only from age 6: use ICS-formoterol as needed or ICS whenever SABA is taken (CARE trial, 2025)' },
    { step: 2, preferred: 'Daily low-dose ICS + PRN SABA', notes: 'Alternative: daily LTRA, cromolyn, nedocromil, or theophylline' },
    { step: 3, preferred: 'Daily and PRN low-dose ICS-formoterol (SMART)', notes: 'Alternative: daily medium-dose ICS + PRN SABA' },
    { step: 4, preferred: 'Daily and PRN medium-dose ICS-formoterol (SMART)', notes: 'Alternative: daily medium-dose ICS-LABA + PRN SABA' },
    { step: 5, preferred: 'Daily high-dose ICS-LABA + PRN SABA', notes: 'Consider biologic (omalizumab, mepolizumab, dupilumab ≥6 y); refer to asthma specialist' },
    { step: 6, preferred: 'Daily high-dose ICS-LABA + oral corticosteroid + PRN SABA' },
  ],
  '12+': [
    { step: 1, preferred: 'PRN SABA', notes: 'GINA (since 2019) prefers as-needed low-dose ICS-formoterol instead of SABA alone' },
    { step: 2, preferred: 'Daily low-dose ICS + PRN SABA, or PRN concomitant ICS + SABA' },
    { step: 3, preferred: 'Daily and PRN low-dose ICS-formoterol (SMART)' },
    { step: 4, preferred: 'Daily and PRN medium-dose ICS-formoterol (SMART)' },
    { step: 5, preferred: 'Daily medium–high-dose ICS-LABA + LAMA + PRN SABA', notes: 'Consider biologic (anti-IgE, anti-IL-5, anti-IL-4Rα, anti-TSLP)' },
    { step: 6, preferred: 'Daily high-dose ICS-LABA + oral corticosteroid + PRN SABA' },
  ],
};

/* ---------------- Asthma control (NAEPP) ---------------- */

export type Control = 0 | 1 | 2; // well, not well, very poorly

export const CONTROL_NAME = ['Well controlled', 'Not well controlled', 'Very poorly controlled'] as const;

export const CONTROL_AWAKENINGS: Record<AgeGroup, string[]> = {
  '0-4': ['≤1×/month', '>1×/month', '>1×/week'],
  '5-11': ['≤1×/month', '≥2×/month', '≥2×/week'],
  '12+': ['≤2×/month', '1–3×/week', '≥4×/week'],
};
export const CONTROL_SYMPTOMS = ['≤2 days/week', '>2 days/week', 'Throughout the day'];
export const CONTROL_SABA = ['≤2 days/week', '>2 days/week', 'Several times per day'];
export const CONTROL_INTERFERENCE = ['None', 'Some limitation', 'Extremely limited'];

export function classifyControl(levels: Control[], exacerbations: number, age: AgeGroup): Control {
  let c = Math.max(...levels) as Control;
  if (age === '0-4') {
    if (exacerbations > 3) c = 2;
    else if (exacerbations >= 2 && c < 1) c = 1;
  } else if (exacerbations >= 2 && c < 1) c = 1;
  return c;
}

export function controlAction(c: Control): Verdict {
  const precheck = 'Before stepping up: check adherence, inhaler/spacer technique, trigger exposure (smoke, allergens), comorbidities (rhinitis, obesity, OSA, GERD), and whether the diagnosis is right.';
  if (c === 0)
    return {
      tone: 'success',
      title: CONTROL_NAME[0],
      points: ['Maintain current step; follow up every 1–6 months.', 'Consider stepping down if well controlled for ≥3 months.'],
    };
  if (c === 1)
    return { tone: 'warn', title: CONTROL_NAME[1], points: [precheck, 'Step up 1 step; reassess in 2–6 weeks.'] };
  return {
    tone: 'danger',
    title: CONTROL_NAME[2],
    points: [precheck, 'Consider a short course of oral corticosteroids.', 'Step up 1–2 steps; reassess in 2 weeks.'],
  };
}
