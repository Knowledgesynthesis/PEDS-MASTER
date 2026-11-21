import { describe, it, expect } from 'vitest';
import { maintenanceHourly, maintenanceDaily, deficitMl, ortPlan, cdsScore, cdsVerdict, sodiumGuidance } from './fluids';
import { westleyScore, westleyVerdict, pramScore, pramVerdict, classifySeverity, initialStep, classifyControl, controlAction, bronchiolitisDisposition, o2Threshold, STEPS } from './respiratory';
import { cchdScreen, qpQs, interpretQpQs, febrileInfantPathway, inflammatoryMarkers, eosTriage, iapAdequate, type FebrileInfantInput } from './neonatal';
import { aomDiagnosis, aomPlan, aomDuration, mcIsaac, pharyngitisPlan, gasProbability, type AomInput, type CentorInput } from './ent';
import { hypotensionThreshold, estimateWeight, assessVitals, hrRange, rrRange, whoFastBreathing } from './vitals';
import { linesCrossed, percentileToZ, interpretTrajectory, PATTERNS, catchUpKcalPerKg, velocityVerdict, expectedGain } from './growth';
import { milestoneVerdict, mchatVerdict, CDC_MILESTONES } from './development';
import { nextState, isDue, isMastered } from '../srs';

describe('fluids', () => {
  it('Holliday–Segar hourly (4-2-1)', () => {
    expect(maintenanceHourly(0)).toBe(0);
    expect(maintenanceHourly(-3)).toBe(0);
    expect(maintenanceHourly(5)).toBe(20);
    expect(maintenanceHourly(10)).toBe(40);
    expect(maintenanceHourly(15)).toBe(50);
    expect(maintenanceHourly(20)).toBe(60);
    expect(maintenanceHourly(23)).toBe(63);
    expect(maintenanceHourly(25)).toBe(65);
    expect(maintenanceHourly(70)).toBe(110);
    expect(maintenanceHourly(3.5)).toBeCloseTo(14);
  });
  it('Holliday–Segar daily (100-50-20)', () => {
    expect(maintenanceDaily(10)).toBe(1000);
    expect(maintenanceDaily(20)).toBe(1500);
    expect(maintenanceDaily(30)).toBe(1700);
    expect(maintenanceDaily(0)).toBe(0);
  });
  it('deficit and ORT plan', () => {
    expect(deficitMl(15, 8)).toBe(1200);
    const p = ortPlan(12, 'moderate');
    expect(p.deficitMl).toBe(1200);
    expect(p.perHour).toBe(300);
    expect(p.perStool).toBe(120);
    expect(p.perEmesis).toBe(24);
    expect(ortPlan(10, 'mild').deficitMl).toBe(500);
  });
  it('Clinical Dehydration Scale boundaries', () => {
    expect(cdsScore({ appearance: 1, eyes: 1, mucosa: 1, tears: 1 })).toBe(4);
    expect(cdsVerdict(0).tone).toBe('success');
    expect(cdsVerdict(1).title).toMatch(/some/);
    expect(cdsVerdict(4).title).toMatch(/some/);
    expect(cdsVerdict(5).tone).toBe('danger');
    expect(cdsVerdict(8).tone).toBe('danger');
  });
  it('sodium guidance thresholds', () => {
    expect(sodiumGuidance(null)).toBeNull();
    expect(sodiumGuidance(118)!.tone).toBe('danger');
    expect(sodiumGuidance(130)!.tone).toBe('warn');
    expect(sodiumGuidance(140)!.tone).toBe('success');
    expect(sodiumGuidance(150)!.title).toMatch(/hypernatremia/);
    expect(sodiumGuidance(165)!.tone).toBe('danger');
  });
});

