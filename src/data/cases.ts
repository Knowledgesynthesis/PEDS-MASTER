export interface ClinicalCase {
  id: number;
  title: string;
  category: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const clinicalCases: ClinicalCase[] = [
  {
    id: 1,
    title: 'Newborn with Temperature Instability',
    category: 'Neonatal Sepsis',
    scenario: 'A 36-hour-old term infant born to a mother with prolonged rupture of membranes (22 hours) presents with temperature instability (36.2°C), poor feeding, and decreased activity. Mother was GBS positive but received inadequate intrapartum prophylaxis.',
    question: 'What is the most appropriate initial management?',
    options: [
      'Observe for 24 hours and reassess',
      'Full sepsis workup including LP, start empiric antibiotics',
      'Blood culture only, await results before treatment',
      'Discharge home with close follow-up'
    ],
    correctAnswer: 1,
    explanation: 'This infant has risk factors for early-onset sepsis (GBS positive mother, prolonged ROM, inadequate prophylaxis) AND clinical symptoms. Full workup including CBC, blood culture, and LP (if stable enough) is indicated, with immediate empiric antibiotics (ampicillin + gentamicin) before culture results.'
  },
  {
    id: 2,
    title: 'Infant with Continuous Murmur',
    category: 'CHD',
    scenario: 'A 6-week-old infant presents for well-child check. On exam, you note a continuous "machine-like" murmur best heard at the left infraclavicular area. The infant has been feeding well but takes longer than siblings did. Pulses are bounding.',
    question: 'What is the most likely diagnosis?',
    options: [
      'Ventricular septal defect',
      'Atrial septal defect',
      'Patent ductus arteriosus',
      'Pulmonary stenosis'
    ],
    correctAnswer: 2,
    explanation: 'The continuous "machinery" murmur at the left infraclavicular area with bounding pulses is classic for PDA. The ductus arteriosus connects the aorta to the pulmonary artery, creating continuous flow throughout systole and diastole.'
  },
  {
    id: 3,
    title: 'Wheezing 4-Month-Old',
    category: 'Bronchiolitis',
    scenario: 'A 4-month-old presents with 3 days of rhinorrhea, now with increased work of breathing. Vital signs: RR 65, O2 sat 88% on room air, temp 38.1°C. Exam shows nasal flaring, intercostal retractions, and bilateral wheezing with crackles. The infant is taking only 1 oz per feeding (normally takes 4 oz).',
    question: 'What is the most appropriate management?',
    options: [
      'Albuterol nebulizer treatment and discharge home',
      'Hospitalization with supplemental oxygen and supportive care',
      'Oral corticosteroids and follow-up in 2 days',
      'Chest X-ray before any treatment decisions'
    ],
    correctAnswer: 1,
    explanation: 'This infant has severe bronchiolitis based on hypoxia (SpO2 88%), tachypnea (RR 65), and poor feeding. Hospitalization is indicated for oxygen support and likely IV hydration. Bronchodilators and steroids are NOT beneficial in bronchiolitis. Treatment is supportive care.'
  },
  {
    id: 4,
    title: 'Tripoding Child with Drooling',
    category: 'Airway Emergency',
    scenario: 'A 5-year-old is brought to the ED by EMS. The child is sitting upright, leaning forward with jaw thrust, drooling profusely. Temperature is 40°C. The child appears toxic and anxious. Stridor is audible. Parents report rapid onset over 6 hours.',
    question: 'What is the most important immediate action?',
    options: [
      'Examine the throat with tongue depressor to visualize',
      'Obtain lateral neck X-ray',
      'Keep child calm, do NOT agitate, call anesthesia for controlled airway management',
      'Start nebulized epinephrine'
    ],
    correctAnswer: 2,
    explanation: 'This is classic epiglottitis presentation (tripod position, drooling, toxic appearance, high fever, rapid onset). This is an AIRWAY EMERGENCY. Do NOT examine the throat or agitate the child as this can precipitate complete obstruction. Call for anesthesia/ENT for controlled intubation in OR. Keep child calm in position of comfort.'
  },
  {
    id: 5,
    title: 'Ear Pain in Toddler',
    category: 'ENT',
    scenario: 'A 2-year-old presents with 1 day of fever (39°C) and pulling at the right ear. Exam shows a bulging, opaque right tympanic membrane with decreased mobility on pneumatic otoscopy. Left TM is normal. No URI symptoms prior.',
    question: 'What is the diagnosis and appropriate management?',
    options: [
      'OME - observation, no antibiotics needed',
      'AOM - consider observation vs antibiotics based on severity',
      'External otitis - topical antibiotics',
      'Viral URI - supportive care only'
    ],
    correctAnswer: 1,
    explanation: 'This meets all three criteria for AOM: acute onset (1 day, fever), middle ear effusion (bulging TM, decreased mobility), and inflammation (fever, otalgia). For a child under 2 years with certain diagnosis and fever ≥39°C, antibiotics are recommended. However, for children ≥6 months with non-severe symptoms, observation for 48-72 hours is acceptable with close follow-up.'
  },
  {
    id: 6,
    title: 'Infant Falling Off Growth Curve',
    category: 'FTT',
    scenario: 'A 6-month-old presents for well-child check. Review of growth chart shows weight was at 50th percentile at 2 months, 25th at 4 months, and now 5th percentile. Length and head circumference remain at 50th percentile. Infant is exclusively formula-fed. Mother reports preparing formula by adding one scoop per 2 oz of water (package says one scoop per 4 oz).',
    question: 'What is the most likely cause of poor weight gain?',
    options: [
      'Cystic fibrosis causing malabsorption',
      'Congenital heart disease increasing metabolic demand',
      'Incorrect formula preparation causing inadequate calories',
      'Hypothyroidism'
    ],
    correctAnswer: 2,
    explanation: 'The infant is crossing two major percentile lines in weight while length and HC are normal, indicating inadequate caloric intake rather than systemic disease. The mother is diluting the formula (1 scoop per 2 oz instead of 1 scoop per 4 oz), which doubles the concentration and can cause dehydration and inadequate nutrition. This is a non-organic cause of FTT due to improper feeding. Education about correct formula preparation should result in catch-up growth.'
  },
  {
    id: 7,
    title: 'Child with Daily Wheezing',
    category: 'Asthma',
    scenario: 'A 7-year-old has daily cough and wheezing for the past 3 months, especially with exercise. Wakes up 2-3 nights per week with cough. Uses albuterol inhaler daily. Symptoms interfere with soccer practice several times per week.',
    question: 'How would you classify this asthma, and what is the appropriate step of therapy?',
    options: [
      'Intermittent - Step 1 (SABA as needed)',
      'Mild persistent - Step 2 (low-dose ICS)',
      'Moderate persistent - Step 3 (medium-dose ICS or low-dose ICS + LABA)',
      'Severe persistent - Step 5 (high-dose ICS + LABA)'
    ],
    correctAnswer: 2,
    explanation: 'Daily symptoms, nighttime awakenings >1x/week, daily SABA use, and activity interference all indicate MODERATE PERSISTENT asthma. The most severe category applies. This requires Step 3 or 4 therapy: medium-dose ICS or low-dose ICS + LABA. The child needs controller medication, not just rescue inhaler.'
  },
  {
    id: 8,
    title: 'Vomiting and Diarrhea',
    category: 'Fluids',
    scenario: 'An 18-month-old (12 kg) presents with 2 days of vomiting and diarrhea. Exam shows slightly dry mucous membranes, cap refill 2 seconds, normal heart rate and BP, decreased skin turgor. The child is alert and taking some fluids but less than usual. Last void was 6 hours ago.',
    question: 'What degree of dehydration and what initial management is most appropriate?',
    options: [
      'Severe (>9%) - IV fluid bolus required',
      'Moderate (6-9%) - trial of oral rehydration therapy (ORT)',
      'Mild (<5%) - encourage regular fluids at home',
      'Not dehydrated - no intervention needed'
    ],
    correctAnswer: 1,
    explanation: 'This child has signs of MODERATE dehydration: decreased skin turgor, decreased oral intake, decreased urine output, and mildly dry mucous membranes. However, the child is alert, cap refill is only mildly delayed, and hemodynamically stable. Trial of ORT (oral rehydration solution) is appropriate. Give 50-100 mL/kg over 4 hours. If child cannot tolerate ORT or condition worsens, then IV fluids would be needed.'
  },
  {
    id: 9,
    title: '15-Month-Old Not Walking',
    category: 'Development',
    scenario: 'Parents bring their 15-month-old for evaluation because the child is not yet walking independently. The child can pull to stand and cruise along furniture. Says 5 words clearly, follows simple commands, plays peek-a-boo, and has a good pincer grasp. Birth history normal.',
    question: 'What is the most appropriate next step?',
    options: [
      'Reassure parents this is normal variation - continue observation',
      'Immediate referral to neurology',
      'Order brain MRI',
      'Start physical therapy'
    ],
    correctAnswer: 0,
    explanation: 'Most children walk independently by 12-15 months, but the range of normal extends to 18 months. This child shows age-appropriate development in all other domains (language, fine motor, social). The child can pull to stand and cruise, which are prerequisites for walking. Red flags would be inability to stand with support or regression of skills. Reassurance and continued monitoring at the 18-month visit is appropriate. If not walking by 18 months, further evaluation would be warranted.'
  },
  {
    id: 10,
    title: 'No Two-Word Phrases at 24 Months',
    category: 'Development',
    scenario: 'A 24-month-old is brought for evaluation of speech delay. The child says about 15 single words but no 2-word phrases. Points to desired objects, follows 1-step commands, plays with toys appropriately, and interacts normally with parents and other children. Hearing screen normal.',
    question: 'What is the most appropriate management?',
    options: [
      'Reassure parents - this is normal',
      'Refer for speech therapy evaluation and hearing recheck',
      'Obtain chromosomal microarray',
      'Observe and recheck at 3-year visit'
    ],
    correctAnswer: 1,
    explanation: 'By 24 months, children should have 2-word phrases. This child has a language delay (though other development appears normal). Even with a normal hearing screen, hearing should be rechecked as hearing loss is a common cause of language delay. Referral for speech therapy evaluation is appropriate. Early intervention improves outcomes. This is not normal variation that should just be observed.'
  }
];
