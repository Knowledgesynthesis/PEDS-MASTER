import { useState } from 'react';
import { Choice, NumberField, Check, Result, ToolFrame } from '@/components/ui/Inputs';
import { num } from '@/lib/utils';
import { assessVitals } from '@/lib/calc/vitals';
import { febrileInfantPathway, eosTriage, type IapStatus } from '@/lib/calc/neonatal';

export function VitalsTool() {
  const [age, setAge] = useState('');
  const [unit, setUnit] = useState<'months' | 'years'>('months');
  const [hr, setHr] = useState('');
  const [rr, setRr] = useState('');
  const [sbp, setSbp] = useState('');
  const a = num(age);
  const ageMonths = a === null ? null : unit === 'years' ? a * 12 : a;
  const valid = ageMonths !== null && ageMonths >= 0 && ageMonths <= 216;
  const verdict = valid ? assessVitals({ ageMonths: ageMonths!, hr: num(hr), rr: num(rr), sbp: num(sbp) }) : null;
  return (
    <ToolFrame title="Vital-sign checker" subtitle="Flags values outside PALS 2020 ranges for age" source="AHA PALS 2020 reference ranges; APLS weight formula; WHO IMCI fast-breathing thresholds">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Age" value={age} onChange={setAge} unit={unit} min={0} />
        <Choice label="Unit" value={unit} onChange={setUnit} options={[{ value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }]} />
        <NumberField label="Heart rate (awake)" value={hr} onChange={setHr} unit="/min" />
        <NumberField label="Respiratory rate" value={rr} onChange={setRr} unit="/min" />
        <NumberField label="Systolic BP" value={sbp} onChange={setSbp} unit="mmHg" />
      </div>
      <Result verdict={verdict} empty={a !== null && !valid ? 'Age must be 0–18 years.' : undefined} />
    </ToolFrame>
  );
}

export function FebrileInfantTool() {
  const [age, setAge] = useState('');
  const [well, setWell] = useState(true);
  const [term, setTerm] = useState(true);
  const [excl, setExcl] = useState(false);
  const [temp, setTemp] = useState('');
  const [pct, setPct] = useState('');
  const [crp, setCrp] = useState('');
  const [anc, setAnc] = useState('');
  const [ua, setUa] = useState<'positive' | 'negative' | 'pending'>('pending');
  const d = num(age);
  const verdict =
    d === null
      ? null
      : febrileInfantPathway({ ageDays: d, wellAppearing: well, term, exclusion: excl, maxTemp: num(temp), pct: num(pct), crp: num(crp), anc: num(anc), ua });
  return (
    <ToolFrame
      title="Febrile infant 8–60 days pathway"
      subtitle="Rectal T ≥38.0 °C, well-appearing, term — AAP 2021 decision logic"
      source="Pantell RH et al. AAP Clinical Practice Guideline: Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics 2021;148:e2021052228"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Age" value={age} onChange={setAge} unit="days" min={0} max={90} />
        <NumberField label="Highest temperature" value={temp} onChange={setTemp} unit="°C" />
        <NumberField label="Procalcitonin" value={pct} onChange={setPct} unit="ng/mL" hint="Leave blank if unavailable" />
        <NumberField label="CRP" value={crp} onChange={setCrp} unit="mg/L" hint="mg/dL × 10 = mg/L" />
        <NumberField label="ANC" value={anc} onChange={setAnc} unit="/µL" />
        <Choice
          label="Urinalysis"
          value={ua}
          onChange={setUa}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'negative', label: 'Negative' },
            { value: 'positive', label: 'Positive', hint: 'LE, nitrite, or pyuria' },
          ]}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Check label="Well-appearing" checked={well} onChange={setWell} />
        <Check label="Born ≥37 weeks" checked={term} onChange={setTerm} />
        <Check label="Exclusion present" hint="Focal infection, bronchiolitis, immunocompromise, recent antibiotics" checked={excl} onChange={setExcl} />
      </div>
      <Result verdict={verdict} empty="Enter age in days to begin." />
    </ToolFrame>
  );
}

export function EosTool() {
  const [ga, setGa] = useState('39');
  const [appearance, setAppearance] = useState<'ill' | 'equivocal' | 'well'>('well');
  const [iai, setIai] = useState(false);
  const [iap, setIap] = useState<IapStatus>('not-indicated');
  const [rom, setRom] = useState('');
  const g = num(ga);
  const verdict = g === null || g < 22 || g > 44 ? null : eosTriage({ gaWeeks: g, appearance, intraamnioticInfection: iai, iap, romHours: num(rom) });
  return (
    <ToolFrame
      title="Newborn early-onset sepsis triage"
      subtitle="Which AAP approach applies to this newborn?"
      source="Puopolo KM et al. Pediatrics 2018;142:e20182894 (≥35 wk) and e20182896 (≤34 wk); Puopolo KM et al. GBS clinical report, Pediatrics 2019;144:e20191881"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Gestational age" value={ga} onChange={setGa} unit="weeks" />
        <NumberField label="Rupture of membranes" value={rom} onChange={setRom} unit="hours" hint="Optional" />
      </div>
      <Choice
        label="Infant appearance"
        value={appearance}
        onChange={setAppearance}
        options={[
          { value: 'well', label: 'Well' },
          { value: 'equivocal', label: 'Equivocal', hint: 'Mild tachypnea, temp instability' },
          { value: 'ill', label: 'Clinically ill', hint: 'Respiratory distress, shock, lethargy' },
        ]}
      />
      <Choice
        label="GBS intrapartum prophylaxis (IAP)"
        value={iap}
        onChange={setIap}
        columns={2}
        options={[
          { value: 'not-indicated', label: 'Not indicated', hint: 'GBS negative, or planned cesarean without labor/ROM' },
          { value: 'adequate', label: 'Indicated & adequate', hint: 'Pen/amp/cefazolin ≥4 h before delivery' },
          { value: 'inadequate', label: 'Indicated, inadequate', hint: '<4 h, clindamycin, or vancomycin' },
          { value: 'none', label: 'Indicated, not given' },
        ]}
      />
      <Check label="Maternal intraamniotic infection (suspected or confirmed)" hint="Intrapartum fever ≥39.0 °C, or 38.0–38.9 °C with fetal tachycardia, leukocytosis, or purulent fluid" checked={iai} onChange={setIai} />
      <Result verdict={verdict} empty="Enter gestational age (22–44 weeks)." />
    </ToolFrame>
  );
}
