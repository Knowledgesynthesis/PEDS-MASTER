import type { Verdict } from './types';

export type Domain = 'Social/emotional' | 'Language/communication' | 'Cognitive' | 'Movement/physical';

export interface Milestone {
  text: string;
  domain: Domain;
}

/** CDC "Learn the Signs. Act Early." milestones (Zubler et al., Pediatrics 2022): achieved by ≥75% of children. */
export const CDC_MILESTONES: { age: number; label: string; items: Milestone[] }[] = [
  {
    age: 2,
    label: '2 months',
    items: [
      { text: 'Calms down when spoken to or picked up', domain: 'Social/emotional' },
      { text: 'Looks at your face', domain: 'Social/emotional' },
      { text: 'Smiles when you talk to or smile at them', domain: 'Social/emotional' },
      { text: 'Makes sounds other than crying', domain: 'Language/communication' },
      { text: 'Reacts to loud sounds', domain: 'Language/communication' },
      { text: 'Watches you as you move', domain: 'Cognitive' },
      { text: 'Holds head up when on tummy', domain: 'Movement/physical' },
      { text: 'Moves both arms and both legs', domain: 'Movement/physical' },
      { text: 'Opens hands briefly', domain: 'Movement/physical' },
    ],
  },
  {
    age: 4,
    label: '4 months',
    items: [
      { text: 'Smiles on own to get your attention', domain: 'Social/emotional' },
      { text: 'Chuckles when you try to make them laugh', domain: 'Social/emotional' },
      { text: 'Makes cooing sounds ("oooo", "aahh")', domain: 'Language/communication' },
      { text: 'Turns head toward the sound of your voice', domain: 'Language/communication' },
      { text: 'Looks at their hands with interest', domain: 'Cognitive' },
      { text: 'Holds head steady without support when held', domain: 'Movement/physical' },
      { text: 'Holds a toy when you put it in their hand', domain: 'Movement/physical' },
      { text: 'Pushes up onto elbows/forearms on tummy', domain: 'Movement/physical' },
    ],
  },
  {
    age: 6,
    label: '6 months',
    items: [
      { text: 'Knows familiar people', domain: 'Social/emotional' },
      { text: 'Laughs', domain: 'Social/emotional' },
      { text: 'Takes turns making sounds with you', domain: 'Language/communication' },
      { text: 'Blows "raspberries"; squeals', domain: 'Language/communication' },
      { text: 'Reaches to grab a toy they want', domain: 'Cognitive' },
      { text: 'Rolls from tummy to back', domain: 'Movement/physical' },
      { text: 'Pushes up with straight arms on tummy', domain: 'Movement/physical' },
      { text: 'Leans on hands to support self when sitting', domain: 'Movement/physical' },
    ],
  },
  {
    age: 9,
    label: '9 months',
    items: [
      { text: 'Is shy, clingy, or fearful around strangers', domain: 'Social/emotional' },
      { text: 'Looks when you call their name', domain: 'Social/emotional' },
      { text: 'Makes sounds like "mamamama" and "babababa"', domain: 'Language/communication' },
      { text: 'Lifts arms up to be picked up', domain: 'Language/communication' },
      { text: 'Looks for objects when dropped out of sight', domain: 'Cognitive' },
      { text: 'Bangs two things together', domain: 'Cognitive' },
      { text: 'Gets to a sitting position by self', domain: 'Movement/physical' },
      { text: 'Sits without support', domain: 'Movement/physical' },
      { text: 'Moves things from one hand to the other', domain: 'Movement/physical' },
    ],
  },
  {
    age: 12,
    label: '12 months',
    items: [
      { text: 'Plays games with you, like pat-a-cake', domain: 'Social/emotional' },
      { text: 'Waves "bye-bye"', domain: 'Language/communication' },
      { text: 'Calls a parent "mama", "dada", or another special name', domain: 'Language/communication' },
      { text: 'Understands "no" (pauses or stops)', domain: 'Language/communication' },
      { text: 'Looks for things they see you hide', domain: 'Cognitive' },
      { text: 'Pulls up to stand', domain: 'Movement/physical' },
      { text: 'Walks holding on to furniture', domain: 'Movement/physical' },
      { text: 'Picks things up between thumb and pointer finger', domain: 'Movement/physical' },
    ],
  },
  {
    age: 15,
    label: '15 months',
    items: [
      { text: 'Shows you an object they like', domain: 'Social/emotional' },
      { text: 'Tries to say one or two words besides "mama"/"dada"', domain: 'Language/communication' },
      { text: 'Follows directions given with a gesture and words', domain: 'Language/communication' },
      { text: 'Points to ask for something or get help', domain: 'Language/communication' },
      { text: 'Stacks at least two small objects', domain: 'Cognitive' },
      { text: 'Takes a few steps on own', domain: 'Movement/physical' },
      { text: 'Uses fingers to feed self some food', domain: 'Movement/physical' },
    ],
  },
  {
    age: 18,
    label: '18 months',
    items: [
      { text: 'Points to show you something interesting', domain: 'Social/emotional' },
      { text: 'Moves away but looks back to make sure you are close', domain: 'Social/emotional' },
      { text: 'Tries to say three or more words besides "mama"/"dada"', domain: 'Language/communication' },
      { text: 'Follows one-step directions without gestures', domain: 'Language/communication' },
      { text: 'Plays with toys in a simple way (pushes a car)', domain: 'Cognitive' },
      { text: 'Walks without holding on', domain: 'Movement/physical' },
      { text: 'Scribbles', domain: 'Movement/physical' },
      { text: 'Tries to use a spoon', domain: 'Movement/physical' },
    ],
  },
  {
    age: 24,
    label: '2 years',
    items: [
      { text: 'Notices when others are hurt or upset', domain: 'Social/emotional' },
      { text: 'Says at least two words together ("more milk")', domain: 'Language/communication' },
      { text: 'Points to at least two body parts when asked', domain: 'Language/communication' },
      { text: 'Uses gestures beyond waving and pointing', domain: 'Language/communication' },
      { text: 'Plays with more than one toy at the same time', domain: 'Cognitive' },
      { text: 'Kicks a ball', domain: 'Movement/physical' },
      { text: 'Runs', domain: 'Movement/physical' },
      { text: 'Eats with a spoon', domain: 'Movement/physical' },
    ],
  },
  {
    age: 30,
    label: '30 months',
    items: [
      { text: 'Plays next to and sometimes with other children', domain: 'Social/emotional' },
      { text: 'Says about 50 words', domain: 'Language/communication' },
      { text: 'Says two or more words including an action word ("doggie run")', domain: 'Language/communication' },
      { text: 'Uses things to pretend', domain: 'Cognitive' },
      { text: 'Follows two-step instructions', domain: 'Cognitive' },
      { text: 'Jumps off the ground with both feet', domain: 'Movement/physical' },
      { text: 'Turns book pages one at a time', domain: 'Movement/physical' },
    ],
  },
  {
    age: 36,
    label: '3 years',
    items: [
      { text: 'Calms down within 10 minutes after you leave', domain: 'Social/emotional' },
      { text: 'Notices other children and joins them to play', domain: 'Social/emotional' },
      { text: 'Has a conversation with at least two back-and-forth exchanges', domain: 'Language/communication' },
      { text: 'Asks "who", "what", "where", or "why" questions', domain: 'Language/communication' },
      { text: 'Talks well enough for others to understand most of the time', domain: 'Language/communication' },
      { text: 'Draws a circle when shown how', domain: 'Cognitive' },
      { text: 'Puts on some clothes by self', domain: 'Movement/physical' },
      { text: 'Uses a fork', domain: 'Movement/physical' },
    ],
  },
  {
    age: 48,
    label: '4 years',
    items: [
      { text: 'Pretends to be something else during play', domain: 'Social/emotional' },
      { text: 'Comforts others who are hurt or sad', domain: 'Social/emotional' },
      { text: 'Says sentences with four or more words', domain: 'Language/communication' },
      { text: 'Talks about at least one thing that happened during the day', domain: 'Language/communication' },
      { text: 'Names a few colors', domain: 'Cognitive' },
      { text: 'Draws a person with three or more body parts', domain: 'Cognitive' },
      { text: 'Catches a large ball most of the time', domain: 'Movement/physical' },
      { text: 'Holds crayon between fingers and thumb (not a fist)', domain: 'Movement/physical' },
    ],
  },
  {
    age: 60,
    label: '5 years',
    items: [
      { text: 'Follows rules or takes turns in games', domain: 'Social/emotional' },
      { text: 'Tells a story with at least two events', domain: 'Language/communication' },
      { text: 'Keeps a conversation going with more than three exchanges', domain: 'Language/communication' },
      { text: 'Counts to 10', domain: 'Cognitive' },
      { text: 'Writes some letters in their name', domain: 'Cognitive' },
      { text: 'Buttons some buttons', domain: 'Movement/physical' },
      { text: 'Hops on one foot', domain: 'Movement/physical' },
    ],
  },
];

