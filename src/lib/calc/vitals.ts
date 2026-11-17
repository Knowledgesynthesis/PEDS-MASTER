import type { Verdict } from './types';

/** PALS 2020 reference ranges (awake heart rate, respiratory rate). */
export interface Range {
  low: number;
  high: number;
}

export function hrRange(ageMonths: number): Range {
  if (ageMonths < 3) return { low: 85, high: 205 };
  if (ageMonths < 24) return { low: 100, high: 190 };
  if (ageMonths < 120) return { low: 60, high: 140 };
  return { low: 60, high: 100 };
}

export function rrRange(ageMonths: number): Range {
  if (ageMonths < 12) return { low: 30, high: 53 };
  if (ageMonths < 36) return { low: 22, high: 37 };
  if (ageMonths < 72) return { low: 20, high: 28 };
  if (ageMonths < 144) return { low: 18, high: 25 };
  return { low: 12, high: 20 };
}

/** PALS hypotension threshold: systolic BP below this value = hypotension. */
export function hypotensionThreshold(ageMonths: number): number {
  if (ageMonths < 1) return 60;
  if (ageMonths < 12) return 70;
  if (ageMonths <= 120) return 70 + 2 * Math.floor(ageMonths / 12);
  return 90;
}

/** WHO "fast breathing" thresholds used for pneumonia classification (2–59 months; <2 months uses 60). */
export function whoFastBreathing(ageMonths: number): number | null {
  if (ageMonths < 2) return 60;
  if (ageMonths < 12) return 50;
  if (ageMonths < 60) return 40;
  return null;
}

/** APLS weight estimate (kg). */
export function estimateWeight(ageMonths: number): number {
  if (ageMonths < 12) return 0.5 * ageMonths + 4;
  const years = Math.floor(ageMonths / 12);
  if (years <= 5) return 2 * years + 8;
  return 3 * years + 7;
}

export function assessVitals(input: {
  ageMonths: number;
  hr: number | null;
  rr: number | null;
  sbp: number | null;
}): Verdict {
  const { ageMonths, hr, rr, sbp } = input;
  const points: string[] = [];
  const RANK = { success: 0, warn: 1, danger: 2 } as const;
  let worst: keyof typeof RANK = 'success';
  const bump = (t: 'warn' | 'danger') => {
    if (RANK[t] > RANK[worst]) worst = t;
  };

  const hrR = hrRange(ageMonths);
  if (hr !== null) {
    if (hr > hrR.high) {
      points.push(`HR ${hr} is **above** the awake range (${hrR.low}–${hrR.high}). Look for fever, pain, hypovolemia, sepsis, SVT (infants: HR ≥220 suggests SVT).`);
      bump(hr >= 220 && ageMonths < 12 ? 'danger' : 'warn');
    } else if (hr < hrR.low) {
      points.push(`HR ${hr} is **below** range (${hrR.low}–${hrR.high}). In a sick child, bradycardia usually means hypoxia — a pre-arrest sign.`);
      bump('danger');
    } else points.push(`HR ${hr} is within the awake range (${hrR.low}–${hrR.high}).`);
  }
  const rrR = rrRange(ageMonths);
  if (rr !== null) {
    const who = whoFastBreathing(ageMonths);
    if (rr > rrR.high) {
      points.push(`RR ${rr} is **above** range (${rrR.low}–${rrR.high}).${who !== null && rr >= who ? ` Meets WHO fast-breathing threshold (≥${who}).` : ''}`);
      bump('warn');
    } else if (rr < rrR.low) {
      points.push(`RR ${rr} is **below** range (${rrR.low}–${rrR.high}). A slow rate in a distressed child signals fatigue or CNS depression.`);
      bump('danger');
    } else points.push(`RR ${rr} is within range (${rrR.low}–${rrR.high}).`);
  }
  if (sbp !== null) {
    const t = hypotensionThreshold(ageMonths);
    if (sbp < t) {
      points.push(`SBP ${sbp} is **hypotensive** (< ${t} mmHg). Hypotension is a late finding in children: this is decompensated shock.`);
      bump('danger');
    } else points.push(`SBP ${sbp} is above the hypotension cut-off (${t} mmHg). Normal BP does not exclude compensated shock — check perfusion.`);
  }
  if (points.length === 0) {
    return { tone: 'neutral', title: 'Enter at least one vital sign.' };
  }
  const tone = worst as Verdict['tone'];
  const title = tone === 'danger' ? 'Critical abnormality' : tone === 'warn' ? 'Abnormal for age' : 'Within reference range for age';
  return {
    tone,
    title,
    points,
    note: `Estimated weight for age (APLS): ${estimateWeight(ageMonths).toFixed(1)} kg. Use measured weight whenever possible.`,
  };
}
