import type { Verdict } from './types';

/* ---------------- Febrile well-appearing infant 8–60 days (AAP 2021) ---------------- */

export interface FebrileInfantInput {
  ageDays: number;
  wellAppearing: boolean;
  term: boolean; // ≥37 weeks
  exclusion: boolean; // focal bacterial infection, clinical bronchiolitis, immunocompromise, prior antibiotics, complex medical needs
  maxTemp: number | null; // °C, rectal
  pct: number | null; // ng/mL
  crp: number | null; // mg/L
  anc: number | null; // cells/µL
  ua: 'positive' | 'negative' | 'pending';
}

export interface MarkerResult {
  available: boolean;
  abnormal: boolean;
  reasons: string[];
  usedPct: boolean;
}

/** AAP 2021: PCT >0.5 ng/mL, CRP >20 mg/L, ANC >4000 (with PCT) or >5200 (without PCT), temperature >38.5 °C. */
export function inflammatoryMarkers(i: Pick<FebrileInfantInput, 'maxTemp' | 'pct' | 'crp' | 'anc'>): MarkerResult {
  const reasons: string[] = [];
  const usedPct = i.pct !== null;
  if (i.pct !== null && i.pct > 0.5) reasons.push(`PCT ${i.pct} ng/mL (> 0.5)`);
  if (i.crp !== null && i.crp > 20) reasons.push(`CRP ${i.crp} mg/L (> 20)`);
  const ancCut = usedPct ? 4000 : 5200;
  if (i.anc !== null && i.anc > ancCut) reasons.push(`ANC ${i.anc}/µL (> ${ancCut}${usedPct ? '' : ' without PCT'})`);
  if (i.maxTemp !== null && i.maxTemp > 38.5) reasons.push(`Temperature ${i.maxTemp} °C (> 38.5)`);
  // Need PCT plus CRP or ANC, or (without PCT) both CRP and ANC
  const available = [i.pct, i.crp, i.anc].filter((v) => v !== null).length >= 2;
  return { available, abnormal: reasons.length > 0, reasons, usedPct };
}

export function febrileInfantPathway(i: FebrileInfantInput): Verdict {
  if (i.ageDays < 8 || i.ageDays > 60) {
    return {
      tone: 'danger',
      title: i.ageDays < 8 ? '≤7 days: outside the AAP 2021 guideline' : '>60 days: outside the AAP 2021 guideline',
      points:
        i.ageDays < 8
          ? ['Treat as neonatal sepsis: blood, urine and CSF cultures, empiric ampicillin + gentamicin (consider acyclovir), admit.']
          : ['Use age-appropriate fever evaluation; UTI remains the most common serious bacterial infection.'],
    };
  }
  if (!i.wellAppearing || !i.term || i.exclusion) {
    return {
      tone: 'danger',
      title: 'Guideline does not apply — manage as high risk',
      points: [
        !i.wellAppearing ? 'Ill-appearing: full evaluation (blood, urine, CSF), empiric parenteral antibiotics, admit.' : 'Preterm, focal infection, bronchiolitis, immunocompromise or recent antibiotics excludes the guideline: individualize (most need full evaluation).',
        'Add acyclovir if HSV risk: vesicles, seizures, hypothermia, ill appearance, CSF pleocytosis with negative Gram stain, high ALT, maternal genital HSV.',
      ],
    };
  }

  const im = inflammatoryMarkers(i);
  const uaPos = i.ua === 'positive';
  const pts: string[] = [];

  if (i.ageDays <= 21) {
    return {
      tone: 'danger',
      title: '8–21 days: full evaluation, antibiotics, admit — regardless of markers',
      points: [
        'Urinalysis (+ catheter urine culture if positive), blood culture, **lumbar puncture**.',
        'Inflammatory markers may be sent but **do not** change management in this age band.',
        'Start parenteral **ampicillin + ceftazidime** or **ampicillin + gentamicin**; add acyclovir if HSV risk.',
        'Admit; stop antibiotics at 24–36 h if cultures negative and infant well.',
      ],
      note: 'AAP 2021 (Pantell). Invasive bacterial infection risk is highest in the first 3 weeks.',
    };
  }

  if (!im.available) {
    return {
      tone: 'warn',
      title: 'Obtain inflammatory markers to risk-stratify',
      points: [
        'Send UA, blood culture and markers: **procalcitonin + ANC (or CRP)** preferred; without PCT use ANC + CRP + temperature.',
        'No single marker is reliable alone.',
      ],
    };
  }

  if (im.abnormal) pts.push(`**Abnormal markers:** ${im.reasons.join('; ')}.`);
  else pts.push('All inflammatory markers normal.');
  if (uaPos) pts.push('Urinalysis positive (leukocyte esterase, nitrite, or pyuria) — send catheter urine culture.');

  if (i.ageDays <= 28) {
    if (im.abnormal) {
      return {
        tone: 'danger',
        title: '22–28 days, abnormal markers: LP, parenteral antibiotics, admit',
        points: [
          ...pts,
          'Perform **lumbar puncture**.',
          'Parenteral antibiotics (ceftriaxone if CSF normal; meningitic regimen — e.g. ampicillin + ceftazidime — if CSF abnormal or uninterpretable).',
          'Hospitalize.',
        ],
      };
    }
    return {
      tone: 'warn',
      title: '22–28 days, normal markers: LP optional (shared decision)',
      points: [
        ...pts,
        'LP may be performed. If you start antibiotics without CSF, a later positive culture cannot be interpreted — either do the LP or observe off antibiotics.',
        uaPos
          ? 'UA positive: parenteral antibiotics (ceftriaxone), then narrow by culture.'
          : 'UA negative: antibiotics are not required if markers stay normal.',
        'Hospital observation is the usual default; home management requires normal UA/markers, reliable follow-up within 24 h, and shared decision-making.',
      ],
      note: 'Ceftriaxone is avoided in neonates with hyperbilirubinemia or receiving IV calcium.',
    };
  }

  // 29–60 days
  if (im.abnormal) {
    return {
      tone: 'warn',
      title: '29–60 days, abnormal markers: consider LP, parenteral antibiotics',
      points: [
        ...pts,
        'LP may be performed — do it if you plan to start antibiotics, so a later positive blood culture is interpretable.',
        'Parenteral ceftriaxone (meningitic dosing if CSF abnormal or not obtained).',
        'Admit if CSF abnormal/not obtained or follow-up uncertain; selected infants with normal CSF can go home with 24-h re-check.',
      ],
    };
  }
  if (uaPos) {
    return {
      tone: 'info',
      title: '29–60 days, normal markers, UA positive: treat UTI as outpatient',
      points: [...pts, 'LP not needed.', 'Oral antibiotics guided by local susceptibility (e.g. cephalexin or cefixime); home with follow-up in 24–36 h and culture review.'],
    };
  }
  return {
    tone: 'success',
    title: '29–60 days, normal markers, UA negative: low risk',
    points: [...pts, 'No LP, no antibiotics.', 'Observe at home with re-evaluation in 24–36 h; hospital if follow-up unreliable.'],
  };
}

