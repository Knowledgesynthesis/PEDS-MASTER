import type { ClinicalCase } from './types';

export const CASES: ClinicalCase[] = [
  {
    id: 'case-febrile-18d',
    title: 'The warm 18-day-old',
    module: 'neonatal-sepsis',
    setting: 'Emergency department',
    stages: [
      {
        narrative: 'An 18-day-old, born at 39 weeks after an uncomplicated pregnancy (GBS negative), had a rectal temperature of 38.3 °C at home. In the ED she is feeding, pink, and alert.',
        data: [
          { label: 'T', value: '38.2 °C rectal' },
          { label: 'HR', value: '165' },
          { label: 'RR', value: '44' },
          { label: 'Cap refill', value: '<2 s' },
        ],
        question: 'What evaluation does she need?',
        options: [
          { text: 'UA and blood culture; LP only if markers are abnormal', correct: false, feedback: 'That is the 22–28 day logic. At 8–21 days, markers are not sensitive enough to skip the LP.' },
          { text: 'UA (+ culture), blood culture, and lumbar puncture; start parenteral antibiotics; admit', correct: true, feedback: 'AAP 2021: every well-appearing febrile infant 8–21 days gets UA, blood culture, CSF, antibiotics, and admission.' },
          { text: 'Observe at home — she looks well and the fever is low', correct: false, feedback: 'Well appearance does not exclude bacteremia or meningitis at this age.' },
          { text: 'Viral swab first; if positive, no further testing', correct: false, feedback: 'A positive viral test does not remove bacterial risk in a 2.5-week-old.' },
        ],
        teaching: 'In the first 3 weeks, invasive bacterial infection risk is highest and clinical appearance is unreliable — the full evaluation is non-negotiable.',
      },
      {
        narrative: 'CSF: 60 WBC/µL (75% lymphocytes), protein 110 mg/dL, glucose normal, Gram stain negative. ALT 180 U/L. She has a brief right-arm twitching episode.',
        question: 'Besides ampicillin plus ceftazidime (or gentamicin), what must you add?',
        options: [
          { text: 'Vancomycin', correct: false, feedback: 'MRSA is not the concern; the pattern points to a virus that is treatable.' },
          { text: 'Acyclovir, after sending HSV PCR on CSF, blood, and surface swabs', correct: true, feedback: 'Pleocytosis with negative Gram stain, transaminitis, and seizure in the first weeks = neonatal HSV until proven otherwise.' },
          { text: 'Dexamethasone', correct: false, feedback: 'Adjunctive steroids are not used for neonatal meningitis.' },
          { text: 'Nothing — likely enterovirus', correct: false, feedback: 'Enterovirus is common, but HSV is lethal if missed; treat until PCR excludes it.' },
        ],
        teaching: 'Up to half of neonatal HSV has no skin lesions. Acyclovir is started on suspicion, not confirmation.',
      },
      {
        narrative: 'HSV PCRs (CSF, blood, surface swabs) are negative, CSF enterovirus PCR is positive, ALT is falling, and blood and CSF cultures are negative at 36 h. She is feeding well and afebrile.',
        question: 'Next step?',
        options: [
          { text: 'Complete 10 days of antibiotics', correct: false, feedback: 'No bacterial infection was found; prolonged therapy adds harm.' },
          { text: 'Stop antibiotics and acyclovir (HSV PCR negative) and discharge with follow-up', correct: true, feedback: 'Culture-negative, well infant at 24–36 h: stop. Enterovirus explains the CSF picture; with all HSV PCRs negative, acyclovir stops too.' },
          { text: 'Repeat LP before stopping', correct: false, feedback: 'Not needed when cultures and PCRs are negative and the infant is well.' },
          { text: 'Switch to oral amoxicillin for 7 days', correct: false, feedback: 'There is nothing to treat.' },
        ],
        teaching: 'Most pathogens grow within 24–36 h. Antibiotic stewardship is part of safe febrile-infant care.',
      },
    ],
  },
  {
    id: 'case-grey-10d',
    title: 'The grey 10-day-old',
    module: 'chd',
    setting: 'Emergency department',
    stages: [
      {
        narrative: 'A 10-day-old boy is brought in grey and breathing fast after 1 day of poor feeding. He passed his pulse-oximetry screen. He is mottled with a capillary refill of 5 s.',
        data: [
          { label: 'HR', value: '205' },
          { label: 'RR', value: '70' },
          { label: 'BP R arm', value: '78/45' },
          { label: 'BP leg', value: '42/25' },
          { label: 'pH / lactate', value: '7.12 / 8.5' },
        ],
        question: 'Which finding most changes your management?',
        options: [
          { text: 'Tachypnea', correct: false, feedback: 'Non-specific — sepsis, metabolic, and cardiac causes all cause it.' },
          { text: 'Arm–leg blood pressure gradient with weak femoral pulses', correct: true, feedback: 'A gradient in a shocked neonate points to a ductal-dependent left-sided lesion (critical coarctation or interrupted arch).' },
          { text: 'Lactate 8.5', correct: false, feedback: 'Confirms shock but not its cause.' },
          { text: 'Passed CCHD screen', correct: false, feedback: 'Screening frequently misses coarctation.' },
        ],
        teaching: 'Always palpate femoral pulses and compare arm and leg BP in a sick neonate.',
      },
      {
        narrative: 'You have given 10 mL/kg saline, drawn cultures, and started ampicillin and gentamicin.',
        question: 'What is the most important next drug?',
        options: [
          { text: 'Indomethacin', correct: false, feedback: 'Indomethacin closes the duct — the opposite of what this baby needs.' },
          { text: 'Prostaglandin E₁ (alprostadil) infusion', correct: true, feedback: 'Reopening the duct restores systemic perfusion distal to the obstruction.' },
          { text: 'Adenosine', correct: false, feedback: 'This is sinus tachycardia from shock, not SVT.' },
          { text: 'Furosemide', correct: false, feedback: 'Does not address ductal closure; may worsen hypotension.' },
        ],
        teaching: 'Start PGE₁ on suspicion — do not wait for an echo.',
      },
      {
        narrative: 'Twenty minutes into the PGE₁ infusion his perfusion improves, but he has a 25-second pause in breathing with desaturation.',
        question: 'Best response?',
        options: [
          { text: 'Stop PGE₁', correct: false, feedback: 'Stopping risks re-closure of the duct and recurrent shock.' },
          { text: 'Support ventilation (bag-mask, then intubate if recurrent) and continue PGE₁', correct: true, feedback: 'Apnea is a known PGE₁ effect; secure the airway and keep the duct open.' },
          { text: 'Give naloxone', correct: false, feedback: 'No opioid was given.' },
          { text: 'Increase PGE₁ dose', correct: false, feedback: 'Higher doses increase apnea risk; use the lowest effective dose.' },
        ],
        teaching: 'Anticipate apnea when starting PGE₁ — especially for transport.',
      },
    ],
  },
  {
    id: 'case-bronch-3m',
    title: 'Wheezy at 3 months',
    module: 'bronchiolitis',
    setting: 'Pediatric ED in January',
    stages: [
      {
        narrative: 'A 3-month-old born at term has 3 days of congestion and now cough and fast breathing. Exam: subcostal and intercostal retractions, diffuse crackles and wheeze. She is taking half her usual feeds.',
        data: [
          { label: 'RR', value: '62' },
          { label: 'SpO₂', value: '88–89% room air, sustained' },
          { label: 'T', value: '38.0 °C' },
        ],
        question: 'Which test or treatment is indicated?',
        options: [
          { text: 'Chest X-ray and CBC', correct: false, feedback: 'Not routine; likely to show atelectasis that gets treated as pneumonia.' },
          { text: 'Albuterol trial', correct: false, feedback: 'Strong AAP recommendation against.' },
          { text: 'Supplemental oxygen, NG or IV hydration, and admission', correct: true, feedback: 'Sustained SpO₂ <90%, moderate work of breathing, and intake ~50% meet admission criteria.' },
          { text: 'Oral dexamethasone', correct: false, feedback: 'No benefit in bronchiolitis.' },
        ],
        teaching: 'Bronchiolitis is a clinical diagnosis. Supportive care is the treatment.',
      },
      {
        narrative: 'Overnight on 2 L/min nasal cannula she has increasing retractions, RR 75, SpO₂ 89%, and is more tired.',
        question: 'Next step?',
        options: [
          { text: 'Start nebulized hypertonic saline every 4 hours', correct: false, feedback: 'Does not treat acute respiratory failure.' },
          { text: 'High-flow nasal cannula and PICU review', correct: true, feedback: 'HFNC is an effective rescue for infants failing standard oxygen (Franklin, NEJM 2018).' },
          { text: 'IV antibiotics', correct: false, feedback: 'No evidence of bacterial infection.' },
          { text: 'Chest physiotherapy', correct: false, feedback: 'No benefit, adds distress.' },
        ],
        teaching: 'Escalate support for failure; do not add ineffective drugs.',
      },
      {
        narrative: 'She recovers and is ready for discharge on day 5. Her mother is 33 weeks pregnant and due in February.',
        question: 'Best RSV prevention advice for the new baby?',
        options: [
          { text: 'Nothing available until the baby is 6 months', correct: false, feedback: 'Prevention starts at birth.' },
          { text: 'Maternal RSV vaccine now (32–36 weeks) or nirsevimab/clesrovimab for the newborn', correct: true, feedback: 'Either strategy protects the infant through the first season.' },
          { text: 'Palivizumab monthly', correct: false, feedback: 'Discontinued at the end of 2025.' },
          { text: 'RSV vaccine for the 3-month-old sibling', correct: false, feedback: 'No RSV vaccine is approved for infants; she has had natural infection this season.' },
        ],
        teaching: 'Every infant should be covered by maternal vaccination or a long-acting antibody.',
      },
    ],
  },
  {
    id: 'case-croup-night',
    title: 'Barking at 2 a.m.',
    module: 'croup',
    setting: 'Emergency department',
    stages: [
      {
        narrative: 'A 2-year-old woke with a barky cough and noisy breathing after a day of runny nose. On her mother’s lap she has stridor at rest, moderate retractions, slightly decreased air entry, normal color, and is alert.',
        question: 'What is her Westley score and the right treatment?',
        options: [
          { text: 'Westley 2, mild: discharge without medication', correct: false, feedback: 'Stridor at rest (2) + moderate retractions (2) + decreased air entry (1) = 5. And even mild croup gets dexamethasone.' },
          { text: 'Westley 5, moderate: oral dexamethasone and nebulized epinephrine', correct: true, feedback: 'Stridor at rest warrants epinephrine; all severities get dexamethasone.' },
          { text: 'Westley 5: albuterol and antibiotics', correct: false, feedback: 'Neither treats subglottic edema.' },
          { text: 'Westley 12: intubate now', correct: false, feedback: 'She is alert and pink — not impending failure.' },
        ],
        teaching: 'Score the calm child; treat edema with steroid; treat stridor at rest with epinephrine.',
      },
      {
        narrative: 'Ninety minutes after epinephrine she is asleep, with no stridor at rest and mild retractions.',
        question: 'Disposition?',
        options: [
          { text: 'Discharge now', correct: false, feedback: 'Epinephrine lasts ~2 h; observe 2–4 h after the dose.' },
          { text: 'Observe until 2–4 h after epinephrine; discharge if still no stridor at rest', correct: true, feedback: 'Dexamethasone is already acting; a short observation confirms she will stay settled.' },
          { text: 'Admit overnight — epinephrine always requires admission', correct: false, feedback: 'Most children who respond can go home after observation.' },
          { text: 'Give a second epinephrine dose prophylactically', correct: false, feedback: 'Only for recurrent stridor at rest.' },
        ],
        teaching: 'The "rebound" is a return to baseline — observe, don’t over-admit.',
      },
      {
        narrative: 'She returns 3 days later: T 39.8 °C, toxic, thick secretions, worsening stridor despite two epinephrine nebulizers.',
        question: 'Most likely diagnosis?',
        options: [
          { text: 'Worsening viral croup', correct: false, feedback: 'Viral croup does not cause toxicity and usually responds to epinephrine.' },
          { text: 'Bacterial tracheitis', correct: true, feedback: 'Secondary bacterial infection (often S. aureus): airway expertise, cultures, IV vancomycin + ceftriaxone.' },
          { text: 'Foreign body', correct: false, feedback: 'Fever and toxicity point to infection.' },
          { text: 'Asthma exacerbation', correct: false, feedback: 'Stridor is upper-airway, not wheeze.' },
        ],
        teaching: 'Croup + sudden toxicity + poor epinephrine response = bacterial tracheitis.',
      },
    ],
  },
  {
    id: 'case-drooling-3y',
    title: 'Drooling and silent',
    module: 'croup',
    setting: 'Urgent care',
    stages: [
      {
        narrative: 'A 3-year-old whose family declined vaccines has had fever for 5 hours. He sits forward, chin up, drooling, and will not speak. No cough.',
        question: 'First action?',
        options: [
          { text: 'Examine the throat with a tongue depressor', correct: false, feedback: 'Can trigger complete obstruction.' },
          { text: 'Lateral neck film to confirm', correct: false, feedback: 'Delays definitive care and moves the child away from airway support.' },
          { text: 'Keep him calm with a parent, give blow-by oxygen if tolerated, call anesthesia/ENT for an OR airway', correct: true, feedback: 'Airway first, in the most controlled setting.' },
          { text: 'Place an IV and draw cultures', correct: false, feedback: 'Painful procedures can precipitate obstruction; wait until the airway is secured.' },
        ],
        teaching: 'Suspected epiglottitis: minimize agitation; the airway team decides everything else.',
      },
      {
        narrative: 'He is intubated in the OR; a cherry-red, swollen epiglottis is seen. Cultures grow H. influenzae type b. His 2-year-old sister at home is also unvaccinated.',
        question: 'What does the household need?',
        options: [
          { text: 'Nothing', correct: false, feedback: 'Hib spreads to young unimmunized contacts.' },
          { text: 'Rifampin prophylaxis for all household contacts, and catch-up Hib vaccination for the sister', correct: true, feedback: 'With an under-immunized child <4 years in the home, all household contacts receive rifampin.' },
          { text: 'Amoxicillin for the sister only', correct: false, feedback: 'Amoxicillin does not eradicate nasopharyngeal carriage; rifampin is used.' },
          { text: 'Hib vaccine only, no prophylaxis', correct: false, feedback: 'Vaccination alone does not protect immediately.' },
        ],
        teaching: 'Hib disease is a vaccine failure story: treat, prophylax contacts, and vaccinate.',
      },
    ],
  },
  {
    id: 'case-aom-15m',
    title: 'Ear-tugging at 15 months',
    module: 'ent',
    setting: 'Primary care',
    stages: [
      {
        narrative: 'A 15-month-old has 1 day of fever 38.5 °C and is tugging both ears. Both TMs are opaque, yellow, and moderately bulging with reduced mobility.',
        question: 'Management?',
        options: [
          { text: 'Observe for 48–72 h', correct: false, feedback: 'Bilateral AOM at 6–23 months is treated, even when non-severe.' },
          { text: 'Amoxicillin 80–90 mg/kg/day ÷ 2 for 10 days, plus analgesia', correct: true, feedback: 'High-dose amoxicillin; 10 days under age 2.' },
          { text: 'Amoxicillin for 5 days', correct: false, feedback: 'Inferior to 10 days in children 6–23 months.' },
          { text: 'Azithromycin', correct: false, feedback: 'Poor activity against pneumococcus and NTHi.' },
        ],
        teaching: 'Bulging makes the diagnosis; age and laterality drive the decision.',
      },
      {
        narrative: 'At 72 hours he still has fever 39.2 °C and both TMs remain bulging.',
        question: 'Next antibiotic?',
        options: [
          { text: 'Continue amoxicillin', correct: false, feedback: 'Treatment failure at 48–72 h requires a change.' },
          { text: 'High-dose amoxicillin-clavulanate', correct: true, feedback: 'Covers β-lactamase–producing NTHi and Moraxella.' },
          { text: 'Tympanostomy tubes now', correct: false, feedback: 'Not for acute treatment failure.' },
          { text: 'Trimethoprim-sulfamethoxazole', correct: false, feedback: 'High pneumococcal resistance.' },
        ],
        teaching: 'Failure ladder: amoxicillin → amoxicillin-clavulanate → ceftriaxone ×3 → tympanocentesis.',
      },
      {
        narrative: 'He has three more episodes over the next 5 months. At today’s visit both TMs are normal and mobile; there is no effusion.',
        question: 'Refer for tympanostomy tubes?',
        options: [
          { text: 'Yes — ≥3 episodes in 6 months', correct: false, feedback: 'The 2022 guideline requires middle-ear effusion at the time of assessment.' },
          { text: 'No — tubes for recurrent AOM only when effusion is present; re-examine during the next episode', correct: true, feedback: 'Without effusion, tubes have little benefit for recurrent AOM.' },
          { text: 'Start daily prophylactic amoxicillin', correct: false, feedback: 'Not recommended — promotes resistance.' },
          { text: 'Adenoidectomy alone', correct: false, feedback: 'Not indicated here.' },
        ],
        teaching: 'Check effusion status before referring for tubes.',
      },
    ],
  },
  {
    id: 'case-throat-9y',
    title: 'A 9-year-old with a sore throat',
    module: 'ent',
    setting: 'Primary care',
    stages: [
      {
        narrative: 'A 9-year-old has sudden sore throat, fever 38.8 °C, headache, tender anterior nodes, and tonsillar exudate. No cough or rhinorrhea.',
        question: 'Next step?',
        options: [
          { text: 'Treat empirically — McIsaac 5', correct: false, feedback: 'Children are tested before treatment, even at high scores.' },
          { text: 'Rapid antigen test (or NAAT)', correct: true, feedback: 'High probability → test.' },
          { text: 'Monospot only', correct: false, feedback: 'Mono is possible, but GAS testing comes first with this picture.' },
          { text: 'No testing — viral', correct: false, feedback: 'No viral features; score is high.' },
        ],
        teaching: 'Test when the score is ≥2 and viral features are absent.',
      },
      {
        narrative: 'The rapid antigen test is negative.',
        question: 'Now?',
        options: [
          { text: 'Reassure, no further testing', correct: false, feedback: 'RADT sensitivity is ~85%; children need a back-up culture.' },
          { text: 'Throat culture; treat if positive', correct: true, feedback: 'Back-up culture for children and adolescents with a negative RADT.' },
          { text: 'Start amoxicillin anyway', correct: false, feedback: 'Wait for the culture — treatment within 9 days still prevents ARF.' },
          { text: 'Repeat the rapid test', correct: false, feedback: 'Same sensitivity limits.' },
        ],
        teaching: 'Negative RADT + child = culture. A negative NAAT does not need back-up.',
      },
      {
        narrative: 'The culture grows GAS on day 2. He weighs 30 kg. His asymptomatic 6-year-old brother asks to be tested.',
        question: 'Best plan?',
        options: [
          { text: 'Amoxicillin 1000 mg once daily × 10 days; do not test the asymptomatic brother', correct: true, feedback: 'Standard regimen; asymptomatic contacts are not tested or treated.' },
          { text: 'Amoxicillin × 5 days; test and treat the brother', correct: false, feedback: 'Course is 10 days; testing asymptomatic contacts detects carriers.' },
          { text: 'Benzathine penicillin 600 000 U IM', correct: false, feedback: 'The ≥27 kg dose is 1.2 million U.' },
          { text: 'Azithromycin × 5 days', correct: false, feedback: 'Reserve for anaphylactic penicillin allergy; macrolide resistance is rising.' },
        ],
        teaching: 'Treat the patient, not the carrier. No test of cure.',
      },
    ],
  },
  {
    id: 'case-ftt-9m',
    title: 'Falling off the curve',
    module: 'ftt',
    setting: 'Well-child visit',
    stages: [
      {
        narrative: 'A 9-month-old has dropped from the 50th to the 5th percentile for weight since 4 months. Length fell from the 50th to the 30th; head circumference stays at the 50th. Development is normal and the exam is otherwise unremarkable.',
        question: 'What does the pattern suggest, and what is the highest-yield next step?',
        options: [
          { text: 'Endocrine cause — order TSH and IGF-1', correct: false, feedback: 'Endocrine causes reduce length first with weight preserved.' },
          { text: 'Inadequate energy — detailed feeding history and observe a feed', correct: true, feedback: 'Weight first, length later, head spared = energy deficit; history is the key test.' },
          { text: 'CNS cause — MRI brain', correct: false, feedback: 'Head growth is normal.' },
          { text: 'Broad lab panel before history', correct: false, feedback: 'Labs rarely reveal a cause without clues.' },
        ],
        teaching: 'Which line falls first tells you the mechanism.',
      },
      {
        narrative: 'The parent mixes 1 scoop of formula powder with 4 oz of water "to make the can last until payday". Household food runs out most months.',
        question: 'Best response?',
        options: [
          { text: 'Correct the recipe (1 scoop per 2 oz), connect to WIC/SNAP and social work, recheck weight in 1 week', correct: true, feedback: 'Over-dilution halves calories and risks hyponatremia; food insecurity is the root cause.' },
          { text: 'Report to child protective services immediately', correct: false, feedback: 'Poverty is not neglect; address resources first unless there are safety concerns.' },
          { text: 'Switch to a 30 kcal/oz formula without changing the recipe', correct: false, feedback: 'Fix the preparation error and the access problem.' },
          { text: 'Admit for tube feeding', correct: false, feedback: 'Not severe; outpatient care with close follow-up is appropriate.' },
        ],
        teaching: 'Screen for food insecurity in every growth-faltering visit (Hunger Vital Sign).',
      },
      {
        narrative: 'Two weeks later he has gained 45 g/day.',
        question: 'Interpretation?',
        options: [
          { text: 'Too fast — cut back', correct: false, feedback: 'Catch-up growth exceeds normal velocity by design.' },
          { text: 'Appropriate catch-up growth (above the 10–13 g/day norm); continue and monitor', correct: true, feedback: 'Rapid gain once energy is restored confirms the diagnosis.' },
          { text: 'Suggests edema', correct: false, feedback: 'Plausible only with clinical edema; this is expected catch-up.' },
          { text: 'Start a metabolic work-up', correct: false, feedback: 'Response to feeding argues strongly against an organic cause.' },
        ],
        teaching: 'Response to adequate nutrition is both treatment and diagnosis.',
      },
    ],
  },
  {
    id: 'case-asthma-7y',
    title: 'Nights of coughing',
    module: 'asthma',
    setting: 'Primary care → ED',
    stages: [
      {
        narrative: 'A 7-year-old uses albuterol daily, wakes twice a week coughing, and stops playing soccer early. FEV₁ 72% predicted with 15% improvement after bronchodilator. No controller.',
        question: 'Classification and preferred therapy (NAEPP 2020)?',
        options: [
          { text: 'Mild persistent — low-dose ICS', correct: false, feedback: 'Daily symptoms and FEV₁ 60–80% are moderate.' },
          { text: 'Moderate persistent — low-dose ICS-formoterol as daily controller and reliever (SMART)', correct: true, feedback: 'Step 3 for ages ≥4: SMART preferred.' },
          { text: 'Intermittent — albuterol as needed', correct: false, feedback: 'Daily SABA is far from intermittent.' },
          { text: 'Severe — oral steroids daily', correct: false, feedback: 'Not severe; daily OCS is Step 6.' },
        ],
        teaching: 'The worst feature sets severity; severity sets the starting step.',
      },
      {
        narrative: 'Six weeks later he arrives in the ED after a cold: suprasternal and scalene retractions, widespread decreased air entry, inspiratory and expiratory wheeze, SpO₂ 93%.',
        question: 'PRAM score and initial treatment?',
        options: [
          { text: 'PRAM 4: albuterol once, discharge', correct: false, feedback: '2 + 2 + 2 + 2 + 1 = 9.' },
          { text: 'PRAM 9 (severe): albuterol + ipratropium back-to-back, systemic steroid now, oxygen', correct: true, feedback: 'Severe exacerbation; steroids within the first hour.' },
          { text: 'PRAM 9: chest X-ray and antibiotics first', correct: false, feedback: 'No routine CXR or antibiotics.' },
          { text: 'PRAM 9: start montelukast', correct: false, feedback: 'No role in acute exacerbations.' },
        ],
        teaching: 'Score, treat in the first hour, rescore.',
      },
      {
        narrative: 'After three rounds and dexamethasone, PRAM is 8 and he is tiring. Venous PCO₂ is 46 mmHg.',
        question: 'Next?',
        options: [
          { text: 'IV magnesium sulfate and PICU consult', correct: true, feedback: 'Poor response + normal/rising CO₂ (fatigue) = escalate.' },
          { text: 'Discharge with prednisolone', correct: false, feedback: 'He is deteriorating.' },
          { text: 'Sedate to reduce anxiety', correct: false, feedback: 'Sedation can precipitate respiratory arrest.' },
          { text: 'Nebulized budesonide', correct: false, feedback: 'Not an acute rescue.' },
        ],
        teaching: 'A "normal" CO₂ in a tachypneic asthmatic is a warning sign.',
      },
    ],
  },
  {
    id: 'case-ge-14m',
    title: 'Vomiting and diarrhea',
    module: 'fluids',
    setting: 'Emergency department',
    stages: [
      {
        narrative: 'A 14-month-old (10 kg) has 2 days of vomiting and watery diarrhea. He is restless and thirsty, eyes slightly sunken, tongue sticky, tears decreased. Capillary refill 2 s, HR 140.',
        question: 'Clinical Dehydration Scale score and plan?',
        options: [
          { text: 'CDS 4 (some dehydration): ondansetron, then ORS ~50 mL/kg over 4 h', correct: true, feedback: 'Appearance 1 + eyes 1 + mucosa 1 + tears 1 = 4.' },
          { text: 'CDS 8: IV bolus', correct: false, feedback: 'Recount — each item is 1, not 2.' },
          { text: 'CDS 0: home with juice', correct: false, feedback: 'He has signs of dehydration.' },
          { text: 'CDS 4: IV maintenance fluids', correct: false, feedback: 'ORT is first-line for some dehydration.' },
        ],
        teaching: 'Use a validated score; ORT first.',
      },
      {
        narrative: 'After ondansetron he drinks only 60 mL in an hour and vomits once more. Perfusion is unchanged.',
        question: 'Next step?',
        options: [
          { text: 'Nasogastric rehydration with ORS', correct: true, feedback: 'As effective as IV with fewer complications.' },
          { text: 'Repeat ondansetron every 30 min', correct: false, feedback: 'Repeated doses add QT and diarrhea risk without clear benefit.' },
          { text: 'Loperamide', correct: false, feedback: 'Contraindicated under 3 years.' },
          { text: 'Hold all fluids for 4 hours', correct: false, feedback: 'Worsens dehydration.' },
        ],
        teaching: 'Oral fails → NG before IV.',
      },
      {
        narrative: 'He later needs IV fluids. Labs: Na 136, K 3.2, Cl 112, HCO₃ 15, glucose 62 mg/dL.',
        question: 'Best maintenance fluid?',
        options: [
          { text: 'D5 0.2% NaCl', correct: false, feedback: 'Hypotonic fluids cause hospital-acquired hyponatremia.' },
          { text: 'D5 0.9% NaCl + 20 mEq/L KCl: 40 mL/h maintenance plus deficit replacement, once urine output is confirmed', correct: true, feedback: 'Isotonic with dextrose and potassium; 4 mL/kg/h × 10 kg = 40 mL/h, with the deficit added on top.' },
          { text: '0.9% NaCl without dextrose at 100 mL/h', correct: false, feedback: 'He is hypoglycemic/ketotic and needs dextrose; rate is too high.' },
          { text: 'Sodium bicarbonate infusion', correct: false, feedback: 'The non-gap acidosis corrects with rehydration.' },
        ],
        teaching: 'Diarrhea gives a normal-gap acidosis and hypokalemia; isotonic fluid with dextrose and K fixes both safely.',
      },
    ],
  },
  {
    id: 'case-dev-18m',
    title: 'Quiet at 18 months',
    module: 'development',
    setting: 'Well-child visit',
    stages: [
      {
        narrative: 'An 18-month-old says no words, does not point to show things, and rarely responds to his name. He lines up cars for long periods. Newborn hearing screen was normal. M-CHAT-R score: 9.',
        question: 'Next step?',
        options: [
          { text: 'M-CHAT Follow-Up interview, then decide', correct: false, feedback: 'Scores ≥8 skip the interview.' },
          { text: 'Refer immediately for diagnostic evaluation and Early Intervention; formal audiology', correct: true, feedback: 'High-likelihood screen + red flags. Services start without waiting for diagnosis.' },
          { text: 'Rescreen at 24 months', correct: false, feedback: 'Delays intervention during a critical window.' },
          { text: 'Speech therapy only', correct: false, feedback: 'He needs a comprehensive evaluation, not a single service.' },
        ],
        teaching: 'Refer in parallel: diagnosis, EI, and hearing.',
      },
      {
        narrative: 'His parents ask whether his MMR vaccine caused this and whether they should delay vaccines for his baby sister.',
        question: 'Best evidence-based answer?',
        options: [
          { text: 'Delay vaccines to be safe', correct: false, feedback: 'Delay leaves the sister unprotected and has no autism benefit.' },
          { text: 'Large cohort studies (e.g. 657 000 Danish children) show no link between MMR and autism, including in siblings; vaccinate on schedule', correct: true, feedback: 'Address the concern directly with evidence and empathy.' },
          { text: 'The question is unresolved', correct: false, feedback: 'The evidence is consistent and robust.' },
          { text: 'Spread vaccines out over more visits', correct: false, feedback: 'Alternative schedules add risk without benefit.' },
        ],
        teaching: 'Autism signs often become visible around the MMR age — timing, not causation.',
      },
      {
        narrative: 'He is diagnosed with autism spectrum disorder at 22 months. Exam shows no dysmorphic features and normal head size.',
        question: 'Recommended genetic evaluation?',
        options: [
          { text: 'None — autism is behavioral', correct: false, feedback: 'Genetic testing is recommended for all children with ASD.' },
          { text: 'Exome/genome sequencing or chromosomal microarray, plus Fragile X (FMR1) testing', correct: true, feedback: 'ACMG 2021 favors ES/GS first- or second-tier; FMR1 repeats need a separate test.' },
          { text: 'Karyotype only', correct: false, feedback: 'Low yield compared with microarray/exome.' },
          { text: 'Brain MRI and EEG for all', correct: false, feedback: 'Only with specific neurologic indications.' },
        ],
        teaching: 'A genetic diagnosis informs recurrence risk, surveillance, and family planning.',
      },
    ],
  },
];
