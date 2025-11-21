import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Brain } from 'lucide-react';

const Development: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<string>('');

  const milestones = {
    '2m': {
      age: '2 Months',
      gross: ['Lifts head when on tummy', 'Moves both arms and legs'],
      fine: ['Opens hands briefly', 'Brings hands to mouth'],
      language: ['Coos and makes sounds', 'Turns head toward sounds'],
      social: ['Social smile', 'Calms when spoken to'],
      redFlags: ['Not smiling at people', 'Cannot hold head up when on tummy', 'Doesn\'t respond to loud sounds']
    },
    '4m': {
      age: '4 Months',
      gross: ['Holds head steady when held', 'Pushes up on elbows when on tummy'],
      fine: ['Reaches for toys', 'Brings hands together', 'Holds and shakes toys'],
      language: ['Babbles (ah, eh, oh)', 'Laughs', 'Responds to affection'],
      social: ['Smiles spontaneously', 'Likes to play with people'],
      redFlags: ['Doesn\'t watch things as they move', 'Doesn\'t bring objects to mouth', 'Doesn\'t make sounds']
    },
    '6m': {
      age: '6 Months',
      gross: ['Rolls over both ways', 'Sits with support', 'Bounces when standing with support'],
      fine: ['Reaches for objects', 'Transfers objects hand to hand', 'Raking grasp'],
      language: ['Babbles chains of consonants (bababa)', 'Responds to own name', 'Recognizes familiar faces'],
      social: ['Knows familiar vs strange', 'Likes to look at self in mirror'],
      redFlags: ['Very stiff or floppy muscles', 'Doesn\'t reach for objects', 'Doesn\'t respond to sounds or show affection']
    },
    '9m': {
      age: '9 Months',
      gross: ['Sits without support', 'Pulls to stand', 'Crawls'],
      fine: ['Pincer grasp (thumb and finger)', 'Bangs objects together', 'Picks up small objects'],
      language: ['Says mama/dada (non-specific)', 'Understands "no"', 'Makes different sounds'],
      social: ['Stranger anxiety', 'Plays peek-a-boo', 'Points with finger'],
      redFlags: ['Doesn\'t bear weight on legs', 'Doesn\'t sit with help', 'Doesn\'t babble']
    },
    '12m': {
      age: '12 Months',
      gross: ['Stands alone', 'May take first steps', 'Cruises along furniture'],
      fine: ['Pincer grasp refined', 'Helps turn pages', 'Drops objects into container'],
      language: ['Says 1-2 words besides mama/dada', 'Follows simple commands', 'Uses gestures (waves bye)'],
      social: ['Plays pat-a-cake', 'Separation anxiety', 'Drinks from cup'],
      redFlags: ['Doesn\'t crawl', 'Cannot stand with support', 'Doesn\'t point', 'Loses skills once had']
    },
    '18m': {
      age: '18 Months',
      gross: ['Walks independently', 'Runs', 'Walks up stairs with help'],
      fine: ['Scribbles', 'Drinks from cup well', 'Uses spoon (messy)'],
      language: ['10-25 words', 'Points to body parts', 'Follows 1-step commands'],
      social: ['Shows affection', 'Plays simple pretend', 'May have tantrums'],
      redFlags: ['Doesn\'t walk', 'Doesn\'t know what familiar objects are for', 'Doesn\'t point to show things', 'Doesn\'t gain new words']
    },
    '24m': {
      age: '2 Years',
      gross: ['Runs well', 'Kicks ball', 'Walks up/down stairs holding rail'],
      fine: ['Turns pages one at a time', 'Copies lines', 'Stacks 6+ blocks'],
      language: ['50+ words', '2-word phrases', 'Names pictures', 'Follows 2-step commands'],
      social: ['Parallel play', 'Gets excited with other children', 'Increasing independence'],
      redFlags: ['Doesn\'t use 2-word phrases', 'Doesn\'t know function of common objects', 'Doesn\'t imitate actions', 'Loses skills']
    },
    '3y': {
      age: '3 Years',
      gross: ['Pedals tricycle', 'Climbs well', 'Runs easily', 'Walks up stairs alternating feet'],
      fine: ['Copies circle', 'Turns pages easily', 'Uses utensils well'],
      language: ['3-word sentences', 'Speaks clearly enough for strangers', 'Tells stories', 'Knows name, age, sex'],
      social: ['Separates from parents easily', 'Takes turns', 'Shows concern for friend crying'],
      redFlags: ['Frequent falling', 'Drools or unclear speech', 'Cannot work simple toys', 'Doesn\'t play pretend']
    },
    '4y': {
      age: '4 Years',
      gross: ['Hops on one foot', 'Catches ball', 'Pours and cuts with supervision'],
      fine: ['Draws person with 2-4 body parts', 'Copies some letters', 'Uses scissors'],
      language: ['Tells stories', 'Sings songs', 'Knows basic grammar', 'Can say name'],
      social: ['Prefers playing with other children', 'Cooperates', 'More creative with pretend play'],
      redFlags: ['Cannot jump', 'Has trouble scribbling', 'Ignores other children', 'Doesn\'t engage in pretend play']
    },
    '5y': {
      age: '5 Years',
      gross: ['Stands on one foot 10+ seconds', 'Hops and skips', 'Can do somersault'],
      fine: ['Draws person with 6+ parts', 'Prints some letters/numbers', 'Copies triangle'],
      language: ['Speaks very clearly', 'Tells simple story', 'Can define words'],
      social: ['Wants to please friends', 'Likes to sing, dance, act', 'Aware of gender', 'Can distinguish fantasy from reality'],
      redFlags: ['Extremely fearful or shy', 'Cannot separate from parents', 'Shows no interest in interactive games']
    }
  };

  const selectedMilestone = selectedAge ? milestones[selectedAge as keyof typeof milestones] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Brain className="h-8 w-8 text-indigo-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developmental Delay</h1>
          <p className="text-muted-foreground mt-1">Milestones and red flags by domain</p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Developmental Domains</CardTitle>
          <CardDescription>Four key areas of child development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Gross Motor</h4>
              <p className="text-sm text-muted-foreground">
                Large muscle activities: sitting, walking, running, jumping
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Fine Motor</h4>
              <p className="text-sm text-muted-foreground">
                Small muscle skills: grasping, drawing, using utensils
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Language</h4>
              <p className="text-sm text-muted-foreground">
                Communication: babbling, words, sentences, understanding
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Social/Adaptive</h4>
              <p className="text-sm text-muted-foreground">
                Social interaction, self-care, emotional development
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestone Navigator */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Developmental Milestones Navigator</CardTitle>
          <CardDescription>Select age to view expected milestones and red flags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.keys(milestones).map((age) => (
              <Button
                key={age}
                variant={selectedAge === age ? 'default' : 'outline'}
                onClick={() => setSelectedAge(age)}
                className="w-full"
              >
                {milestones[age as keyof typeof milestones].age}
              </Button>
            ))}
          </div>

          {selectedMilestone && (
            <div className="space-y-6 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Gross Motor:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedMilestone.gross.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-blue-600">Fine Motor:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedMilestone.fine.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-600">Language:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedMilestone.language.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">Social/Adaptive:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedMilestone.social.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-md">
                <h4 className="font-semibold mb-2 text-red-600">Red Flags at {selectedMilestone.age}:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedMilestone.redFlags.map((flag, i) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Red Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Universal Red Flags (Any Age)</CardTitle>
          <CardDescription>Signs requiring immediate evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Loss of previously acquired skills (regression) at any age</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Parental concern about development</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>No social smile by 3 months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>No babbling by 9 months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>No single words by 16 months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>No 2-word phrases by 24 months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Hand dominance before 18 months (may indicate weakness on opposite side)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">•</span>
              <span>Persistent toe walking after 2 years</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Autism Screening */}
      <Card>
        <CardHeader>
          <CardTitle>Autism Spectrum Disorder Screening</CardTitle>
          <CardDescription>Early signs and screening recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Early Signs (18-24 months):</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Lack of or limited eye contact</li>
              <li>Does not respond to name</li>
              <li>Lack of pointing to show interest</li>
              <li>Lack of pretend play</li>
              <li>Repetitive behaviors (hand flapping, spinning)</li>
              <li>Intense focus on specific objects or topics</li>
              <li>Delayed language development</li>
              <li>Regression of language or social skills</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Screening Recommendations:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Universal autism screening at 18 and 24 months (M-CHAT)</li>
              <li>Additional screening if concerns or high-risk factors</li>
              <li>Early intervention improves outcomes</li>
              <li>Refer for comprehensive evaluation if screening positive</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Approach */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation of Developmental Delay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">History:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Developmental history across all domains</li>
              <li>Pregnancy and birth history</li>
              <li>Family history (developmental, genetic, neurologic)</li>
              <li>Environmental exposures (lead, toxins)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Physical Exam:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Growth parameters (head circumference important)</li>
              <li>Dysmorphic features</li>
              <li>Neurologic exam (tone, reflexes)</li>
              <li>Observe child's behavior and interactions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Workup (Targeted Based on Findings):</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Hearing and vision screening (all children with delay)</li>
              <li>Lead level (environmental risk)</li>
              <li>Thyroid function (hypothyroidism)</li>
              <li>Chromosomal microarray (global delay, autism)</li>
              <li>Fragile X testing (boys with developmental delay, autism)</li>
              <li>Metabolic testing if specific concerns</li>
              <li>Brain MRI if neurologic concerns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Management:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Early intervention services (&lt;3 years)</li>
              <li>Special education services (≥3 years)</li>
              <li>Speech, occupational, physical therapy as indicated</li>
              <li>Treat underlying conditions if identified</li>
              <li>Family support and education</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Monitor development across four domains: gross motor, fine motor, language, social</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Loss of skills (regression) is always concerning - evaluate immediately</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Language milestones: babbling by 9 months, single words by 16 months, 2-word phrases by 24 months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Universal autism screening at 18 and 24 months recommended</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Hearing and vision must be checked in all children with developmental concerns</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Early intervention improves outcomes - refer promptly when delays identified</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Development;
