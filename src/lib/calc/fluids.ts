import type { Verdict } from './types';

/** Holliday–Segar "4-2-1" hourly rate (mL/h). */
export function maintenanceHourly(kg: number): number {
  if (kg <= 0) return 0;
  const a = Math.min(kg, 10) * 4;
  const b = Math.min(Math.max(kg - 10, 0), 10) * 2;
  const c = Math.max(kg - 20, 0) * 1;
  return a + b + c;
}

/** Holliday–Segar "100-50-20" daily volume (mL/day). */
export function maintenanceDaily(kg: number): number {
  if (kg <= 0) return 0;
  const a = Math.min(kg, 10) * 100;
  const b = Math.min(Math.max(kg - 10, 0), 10) * 50;
  const c = Math.max(kg - 20, 0) * 20;
  return a + b + c;
}

/** Typical adult ceiling for maintenance infusion. */
export const ADULT_CAP_ML_H = 120;

/** Fluid deficit in mL from % dehydration (1% of body weight ≈ 10 mL/kg). */
export function deficitMl(kg: number, percent: number): number {
  return kg * percent * 10;
}

/* ---------------- Clinical Dehydration Scale (Friedman 2004; Goldman 2008) ---------------- */

export interface CdsInput {
  appearance: 0 | 1 | 2; // normal | thirsty, restless or lethargic but irritable when touched | drowsy, limp, cold, sweaty ± comatose
  eyes: 0 | 1 | 2; // normal | slightly sunken | very sunken
  mucosa: 0 | 1 | 2; // moist | sticky | dry
  tears: 0 | 1 | 2; // tears | decreased | absent
}

export function cdsScore(i: CdsInput): number {
  return i.appearance + i.eyes + i.mucosa + i.tears;
}

export function cdsVerdict(score: number): Verdict {
  if (score === 0)
    return {
      tone: 'success',
      title: `CDS ${score}: no dehydration (<3%)`,
      points: ['Continue age-appropriate diet and usual fluids; replace ongoing losses with ORS.', 'Half-strength apple juice then preferred fluids is acceptable for mildly ill children >6 months (Freedman 2016).'],
    };
  if (score <= 4)
    return {
      tone: 'warn',
      title: `CDS ${score}: some dehydration (3–6%)`,
      points: ['Oral rehydration: ~50 mL/kg ORS over 4 h, small frequent volumes (5 mL every 1–2 min).', 'Single dose oral ondansetron if vomiting limits ORT (≥6 months).', 'NG rehydration if oral fails — as effective as IV with fewer complications.'],
    };
  return {
    tone: 'danger',
    title: `CDS ${score}: moderate–severe dehydration (≥6%)`,
    points: [
      'Assess perfusion now. Shock: 20 mL/kg isotonic crystalloid bolus (0.9% saline or balanced), reassess, repeat.',
      'No shock: ORT/NG 100 mL/kg over 4 h is still first-line for moderate dehydration; IV if ORT fails, altered mental status, or ileus.',
      'Check glucose and electrolytes when IV fluids are needed.',
    ],
  };
}

/* ---------------- Oral rehydration plan ---------------- */

export interface OrtPlan {
  deficitMl: number;
  perHour: number;
  per5min: number;
  perStool: number;
  perEmesis: number;
}

export function ortPlan(kg: number, severity: 'mild' | 'moderate'): OrtPlan {
  const perKg = severity === 'mild' ? 50 : 100;
  const total = kg * perKg;
  return {
    deficitMl: total,
    perHour: total / 4,
    per5min: total / 48,
    perStool: kg * 10,
    perEmesis: kg * 2,
  };
}

/* ---------------- Sodium-aware IV planning helper ---------------- */

export function sodiumGuidance(na: number | null): Verdict | null {
  if (na === null) return null;
  if (na < 125)
    return {
      tone: 'danger',
      title: `Na ${na}: severe hyponatremia`,
      points: [
        'Seizures/encephalopathy: **3% saline 2 mL/kg (max 100 mL) over 10 min**, repeat up to twice until symptoms stop.',
        'Otherwise raise Na by ≤8–10 mEq/L per 24 h (osmotic demyelination risk). Use isotonic fluids only.',
      ],
    };
  if (na < 135)
    return { tone: 'warn', title: `Na ${na}: hyponatremia`, points: ['Isotonic fluids only; recheck Na in 4–6 h; correct ≤8–10 mEq/L per 24 h.'] };
  if (na <= 145) return { tone: 'success', title: `Na ${na}: normal`, points: ['Isotonic maintenance + deficit over ~24 h.'] };
  if (na < 160)
    return { tone: 'warn', title: `Na ${na}: hypernatremia`, points: ['Replace deficit over 48 h; lower Na by ≤10–12 mEq/L per 24 h (~0.5 mEq/L/h). Check Na every 4 h.'] };
  return {
    tone: 'danger',
    title: `Na ${na}: severe hypernatremia`,
    points: ['Restore perfusion first with isotonic boluses, then correct over ≥48 h, ≤10–12 mEq/L per 24 h — rapid fall causes cerebral edema and seizures.'],
  };
}