/* ---------------- Early-onset sepsis triage, ≥35 weeks (AAP 2018/2019) ---------------- */

export type IapStatus = 'not-indicated' | 'adequate' | 'inadequate' | 'none';

export interface EosInput {
  gaWeeks: number;
  appearance: 'ill' | 'equivocal' | 'well';
  intraamnioticInfection: boolean;
  iap: IapStatus;
  romHours: number | null;
}

/** IAP is adequate only with penicillin G, ampicillin, or cefazolin given ≥4 h before delivery. */
export function iapAdequate(drug: 'penicillin' | 'ampicillin' | 'cefazolin' | 'clindamycin' | 'vancomycin', hoursBeforeDelivery: number) {
  return (drug === 'penicillin' || drug === 'ampicillin' || drug === 'cefazolin') && hoursBeforeDelivery >= 4;
}

export function eosTriage(i: EosInput): Verdict {
  if (i.gaWeeks < 35) {
    return {
      tone: 'warn',
      title: '<35 weeks: use the preterm approach (AAP 2018)',
      points: [
        '**Lower risk:** cesarean for maternal non-infectious indication (e.g. pre-eclampsia) without labor, ROM, or intraamniotic infection — evaluation may be deferred with close monitoring.',
        '**Higher risk:** preterm labor, PPROM, intraamniotic infection, or unexplained preterm delivery — blood culture and empiric ampicillin + gentamicin.',
        'Stop antibiotics by 36–48 h if blood culture is negative and the infant is well.',
      ],
    };
  }
  if (i.appearance === 'ill') {
    return {
      tone: 'danger',
      title: 'Clinical illness: evaluate and treat now',
      points: [
        'Blood culture (≥1 mL), CBC; **lumbar puncture** if stable — never delay antibiotics for LP.',
        'Empiric **ampicillin + gentamicin** (dose by gestational and postnatal age).',
        'Discontinue at 36–48 h if cultures negative and infant well.',
      ],
    };
  }
  const pts: string[] = [];
  let tone: Verdict['tone'] = 'success';
  let title = 'Routine newborn care';

  if (i.intraamnioticInfection) {
    tone = 'warn';
    title = 'Intraamniotic infection: choose an AAP-endorsed approach';
    pts.push(
      '**Categorical:** blood culture + empiric antibiotics for all exposed infants.',
      '**Multivariable (EOS calculator, ≥34 wk):** individual risk from GA, max maternal temp, ROM duration, GBS status, IAP, and exam — cuts antibiotic use substantially without increasing missed cases.',
      '**Enhanced observation:** structured serial exams with prompt evaluation if signs develop.'
    );
  }
  if (i.appearance === 'equivocal') {
    tone = 'warn';
    title = i.intraamnioticInfection ? title : 'Equivocal signs: evaluate';
    pts.push('Equivocal exam (tachypnea, temperature instability, poor feeding): obtain blood culture and reassess within hours; start antibiotics if signs persist or worsen.');
  }
  if (i.iap === 'inadequate' || i.iap === 'none') {
    if (tone === 'success') {
      tone = 'info';
      title = 'GBS prophylaxis indicated but inadequate: observe';
    }
    pts.push('Well-appearing with inadequate/absent IAP: **in-hospital observation ≥36–48 h** with serial exams; routine CBC/CRP are not recommended (poor predictive value).');
  }
  if (i.romHours !== null && i.romHours >= 18) {
    pts.push(`ROM ${i.romHours} h (≥18 h) increases risk — individualize with the EOS calculator.`);
    if (tone === 'success') tone = 'info';
  }
  if (pts.length === 0) {
    pts.push('No evaluation needed. Teach families warning signs: poor feeding, lethargy, temperature ≥38.0 °C or <36.5 °C, breathing difficulty.');
  }
  return { tone, title, points: pts, note: 'Adequate IAP = penicillin, ampicillin, or cefazolin ≥4 h before delivery. Clindamycin/vancomycin count as inadequate for neonatal risk assessment.' };
}

