import { useState } from 'react';
import { Choice, NumberField, Result, ToolFrame } from '@/components/ui/Inputs';
import { Button } from '@/components/ui/Button';
import { num } from '@/lib/utils';
import { cchdScreen, qpQs, interpretQpQs } from '@/lib/calc/neonatal';
import { CaseSorter, type SorterCase } from './shared';

export function CchdTool() {
  const [hand, setHand] = useState('');
  const [foot, setFoot] = useState('');
  const [attempt, setAttempt] = useState<1 | 2>(1);
  const h = num(hand);
  const f = num(foot);
  const ok = h !== null && f !== null && h >= 50 && h <= 100 && f >= 50 && f <= 100;
  const r = ok ? cchdScreen(h!, f!, attempt) : null;
  return (
    <ToolFrame
      title="Critical CHD pulse-oximetry screen"
      subtitle="Right hand (pre-ductal) + either foot (post-ductal), at ≥24 h of age"
      source="Martin GR et al. Updated Strategies for Pulse Oximetry Screening for Critical Congenital Heart Disease. Pediatrics 2020;146:e20191650"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label="Right hand SpO₂" value={hand} onChange={setHand} unit="%" />
        <NumberField label="Foot SpO₂" value={foot} onChange={setFoot} unit="%" />
        <Choice label="Screen" value={attempt} onChange={setAttempt} options={[{ value: 1, label: 'Initial' }, { value: 2, label: 'Repeat' }]} />
      </div>
      <Result verdict={r?.verdict ?? null} empty="Enter both saturations (50–100%)." />
      {r?.result === 'repeat' && attempt === 1 && (
        <Button size="sm" variant="outline" onClick={() => setAttempt(2)}>
          Enter repeat values
        </Button>
      )}
    </ToolFrame>
  );
}

const PRESETS: { label: string; v: [number, number, number, number] }[] = [
  { label: 'Normal', v: [98, 75, 99, 75] },
  { label: 'Moderate ASD', v: [97, 72, 99, 86] },
  { label: 'Large VSD', v: [97, 70, 99, 90] },
  { label: 'Tetralogy of Fallot', v: [80, 55, 99, 55] },
];

export function QpQsTool() {
  const [v, setV] = useState<string[]>(['', '', '', '']);
  const set = (i: number) => (x: string) => setV((s) => s.map((y, j) => (j === i ? x : y)));
  const [ao, mv, pv, pa] = v.map(num);
  const ratio = ao !== null && mv !== null && pv !== null && pa !== null ? qpQs(ao, mv, pv, pa) : null;
  const filled = v.every((x) => x !== '');
  return (
    <ToolFrame
      title="Shunt calculator (Qp:Qs)"
      subtitle="Fick principle: Qp:Qs = (SaO₂ − SvO₂) / (SpvO₂ − SpaO₂)"
      source="Fick principle as used in cardiac catheterization; SVC saturation stands in for mixed venous when there is an atrial-level shunt"
    >
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button key={p.label} size="sm" variant="outline" onClick={() => setV(p.v.map(String))}>
            {p.label}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Aortic (systemic arterial)" value={v[0]} onChange={set(0)} unit="%" />
        <NumberField label="Mixed venous (SVC)" value={v[1]} onChange={set(1)} unit="%" />
        <NumberField label="Pulmonary vein" value={v[2]} onChange={set(2)} unit="%" hint="Assume 95–99% if not measured" />
        <NumberField label="Pulmonary artery" value={v[3]} onChange={set(3)} unit="%" />
      </div>
      <Result
        verdict={ratio !== null ? interpretQpQs(ratio) : filled ? { tone: 'neutral', title: 'Check values: pulmonary vein must exceed PA, and aortic must exceed mixed venous.' } : null}
        empty="Pick a preset or enter four saturations."
      />
      <p className="text-xs text-muted-foreground">
        Why it works: oxygen uptake is the same whether you measure it across the lungs or the body, so flow is inversely proportional to each
        circuit&apos;s saturation step-up. A left-to-right shunt raises PA saturation (small pulmonary step), so Qp rises.
      </p>
    </ToolFrame>
  );
}

