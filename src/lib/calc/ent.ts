import type { Verdict } from './types';

/* ---------------- Acute otitis media (AAP 2013) ---------------- */

export type TmFinding = 'mod-severe-bulging' | 'mild-bulging' | 'otorrhea' | 'effusion-no-bulging' | 'normal';

export interface AomInput {
  ageMonths: number;
  tm: TmFinding;
  recentOtalgia: boolean; // onset <48 h (holding/tugging in nonverbal child)
  intenseErythema: boolean;
  severe: boolean; // moderate–severe otalgia, otalgia ≥48 h, or temperature ≥39 °C
  bilateral: boolean;
  followUp: boolean; // reliable way to start antibiotics if not better in 48–72 h
  amoxLast30d: boolean;
  conjunctivitis: boolean;
  recurrentAmoxFailure: boolean;
  allergy: 'none' | 'non-severe' | 'severe';
}

export type AomDiagnosis = 'aom' | 'not-diagnostic' | 'ome' | 'normal';

export function aomDiagnosis(i: Pick<AomInput, 'tm' | 'recentOtalgia' | 'intenseErythema'>): AomDiagnosis {
  if (i.tm === 'mod-severe-bulging' || i.tm === 'otorrhea') return 'aom';
  if (i.tm === 'mild-bulging') return i.recentOtalgia || i.intenseErythema ? 'aom' : 'not-diagnostic';
  if (i.tm === 'effusion-no-bulging') return 'ome';
  return 'normal';
}

export function aomDuration(ageMonths: number, severe: boolean): string {
  if (ageMonths < 24 || severe) return '10 days';
  if (ageMonths < 72) return '7 days';
  return '5–7 days';
}

export function aomPlan(i: AomInput): Verdict {
  const dx = aomDiagnosis(i);
  if (dx === 'normal') return { tone: 'success', title: 'Not otitis media', points: ['Look for other causes of fever/ear pain (otitis externa, referred pain from teeth/throat, viral illness).'] };
  if (dx === 'ome')
    return {
      tone: 'info',
      title: 'Otitis media with effusion (OME), not AOM',
      points: [
        'No bulging → no AOM. **Do not prescribe antibiotics**, steroids, antihistamines, or decongestants.',
        'Watchful waiting 3 months; hearing test if persistent ≥3 months or if the child is at risk (speech delay, sensory, craniofacial, developmental conditions).',
      ],
    };
  if (dx === 'not-diagnostic')
    return {
      tone: 'warn',
      title: 'Mild bulging alone does not meet AOM criteria',
      points: ['AOM needs mild bulging **plus** recent (<48 h) ear pain or intense TM erythema. Re-examine; avoid antibiotics on an uncertain diagnosis.'],
    };

  const pts: string[] = ['Analgesia for everyone: ibuprofen or acetaminophen.'];
  let antibiotics: boolean;
  let reason: string;
  if (i.ageMonths < 6) {
    antibiotics = true;
    reason = '<6 months (outside the guideline; treat).';
  } else if (i.tm === 'otorrhea') {
    antibiotics = true;
    reason = 'Otorrhea.';
  } else if (i.severe) {
    antibiotics = true;
    reason = 'Severe signs (moderate–severe otalgia, otalgia ≥48 h, or T ≥39 °C).';
  } else if (i.ageMonths < 24 && i.bilateral) {
    antibiotics = true;
    reason = '6–23 months with bilateral AOM.';
  } else {
    antibiotics = !i.followUp;
    reason = i.ageMonths < 24 ? '6–23 months, unilateral, non-severe.' : '≥24 months, non-severe.';
  }

  if (!antibiotics) {
    pts.unshift(`${reason} **Observation is an option** (shared decision): start antibiotics if worse or not improved in 48–72 h. Safety-net prescription or scheduled recheck required.`);
    return { tone: 'info', title: 'AOM — observation or antibiotics', points: pts };
  }

  const severeAllergy = i.allergy === 'severe';
  const needsClav = i.amoxLast30d || i.conjunctivitis || i.recurrentAmoxFailure;
  let drug: string;
  if (i.allergy !== 'none') {
    drug = 'Cephalosporin: cefdinir 14 mg/kg/day (1–2 doses), cefuroxime 30 mg/kg/day ÷ 2, cefpodoxime 10 mg/kg/day ÷ 2, or ceftriaxone 50 mg/kg IM/IV daily × 1–3 days.';
    if (severeAllergy) drug += ' Cross-reactivity with these side chains is <1–2%, so they are generally acceptable even with a severe penicillin label; macrolides work poorly. Refer for allergy evaluation/delabeling.';
  } else if (needsClav) {
    drug = 'High-dose **amoxicillin-clavulanate** 90 mg/kg/day amoxicillin + 6.4 mg/kg/day clavulanate ÷ 2 (amoxicillin in last 30 days, purulent conjunctivitis → NTHi, or recurrent failure).';
  } else {
    drug = 'High-dose **amoxicillin** 80–90 mg/kg/day ÷ 2.';
  }
  pts.unshift(`${reason} → antibiotics.`, drug, `Duration: ${aomDuration(i.ageMonths, i.severe)}.`);
  pts.push('Failure at 48–72 h: amoxicillin → amoxicillin-clavulanate → ceftriaxone × 3 days → tympanocentesis/ENT.');
  return { tone: 'warn', title: 'AOM — treat with antibiotics', points: pts };
}

