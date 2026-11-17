import { useState } from 'react';
import { Choice, NumberField, Result, ToolFrame } from '@/components/ui/Inputs';
import { num, round } from '@/lib/utils';
import { cdsScore, cdsVerdict, type CdsInput, maintenanceHourly, maintenanceDaily, ADULT_CAP_ML_H, ortPlan, deficitMl, sodiumGuidance } from '@/lib/calc/fluids';
import { EvidenceSorter, type EvidenceItem } from './shared';

export function CdsTool() {
  const [s, setS] = useState<CdsInput>({ appearance: 0, eyes: 0, mucosa: 0, tears: 0 });
  const upd = <K extends keyof CdsInput>(k: K) => (v: CdsInput[K]) => setS((x) => ({ ...x, [k]: v }));
  return (
    <ToolFrame title="Clinical Dehydration Scale (CDS)" subtitle="Validated for 1 month – 3 years with gastroenteritis" source="Friedman JN et al. J Pediatr 2004;145:201; Goldman RD et al. Pediatrics 2008;122:545; Freedman SB et al. JAMA 2016;315:1966">
      <Choice label="General appearance" value={s.appearance} onChange={upd('appearance')} options={[{ value: 0, label: 'Normal (0)' }, { value: 1, label: 'Thirsty, restless, or lethargic but irritable when touched (1)' }, { value: 2, label: 'Drowsy, limp, cold, sweaty ± comatose (2)' }]} />
      <Choice label="Eyes" value={s.eyes} onChange={upd('eyes')} options={[{ value: 0, label: 'Normal (0)' }, { value: 1, label: 'Slightly sunken (1)' }, { value: 2, label: 'Very sunken (2)' }]} />
      <Choice label="Mucous membranes (tongue)" value={s.mucosa} onChange={upd('mucosa')} options={[{ value: 0, label: 'Moist (0)' }, { value: 1, label: 'Sticky (1)' }, { value: 2, label: 'Dry (2)' }]} />
      <Choice label="Tears" value={s.tears} onChange={upd('tears')} options={[{ value: 0, label: 'Tears (0)' }, { value: 1, label: 'Decreased (1)' }, { value: 2, label: 'Absent (2)' }]} />
      <Result verdict={cdsVerdict(cdsScore(s))} />
    </ToolFrame>
  );
}

export function MaintenanceTool() {
  const [kg, setKg] = useState('');
  const w = num(kg);
  const valid = w !== null && w > 0 && w <= 150;
  const hourly = valid ? maintenanceHourly(w!) : 0;
  const daily = valid ? maintenanceDaily(w!) : 0;
  const capped = hourly > ADULT_CAP_ML_H;
  return (
    <ToolFrame title="Maintenance fluid calculator" subtitle="Holliday–Segar, with the 2018 isotonic-fluid rule" source="Holliday MA, Segar WE. Pediatrics 1957;19:823; Feld LG et al. AAP CPG Maintenance IV Fluids, Pediatrics 2018;142:e20183083">
      <NumberField label="Weight" value={kg} onChange={setKg} unit="kg" />
      <Result
        verdict={
          valid
            ? {
                tone: capped ? 'warn' : 'info',
                title: `${round(hourly)} mL/h  ·  ${round(daily)} mL/day`,
                points: [
                  `4-2-1: ${Math.min(w!, 10) * 4} + ${Math.min(Math.max(w! - 10, 0), 10) * 2} + ${round(Math.max(w! - 20, 0))} = ${round(hourly)} mL/h.`,
                  `100-50-20 daily ÷ 24 = ${round(daily / 24, 1)} mL/h (the two methods differ slightly).`,
                  capped ? `Above the usual adult ceiling (~${ADULT_CAP_ML_H} mL/h): cap at adult maintenance.` : 'Use the hourly rate; reassess as intake resumes.',
                  '**Fluid choice (28 days–18 years):** isotonic solution with dextrose and potassium — e.g. D5 0.9% NaCl + 20 mEq/L KCl or D5 lactated Ringer’s. Hypotonic fluids cause hospital-acquired hyponatremia.',
                  'Reduce to ~2/3 maintenance when ADH excess is likely (meningitis, bronchiolitis, pneumonia, postoperative) and monitor Na.',
                ],
              }
            : null
        }
        empty="Enter weight (0–150 kg)."
      />
    </ToolFrame>
  );
}