const MURMURS: SorterCase[] = [
  {
    vignette: '4-year-old, well. Grade 2/6 low-pitched, **vibratory, musical** midsystolic murmur at the left lower sternal border/apex, louder supine, softer standing. Normal S2.',
    answer: 'Still’s murmur (innocent)',
    explanation: 'Classic Still’s murmur: vibratory/“twanging string”, LLSB, louder supine. No further testing when the rest of the exam is normal.',
  },
  {
    vignette: '5-year-old. Soft **continuous** hum below the right clavicle while sitting; disappears when the child lies flat or turns the head.',
    answer: 'Venous hum (innocent)',
    explanation: 'Venous hum: continuous, infraclavicular, abolished by supine position or jugular compression. The only innocent continuous murmur.',
  },
  {
    vignette: 'Former 27-week preterm, 10 days old, worsening ventilator needs. **Bounding pulses**, wide pulse pressure, continuous murmur at the left infraclavicular area.',
    answer: 'Patent ductus arteriosus',
    explanation: 'PDA: continuous “machinery” murmur, bounding pulses. In preterm infants the murmur is often systolic-only early on.',
  },
  {
    vignette: '7-week-old with tachypnea and sweating with feeds, weight falling across percentiles. Harsh **holosystolic** murmur at the left lower sternal border.',
    answer: 'Ventricular septal defect',
    explanation: 'Symptoms appear at 4–8 weeks as pulmonary vascular resistance falls and the shunt grows. Small VSDs are loudest; very large ones can be soft.',
  },
  {
    vignette: '6-year-old, asymptomatic. Grade 2/6 systolic ejection murmur at the left upper sternal border with a **widely split S2 that does not vary** with respiration.',
    answer: 'Atrial septal defect',
    explanation: 'Fixed split S2 + flow murmur across the pulmonary valve. Large shunts add a mid-diastolic tricuspid rumble at the LLSB.',
  },
  {
    vignette: '12-year-old with a harsh systolic ejection murmur at the right upper sternal border radiating to the neck, and an **apical ejection click that does not change** with respiration.',
    answer: 'Aortic stenosis (bicuspid valve)',
    explanation: 'Valvar AS click is at the apex and constant. Ask about syncope or chest pain with exercise before sports clearance.',
  },
  {
    vignette: '3-year-old with a systolic ejection murmur at the left upper sternal border radiating to the back and an **ejection click that softens with inspiration**.',
    answer: 'Pulmonary valve stenosis',
    explanation: 'Pulmonary ejection click is the only right-sided sound that softens with inspiration.',
  },
  {
    vignette: '2-week-old, healthy. Soft systolic ejection murmur at the left upper sternal border **radiating to both axillae and the back**.',
    answer: 'Peripheral pulmonary stenosis (innocent)',
    explanation: 'Physiologic PPS: turbulence at the relatively small branch pulmonary arteries; resolves by ~6 months. Persistence or a syndrome (Williams, Alagille, congenital rubella) warrants echo.',
  },
  {
    vignette: '14-year-old athlete with a systolic murmur that gets **louder on standing and with Valsalva**, softer with squatting.',
    answer: 'Hypertrophic cardiomyopathy',
    explanation: 'Reduced preload worsens the LV outflow obstruction. A murmur louder on standing is never innocent — echo and no competitive sports until cleared.',
  },
  {
    vignette: '3-day-old with weak femoral pulses compared with the brachial pulses; right arm BP 85 systolic, leg 60. Pulse-oximetry screen passed.',
    answer: 'Coarctation of the aorta',
    explanation: 'Coarctation is the CCHD most often missed by oximetry screening. Four-limb BPs and femoral pulses matter; ductal closure can precipitate shock — PGE₁.',
  },
];

const MURMUR_CHOICES = [
  'Still’s murmur (innocent)',
  'Venous hum (innocent)',
  'Peripheral pulmonary stenosis (innocent)',
  'Patent ductus arteriosus',
  'Ventricular septal defect',
  'Atrial septal defect',
  'Aortic stenosis (bicuspid valve)',
  'Pulmonary valve stenosis',
  'Hypertrophic cardiomyopathy',
  'Coarctation of the aorta',
];

export function MurmurQuiz() {
  return (
    <CaseSorter
      title="Murmur mapper"
      subtitle="Name the lesion from the auscultation findings"
      cases={MURMURS}
      choices={MURMUR_CHOICES}
      source="Classic auscultatory findings; AAP Bright Futures and standard pediatric cardiology references"
    />
  );
}
