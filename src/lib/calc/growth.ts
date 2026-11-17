import type { Verdict } from './types';

/** Major percentile lines on WHO (0–2 y, as adapted by CDC) and CDC (2–20 y) charts. */
export const MAJOR_LINES = [2, 5, 10, 25, 50, 75, 90, 95, 98] as const;

/** Lines strictly crossed moving from percentile a to b (landing on a line is not crossing it). */
export function linesCrossed(a: number, b: number): number {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return MAJOR_LINES.filter((l) => l > lo && l < hi).length;
}

/** Inverse standard normal CDF (Acklam's rational approximation, |error| < 1.2e-9). */
export function percentileToZ(p: number): number {
  const q = Math.min(Math.max(p / 100, 1e-6), 1 - 1e-6);
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (q < pl) {
    const r = Math.sqrt(-2 * Math.log(q));
    return (((((c[0] * r + c[1]) * r + c[2]) * r + c[3]) * r + c[4]) * r + c[5]) / ((((d[0] * r + d[1]) * r + d[2]) * r + d[3]) * r + 1);
  }
  if (q > 1 - pl) {
    const r = Math.sqrt(-2 * Math.log(1 - q));
    return -(((((c[0] * r + c[1]) * r + c[2]) * r + c[3]) * r + c[4]) * r + c[5]) / ((((d[0] * r + d[1]) * r + d[2]) * r + d[3]) * r + 1);
  }
  const r = q - 0.5;
  const t = r * r;
  return ((((((a[0] * t + a[1]) * t + a[2]) * t + a[3]) * t + a[4]) * t + a[5]) * r) / (((((b[0] * t + b[1]) * t + b[2]) * t + b[3]) * t + b[4]) * t + 1);
}

export interface GrowthPoint {
  age: number; // months
  weight: number; // percentile
  length: number;
  hc: number;
}

export function interpretTrajectory(points: GrowthPoint[]): Verdict {
  const pts = points.filter((p) => [p.weight, p.length, p.hc].every((v) => v > 0 && v < 100)).sort((x, y) => x.age - y.age);
  if (pts.length < 2) return { tone: 'neutral', title: 'Enter at least two visits' };
  const first = pts[0];
  const last = pts[pts.length - 1];
  const dW = linesCrossed(first.weight, last.weight) * Math.sign(last.weight - first.weight);
  const dL = linesCrossed(first.length, last.length) * Math.sign(last.length - first.length);
  const dH = linesCrossed(first.hc, last.hc) * Math.sign(last.hc - first.hc);
  const out: string[] = [
    `Weight: ${first.weight}th → ${last.weight}th (${Math.abs(dW)} major line${Math.abs(dW) === 1 ? '' : 's'} ${dW < 0 ? 'down' : dW > 0 ? 'up' : ''}).`,
    `Length: ${first.length}th → ${last.length}th (${Math.abs(dL)} ${dL < 0 ? 'down' : dL > 0 ? 'up' : ''}).`,
    `Head: ${first.hc}th → ${last.hc}th (${Math.abs(dH)} ${dH < 0 ? 'down' : dH > 0 ? 'up' : ''}).`,
  ];
  const low = last.weight < 2 || last.length < 2;
  const wDrop = dW <= -2;
  const lDrop = dL <= -2;
  const hDrop = dH <= -2 || last.hc < 2;

  if (hDrop) {
    return {
      tone: 'danger',
      title: 'Head circumference falling or low: think CNS, genetic, or congenital infection',
      points: [...out, 'Microcephaly with poor growth: congenital infection (CMV, Zika), genetic syndrome, teratogen (alcohol), severe early malnutrition. Neuro exam, development, consider MRI/genetics.'],
    };
  }
  if (wDrop && (!lDrop || Math.abs(dW) > Math.abs(dL))) {
    return {
      tone: 'warn',
      title: 'Weight falling first: inadequate energy (intake, absorption, or use)',
      points: [...out, 'Most common pattern. Detailed feeding history, observe a feed, formula preparation, stools, social context. Length falls later if prolonged; head is spared until late.'],
    };
  }
  if (lDrop && !wDrop) {
    return {
      tone: 'warn',
      title: 'Length falling with weight preserved: think endocrine',
      points: [...out, 'Hypothyroidism, growth hormone deficiency, or glucocorticoid excess produce a short, relatively heavy child. Check TSH/free T4; growth-hormone axis per endocrinology; bone age.'],
    };
  }
  if (lDrop && wDrop) {
    return {
      tone: 'info',
      title: 'Weight and length shifting down together',
      points: [
        ...out,
        'If the shift occurs in the first 6–24 months then tracks parallel with normal velocity: genetic channeling (familial short stature or constitutional delay) — check mid-parental height.',
        'If still falling after 2 years or velocity is abnormal: chronic disease or prolonged malnutrition — investigate.',
      ],
    };
  }
  if (low) return { tone: 'warn', title: 'Below the 2nd percentile', points: [...out, 'Below −2 SD warrants evaluation even without crossing lines (WHO/CDC cut-off).'] };
  return { tone: 'success', title: 'Tracking within expected variation', points: [...out, 'Up to ~1 major line of drift in the first 2 years is common.'] };
}