export function milestoneVerdict(ageMonths: number, missing: Milestone[], regression: boolean, parentConcern: boolean): Verdict {
  const domains = Array.from(new Set(missing.map((m) => m.domain)));
  const setting = ageMonths < 36 ? 'Early Intervention (IDEA Part C; self-referral allowed, no diagnosis needed)' : 'the local school district (IDEA Part B preschool special education)';
  if (regression)
    return {
      tone: 'danger',
      title: 'Loss of skills: urgent evaluation',
      points: [
        'Regression at any age is never normal: autism (language/social regression 15–24 mo), Rett syndrome, Landau–Kleffner, neurodegenerative/metabolic disease, seizures, hearing loss.',
        'Same-week neurology/developmental referral; audiology; consider EEG and genetic/metabolic testing.',
      ],
    };
  if (missing.length === 0 && !parentConcern)
    return {
      tone: 'success',
      title: 'On track for this checklist',
      points: ['Continue surveillance at every visit; formal screening at 9, 18, and 30 months and autism screening at 18 and 24 months still applies.'],
    };
  const pts: string[] = [];
  if (missing.length) pts.push(`Not yet: ${missing.length} milestone${missing.length > 1 ? 's' : ''} in ${domains.join(', ')}.`);
  if (parentConcern) pts.push('Parental concern is itself a validated risk factor — act on it.');
  pts.push('Give a **validated screening tool now** (e.g. ASQ-3, PEDS, SWYC); do not "wait and see".');
  pts.push(`Refer for evaluation to ${setting} in parallel with medical work-up.`);
  if (domains.includes('Language/communication')) pts.push('Any language or social concern → **formal audiology**, regardless of newborn screen.');
  if (domains.length >= 2 && ageMonths < 60) pts.push('Delay in ≥2 domains under age 5 = possible **global developmental delay**: genetic testing (exome/genome or chromosomal microarray + Fragile X), neuro exam, head circumference; MRI if neurologic signs.');
  if (domains.includes('Movement/physical')) pts.push('Motor delay: check tone, reflexes, asymmetry, CK in boys with proximal weakness (Duchenne).');
  return { tone: domains.length >= 2 || parentConcern ? 'danger' : 'warn', title: 'Missing milestones — screen and refer', points: pts, note: 'CDC milestones are what ≥75% of children do by that age; a missed item flags the need for screening, not a diagnosis.' };
}

/* ---------------- M-CHAT-R/F ---------------- */

export function mchatVerdict(total: number, followUp: number | null): Verdict {
  if (total <= 2)
    return {
      tone: 'success',
      title: `M-CHAT-R ${total}: low likelihood`,
      points: ['No further action unless surveillance suggests risk. If screened before 24 months, rescreen at the 24-month visit.'],
    };
  if (total >= 8)
    return {
      tone: 'danger',
      title: `M-CHAT-R ${total}: high likelihood`,
      points: ['Skip the follow-up interview. Refer **immediately** for diagnostic evaluation **and** Early Intervention; audiology.'],
    };
  if (followUp === null)
    return {
      tone: 'warn',
      title: `M-CHAT-R ${total}: moderate likelihood`,
      points: ['Administer the structured Follow-Up interview for the failed items.'],
    };
  if (followUp >= 2)
    return {
      tone: 'danger',
      title: `Follow-Up ${followUp}: screen positive`,
      points: ['Refer for diagnostic evaluation and Early Intervention; audiology. Do not wait for diagnosis to start services.'],
    };
  return {
    tone: 'success',
    title: `Follow-Up ${followUp}: screen negative`,
    points: ['Continue surveillance; rescreen at the next autism-screening visit.'],
  };
}