export function OrtPlanTool() {
  const [kg, setKg] = useState('');
  const [sev, setSev] = useState<'mild' | 'moderate'>('mild');
  const [na, setNa] = useState('');
  const [pct, setPct] = useState('');
  const w = num(kg);
  const valid = w !== null && w > 0 && w <= 100;
  const p = valid ? ortPlan(w!, sev) : null;
  const d = num(pct);
  const naV = sodiumGuidance(num(na));
  return (
    <ToolFrame title="Rehydration planner" subtitle="ORT volumes, ongoing losses, and IV deficit math" source="CDC MMWR 2003;52(RR-16); ESPGHAN/ESPID 2014 gastroenteritis guideline; WHO 2005">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Weight" value={kg} onChange={setKg} unit="kg" />
        <Choice label="Dehydration" value={sev} onChange={setSev} options={[{ value: 'mild', label: 'Mild (3–5%)' }, { value: 'moderate', label: 'Moderate (6–9%)' }]} />
      </div>
      <Result
        verdict={
          p
            ? {
                tone: 'info',
                title: `ORS ${round(p.deficitMl)} mL over 4 h  (≈${round(p.perHour)} mL/h)`,
                points: [
                  `Target ≈ **${round(p.per5min)} mL every 5 min**; start with 5 mL every 1–2 min by syringe or spoon and increase as tolerated.`,
                  `Plus ongoing losses: **${round(p.perStool)} mL per diarrheal stool**, **${round(p.perEmesis)} mL per vomit**.`,
                  'Reassess hydration hourly. Resume age-appropriate diet as soon as rehydrated — no "gut rest" or BRAT restriction; continue breastfeeding throughout.',
                ],
              }
            : null
        }
        empty="Enter weight (0–100 kg)."
      />
      <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
        <NumberField label="Estimated % dehydration (for IV deficit)" value={pct} onChange={setPct} unit="%" />
        <NumberField label="Serum sodium (optional)" value={na} onChange={setNa} unit="mEq/L" />
      </div>
      {valid && d !== null && d > 0 && d <= 15 && (
        <p className="text-sm">
          Deficit = {w} kg × {d}% × 10 = <strong>{round(deficitMl(w!, d))} mL</strong>
          {naV && naV.title.includes('hypernatremia') ? ', replaced over 48 h' : ', replaced over 24 h'} on top of maintenance (subtract any boluses given). If pre-illness weight is known: deficit (L) = pre-illness kg − current kg.
        </p>
      )}
      {naV && <Result verdict={naV} />}
    </ToolFrame>
  );
}

const GE_ITEMS: EvidenceItem[] = [
  { name: 'Oral rehydration solution for mild–moderate dehydration', verdict: 'do', why: 'First-line. As effective as IV with shorter ED stays (Cochrane).' },
  { name: 'Single dose oral ondansetron for vomiting (≥6 months)', verdict: 'do', why: 'Reduces vomiting, IV use, and admission (Freedman, NEJM 2006). Repeated doses can worsen diarrhea; QT caution.' },
  { name: 'Half-strength apple juice for minimally dehydrated children', verdict: 'selective', why: 'Fewer treatment failures than electrolyte solution in children >6 months with minimal dehydration (Freedman, JAMA 2016). Not for moderate dehydration.' },
  { name: 'Probiotics (L. rhamnosus GG, mixed strains)', verdict: 'dont', why: 'Two large North American RCTs (NEJM 2018) showed no benefit; AGA 2020 recommends against for acute infectious gastroenteritis.' },
  { name: 'Loperamide', verdict: 'dont', why: 'Risk of ileus and lethargy in young children; contraindicated <3 years and with bloody diarrhea.' },
  { name: 'Routine stool cultures', verdict: 'selective', why: 'Only for bloody diarrhea, high fever with toxicity, immunocompromise, outbreaks, or prolonged symptoms (>7 days).' },
  { name: 'Routine electrolytes in mild–moderate dehydration on ORT', verdict: 'dont', why: 'Rarely change management. Check when IV fluids are needed, in severe dehydration, or if history suggests hyper/hyponatremia.' },
  { name: 'Antibiotics for suspected STEC (bloody diarrhea, no fever)', verdict: 'dont', why: 'May increase the risk of hemolytic uremic syndrome. Monitor CBC, creatinine, urine output.' },
  { name: 'Diluting formula or holding feeds after rehydration', verdict: 'dont', why: 'Early refeeding with usual diet shortens illness; diluted formula only prolongs undernutrition.' },
  { name: 'Nasogastric rehydration when oral fails', verdict: 'do', why: 'As effective as IV, fewer adverse events; underused.' },
];

export function GastroSorter() {
  return (
    <EvidenceSorter
      title="Gastroenteritis: what helps?"
      subtitle="Decide, then check the evidence"
      items={GE_ITEMS}
      source="Freedman SB et al. NEJM 2006;354:1698; JAMA 2016;315:1966; Schnadower D et al. NEJM 2018;379:2002; Freedman SB et al. NEJM 2018;379:2015; AGA 2020 probiotics guideline; IDSA 2017 infectious diarrhea guideline"
    />
  );
}