/* ---------------- Weight-gain velocity ---------------- */

/** Lower bound of typical weight gain (g/day) by age (months). Approximates WHO velocity data. */
export function expectedGain(ageMonths: number): { low: number; high: number } {
  if (ageMonths < 3) return { low: 25, high: 35 };
  if (ageMonths < 6) return { low: 15, high: 21 };
  if (ageMonths < 12) return { low: 10, high: 13 };
  if (ageMonths < 36) return { low: 5, high: 8 };
  return { low: 5, high: 6 };
}

export function velocityVerdict(ageMonths: number, gramsPerDay: number): Verdict {
  const e = expectedGain(ageMonths);
  const g = Math.round(gramsPerDay);
  if (g < 0) return { tone: 'danger', title: `Weight loss (${g} g/day)`, points: ['Any sustained loss beyond the first week of life needs same-week evaluation.'] };
  if (g < e.low * 0.75) return { tone: 'danger', title: `${g} g/day — well below expected (${e.low}–${e.high})`, points: ['Inadequate gain. Full feeding assessment and close follow-up (weekly).'] };
  if (g < e.low) return { tone: 'warn', title: `${g} g/day — below expected (${e.low}–${e.high})`, points: ['Recheck in 1–2 weeks on the same scale; review intake.'] };
  return { tone: 'success', title: `${g} g/day — within/above expected (${e.low}–${e.high})`, points: ['Adequate gain for age.'] };
}

/* ---------------- Catch-up growth energy ---------------- */

/** kcal/kg/day = (RDA kcal/kg for weight-age × median weight for current length) / actual weight. */
export function catchUpKcalPerKg(rdaKcalPerKg: number, idealKg: number, actualKg: number): number {
  if (actualKg <= 0) return 0;
  return (rdaKcalPerKg * idealKg) / actualKg;
}

export const RDA_KCAL: { label: string; value: number }[] = [
  { label: '0–6 mo (108)', value: 108 },
  { label: '6–12 mo (98)', value: 98 },
  { label: '1–3 y (102)', value: 102 },
  { label: '4–6 y (90)', value: 90 },
  { label: '7–10 y (70)', value: 70 },
];

/* ---------------- Teaching patterns ---------------- */

export type GrowthPatternKey = 'intake' | 'endocrine' | 'channel' | 'cns';

export const GROWTH_AGES = [0, 2, 4, 6, 9, 12, 18, 24];

/** Teaching presets (percentiles at each age). */
export const PATTERNS: Record<GrowthPatternKey, { label: string; data: GrowthPoint[] }> = {
  intake: {
    label: 'Inadequate intake',
    data: GROWTH_AGES.map((age, i) => ({ age, weight: [50, 45, 25, 12, 6, 3, 3, 2][i], length: [50, 50, 50, 45, 35, 25, 20, 15][i], hc: [50, 50, 50, 50, 50, 45, 45, 40][i] })),
  },
  endocrine: {
    label: 'Endocrine (e.g. hypothyroidism)',
    data: GROWTH_AGES.map((age, i) => ({ age, weight: [50, 50, 50, 45, 45, 40, 40, 40][i], length: [50, 50, 45, 30, 20, 10, 5, 3][i], hc: [50, 50, 50, 50, 50, 50, 50, 50][i] })),
  },
  channel: {
    label: 'Genetic channeling (familial short stature / constitutional delay)',
    data: GROWTH_AGES.map((age, i) => ({ age, weight: [60, 55, 45, 35, 25, 15, 12, 12][i], length: [60, 55, 45, 30, 20, 12, 10, 10][i], hc: [50, 50, 50, 50, 50, 50, 50, 50][i] })),
  },
  cns: {
    label: 'CNS / genetic / congenital infection',
    data: GROWTH_AGES.map((age, i) => ({ age, weight: [20, 15, 10, 8, 6, 5, 5, 4][i], length: [25, 20, 15, 10, 8, 6, 5, 5][i], hc: [10, 6, 4, 2, 1.5, 1, 1, 1][i] })),
  },
};

