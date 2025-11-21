export interface AssessmentQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    category: 'Neonatal Sepsis',
    question: 'Which of the following is the MOST common pathogen causing early-onset neonatal sepsis?',
    options: [
      'E. coli',
      'Group B Streptococcus',
      'Staphylococcus aureus',
      'Listeria monocytogenes'
    ],
    correctAnswer: 1,
    explanation: 'Group B Streptococcus (GBS) is the most common cause of early-onset sepsis (<72 hours), followed by E. coli. Maternal GBS screening and intrapartum prophylaxis have reduced but not eliminated GBS disease.'
  },
  {
    id: 2,
    category: 'Congenital Heart Disease',
    question: 'A newborn has a fixed split S2. Which congenital heart defect is most likely?',
    options: [
      'Ventricular septal defect (VSD)',
      'Patent ductus arteriosus (PDA)',
      'Atrial septal defect (ASD)',
      'Tetralogy of Fallot'
    ],
    correctAnswer: 2,
    explanation: 'Fixed split S2 is pathognomonic for ASD. The constant left-to-right shunt causes delayed closure of the pulmonic valve regardless of respiratory phase, leading to the fixed splitting.'
  },
  {
    id: 3,
    category: 'Bronchiolitis',
    question: 'Which statement about bronchiolitis management is CORRECT?',
    options: [
      'Albuterol nebulizers improve outcomes',
      'Corticosteroids shorten hospital stay',
      'Supportive care is the mainstay of treatment',
      'Antibiotics prevent secondary bacterial infection'
    ],
    correctAnswer: 2,
    explanation: 'Supportive care (oxygen, hydration, nasal suctioning) is the cornerstone of bronchiolitis treatment. Multiple studies show bronchodilators and steroids do NOT improve outcomes. Antibiotics are not indicated unless there is a secondary bacterial infection.'
  },
  {
    id: 4,
    category: 'Airway Emergency',
    question: 'What is the MOST important distinguishing feature between croup and epiglottitis?',
    options: [
      'Presence of fever',
      'Age of the patient',
      'Barky cough vs. drooling and toxic appearance',
      'Response to racemic epinephrine'
    ],
    correctAnswer: 2,
    explanation: 'Croup presents with barky cough, hoarseness, and gradual onset. Epiglottitis presents with drooling, muffled voice, toxic appearance, tripod positioning, and rapid onset. Epiglottitis is an airway emergency requiring immediate intervention.'
  },
  {
    id: 5,
    category: 'ENT',
    question: 'All of the following are required for diagnosis of acute otitis media (AOM) EXCEPT:',
    options: [
      'Acute onset of symptoms',
      'Middle ear effusion',
      'Prior upper respiratory infection',
      'Signs of middle ear inflammation'
    ],
    correctAnswer: 2,
    explanation: 'AOM requires three criteria: (1) acute onset, (2) middle ear effusion, and (3) signs of middle ear inflammation. While URI often precedes AOM, it is not required for diagnosis. OME has effusion but lacks acute symptoms and inflammation.'
  },
  {
    id: 6,
    category: 'Failure to Thrive',
    question: 'A child crosses two major percentile lines downward in weight while length and head circumference remain stable. This pattern most suggests:',
    options: [
      'Constitutional growth delay',
      'Inadequate caloric intake',
      'Chronic systemic disease',
      'Genetic short stature'
    ],
    correctAnswer: 1,
    explanation: 'Weight declining while length and head circumference remain normal suggests inadequate caloric intake (most common cause of FTT). If length and weight were both declining, it would suggest chronic systemic disease or endocrine disorder.'
  },
  {
    id: 7,
    category: 'Asthma',
    question: 'A 6-year-old has symptoms >2 days per week but not daily, and nighttime awakenings 3-4 times per month. What is the asthma classification and appropriate step?',
    options: [
      'Intermittent - Step 1',
      'Mild persistent - Step 2',
      'Moderate persistent - Step 3',
      'Severe persistent - Step 5'
    ],
    correctAnswer: 1,
    explanation: 'Symptoms >2 days/week but not daily, and nighttime awakenings 3-4x/month define MILD PERSISTENT asthma. This requires Step 2 therapy: low-dose inhaled corticosteroid (ICS). SABA alone is insufficient.'
  },
  {
    id: 8,
    category: 'Fluids',
    question: 'A child has dry mucous membranes, decreased skin turgor (recoil <2 sec), cap refill 2-3 sec, and decreased urine output. What is the degree of dehydration?',
    options: [
      'Mild (<5%)',
      'Moderate (6-9%)',
      'Severe (>9%)',
      'Not dehydrated'
    ],
    correctAnswer: 1,
    explanation: 'These findings indicate MODERATE dehydration (6-9%). Severe dehydration would show skin tenting (recoil >2 sec), cap refill >3 sec, altered mental status, and possible hypotension. This child may be managed with ORT if tolerating, or IV fluids.'
  },
  {
    id: 9,
    category: 'Development',
    question: 'At what age should a child be able to say 2-word phrases?',
    options: [
      '12 months',
      '18 months',
      '24 months',
      '36 months'
    ],
    correctAnswer: 2,
    explanation: 'By 24 months, children should have 2-word phrases. Lack of 2-word phrases by 24 months is a red flag requiring evaluation. By 12 months: 1-2 words. By 18 months: 10-25 words. By 24 months: 50+ words and 2-word phrases.'
  },
  {
    id: 10,
    category: 'Development',
    question: 'Which is a RED FLAG at any age?',
    options: [
      'Walking at 15 months',
      'First words at 14 months',
      'Loss of previously acquired skills',
      'Hand preference at 24 months'
    ],
    correctAnswer: 2,
    explanation: 'Regression (loss of previously acquired skills) is ALWAYS a red flag at any age and requires immediate evaluation. Walking at 15 months and first words at 14 months are within normal variation. Hand dominance before 18 months is a red flag (may indicate weakness on opposite side).'
  },
  {
    id: 11,
    category: 'Neonatal Sepsis',
    question: 'When should a lumbar puncture be performed in evaluation of neonatal sepsis?',
    options: [
      'Always, in all cases of suspected sepsis',
      'Only if blood culture is positive',
      'If high clinical suspicion, abnormal labs, or positive blood culture',
      'Never in neonates due to risk'
    ],
    correctAnswer: 2,
    explanation: 'LP should be considered when there is high clinical suspicion for meningitis, abnormal screening labs (very high or low WBC), positive blood culture, or persistent fever/clinical deterioration. It may be deferred initially if the infant is too unstable.'
  },
  {
    id: 12,
    category: 'Congenital Heart Disease',
    question: 'Which finding best distinguishes a VSD from an ASD on physical exam?',
    options: [
      'Timing of murmur (holosystolic vs. ejection)',
      'Location of murmur',
      'Presence of cyanosis',
      'Heart rate'
    ],
    correctAnswer: 0,
    explanation: 'VSD produces a holosystolic (pansystolic) murmur at the left lower sternal border due to continuous flow from left to right ventricle throughout systole. ASD produces a systolic ejection murmur at the left upper sternal border due to increased flow across the pulmonic valve, with the hallmark finding of fixed split S2.'
  },
  {
    id: 13,
    category: 'Asthma',
    question: 'What is the most important reason to treat streptococcal pharyngitis with antibiotics?',
    options: [
      'Shorten duration of illness',
      'Reduce transmission to others',
      'Prevent acute rheumatic fever',
      'Prevent post-streptococcal glomerulonephritis'
    ],
    correctAnswer: 2,
    explanation: 'The primary reason to treat strep pharyngitis is to prevent acute rheumatic fever. Treatment also shortens illness and reduces transmission, but preventing rheumatic fever is the most important indication. Treatment does NOT prevent post-streptococcal glomerulonephritis.'
  },
  {
    id: 14,
    category: 'Fluids',
    question: 'Using the 4-2-1 rule, what is the hourly maintenance fluid rate for a 23 kg child?',
    options: [
      '43 mL/hr',
      '53 mL/hr',
      '63 mL/hr',
      '73 mL/hr'
    ],
    correctAnswer: 2,
    explanation: '4-2-1 rule: First 10 kg: 4 mL/kg/hr = 40 mL. Second 10 kg: 2 mL/kg/hr = 20 mL. Remaining 3 kg: 1 mL/kg/hr = 3 mL. Total = 40 + 20 + 3 = 63 mL/hr.'
  },
  {
    id: 15,
    category: 'Bronchiolitis',
    question: 'What is the most common cause of bronchiolitis?',
    options: [
      'Rhinovirus',
      'Respiratory syncytial virus (RSV)',
      'Parainfluenza',
      'Adenovirus'
    ],
    correctAnswer: 1,
    explanation: 'RSV is responsible for approximately 70% of bronchiolitis cases, especially in infants. Rhinovirus is the second most common cause. Bronchiolitis is a clinical diagnosis based on age, seasonality, and symptoms, and viral testing does not change management.'
  }
];
