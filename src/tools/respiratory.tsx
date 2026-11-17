import { useState } from 'react';
import { Choice, NumberField, Check, Result, ToolFrame } from '@/components/ui/Inputs';
import { num, cn } from '@/lib/utils';
import {
  bronchiolitisDisposition,
  westleyScore,
  westleyVerdict,
  pramScore,
  pramVerdict,
  classifySeverity,
  initialStep,
  STEPS,
  LEVEL_NAME,
  AWAKENING_OPTIONS,
  SYMPTOM_OPTIONS,
  SABA_OPTIONS,
  INTERFERENCE_OPTIONS,
  CONTROL_AWAKENINGS,
  CONTROL_SYMPTOMS,
  CONTROL_SABA,
  CONTROL_INTERFERENCE,
  classifyControl,
  controlAction,
  type AgeGroup,
  type Level,
  type Control,
  type WestleyInput,
  type PramInput,
} from '@/lib/calc/respiratory';
import { EvidenceSorter, CaseSorter, type EvidenceItem, type SorterCase } from './shared';
import type { Verdict } from '@/lib/calc/types';

export function BronchiolitisDispositionTool() {
  const [age, setAge] = useState('');
  const [ga, setGa] = useState('39');
  const [comorb, setComorb] = useState(false);
  const [spo2, setSpo2] = useState('');
  const [rr, setRr] = useState('');
  const [wob, setWob] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [intake, setIntake] = useState<'normal' | 'reduced' | 'poor'>('normal');
  const [apnea, setApnea] = useState(false);
  const [lethargy, setLethargy] = useState(false);
  const [day, setDay] = useState('');
  const [safety, setSafety] = useState(false);
  const a = num(age);
  const g = num(ga);
  const verdict =
    a === null || g === null
      ? null
      : bronchiolitisDisposition({ ageMonths: a, gaWeeks: g, comorbidity: comorb, spo2: num(spo2), rr: num(rr), wob, intake, apnea, lethargy, illnessDay: num(day), safetyConcern: safety });
  return (
    <ToolFrame
      title="Bronchiolitis: home, admit, or escalate?"
      subtitle="Infants 1–23 months with a first viral wheezing illness"
      source="Ralston SL et al. AAP Bronchiolitis CPG, Pediatrics 2014;134:e1474; NICE NG9 (updated 2021)"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label="Age" value={age} onChange={setAge} unit="months" />
        <NumberField label="Gestation at birth" value={ga} onChange={setGa} unit="weeks" />
        <NumberField label="Illness day" value={day} onChange={setDay} unit="day" />
        <NumberField label="Sustained SpO₂ (room air)" value={spo2} onChange={setSpo2} unit="%" />
        <NumberField label="Respiratory rate" value={rr} onChange={setRr} unit="/min" />
      </div>
      <Choice
        label="Work of breathing"
        value={wob}
        onChange={setWob}
        options={[
          { value: 'mild', label: 'Mild', hint: 'Mild subcostal retractions' },
          { value: 'moderate', label: 'Moderate', hint: 'Intercostal + subcostal, nasal flaring' },
          { value: 'severe', label: 'Severe', hint: 'Grunting, head bobbing, marked retractions' },
        ]}
      />
      <Choice
        label="Feeding"
        value={intake}
        onChange={setIntake}
        options={[
          { value: 'normal', label: '≥75% of usual' },
          { value: 'reduced', label: '50–75% of usual' },
          { value: 'poor', label: '<50% or dehydrated' },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <Check label="Apnea" checked={apnea} onChange={setApnea} />
        <Check label="Lethargy / exhaustion" checked={lethargy} onChange={setLethargy} />
        <Check label="High-risk comorbidity" hint="hsCHD, chronic lung disease, neuromuscular, immunodeficiency, Down syndrome" checked={comorb} onChange={setComorb} />
        <Check label="Safety-net concern" hint="Caregiver confidence, distance, no follow-up" checked={safety} onChange={setSafety} />
      </div>
      <Result verdict={verdict} empty="Enter age and gestation." />
    </ToolFrame>
  );
}

const BRONCH_ITEMS: EvidenceItem[] = [
  { name: 'Albuterol trial', verdict: 'dont', why: 'AAP 2014 strong recommendation against: no effect on admission, oxygen need, or length of stay. A "trial" just delays discharge.' },
  { name: 'Nebulized epinephrine', verdict: 'dont', why: 'No benefit in outpatients or inpatients (AAP 2014 strong).' },
  { name: 'Systemic corticosteroids', verdict: 'dont', why: 'No benefit for admission or length of stay (strong recommendation against).' },
  { name: 'Hypertonic saline in the ED', verdict: 'dont', why: 'Does not reduce admission. AAP allows it only for inpatients expected to stay >72 h (weak).' },
  { name: 'Oxygen when SpO₂ persistently <90%', verdict: 'do', why: 'AAP threshold is 90% (NICE: 92% if <6 weeks or comorbidity). Brief dips during sleep are normal in healthy infants.' },
  { name: 'Continuous pulse oximetry once off oxygen', verdict: 'dont', why: 'Overdetects transient dips, prolongs stay. Spot checks are enough for stable infants off oxygen.' },
  { name: 'Superficial nasal suctioning before feeds', verdict: 'selective', why: 'For comfort and feeding. Deep (nasopharyngeal) suctioning is associated with longer stay in infants 2–12 months.' },
  { name: 'Chest radiograph', verdict: 'selective', why: 'Not routine — leads to unnecessary antibiotics. Obtain only for severe illness needing ICU, focal findings, or atypical course.' },
  { name: 'Viral testing / RSV swab', verdict: 'selective', why: 'Does not change individual management; use for cohorting or when results alter care (e.g. influenza antivirals).' },
  { name: 'High-flow nasal cannula', verdict: 'selective', why: 'Rescue for hypoxemia or increased work of breathing failing standard oxygen (Franklin, NEJM 2018). Early routine use does not shorten stay.' },
  { name: 'Nasogastric or IV fluids when intake is inadequate', verdict: 'do', why: 'Either route; NG hydration is as effective as IV. Use isotonic IV fluids (hyponatremia risk with hypotonic fluids).' },
  { name: 'Chest physiotherapy', verdict: 'dont', why: 'No benefit and causes distress (AAP 2014).' },
  { name: 'Antibiotics', verdict: 'dont', why: 'Only for a documented co-infection (e.g. AOM, UTI). Bacteremia in bronchiolitis is very rare.' },
];

export function BronchiolitisSorter() {
  return (
    <EvidenceSorter
      title="Bronchiolitis: what actually helps?"
      subtitle="Decide for each intervention, then read the evidence"
      items={BRONCH_ITEMS}
      source="AAP Bronchiolitis CPG 2014; NICE NG9; Franklin D et al. NEJM 2018;378:1121; Mussman GM et al. JAMA Pediatr 2013;167:414"
    />
  );
}

export function WestleyTool() {
  const [s, setS] = useState<WestleyInput>({ consciousness: 0, cyanosis: 0, stridor: 0, airEntry: 0, retractions: 0 });
  const upd = <K extends keyof WestleyInput>(k: K) => (v: WestleyInput[K]) => setS((x) => ({ ...x, [k]: v }));
  const score = westleyScore(s);
  return (
    <ToolFrame title="Westley croup score" subtitle="Score a calm child; reassess after each intervention" source="Westley CR et al. Am J Dis Child 1978;132:484; Alberta TOP croup guideline; Parker CM, Cooper MN. Pediatrics 2019;144:e20183772">
      <Choice label="Stridor" value={s.stridor} onChange={upd('stridor')} options={[{ value: 0, label: 'None (0)' }, { value: 1, label: 'With agitation (1)' }, { value: 2, label: 'At rest (2)' }]} />
      <Choice label="Retractions" value={s.retractions} onChange={upd('retractions')} columns={4} options={[{ value: 0, label: 'None (0)' }, { value: 1, label: 'Mild (1)' }, { value: 2, label: 'Moderate (2)' }, { value: 3, label: 'Severe (3)' }]} />
      <Choice label="Air entry" value={s.airEntry} onChange={upd('airEntry')} options={[{ value: 0, label: 'Normal (0)' }, { value: 1, label: 'Decreased (1)' }, { value: 2, label: 'Markedly decreased (2)' }]} />
      <Choice label="Cyanosis" value={s.cyanosis} onChange={upd('cyanosis')} options={[{ value: 0, label: 'None (0)' }, { value: 4, label: 'With agitation (4)' }, { value: 5, label: 'At rest (5)' }]} />
      <Choice label="Level of consciousness" value={s.consciousness} onChange={upd('consciousness')} options={[{ value: 0, label: 'Normal (0)' }, { value: 5, label: 'Disoriented (5)' }]} />
      <Result verdict={westleyVerdict(score)} />
    </ToolFrame>
  );
}

const STRIDOR_CASES: SorterCase[] = [
  { vignette: '18-month-old, 2 days of coryza, now a **barking cough** and hoarse voice worse at night; inspiratory stridor only when crying; T 38.2 °C.', answer: 'Viral croup', explanation: 'Classic croup (parainfluenza): barky cough, hoarseness, gradual onset, night-time worsening.' },
  { vignette: '4-year-old, **unimmunized**, 6 h of high fever, sitting forward in tripod position, **drooling**, muffled voice, no cough, looks toxic.', answer: 'Epiglottitis', explanation: 'Rapid onset, toxic, drooling, no barky cough. Keep calm, no throat exam, call anesthesia/ENT for an airway in the OR.' },
  { vignette: '3-year-old with croup for 3 days who suddenly worsens: T 39.8 °C, toxic, copious **purulent secretions**, minimal response to nebulized epinephrine.', answer: 'Bacterial tracheitis', explanation: 'Bacterial superinfection (usually S. aureus) of viral croup: toxic, high fever, poor epinephrine response. Airway control + IV anti-staphylococcal antibiotics.' },
  { vignette: '2-year-old with fever, **neck stiffness and refusal to extend the neck**, drooling, muffled voice; widened prevertebral soft tissue on lateral neck film.', answer: 'Retropharyngeal abscess', explanation: 'Age <5 (retropharyngeal nodes regress later). Neck hyperextension limitation/torticollis. CT with contrast; IV antibiotics ± drainage.' },
  { vignette: '15-year-old with 5 days of sore throat, now **trismus**, "hot-potato" voice, **uvula deviated** to the left.', answer: 'Peritonsillar abscess', explanation: 'Adolescents; trismus + uvular deviation. Needle aspiration or I&D, antibiotics.' },
  { vignette: '20-month-old, afebrile, sudden **choking episode while eating peanuts**, then cough and unilateral wheeze with decreased breath sounds on the right.', answer: 'Foreign body aspiration', explanation: 'Witnessed choking is the most sensitive history finding. Normal CXR does not exclude it — rigid bronchoscopy if suspected.' },
  { vignette: '6-year-old, minutes after eating cashews: stridor, **urticaria**, lip swelling, vomiting.', answer: 'Anaphylaxis', explanation: 'Two organ systems after a likely allergen. **IM epinephrine** 0.01 mg/kg (max 0.5 mg) immediately — not nebulized epinephrine.' },
  { vignette: '6-week-old, thriving, with **inspiratory stridor since 2 weeks of age**, worse supine and when feeding or crying, better prone.', answer: 'Laryngomalacia', explanation: 'Most common cause of chronic infant stridor; usually resolves by 12–18 months. Refer if poor weight gain, apnea, cyanosis, or severe retractions.' },
];

const STRIDOR_CHOICES = ['Viral croup', 'Epiglottitis', 'Bacterial tracheitis', 'Retropharyngeal abscess', 'Peritonsillar abscess', 'Foreign body aspiration', 'Anaphylaxis', 'Laryngomalacia'];

export function StridorSorter() {
  return <CaseSorter title="Stridor sorter" subtitle="Eight look-alikes — name the cause" cases={STRIDOR_CASES} choices={STRIDOR_CHOICES} source="Standard pediatric emergency medicine references" />;
}

function LevelPicker({ label, value, onChange, options }: { label: string; value: number; onChange: (v: number) => void; options: string[] }) {
  return <Choice label={label} value={value} onChange={onChange} columns={options.length as 3 | 4} options={options.map((o, i) => ({ value: i, label: o }))} />;
}

export function StepLadder({ age, highlight }: { age: AgeGroup; highlight?: number[] }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {STEPS[age].map((s) => (
        <li key={s.step} className={cn('rounded-lg border p-3 text-sm', highlight?.includes(s.step) ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'bg-muted/30')}>
          <p className="font-semibold">Step {s.step}</p>
          <p className="text-muted-foreground">{s.preferred}</p>
          {s.notes && <p className="mt-1 text-xs text-muted-foreground">{s.notes}</p>}
        </li>
      ))}
    </ol>
  );
}

export function AsthmaSeverityTool() {
  const [age, setAge] = useState<AgeGroup>('5-11');
  const [sym, setSym] = useState(0);
  const [awake, setAwake] = useState(0);
  const [saba, setSaba] = useState(0);
  const [inter, setInter] = useState(0);
  const [fev1, setFev1] = useState('');
  const [risk, setRisk] = useState(false);
  const level = classifySeverity({ age, symptoms: sym as Level, awakenings: awake as Level, saba: saba as Level, interference: inter as Level, fev1: num(fev1), exacerbationRisk: risk });
  const step = initialStep(age, level);
  const stepNums = (step.match(/\d/g) ?? []).map(Number);
  const verdict: Verdict = {
    tone: level === 0 ? 'success' : level === 1 ? 'info' : level === 2 ? 'warn' : 'danger',
    title: `${LEVEL_NAME[level]} → start at ${step}`,
    points: [
      'Severity = the most severe category of **any** impairment or risk feature.',
      'Classify severity before starting a controller; afterwards, adjust by **control**, not severity.',
      'Reassess in 2–6 weeks.',
    ],
  };
  return (
    <ToolFrame title="Asthma severity classifier" subtitle="For a patient not yet on a controller" source="NAEPP EPR-3 (2007) severity tables; NAEPP 2020 Focused Update step therapy; GINA 2026">
      <Choice label="Age group" value={age} onChange={(v) => { setAge(v); setAwake(0); }} options={[{ value: '0-4', label: '0–4 y' }, { value: '5-11', label: '5–11 y' }, { value: '12+', label: '≥12 y' }]} />
      <LevelPicker label="Daytime symptoms" value={sym} onChange={setSym} options={SYMPTOM_OPTIONS} />
      <LevelPicker label="Night-time awakenings" value={awake} onChange={setAwake} options={AWAKENING_OPTIONS[age]} />
      <LevelPicker label="SABA use for symptoms (not exercise pretreatment)" value={saba} onChange={setSaba} options={SABA_OPTIONS} />
      <LevelPicker label="Interference with normal activity" value={inter} onChange={setInter} options={INTERFERENCE_OPTIONS} />
      {age !== '0-4' && <NumberField label="FEV₁ (% predicted), optional" value={fev1} onChange={setFev1} unit="%" />}
      <Check
        label={age === '0-4' ? '≥2 OCS courses in 6 months, or ≥4 wheezing episodes/yr lasting >1 day with risk factors' : '≥2 exacerbations requiring oral corticosteroids in the past year'}
        checked={risk}
        onChange={setRisk}
      />
      <Result verdict={verdict} />
      <StepLadder age={age} highlight={stepNums} />
    </ToolFrame>
  );
}

export function AsthmaControlTool() {
  const [age, setAge] = useState<AgeGroup>('5-11');
  const [vals, setVals] = useState<Control[]>([0, 0, 0, 0]);
  const [exac, setExac] = useState('0');
  const set = (i: number) => (v: number) => setVals((s) => s.map((x, j) => (j === i ? (v as Control) : x)));
  const c = classifyControl(vals, num(exac) ?? 0, age);
  return (
    <ToolFrame title="Asthma control → step up, hold, or step down" subtitle="For a patient already on treatment (last 2–4 weeks)" source="NAEPP EPR-3 control tables; NAEPP 2020 Focused Update">
      <Choice label="Age group" value={age} onChange={setAge} options={[{ value: '0-4', label: '0–4 y' }, { value: '5-11', label: '5–11 y' }, { value: '12+', label: '≥12 y' }]} />
      <LevelPicker label="Symptoms" value={vals[0]} onChange={set(0)} options={CONTROL_SYMPTOMS} />
      <LevelPicker label="Night-time awakenings" value={vals[1]} onChange={set(1)} options={CONTROL_AWAKENINGS[age]} />
      <LevelPicker label="SABA use" value={vals[2]} onChange={set(2)} options={CONTROL_SABA} />
      <LevelPicker label="Activity limitation" value={vals[3]} onChange={set(3)} options={CONTROL_INTERFERENCE} />
      <NumberField label="Exacerbations needing oral steroids in past year" value={exac} onChange={setExac} />
      <Result verdict={controlAction(c)} />
    </ToolFrame>
  );
}

export function PramTool() {
  const [s, setS] = useState<PramInput>({ suprasternal: 0, scalene: 0, airEntry: 0, wheeze: 0, spo2: 0 });
  const upd = <K extends keyof PramInput>(k: K) => (v: PramInput[K]) => setS((x) => ({ ...x, [k]: v }));
  return (
    <ToolFrame title="PRAM — acute asthma severity" subtitle="Pediatric Respiratory Assessment Measure, ages 2–17" source="Ducharme FM et al. J Pediatr 2008;152:476; NAEPP EPR-3 exacerbation management; Canadian TREKK asthma bottom line">
      <Choice label="Suprasternal retractions" value={s.suprasternal} onChange={upd('suprasternal')} options={[{ value: 0, label: 'Absent (0)' }, { value: 2, label: 'Present (2)' }]} />
      <Choice label="Scalene muscle contraction" value={s.scalene} onChange={upd('scalene')} options={[{ value: 0, label: 'Absent (0)' }, { value: 2, label: 'Present (2)' }]} />
      <Choice label="Air entry" value={s.airEntry} onChange={upd('airEntry')} columns={4} options={[{ value: 0, label: 'Normal (0)' }, { value: 1, label: '↓ at bases (1)' }, { value: 2, label: 'Widespread ↓ (2)' }, { value: 3, label: 'Absent/minimal (3)' }]} />
      <Choice label="Wheezing" value={s.wheeze} onChange={upd('wheeze')} columns={4} options={[{ value: 0, label: 'Absent (0)' }, { value: 1, label: 'Expiratory (1)' }, { value: 2, label: 'Insp + exp (2)' }, { value: 3, label: 'Audible / silent chest (3)' }]} />
      <Choice label="SpO₂ (room air)" value={s.spo2} onChange={upd('spo2')} options={[{ value: 0, label: '≥95% (0)' }, { value: 1, label: '92–94% (1)' }, { value: 2, label: '<92% (2)' }]} />
      <Result verdict={pramVerdict(pramScore(s))} />
    </ToolFrame>
  );
}
