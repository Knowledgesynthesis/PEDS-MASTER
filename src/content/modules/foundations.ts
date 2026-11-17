import { Stethoscope } from 'lucide-react';
import type { Module } from '../types';
import { doi, pm } from '../links';

export const foundations: Module = {
  slug: 'foundations',
  title: 'Foundations: The Sick Child',
  short: 'Foundations',
  tagline: 'Recognize sick vs not-sick in 30 seconds, then use age-correct numbers',
  icon: Stethoscope,
  color: 'slate',
  minutes: 15,
  objectives: [
    'Apply the Pediatric Assessment Triangle before touching the child',
    'Interpret heart rate, respiratory rate, and blood pressure by age',
    'Recognize compensated vs decompensated shock',
    'Estimate weight when it cannot be measured',
  ],
  bottomLine: [
    '**Appearance is the most important element** of the first look; an abnormal appearance with normal vitals is still a sick child.',
    '**Hypotension is a late, pre-arrest finding** in children — tachycardia and poor perfusion come first.',
    '**Bradycardia in a sick child = hypoxia** until proven otherwise; ventilate first.',
    'Hypotension: SBP < 60 (neonate), < 70 (1–12 mo), < **70 + 2 × age** (1–10 y), < 90 (>10 y).',
    'Fever in an infant <28 days is never "just a virus" until bacterial infection is excluded.',
    'Use measured weight; estimates (APLS) are for emergencies only.',
  ],
  sections: [
    {
      id: 'pat',
      title: 'The Pediatric Assessment Triangle (first 30 seconds, hands off)',
      refs: ['pals', 'dieckmann'],
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              title: 'Appearance — "TICLS"',
              items: ['**T**one', '**I**nteractiveness', '**C**onsolability', '**L**ook/gaze', '**S**peech/cry'],
            },
            {
              title: 'Work of breathing',
              items: ['Abnormal sounds: stridor, grunting, wheeze', 'Retractions, nasal flaring, head bobbing', 'Tripod or sniffing position'],
            },
            {
              title: 'Circulation to skin',
              items: ['Pallor', 'Mottling', 'Cyanosis'],
            },
          ],
        },
        {
          type: 'table',
          caption: 'Which sides are abnormal tells you the physiology',
          head: ['Abnormal', 'Impression', 'Example'],
          rows: [
            ['Work of breathing only', 'Respiratory distress', 'Bronchiolitis with retractions, playful'],
            ['Appearance + work of breathing', 'Respiratory failure', 'Exhausted, head bobbing, grunting'],
            ['Circulation ± appearance', 'Shock', 'Mottled, listless child with gastroenteritis'],
            ['Appearance only', 'CNS/metabolic dysfunction', 'Hypoglycemia, post-ictal, toxic ingestion, raised ICP'],
            ['All three', 'Cardiopulmonary failure', 'Imminent arrest — start resuscitation'],
          ],
        },
      ],
    },
    {
      id: 'vitals',
      title: 'Vital signs by age',
      refs: ['pals', 'who-imci'],
      blocks: [
        {
          type: 'table',
          caption: 'Heart rate (PALS 2020, awake)',
          head: ['Age', 'Normal range (/min)'],
          rows: [
            ['Newborn – 3 months', '85–205'],
            ['3 months – 2 years', '100–190'],
            ['2 – 10 years', '60–140'],
            ['> 10 years', '60–100'],
          ],
          note: 'Sleeping HR is lower. Fever raises HR ~10/min per °C — persistent tachycardia after defervescence is a warning sign.',
        },
        {
          type: 'table',
          caption: 'Respiratory rate (PALS 2020)',
          head: ['Age', 'Normal range (/min)', 'WHO fast breathing'],
          rows: [
            ['Infant (< 1 y)', '30–53', '≥60 if <2 mo; ≥50 if 2–11 mo'],
            ['Toddler (1–2 y)', '22–37', '≥40'],
            ['Preschool (3–5 y)', '20–28', '≥40 (to 59 mo)'],
            ['School age (6–11 y)', '18–25', '—'],
            ['Adolescent (12–15 y)', '12–20', '—'],
          ],
        },
        {
          type: 'table',
          caption: 'Hypotension (systolic BP)',
          head: ['Age', 'Hypotension if SBP <'],
          rows: [
            ['Term neonate (0–28 d)', '60 mmHg'],
            ['1–12 months', '70 mmHg'],
            ['1–10 years', '70 + (2 × age in years)'],
            ['> 10 years', '90 mmHg'],
          ],
        },
        { type: 'tool', id: 'vitals' },
      ],
    },
    {
      id: 'shock',
      title: 'Shock: compensated before hypotensive',
      refs: ['pals', 'ssc'],
      blocks: [
        {
          type: 'list',
          items: [
            '**Compensated shock:** tachycardia, delayed capillary refill (>2 s), cool extremities, weak peripheral pulses, reduced urine output — **normal blood pressure**.',
            '**Decompensated (hypotensive) shock:** add hypotension and altered mental status. Arrest may be minutes away.',
            'Types: hypovolemic (most common worldwide), distributive (septic, anaphylactic), cardiogenic (myocarditis, CHD), obstructive (tension pneumothorax, tamponade, ductal-dependent lesion closing).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Fluid resuscitation — current evidence',
          items: [
            'With ICU access: **10–20 mL/kg isotonic crystalloid** boluses, reassessing after each, up to 40–60 mL/kg in the first hour; stop if hepatomegaly, crackles, or worsening work of breathing (Surviving Sepsis Pediatric 2020).',
            'Without ICU access and no hypotension: avoid boluses — FEAST (2011) showed higher mortality with boluses in African children with febrile illness.',
            '**0.9% saline or balanced crystalloid:** PRoMPT BOLUS (NEJM 2026, 8 000+ children with septic shock) found no difference in kidney injury or death. Either is reasonable.',
            'Give antibiotics within 1 hour of recognizing septic shock.',
          ],
        },
      ],
    },
    {
      id: 'weight',
      title: 'Weight and dosing basics',
      refs: ['apls'],
      blocks: [
        {
          type: 'table',
          caption: 'APLS weight estimates (use only when weight cannot be measured)',
          head: ['Age', 'Formula', 'Example'],
          rows: [
            ['0–12 months', '(0.5 × age in months) + 4', '6 mo → 7 kg'],
            ['1–5 years', '(2 × age in years) + 8', '3 y → 14 kg'],
            ['6–12 years', '(3 × age in years) + 7', '8 y → 31 kg'],
          ],
          note: 'Length-based tapes (Broselow) outperform age formulas but underestimate weight in populations with high obesity prevalence.',
        },
        {
          type: 'list',
          items: [
            'Dose by **kg, capped at the adult dose**.',
            'Most pediatric medication errors are 10-fold errors: write a leading zero (0.5) and never a trailing zero (5.0).',
            'Hypoglycemia is common in sick infants — check glucose in every child with altered mental status ("Don’t Ever Forget Glucose").',
          ],
        },
      ],
    },
    {
      id: 'fever',
      title: 'Fever: age decides the work-up',
      refs: ['aap-febrile'],
      blocks: [
        {
          type: 'table',
          head: ['Age', 'Risk', 'Approach'],
          rows: [
            ['0–7 days', 'Highest; early-onset sepsis', 'Full sepsis evaluation, ampicillin + gentamicin, admit'],
            ['8–21 days', 'Highest risk after week 1', 'Full evaluation incl. LP, antibiotics, admit (AAP 2021)'],
            ['22–28 days', 'Intermediate', 'Inflammatory markers decide LP and disposition'],
            ['29–60 days', 'UTI is the commonest bacterial infection', 'UA + blood culture + markers; LP not needed if markers normal'],
            ['>60 days', 'Occult bacteremia <1% if immunized', 'Find the source; urinalysis when UTI risk is meaningful (e.g. UTICalc: girls, uncircumcised boys, fever ≥2 days, no source)'],
          ],
          note: 'Detailed pathway and calculator: Neonatal sepsis & febrile infant module.',
        },
      ],
    },
  ],
  pitfalls: [
    { myth: 'Normal blood pressure means the child is not in shock.', fact: 'Children maintain BP until they lose ~25–30% of circulating volume. Tachycardia + poor perfusion is shock.' },
    { myth: 'A slowing respiratory rate means the child is improving.', fact: 'In a child who was working hard, a falling RR with decreasing alertness signals fatigue and impending respiratory failure.' },
    { myth: 'Fever height predicts serious bacterial infection.', fact: 'Appearance and age predict risk far better; response to antipyretics does not distinguish bacterial from viral illness.' },
    { myth: 'Bradycardia in a sick infant needs atropine first.', fact: 'It is almost always hypoxic — oxygenate and ventilate; start CPR if HR <60 with poor perfusion despite ventilation.' },
  ],
  updates: [
    { year: '2026', md: '**PRoMPT BOLUS** (NEJM): balanced crystalloid vs 0.9% saline in pediatric septic shock — no difference in major adverse kidney events or death.' },
    { year: '2020', md: '**Surviving Sepsis Campaign pediatric guidelines** and **PALS 2020** updated reference vital signs and fluid-bolus guidance (10–20 mL/kg with reassessment).' },
  ],
  questions: [
    {
      id: 'fnd-1',
      stem: 'A 2-year-old with vomiting has HR 175, capillary refill 4 s, cool hands, and BP 92/60. She is alert. What best describes her state?',
      options: ['Compensated shock', 'Decompensated shock', 'Normal for age', 'Respiratory failure'],
      answer: 0,
      explanation: 'Tachycardia and poor perfusion with a BP above the hypotension threshold (70 + 2×2 = 74) define compensated shock. Hypotension or altered mental status would make it decompensated.',
      ref: 'pals',
    },
    {
      id: 'fnd-2',
      stem: 'What is the hypotension threshold (systolic BP) for a 6-year-old?',
      options: ['< 70 mmHg', '< 82 mmHg', '< 90 mmHg', '< 76 mmHg'],
      answer: 1,
      explanation: '70 + (2 × 6) = 82 mmHg. The formula applies from 1 to 10 years; above 10 years the threshold is 90.',
      ref: 'pals',
    },
    {
      id: 'fnd-3',
      stem: 'On the Pediatric Assessment Triangle, a child has abnormal appearance with normal work of breathing and normal skin circulation. Most likely category?',
      options: ['Respiratory distress', 'Compensated shock', 'Primary CNS or metabolic problem', 'Cardiopulmonary failure'],
      answer: 2,
      explanation: 'Isolated abnormal appearance points to brain dysfunction: hypoglycemia, intoxication, seizure/post-ictal state, raised intracranial pressure, or sepsis early on.',
      ref: 'dieckmann',
    },
    {
      id: 'fnd-4',
      stem: 'A 4-month-old with bronchiolitis becomes less responsive; RR falls from 70 to 24 and HR from 180 to 80. Next step?',
      options: ['Give atropine', 'Bag-mask ventilation with oxygen', 'Observe — the infant is improving', 'Give a 20 mL/kg fluid bolus'],
      answer: 1,
      explanation: 'Falling RR and HR with decreasing responsiveness indicate respiratory failure with hypoxic bradycardia. Support ventilation first; start CPR if HR stays <60 with poor perfusion.',
      ref: 'pals',
    },
    {
      id: 'fnd-5',
      stem: 'Estimated weight of a 4-year-old using the APLS formula?',
      options: ['12 kg', '16 kg', '19 kg', '22 kg'],
      answer: 1,
      explanation: '(2 × 4) + 8 = 16 kg. Use measured weight or a length-based tape when available.',
      ref: 'apls',
    },
    {
      id: 'fnd-6',
      stem: 'A child in septic shock in a well-resourced ED received 20 mL/kg saline and is still tachycardic with delayed refill; no crackles or hepatomegaly. Next fluid step?',
      options: ['Stop fluids and start inotropes only', 'Another 10–20 mL/kg isotonic bolus with reassessment', 'Switch to 0.45% saline', 'Give 5% albumin as the only acceptable fluid'],
      answer: 1,
      explanation: 'Up to 40–60 mL/kg in the first hour is reasonable with ICU support, reassessing for fluid overload after each bolus. Saline or balanced crystalloid are both acceptable (PRoMPT BOLUS 2026). Start vasoactives if shock persists after 40–60 mL/kg.',
      ref: 'ssc',
    },
    {
      id: 'fnd-7',
      stem: 'Which finding is the most reliable early sign of shock in children?',
      options: ['Hypotension', 'Tachycardia with prolonged capillary refill', 'Bradycardia', 'Wide pulse pressure in all cases'],
      answer: 1,
      explanation: 'Children compensate with tachycardia and vasoconstriction; BP falls late.',
      ref: 'pals',
    },
    {
      id: 'fnd-8',
      stem: 'Which child meets the WHO fast-breathing threshold?',
      options: ['5-week-old, RR 56', '8-month-old, RR 52', '3-year-old, RR 36', '18-month-old, RR 38'],
      answer: 1,
      explanation: 'Thresholds: ≥60 for <2 months, ≥50 for 2–11 months, ≥40 for 1–4 years. Only the 8-month-old at 52 meets it.',
      ref: 'who-imci',
    },
  ],
  flashcards: [
    { id: 'fnd-c1', front: 'TICLS stands for…', back: 'Tone, Interactiveness, Consolability, Look/gaze, Speech/cry — the appearance arm of the Pediatric Assessment Triangle.' },
    { id: 'fnd-c2', front: 'Hypotension formula, 1–10 years', back: 'SBP < 70 + (2 × age in years).' },
    { id: 'fnd-c3', front: 'Bradycardia in a sick child usually means…', back: 'Hypoxia. Oxygenate and ventilate first.' },
    { id: 'fnd-c4', front: 'APLS weight, 1–5 years', back: '(2 × age) + 8 kg.' },
    { id: 'fnd-c5', front: 'Bolus volume in pediatric septic shock (with ICU access)', back: '10–20 mL/kg isotonic crystalloid, reassess each time, up to 40–60 mL/kg in hour 1.' },
    { id: 'fnd-c6', front: 'Saline vs balanced fluid for pediatric septic shock?', back: 'No outcome difference (PRoMPT BOLUS, NEJM 2026). Either is reasonable.' },
  ],
  references: [
    { id: 'pals', citation: 'American Heart Association. Pediatric Advanced Life Support Provider Manual, 2020 (reference vital signs, hypotension thresholds).', url: 'https://cpr.heart.org' },
    { id: 'dieckmann', citation: 'Dieckmann RA et al. The Pediatric Assessment Triangle. Pediatr Emerg Care 2010;26:312–315.', url: pm('Dieckmann pediatric assessment triangle 2010') },
    { id: 'ssc', citation: 'Weiss SL et al. Surviving Sepsis Campaign International Guidelines for Septic Shock in Children. Pediatr Crit Care Med 2020;21:e52–e106. PRoMPT BOLUS Investigators, NEJM 2026.', url: pm('Surviving Sepsis Campaign international guidelines septic shock children 2020') },
    { id: 'apls', citation: 'Advanced Life Support Group. APLS: The Practical Approach, 6th ed. (2016) weight formulas.' },
    { id: 'who-imci', citation: 'WHO. Integrated Management of Childhood Illness chart booklet, 2014.' },
    { id: 'aap-febrile', citation: 'Pantell RH et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics 2021;148:e2021052228.', url: doi('10.1542/peds.2021-052228') },
  ],
};
