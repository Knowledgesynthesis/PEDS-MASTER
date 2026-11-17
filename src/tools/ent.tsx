import { useState } from 'react';
import { Choice, NumberField, Check, Result, ToolFrame } from '@/components/ui/Inputs';
import { num } from '@/lib/utils';
import { aomPlan, type AomInput, type TmFinding, mcIsaac, pharyngitisPlan, type CentorInput } from '@/lib/calc/ent';

export function AomTool() {
  const [age, setAge] = useState('');
  const [s, setS] = useState<Omit<AomInput, 'ageMonths'>>({
    tm: 'mod-severe-bulging',
    recentOtalgia: false,
    intenseErythema: false,
    severe: false,
    bilateral: false,
    followUp: true,
    amoxLast30d: false,
    conjunctivitis: false,
    recurrentAmoxFailure: false,
    allergy: 'none',
  });
  const upd = <K extends keyof typeof s>(k: K) => (v: (typeof s)[K]) => setS((x) => ({ ...x, [k]: v }));
  const a = num(age);
  const verdict = a === null ? null : aomPlan({ ageMonths: a, ...s });
  return (
    <ToolFrame title="Otitis media: diagnose, then decide" subtitle="Bulging is the key sign" source="Lieberthal AS et al. AAP AOM CPG, Pediatrics 2013;131:e964; Rosenfeld RM et al. OME CPG, Otolaryngol Head Neck Surg 2016;154:S1">
      <NumberField label="Age" value={age} onChange={setAge} unit="months" />
      <Choice<TmFinding>
        label="Tympanic membrane (pneumatic otoscopy)"
        value={s.tm}
        onChange={upd('tm')}
        columns={2}
        options={[
          { value: 'mod-severe-bulging', label: 'Moderate–severe bulging', hint: 'Opaque, landmarks lost' },
          { value: 'mild-bulging', label: 'Mild bulging' },
          { value: 'otorrhea', label: 'New otorrhea', hint: 'Not from otitis externa' },
          { value: 'effusion-no-bulging', label: 'Effusion, no bulging', hint: 'Air–fluid level, retracted/neutral, ↓ mobility' },
          { value: 'normal', label: 'Normal / translucent, mobile' },
        ]}
      />
      {s.tm === 'mild-bulging' && (
        <div className="grid gap-2 sm:grid-cols-2">
          <Check label="Ear pain began <48 h ago" hint="Holding, tugging, rubbing in nonverbal child" checked={s.recentOtalgia} onChange={upd('recentOtalgia')} />
          <Check label="Intense TM erythema" checked={s.intenseErythema} onChange={upd('intenseErythema')} />
        </div>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        <Check label="Severe signs" hint="Moderate–severe otalgia, otalgia ≥48 h, or T ≥39 °C" checked={s.severe} onChange={upd('severe')} />
        <Check label="Bilateral" checked={s.bilateral} onChange={upd('bilateral')} />
        <Check label="Follow-up assured in 48–72 h" checked={s.followUp} onChange={upd('followUp')} />
        <Check label="Amoxicillin in past 30 days" checked={s.amoxLast30d} onChange={upd('amoxLast30d')} />
        <Check label="Purulent conjunctivitis" checked={s.conjunctivitis} onChange={upd('conjunctivitis')} />
        <Check label="Recurrent AOM unresponsive to amoxicillin" checked={s.recurrentAmoxFailure} onChange={upd('recurrentAmoxFailure')} />
      </div>
      <Choice
        label="Penicillin allergy label"
        value={s.allergy}
        onChange={upd('allergy')}
        options={[
          { value: 'none', label: 'None' },
          { value: 'non-severe', label: 'Non-severe', hint: 'Rash, GI upset' },
          { value: 'severe', label: 'Severe', hint: 'Anaphylaxis, SJS' },
        ]}
      />
      <Result verdict={verdict} empty="Enter age in months." />
    </ToolFrame>
  );
}

export function CentorTool() {
  const [age, setAge] = useState('');
  const [s, setS] = useState<Omit<CentorInput, 'ageYears'>>({ fever: false, noCough: false, nodes: false, tonsils: false, viralFeatures: false, exposure: false });
  const upd = <K extends keyof typeof s>(k: K) => (v: boolean) => setS((x) => ({ ...x, [k]: v }));
  const a = num(age);
  const input = a === null ? null : { ageYears: a, ...s };
  return (
    <ToolFrame title="Sore throat: test or not?" subtitle="McIsaac (modified Centor) score + guideline testing rules" source="IDSA GAS Pharyngitis Guideline Part 1 (Linder JA et al., 2025); Shulman ST et al. IDSA 2012; McIsaac WJ et al. CMAJ 1998;158:75">
      <NumberField label="Age" value={age} onChange={setAge} unit="years" />
      <div className="grid gap-2 sm:grid-cols-2">
        <Check label="Fever >38 °C" checked={s.fever} onChange={upd('fever')} />
        <Check label="Absence of cough" checked={s.noCough} onChange={upd('noCough')} />
        <Check label="Tender anterior cervical nodes" checked={s.nodes} onChange={upd('nodes')} />
        <Check label="Tonsillar swelling or exudate" checked={s.tonsils} onChange={upd('tonsils')} />
        <Check label="Prominent viral features" hint="Rhinorrhea, hoarseness, oral ulcers, conjunctivitis, diarrhea" checked={s.viralFeatures} onChange={upd('viralFeatures')} />
        <Check label="Household GAS exposure" checked={s.exposure} onChange={upd('exposure')} />
      </div>
      {input && <p className="text-sm text-muted-foreground">McIsaac score: <strong className="text-foreground">{mcIsaac(input)}</strong> (age 3–14 adds 1; ≥45 subtracts 1)</p>}
      <Result verdict={input ? pharyngitisPlan(input) : null} empty="Enter age in years." />
    </ToolFrame>
  );
}