/* ---------------- Critical CHD pulse-oximetry screen (AAP 2025) ---------------- */

export type CchdResult = 'pass' | 'repeat' | 'fail';

function validSaturation(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value >= 0 && value <= 100;
}

export function cchdScreen(hand: number | null, foot: number | null, attempt: 1 | 2): { result: CchdResult; verdict: Verdict } | null {
  if (!validSaturation(hand) || !validSaturation(foot) || (attempt !== 1 && attempt !== 2)) return null;
  const evaluation = 'Evaluate the newborn promptly for cardiac and noncardiac causes of hypoxemia. Echocardiography is usually needed unless a reversible cause is identified and treated.';
  if (hand < 90 || foot < 90) {
    return {
      result: 'fail',
      verdict: {
        tone: 'danger',
        title: 'FAIL — SpO₂ <90% in either site',
        points: ['Do not wait for a repeat screen.', evaluation],
      },
    };
  }

  // Compare the upper value to the lower plus three to avoid a floating-point subtraction artifact.
  const differenceTooLarge = Math.max(hand, foot) > Math.min(hand, foot) + 3;
  if (hand >= 95 && foot >= 95 && !differenceTooLarge) {
    return {
      result: 'pass',
      verdict: {
        tone: 'success',
        title: 'PASS',
        points: ['Both readings are ≥95%, and the absolute difference is ≤3 percentage points.', 'A pass does not exclude critical CHD. Evaluate symptoms or abnormal exam findings regardless of the screen.'],
      },
    };
  }

  const reasons: string[] = [];
  if (hand < 95 && foot < 95) reasons.push('Both readings are below 95%.');
  else if (hand < 95) reasons.push('The right hand is below 95%.');
  else if (foot < 95) reasons.push('The foot is below 95%.');
  if (differenceTooLarge) reasons.push('The absolute hand–foot difference is greater than 3 percentage points.');

  if (attempt === 1) {
    return {
      result: 'repeat',
      verdict: {
        tone: 'warn',
        title: 'REPEAT in 1 hour',
        points: [...reasons, 'Repeat measurements of the right hand and either foot once, 1 hour after the initial screen.'],
      },
    };
  }
  return {
    result: 'fail',
    verdict: {
      tone: 'danger',
      title: 'FAIL on repeat screen',
      points: [...reasons, 'Do not repeat routinely a second time.', evaluation],
    },
  };
}

/* ---------------- Qp:Qs from saturations (Fick principle) ---------------- */

export function qpQs(sao2: number, svo2: number, spvo2: number, spao2: number): number | null {
  const den = spvo2 - spao2;
  const numr = sao2 - svo2;
  if (den <= 0 || numr <= 0) return null;
  return numr / den;
}

export function interpretQpQs(r: number): Verdict {
  if (r < 0.9)
    return { tone: 'warn', title: `Qp:Qs ${r.toFixed(2)} — net right-to-left`, points: ['Pulmonary flow is less than systemic: cyanotic physiology (e.g. tetralogy of Fallot, pulmonary atresia, Eisenmenger).'] };
  if (r <= 1.1) return { tone: 'success', title: `Qp:Qs ${r.toFixed(2)} — balanced`, points: ['No significant net shunt.'] };
  if (r < 1.5) return { tone: 'info', title: `Qp:Qs ${r.toFixed(2)} — small left-to-right shunt`, points: ['Usually hemodynamically insignificant; follow clinically.'] };
  if (r < 2) return { tone: 'warn', title: `Qp:Qs ${r.toFixed(2)} — moderate left-to-right shunt`, points: ['≥1.5 with chamber dilation (RV for ASD; LA/LV for VSD/PDA) is the usual threshold to consider closure.'] };
  return { tone: 'danger', title: `Qp:Qs ${r.toFixed(2)} — large left-to-right shunt`, points: ['Expect heart failure symptoms and pulmonary over-circulation; closure indicated to prevent pulmonary vascular disease.'] };
}
