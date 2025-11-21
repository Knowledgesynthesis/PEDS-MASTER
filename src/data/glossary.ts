export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'AOM (Acute Otitis Media)',
    definition: 'Middle ear infection characterized by acute onset of symptoms, middle ear effusion, and signs of middle ear inflammation (bulging tympanic membrane).',
    category: 'ENT'
  },
  {
    term: 'ASD (Atrial Septal Defect)',
    definition: 'Congenital heart defect with abnormal opening in the atrial septum, causing left-to-right shunt. Classic finding is fixed split S2.',
    category: 'Cardiology'
  },
  {
    term: 'Bronchiolitis',
    definition: 'Viral infection of the small airways (bronchioles), most commonly caused by RSV. Typically affects infants and young children.',
    category: 'Respiratory'
  },
  {
    term: 'Centor Criteria',
    definition: 'Clinical prediction rule for strep pharyngitis: tonsillar exudates, tender anterior cervical nodes, fever, absence of cough.',
    category: 'Infectious Disease'
  },
  {
    term: 'Croup',
    definition: 'Viral upper airway infection causing subglottic narrowing, characterized by barky cough, inspiratory stridor, and hoarseness.',
    category: 'Respiratory'
  },
  {
    term: 'Developmental Delay',
    definition: 'Significant lag in achieving age-appropriate milestones in one or more developmental domains (gross motor, fine motor, language, social).',
    category: 'Development'
  },
  {
    term: 'Epiglottitis',
    definition: 'Life-threatening infection causing epiglottic inflammation. Classic presentation: drooling, dysphagia, tripod positioning, muffled voice.',
    category: 'Respiratory'
  },
  {
    term: 'FTT (Failure to Thrive)',
    definition: 'Inadequate weight gain or weight loss in children. Traditionally defined as crossing two major percentile lines downward on growth chart.',
    category: 'Growth'
  },
  {
    term: 'GBS (Group B Streptococcus)',
    definition: 'Bacterial pathogen causing early-onset neonatal sepsis. Leading cause of neonatal infections.',
    category: 'Infectious Disease'
  },
  {
    term: 'Milestones',
    definition: 'Age-specific developmental achievements that most children reach by certain ages. Used to track normal development.',
    category: 'Development'
  },
  {
    term: 'OME (Otitis Media with Effusion)',
    definition: 'Middle ear fluid without signs of acute infection. No bulging TM or acute symptoms.',
    category: 'ENT'
  },
  {
    term: 'PDA (Patent Ductus Arteriosus)',
    definition: 'Persistent opening between aorta and pulmonary artery. Classic finding is continuous "machine-like" murmur.',
    category: 'Cardiology'
  },
  {
    term: 'Qp/Qs',
    definition: 'Ratio of pulmonary to systemic blood flow, used to quantify shunt magnitude in congenital heart disease.',
    category: 'Cardiology'
  },
  {
    term: 'RSV (Respiratory Syncytial Virus)',
    definition: 'Leading cause of bronchiolitis in infants. Spreads via respiratory droplets, peaks in winter months.',
    category: 'Infectious Disease'
  },
  {
    term: 'Steeple Sign',
    definition: 'X-ray finding in croup showing subglottic narrowing that resembles a church steeple.',
    category: 'Respiratory'
  },
  {
    term: 'Stridor',
    definition: 'High-pitched breathing sound caused by upper airway obstruction. Inspiratory stridor suggests supraglottic obstruction.',
    category: 'Respiratory'
  },
  {
    term: 'Thumb Sign',
    definition: 'Lateral neck X-ray finding in epiglottitis showing swollen epiglottis resembling a thumb.',
    category: 'Respiratory'
  },
  {
    term: 'VSD (Ventricular Septal Defect)',
    definition: 'Congenital heart defect with abnormal opening in ventricular septum. Classic finding is holosystolic murmur.',
    category: 'Cardiology'
  },
];