/* ---------------- Sore throat: McIsaac (modified Centor) + IDSA 2025 testing ---------------- */

export interface CentorInput {
  ageYears: number;
  fever: boolean; // >38 °C
  noCough: boolean;
  nodes: boolean; // tender anterior cervical adenopathy
  tonsils: boolean; // tonsillar swelling or exudate
  viralFeatures: boolean; // cough, rhinorrhea, hoarseness, oral ulcers, conjunctivitis
  exposure: boolean; // household contact with GAS
}

export function mcIsaac(i: CentorInput): number {
  let s = (i.fever ? 1 : 0) + (i.noCough ? 1 : 0) + (i.nodes ? 1 : 0) + (i.tonsils ? 1 : 0);
  if (i.ageYears >= 3 && i.ageYears <= 14) s += 1;
  else if (i.ageYears >= 45) s -= 1;
  return s;
}

/** Approximate probability of GAS by McIsaac score (mixed-age derivation cohorts). */
export function gasProbability(score: number): string {
  if (score <= 0) return '1–2.5%';
  if (score === 1) return '5–10%';
  if (score === 2) return '11–17%';
  if (score === 3) return '28–35%';
  return '51–53%';
}

export function pharyngitisPlan(i: CentorInput): Verdict {
  const score = mcIsaac(i);
  const prob = gasProbability(score);
  const treat =
    'If positive: **amoxicillin 50 mg/kg once daily (max 1000 mg) × 10 days** or penicillin V × 10 days, or benzathine penicillin G IM once (600 000 U if <27 kg; 1.2 million U if ≥27 kg). Penicillin allergy: cephalexin; severe allergy: clindamycin or azithromycin (5 days; resistance rising).';
  if (i.ageYears < 3 && !i.exposure)
    return {
      tone: 'success',
      title: 'Under 3 years: do not test routinely',
      points: ['GAS pharyngitis is uncommon and rheumatic fever is very rare under 3. Test only with a specific exposure (e.g. sibling with GAS).'],
    };
  if (i.viralFeatures)
    return {
      tone: 'success',
      title: 'Viral features present: do not test',
      points: [`McIsaac ${score} (≈${prob}), but cough, rhinorrhea, hoarseness, oral ulcers, or conjunctivitis point to a virus. Testing finds carriers, not disease.`],
    };
  if (score <= 1)
    return {
      tone: 'success',
      title: `McIsaac ${score}: low probability (≈${prob})`,
      points: ['IDSA 2025: use a validated score to identify low-probability patients and skip testing and antibiotics.', 'Symptomatic care; return if worsening, drooling, trismus, or neck stiffness.'],
    };
  return {
    tone: 'warn',
    title: `McIsaac ${score}: test (≈${prob})`,
    points: [
      'Rapid antigen test or nucleic-acid test. In children and adolescents a **negative rapid antigen test needs a backup culture**; a negative NAAT does not.',
      'Never treat children on clinical score alone, even at 4–5.',
      treat,
      'Treatment within 9 days of onset prevents acute rheumatic fever; it does not prevent post-streptococcal glomerulonephritis.',
    ],
  };
}