describe('croup and asthma scores', () => {
  it('Westley score range and categories', () => {
    expect(westleyScore({ consciousness: 5, cyanosis: 5, stridor: 2, airEntry: 2, retractions: 3 })).toBe(17);
    expect(westleyScore({ consciousness: 0, cyanosis: 0, stridor: 2, airEntry: 1, retractions: 2 })).toBe(5);
    expect(westleyVerdict(2).title).toMatch(/mild/);
    expect(westleyVerdict(3).title).toMatch(/moderate/);
    expect(westleyVerdict(5).title).toMatch(/moderate/);
    expect(westleyVerdict(6).title).toMatch(/severe/);
    expect(westleyVerdict(11).title).toMatch(/severe/);
    expect(westleyVerdict(12).title).toMatch(/impending/);
  });
  it('PRAM range and categories', () => {
    expect(pramScore({ suprasternal: 2, scalene: 2, airEntry: 3, wheeze: 3, spo2: 2 })).toBe(12);
    expect(pramScore({ suprasternal: 2, scalene: 2, airEntry: 2, wheeze: 2, spo2: 2 })).toBe(10);
    expect(pramVerdict(3).title).toMatch(/mild/);
    expect(pramVerdict(4).title).toMatch(/moderate/);
    expect(pramVerdict(7).title).toMatch(/moderate/);
    expect(pramVerdict(8).title).toMatch(/severe/);
  });
  it('NAEPP severity uses the worst feature', () => {
    expect(classifySeverity({ age: '5-11', symptoms: 2, awakenings: 2, saba: 2, interference: 2, fev1: 74, exacerbationRisk: false })).toBe(2);
    expect(classifySeverity({ age: '5-11', symptoms: 1, awakenings: 0, saba: 1, interference: 0, fev1: 88, exacerbationRisk: false })).toBe(1);
    expect(classifySeverity({ age: '5-11', symptoms: 0, awakenings: 0, saba: 0, interference: 0, fev1: 55, exacerbationRisk: false })).toBe(3);
    expect(classifySeverity({ age: '5-11', symptoms: 0, awakenings: 0, saba: 0, interference: 0, fev1: null, exacerbationRisk: true })).toBe(1);
    expect(classifySeverity({ age: '0-4', symptoms: 0, awakenings: 0, saba: 0, interference: 0, fev1: 40, exacerbationRisk: false })).toBe(0);
  });
  it('initial step by age', () => {
    expect(initialStep('5-11', 2)).toMatch(/^Step 3/);
    expect(initialStep('12+', 3)).toMatch(/Step 4 or 5/);
    expect(initialStep('0-4', 0)).toBe('Step 1');
  });
  it('step ladders have 6 steps for each age group', () => {
    for (const age of ['0-4', '5-11', '12+'] as const) expect(STEPS[age].map((s) => s.step)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(STEPS['5-11'][2].preferred).toMatch(/ICS-formoterol/);
  });
  it('control classification', () => {
    expect(classifyControl([0, 0, 0, 0], 0, '5-11')).toBe(0);
    expect(classifyControl([0, 0, 0, 0], 2, '5-11')).toBe(1);
    expect(classifyControl([0, 2, 0, 0], 0, '12+')).toBe(2);
    expect(classifyControl([0, 0, 0, 0], 4, '0-4')).toBe(2);
    expect(controlAction(1).points!.join(' ')).toMatch(/adherence/);
  });
});

describe('bronchiolitis disposition', () => {
  const base = { ageMonths: 4, gaWeeks: 39, comorbidity: false, spo2: 95, rr: 45, wob: 'mild' as const, intake: 'normal' as const, apnea: false, lethargy: false, illnessDay: 5, safetyConcern: false };
  it('home when mild', () => expect(bronchiolitisDisposition(base).tone).toBe('success'));
  it('admit for SpO2 below threshold', () => expect(bronchiolitisDisposition({ ...base, spo2: 89 }).title).toMatch(/Admit/));
  it('admit for poor intake', () => expect(bronchiolitisDisposition({ ...base, intake: 'poor' }).title).toMatch(/Admit/));
  it('escalate for apnea', () => expect(bronchiolitisDisposition({ ...base, apnea: true }).tone).toBe('danger'));
  it('escalate for SpO2 <88', () => expect(bronchiolitisDisposition({ ...base, spo2: 85 }).tone).toBe('danger'));
  it('NICE threshold 92% under 6 weeks', () => {
    expect(o2Threshold(1, false)).toBe(92);
    expect(o2Threshold(3, false)).toBe(90);
    expect(o2Threshold(3, true)).toBe(92);
    expect(bronchiolitisDisposition({ ...base, ageMonths: 1, spo2: 91 }).title).toMatch(/Admit/);
  });
});

describe('neonatal', () => {
  it('CCHD screen: both readings ≥95% and difference ≤3 on either attempt (AAP 2025)', () => {
    for (const attempt of [1, 2] as const) {
      for (const [hand, foot] of [[95, 95], [98, 95], [95, 98], [100, 100], [95.1, 98.1]]) {
        expect(cchdScreen(hand, foot, attempt)?.result).toBe('pass');
      }
    }
  });
  it('CCHD screen: either reading <90 is an immediate fail on either attempt', () => {
    for (const attempt of [1, 2] as const) {
      for (const [hand, foot] of [[89, 99], [99, 89], [0, 100], [95, 89.9]]) {
        expect(cchdScreen(hand, foot, attempt)?.verdict.title).toMatch(/<90%/);
      }
    }
  });
  it('CCHD screen: intermediate results repeat once, then fail if still not passing', () => {
    for (const [hand, foot] of [[95, 92], [92, 95], [95, 94], [94, 95], [94, 94], [90, 90], [97, 93], [99, 95], [95, 99], [95, 98.01]]) {
      expect(cchdScreen(hand, foot, 1)?.result, `${hand}/${foot}`).toBe('repeat');
      expect(cchdScreen(hand, foot, 2)?.result, `${hand}/${foot}`).toBe('fail');
    }
    expect(cchdScreen(95, 94, 1)?.verdict.points).toContain('The foot is below 95%.');
    expect(cchdScreen(94, 95, 2)?.verdict.points).toContain('The right hand is below 95%.');
    expect(cchdScreen(99, 95, 2)?.verdict.points).toContain('The absolute hand–foot difference is greater than 3 percentage points.');
  });
  it('CCHD screen: invalid or missing saturations have no verdict', () => {
    for (const value of [null, NaN, Infinity, -Infinity, -1, 100.1]) {
      expect(cchdScreen(value, 89, 1)).toBeNull();
      expect(cchdScreen(99, value, 2)).toBeNull();
    }
    expect(cchdScreen(95, 95, 3 as 2)).toBeNull();
  });
  it('Qp:Qs', () => {
    expect(qpQs(97, 72, 99, 86)).toBeCloseTo(25 / 13, 5);
    expect(qpQs(80, 55, 99, 55)!).toBeLessThan(1);
    expect(qpQs(90, 70, 85, 90)).toBeNull();
    expect(qpQs(70, 75, 99, 80)).toBeNull();
    expect(interpretQpQs(0.6).title).toMatch(/right-to-left/);
    expect(interpretQpQs(1.0).title).toMatch(/balanced/);
    expect(interpretQpQs(1.3).title).toMatch(/small/);
    expect(interpretQpQs(1.7).title).toMatch(/moderate/);
    expect(interpretQpQs(2.5).title).toMatch(/large/);
  });
  const well: FebrileInfantInput = { ageDays: 40, wellAppearing: true, term: true, exclusion: false, maxTemp: 38.3, pct: 0.1, crp: 5, anc: 3000, ua: 'negative' };
  it('febrile infant: age bands', () => {
    expect(febrileInfantPathway({ ...well, ageDays: 5 }).title).toMatch(/≤7 days/);
    expect(febrileInfantPathway({ ...well, ageDays: 70 }).title).toMatch(/>60 days/);
    expect(febrileInfantPathway({ ...well, ageDays: 15 }).title).toMatch(/8–21 days/);
    expect(febrileInfantPathway({ ...well, ageDays: 21 }).title).toMatch(/8–21 days/);
    expect(febrileInfantPathway({ ...well, ageDays: 22 }).title).toMatch(/22–28 days, normal/);
    expect(febrileInfantPathway({ ...well, ageDays: 25, pct: 0.8 }).title).toMatch(/22–28 days, abnormal/);
    expect(febrileInfantPathway({ ...well, ageDays: 29 }).tone).toBe('success');
    expect(febrileInfantPathway({ ...well, ua: 'positive' }).title).toMatch(/UA positive/);
    expect(febrileInfantPathway({ ...well, crp: 30 }).title).toMatch(/abnormal markers/);
    expect(febrileInfantPathway({ ...well, wellAppearing: false }).tone).toBe('danger');
    expect(febrileInfantPathway({ ...well, pct: null, crp: null }).title).toMatch(/Obtain inflammatory markers/);
  });
  it('inflammatory marker thresholds', () => {
    expect(inflammatoryMarkers({ maxTemp: 38.2, pct: null, crp: 10, anc: 4500 }).abnormal).toBe(false); // ANC cut 5200 without PCT
    expect(inflammatoryMarkers({ maxTemp: 38.2, pct: 0.2, crp: 10, anc: 4500 }).abnormal).toBe(true); // ANC cut 4000 with PCT
    expect(inflammatoryMarkers({ maxTemp: 38.6, pct: 0.2, crp: 10, anc: 3000 }).abnormal).toBe(true);
    expect(inflammatoryMarkers({ maxTemp: 38.5, pct: 0.5, crp: 20, anc: 4000 }).abnormal).toBe(false); // boundaries are strict ">"
  });
  it('EOS triage and IAP adequacy', () => {
    const b = { gaWeeks: 39, appearance: 'well' as const, intraamnioticInfection: false, iap: 'not-indicated' as const, romHours: 10 };
    expect(eosTriage(b).tone).toBe('success');
    expect(eosTriage({ ...b, appearance: 'ill' }).tone).toBe('danger');
    expect(eosTriage({ ...b, gaWeeks: 33 }).title).toMatch(/<35/);
    expect(eosTriage({ ...b, intraamnioticInfection: true }).tone).toBe('warn');
    expect(eosTriage({ ...b, iap: 'inadequate' }).title).toMatch(/inadequate/);
    expect(eosTriage({ ...b, romHours: 20 }).tone).toBe('info');
    expect(iapAdequate('penicillin', 4)).toBe(true);
    expect(iapAdequate('cefazolin', 5)).toBe(true);
    expect(iapAdequate('ampicillin', 3.5)).toBe(false);
    expect(iapAdequate('clindamycin', 8)).toBe(false);
    expect(iapAdequate('vancomycin', 8)).toBe(false);
  });
});

describe('ENT', () => {
  const base: AomInput = { ageMonths: 15, tm: 'mod-severe-bulging', recentOtalgia: false, intenseErythema: false, severe: false, bilateral: true, followUp: true, amoxLast30d: false, conjunctivitis: false, recurrentAmoxFailure: false, allergy: 'none' };
  it('AOM diagnosis', () => {
    expect(aomDiagnosis({ tm: 'mod-severe-bulging', recentOtalgia: false, intenseErythema: false })).toBe('aom');
    expect(aomDiagnosis({ tm: 'otorrhea', recentOtalgia: false, intenseErythema: false })).toBe('aom');
    expect(aomDiagnosis({ tm: 'mild-bulging', recentOtalgia: true, intenseErythema: false })).toBe('aom');
    expect(aomDiagnosis({ tm: 'mild-bulging', recentOtalgia: false, intenseErythema: false })).toBe('not-diagnostic');
    expect(aomDiagnosis({ tm: 'effusion-no-bulging', recentOtalgia: true, intenseErythema: true })).toBe('ome');
    expect(aomDiagnosis({ tm: 'normal', recentOtalgia: true, intenseErythema: false })).toBe('normal');
  });
  it('AOM management matrix', () => {
    const bilat = aomPlan(base);
    expect(bilat.title).toMatch(/treat/);
    expect(bilat.points!.join(' ')).toMatch(/80–90 mg\/kg/);
    expect(bilat.points!.join(' ')).toMatch(/10 days/);
    expect(aomPlan({ ...base, bilateral: false }).title).toMatch(/observation/);
    expect(aomPlan({ ...base, bilateral: false, followUp: false }).title).toMatch(/treat/);
    expect(aomPlan({ ...base, ageMonths: 48, bilateral: true }).title).toMatch(/observation/);
    expect(aomPlan({ ...base, ageMonths: 48, severe: true }).points!.join(' ')).toMatch(/10 days/);
    expect(aomPlan({ ...base, ageMonths: 4, bilateral: false }).title).toMatch(/treat/);
    expect(aomPlan({ ...base, conjunctivitis: true }).points!.join(' ')).toMatch(/clavulanate/);
    expect(aomPlan({ ...base, allergy: 'severe' }).points!.join(' ')).toMatch(/cefdinir/);
    expect(aomPlan({ ...base, tm: 'effusion-no-bulging' }).title).toMatch(/OME/);
  });
  it('AOM duration by age', () => {
    expect(aomDuration(18, false)).toBe('10 days');
    expect(aomDuration(36, false)).toBe('7 days');
    expect(aomDuration(84, false)).toBe('5–7 days');
    expect(aomDuration(84, true)).toBe('10 days');
  });
  const c: CentorInput = { ageYears: 9, fever: true, noCough: true, nodes: true, tonsils: true, viralFeatures: false, exposure: false };
  it('McIsaac scoring', () => {
    expect(mcIsaac(c)).toBe(5);
    expect(mcIsaac({ ...c, ageYears: 50 })).toBe(3);
    expect(mcIsaac({ ...c, ageYears: 20 })).toBe(4);
    expect(gasProbability(0)).toBe('1–2.5%');
    expect(gasProbability(5)).toBe('51–53%');
  });
  it('pharyngitis testing rules', () => {
    expect(pharyngitisPlan({ ...c, ageYears: 2 }).title).toMatch(/Under 3/);
    expect(pharyngitisPlan({ ...c, ageYears: 2, exposure: true }).title).toMatch(/test/);
    expect(pharyngitisPlan({ ...c, viralFeatures: true }).title).toMatch(/do not test/);
    expect(pharyngitisPlan({ ...c, fever: false, nodes: false, tonsils: false, noCough: false, ageYears: 20 }).title).toMatch(/low probability/);
    expect(pharyngitisPlan(c).points!.join(' ')).toMatch(/backup culture/);
  });
});

describe('vitals', () => {
  it('hypotension thresholds (PALS)', () => {
    expect(hypotensionThreshold(0)).toBe(60);
    expect(hypotensionThreshold(6)).toBe(70);
    expect(hypotensionThreshold(72)).toBe(82);
    expect(hypotensionThreshold(120)).toBe(90);
    expect(hypotensionThreshold(132)).toBe(90);
  });
  it('APLS weights', () => {
    expect(estimateWeight(6)).toBe(7);
    expect(estimateWeight(36)).toBe(14);
    expect(estimateWeight(96)).toBe(31);
  });
  it('ranges and flags', () => {
    expect(hrRange(1)).toEqual({ low: 85, high: 205 });
    expect(rrRange(48)).toEqual({ low: 20, high: 28 });
    expect(whoFastBreathing(1)).toBe(60);
    expect(whoFastBreathing(8)).toBe(50);
    expect(whoFastBreathing(30)).toBe(40);
    expect(assessVitals({ ageMonths: 6, hr: 70, rr: null, sbp: null }).tone).toBe('danger');
    expect(assessVitals({ ageMonths: 24, hr: 120, rr: 30, sbp: 95 }).tone).toBe('success');
    expect(assessVitals({ ageMonths: 24, hr: 200, rr: 30, sbp: 95 }).tone).toBe('warn');
    expect(assessVitals({ ageMonths: 24, hr: null, rr: null, sbp: null }).tone).toBe('neutral');
  });
});

describe('growth', () => {
  it('percentile lines crossed', () => {
    expect(linesCrossed(50, 10)).toBe(1);
    expect(linesCrossed(50, 9)).toBe(2);
    expect(linesCrossed(50, 5)).toBe(2);
    expect(linesCrossed(10, 50)).toBe(1);
    expect(linesCrossed(50, 50)).toBe(0);
  });
  it('inverse normal', () => {
    expect(percentileToZ(50)).toBeCloseTo(0, 6);
    expect(percentileToZ(97.5)).toBeCloseTo(1.96, 2);
    expect(percentileToZ(2.5)).toBeCloseTo(-1.96, 2);
    expect(percentileToZ(2)).toBeCloseTo(-2.054, 2);
    expect(Number.isFinite(percentileToZ(0))).toBe(true);
    expect(Number.isFinite(percentileToZ(100))).toBe(true);
  });
  it('teaching patterns map to the right mechanism', () => {
    expect(interpretTrajectory(PATTERNS.intake.data).title).toMatch(/Weight falling first/);
    expect(interpretTrajectory(PATTERNS.endocrine.data).title).toMatch(/endocrine/);
    expect(interpretTrajectory(PATTERNS.channel.data).title).toMatch(/together/);
    expect(interpretTrajectory(PATTERNS.cns.data).title).toMatch(/Head/);
    expect(interpretTrajectory([]).tone).toBe('neutral');
  });
  it('catch-up energy and velocity', () => {
    expect(catchUpKcalPerKg(108, 7.5, 6)).toBeCloseTo(135);
    expect(catchUpKcalPerKg(108, 7.5, 0)).toBe(0);
    expect(expectedGain(1)).toEqual({ low: 25, high: 35 });
    expect(velocityVerdict(2, 10).tone).toBe('danger');
    expect(velocityVerdict(2, 22).tone).toBe('warn');
    expect(velocityVerdict(2, 30).tone).toBe('success');
    expect(velocityVerdict(8, -5).tone).toBe('danger');
  });
});

describe('development', () => {
  it('milestone sets are well formed', () => {
    const ages = CDC_MILESTONES.map((m) => m.age);
    expect(ages).toEqual([2, 4, 6, 9, 12, 15, 18, 24, 30, 36, 48, 60]);
    for (const m of CDC_MILESTONES) expect(new Set(m.items.map((i) => i.domain)).size).toBe(4);
  });
  it('milestone verdicts', () => {
    const set = CDC_MILESTONES[7];
    expect(milestoneVerdict(24, [], false, false).tone).toBe('success');
    expect(milestoneVerdict(24, [], true, false).tone).toBe('danger');
    expect(milestoneVerdict(24, [set.items[1]], false, false).points!.join(' ')).toMatch(/audiology/);
    const twoDomains = [set.items[1], set.items[6]];
    expect(milestoneVerdict(24, twoDomains, false, false).points!.join(' ')).toMatch(/global developmental delay/);
    expect(milestoneVerdict(40, [set.items[6]], false, false).points!.join(' ')).toMatch(/school district/);
  });
  it('M-CHAT-R/F', () => {
    expect(mchatVerdict(2, null).tone).toBe('success');
    expect(mchatVerdict(5, null).tone).toBe('warn');
    expect(mchatVerdict(5, 2).tone).toBe('danger');
    expect(mchatVerdict(5, 1).tone).toBe('success');
    expect(mchatVerdict(8, null).tone).toBe('danger');
  });
});

describe('spaced repetition', () => {
  it('promotes on correct, resets on wrong', () => {
    const t0 = 1_000_000;
    const a = nextState(undefined, true, t0);
    expect(a.box).toBe(2);
    expect(isMastered(a)).toBe(false);
    const b = nextState(a, true, t0);
    expect(b.box).toBe(3);
    expect(isMastered(b)).toBe(true);
    expect(isDue(b, t0)).toBe(false);
    const c = nextState(b, false, t0);
    expect(c.box).toBe(1);
    expect(c.seen).toBe(3);
    expect(c.correct).toBe(2);
    expect(isDue(c, t0)).toBe(true);
    let s = c;
    for (let i = 0; i < 10; i++) s = nextState(s, true, t0);
    expect(s.box).toBe(5);
  });
});
