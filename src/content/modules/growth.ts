import { TrendingDown } from 'lucide-react';
import type { Module } from '../types';
import { pm } from '../links';

export const growth: Module = {
  slug: 'ftt',
  title: 'Growth Faltering (Failure to Thrive)',
  short: 'Growth faltering',
  tagline: 'Measure right, plot right, read the pattern — then feed',
  icon: TrendingDown,
  color: 'amber',
  minutes: 25,
  objectives: [
    'Define growth faltering and malnutrition with current criteria',
    'Use the correct chart and measurement technique',
    'Infer mechanism from which parameter falls first',
    'Run a high-yield evaluation without shotgun labs',
    'Prescribe catch-up nutrition and avoid refeeding syndrome',
  ],
  bottomLine: [
    'Use **WHO charts 0–2 years** and CDC charts from 2 years; correct for prematurity until 24 months.',
    'Concern: weight (or weight-for-length) **< 2nd percentile**, crossing **≥2 major percentile lines** downward, or velocity below expected — confirm with accurate repeat measurements.',
    '**Weight falls first → inadequate energy** (most common). **Length falls first with preserved weight → endocrine.** **Head falls → CNS/genetic.**',
    'Most growth faltering is **inadequate intake**, often multifactorial — "organic vs non-organic" is an outdated split.',
    'Labs find a cause in **<2%** when history and exam give no clue. A detailed feeding history and observed feed are the key tests.',
    'Catch-up needs **~1.5×** normal energy; in severe malnutrition start low and check **phosphate, potassium, magnesium** (refeeding).',
  ],
  sections: [
    {
      id: 'define',
      title: 'Definitions and measurement',
      refs: ['cdc-charts', 'nice', 'aspen'],
      blocks: [
        {
          type: 'list',
          items: [
            'No single definition. Commonly used: weight-for-age or weight-for-length **<2nd percentile** (z < −2 on WHO charts); weight crossing **≥2 major percentile lines**; weight velocity below expected for age.',
            '**NICE 2017 thresholds:** a fall across ≥1 centile space if birth weight <9th centile, ≥2 spaces if 9th–91st, ≥3 spaces if >91st; or current weight <2nd centile.',
            '**Newborns:** weight loss >10% of birth weight or not back to birth weight by 2–3 weeks → feeding assessment.',
            '**Malnutrition (ASPEN/AND):** weight-for-length or BMI z-score −1 to −1.9 mild, −2 to −2.9 moderate, ≤ −3 severe; mid-upper-arm circumference z-score works when weight is confounded (edema, ascites).',
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Normal infants shift percentiles',
          md: 'Many healthy infants move toward their genetic channel during the first 6–24 months — large babies of smaller parents drift down. A shift with **normal velocity afterwards, proportional length, and a well child** is channeling, not faltering.',
        },
        {
          type: 'list',
          title: 'Measure like it matters',
          items: [
            'Naked weight on the same calibrated scale; recumbent length on a length board (two people) until 2 years.',
            'Plot weight, length, **weight-for-length** (BMI from 2 y), and head circumference every visit.',
            'Use condition-specific charts where validated (e.g. Down syndrome).',
          ],
        },
      ],
    },
    {
      id: 'patterns',
      title: 'Read the pattern',
      refs: ['homan'],
      blocks: [
        {
          type: 'table',
          head: ['Pattern', 'Suggests', 'Examples'],
          rows: [
            ['**Weight ↓ first**, then length; head spared', 'Inadequate energy: intake, absorption, or increased needs', 'Feeding problems, formula errors, food insecurity, celiac, CF, CHD'],
            ['**Length ↓ first**, weight relatively preserved (short, plump)', 'Endocrine', 'Hypothyroidism, GH deficiency, glucocorticoid excess'],
            ['Weight and length shift down together in first 2 y, then parallel with normal velocity', 'Genetic channeling', 'Familial short stature, constitutional delay'],
            ['**Head ↓** (often all three low)', 'CNS / genetic / prenatal', 'Congenital CMV or Zika, fetal alcohol, chromosomal syndromes'],
          ],
        },
        { type: 'tool', id: 'growth-explorer' },
      ],
    },
    {
      id: 'normal',
      title: 'Normal growth benchmarks',
      refs: ['aap-nutrition'],
      blocks: [
        {
          type: 'table',
          head: ['Measure', 'Benchmark'],
          rows: [
            ['Weight', 'Regain birth weight by 10–14 days; ~**doubles by 4–5 months**, **triples by 12 months**'],
            ['Daily gain', '0–3 mo 25–35 g/day · 3–6 mo 15–21 g/day · 6–12 mo 10–13 g/day · 1–3 y ~5–8 g/day'],
            ['Length', '+25 cm (≈50%) in year 1; doubles birth length by ~4 years'],
            ['Head circumference', '~2 cm/month (0–3 mo), 1 cm/month (3–6 mo), 0.5 cm/month (6–12 mo); +12 cm in year 1'],
            ['Energy', '~100–120 kcal/kg/day in early infancy, declining with age'],
          ],
        },
        { type: 'tool', id: 'weight-velocity' },
      ],
    },
    {
      id: 'causes',
      title: 'Causes by mechanism',
      blocks: [
        {
          type: 'cards',
          cards: [
            { title: 'Inadequate intake (most common)', items: ['Breastfeeding difficulty, incorrect formula preparation', 'Oral-motor dysfunction, cleft, neurologic impairment', 'Pediatric feeding disorder / ARFID', 'Excess juice or milk displacing food', 'Food insecurity, caregiver depression, neglect'] },
            { title: 'Losses / malabsorption', items: ['Vomiting: GERD, pyloric stenosis, raised ICP', 'Celiac disease, cystic fibrosis, cow’s-milk protein allergy', 'Short bowel, pancreatic insufficiency, IBD'] },
            { title: 'Increased needs or poor use', items: ['CHD with heart failure, chronic lung disease', 'Hyperthyroidism, chronic infection (HIV, TB), malignancy', 'Chronic kidney disease, renal tubular acidosis', 'Inborn errors of metabolism, genetic syndromes'] },
          ],
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Evaluation that finds the cause',
      refs: ['homan', 'hager'],
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Feeding history', md: 'Who feeds, how often, how much, how long. Breastfeeding latch and transfer. **Formula preparation: standard powder is 1 level unpacked scoop per 2 fl oz of water (20 kcal/oz).** Juice, milk, and grazing in toddlers. 3-day food record.' },
            { title: 'Watch a feed', md: 'Latch, suck–swallow coordination, fatigue, sweating (cardiac), choking/coughing (aspiration), caregiver–child interaction.' },
            { title: 'Social screen', md: 'Food insecurity (Hunger Vital Sign: 2 questions), caregiver depression, housing, safety. Connect to WIC/SNAP.' },
            { title: 'Exam', md: 'Accurate measurements; dysmorphism; cardiac, respiratory, abdominal exam; skin and hair; signs of neglect or abuse; development; mid-parental height.' },
            { title: 'Targeted labs only', md: 'Without clinical clues, labs rarely reveal a cause. If faltering persists despite adequate intake: CBC, metabolic panel with albumin, urinalysis (RTA, UTI), celiac serology (tTG-IgA + total IgA once gluten is in the diet), TSH; lead or HIV by risk; sweat test for CF features (newborn screen can miss CF).' },
          ],
        },
      ],
    },
    {
      id: 'management',
      title: 'Management and catch-up nutrition',
      refs: ['aap-nutrition', 'nice'],
      blocks: [
        {
          type: 'list',
          items: [
            'Most children are managed **as outpatients** with a dietitian, frequent weight checks, and treatment of contributors.',
            'Increase energy density: fortify breast milk, concentrate formula to 22–27 kcal/oz **using a written recipe**, add fats to foods.',
            'Toddlers: 3 meals + 2–3 planned snacks; limit cow’s milk to **16–24 oz/day** and juice to ≤4 oz/day; no grazing; responsive feeding without pressure.',
            'Feeding therapy for oral-motor or behavioral feeding disorders.',
            '**Admit** for severe malnutrition, dehydration or electrolyte disturbance, refeeding risk, failure of outpatient care, or safety concerns.',
          ],
        },
        { type: 'tool', id: 'catch-up' },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Refeeding syndrome',
          md: 'In moderate–severe malnutrition, restarting nutrition drives phosphate, potassium, and magnesium into cells: **hypophosphatemia** → weakness, arrhythmia, heart failure, respiratory failure. Start ~50–75% of goal energy, advance over 3–5 days, monitor electrolytes daily for the first 72 h, give thiamine if at risk.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Formula preparation errors are dangerous both ways',
          items: [
            '**Over-diluted** (too much water): poor weight gain, hyponatremia, seizures (water intoxication).',
            '**Under-diluted** (too little water): hypernatremic dehydration, renal solute overload.',
          ],
        },
      ],
    },
    {
      id: 'short-stature',
      title: 'Short stature in one table',
      blocks: [
        {
          type: 'table',
          head: ['', 'Familial short stature', 'Constitutional delay', 'Pathologic (endocrine, chronic disease)'],
          rows: [
            ['Growth velocity', 'Normal', 'Normal (slows in infancy, then parallel)', '**Reduced**'],
            ['Bone age', 'Normal (= chronological)', '**Delayed**', 'Delayed (endocrine) or variable'],
            ['Family history', 'Short parents', 'Late puberty in a parent', 'Variable'],
            ['Puberty', 'On time', 'Late', 'Variable'],
            ['Adult height', 'Short, within genetic target', 'Normal', 'Reduced without treatment'],
          ],
          note: 'Mid-parental height: boys = (father + mother + 13 cm) / 2; girls = (father + mother − 13 cm) / 2; target range ± 8.5 cm.',
        },
      ],
    },
  ],
  pitfalls: [
    { myth: 'Order a broad lab panel for every child with poor weight gain.', fact: 'Without clinical clues, labs identify a cause in <2%. A detailed feeding history and an observed feed are higher yield.' },
    { myth: 'Classify as organic or non-organic.', fact: 'Most cases are multifactorial: a medical problem often coexists with feeding or social challenges.' },
    { myth: 'Crossing two percentile lines always means pathology.', fact: 'Genetic channeling in the first 2 years is normal when velocity then normalizes and the child is well.' },
    { myth: 'Use CDC charts for infants.', fact: 'CDC recommends WHO growth standards from 0–2 years (breastfed infants as the norm).' },
    { myth: 'Feed aggressively from day 1 in severe malnutrition.', fact: 'This risks refeeding syndrome; start low, advance slowly, monitor phosphate.' },
    { myth: 'More milk helps a thin toddler.', fact: 'Excess milk (>24 oz/day) suppresses appetite for solids and causes iron deficiency.' },
  ],
  updates: [
    { year: '2017', md: '**NICE NG75 "Faltering growth"** introduced birth-centile-based thresholds and replaced the term failure to thrive in UK practice.' },
    { year: '2015', md: '**ASPEN/AND pediatric malnutrition indicators**: z-score–based severity grading, including MUAC and velocity.' },
  ],
  questions: [
    {
      id: 'ftt-1',
      stem: 'A 9-month-old’s weight fell from the 50th to the 5th percentile; length from 50th to 30th; head circumference stayed at the 50th. Most likely mechanism?',
      options: ['Growth hormone deficiency', 'Inadequate energy intake or absorption', 'Congenital CMV infection', 'Familial short stature'],
      answer: 1,
      explanation: 'Weight falling first and most, with length following and head spared, is the energy-deficit pattern.',
      ref: 'homan',
    },
    {
      id: 'ftt-2',
      stem: 'A 2-year-old’s length fell from the 50th to the 3rd percentile while weight stayed near the 40th, making weight-for-length high. First test?',
      options: ['Sweat chloride', 'TSH and free T4', 'Stool elastase', 'Chromosomal microarray'],
      answer: 1,
      explanation: 'Length falling first with preserved weight is the endocrine pattern; hypothyroidism is common and easy to test. GH axis and bone age follow.',
      ref: 'homan',
    },
    {
      id: 'ftt-3',
      stem: 'A formula-fed 3-month-old is gaining 10 g/day. The parent mixes 1 scoop of powder with 4 fl oz of water to "make it last". What is the error and its risk?',
      options: ['Correct preparation', 'Over-dilution — poor gain and hyponatremia', 'Over-concentration — hypernatremia', 'Iron deficiency only'],
      answer: 1,
      explanation: 'Standard powder is 1 scoop per 2 fl oz. 1 scoop per 4 oz gives ~10 kcal/oz — half the calories — and free water excess can cause hyponatremic seizures. Ask about cost and food insecurity.',
      ref: 'aap-nutrition',
    },
    {
      id: 'ftt-4',
      stem: 'Which growth chart should be used for a 15-month-old in the United States?',
      options: ['CDC 2000 charts', 'WHO Child Growth Standards', 'Fenton preterm chart', 'Either, interchangeably'],
      answer: 1,
      explanation: 'CDC recommends WHO standards for 0–2 years and CDC charts from 2 years. Fenton is for preterm infants until ~50 weeks PMA.',
      ref: 'cdc-charts',
    },
    {
      id: 'ftt-5',
      stem: 'A well-appearing 18-month-old with weight at the 3rd percentile has a normal exam and no red flags. The feeding history reveals 40 oz of milk daily. Best next step?',
      options: ['CBC, CMP, celiac screen, TSH, sweat test', 'Limit milk to 16–24 oz/day, structured meals and snacks, recheck weight', 'Upper endoscopy', 'Admit for observed feeding'],
      answer: 1,
      explanation: 'Excess milk displaces solid foods. Address intake first and follow weight; labs are low-yield without clues. Check for iron deficiency given the milk intake.',
      ref: 'aap-nutrition',
    },
    {
      id: 'ftt-6',
      stem: 'A severely malnourished 3-year-old is admitted. On day 2 of feeding she develops weakness and an arrhythmia. Most likely electrolyte abnormality?',
      options: ['Hypernatremia', 'Hypophosphatemia', 'Hypercalcemia', 'Hyperkalemia'],
      answer: 1,
      explanation: 'Refeeding syndrome: insulin-driven intracellular shift of phosphate (plus K and Mg).',
    },
    {
      id: 'ftt-7',
      stem: 'A 7-year-old is at the 3rd percentile for height with normal growth velocity, bone age 5 years, and a father who entered puberty late. Diagnosis?',
      options: ['Familial short stature', 'Constitutional delay of growth and puberty', 'Growth hormone deficiency', 'Hypothyroidism'],
      answer: 1,
      explanation: 'Normal velocity + delayed bone age + family history of late puberty = constitutional delay. Familial short stature has a normal bone age.',
    },
    {
      id: 'ftt-8',
      stem: 'Which is the most useful single step in the evaluation of a 6-month-old with growth faltering and an unremarkable exam?',
      options: ['Comprehensive metabolic panel', 'Detailed feeding history with observed feed', 'Abdominal ultrasound', 'Skeletal survey'],
      answer: 1,
      explanation: 'History and feeding observation identify the cause in most cases; routine labs rarely help without clues.',
      ref: 'homan',
    },
    {
      id: 'ftt-9',
      stem: 'A 5-day-old exclusively breastfed infant has lost 12% of birth weight. Next step?',
      options: ['Reassure — normal physiologic loss', 'Same-day feeding assessment, check for dehydration/hypernatremia and jaundice', 'Switch permanently to formula', 'Recheck at the 2-month visit'],
      answer: 1,
      explanation: 'Loss >10% exceeds the usual range and warrants prompt lactation and clinical assessment, including sodium and bilirubin if dehydrated or jaundiced.',
      ref: 'nice',
    },
    {
      id: 'ftt-10',
      stem: 'An infant weighs 6 kg; the median weight for their length is 7.5 kg; weight-age RDA is 108 kcal/kg/day. Catch-up energy goal?',
      options: ['~108 kcal/kg/day', '~135 kcal/kg/day', '~160 kcal/kg/day', '~90 kcal/kg/day'],
      answer: 1,
      explanation: '108 × 7.5 / 6 = 135 kcal/kg/day (≈810 kcal/day).',
      ref: 'aap-nutrition',
    },
  ],
  flashcards: [
    { id: 'ftt-c1', front: 'Growth charts by age (US)', back: 'WHO 0–2 years; CDC 2–20 years; correct for prematurity until 24 months.' },
    { id: 'ftt-c2', front: 'Weight falls first', back: 'Inadequate energy (intake, absorption, or needs).' },
    { id: 'ftt-c3', front: 'Length falls first, weight preserved', back: 'Endocrine: hypothyroidism, GH deficiency, cortisol excess.' },
    { id: 'ftt-c4', front: 'Standard formula mixing', back: '1 level unpacked scoop per 2 fl oz water = 20 kcal/oz.' },
    { id: 'ftt-c5', front: 'Refeeding syndrome hallmark', back: 'Hypophosphatemia (also ↓K, ↓Mg) within 72 h of refeeding.' },
    { id: 'ftt-c6', front: 'Catch-up kcal formula', back: 'RDA (kcal/kg) for weight-age × median weight-for-length ÷ actual weight.' },
    { id: 'ftt-c7', front: 'Weight doubles / triples by…', back: 'Doubles by 4–5 months; triples by 12 months.' },
    { id: 'ftt-c8', front: 'Toddler milk limit', back: '16–24 oz/day of cow’s milk; juice ≤4 oz/day.' },
    { id: 'ftt-c9', front: 'Constitutional delay vs familial short stature', back: 'CDGP: delayed bone age, late puberty, normal adult height. FSS: normal bone age, short parents.' },
  ],
  references: [
    { id: 'homan', citation: 'Homan GJ. Failure to Thrive: A Practical Guide. Am Fam Physician 2016;94:295–299.', url: pm('Homan failure to thrive a practical guide 2016') },
    { id: 'nice', citation: 'NICE guideline NG75. Faltering growth: recognition and management of faltering growth in children (2017).', url: 'https://www.nice.org.uk/guidance/ng75' },
    { id: 'aspen', citation: 'Becker P et al. Consensus statement of the Academy of Nutrition and Dietetics/ASPEN: indicators for identification and documentation of pediatric malnutrition. Nutr Clin Pract 2015;30:147–161.', url: pm('Becker consensus statement academy nutrition dietetics ASPEN pediatric malnutrition indicators') },
    { id: 'cdc-charts', citation: 'Grummer-Strawn LM et al. Use of WHO and CDC Growth Charts for Children Aged 0–59 Months in the United States. MMWR Recomm Rep 2010;59(RR-9):1–15.', url: 'https://www.cdc.gov/growthcharts/' },
    { id: 'aap-nutrition', citation: 'AAP Committee on Nutrition. Pediatric Nutrition, 8th ed. AAP, 2019.' },
    { id: 'hager', citation: 'Hager ER et al. Development and validity of a 2-item screen to identify families at risk for food insecurity. Pediatrics 2010;126:e26–e32.', url: pm('Hager development and validity of a 2-item screen to identify families at risk for food insecurity') },
  ],
};
