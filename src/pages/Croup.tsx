import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

interface AirwayCase {
  id: number;
  age: string;
  cough: string;
  voice: string;
  drooling: string;
  posture: string;
  onset: string;
  fever: string;
  diagnosis: string;
  explanation: string;
}

const airwayCases: AirwayCase[] = [
  {
    id: 1,
    age: '3 years',
    cough: 'Barky, seal-like',
    voice: 'Hoarse',
    drooling: 'No',
    posture: 'Normal',
    onset: 'Gradual over 2 days',
    fever: 'Low-grade',
    diagnosis: 'Croup (Laryngotracheobronchitis)',
    explanation: 'Classic croup: barky cough, hoarseness, gradual onset, low fever. Viral infection of upper airway causing subglottic narrowing.'
  },
  {
    id: 2,
    age: '4 years',
    cough: 'None',
    voice: 'Muffled, "hot potato"',
    drooling: 'Yes, profuse',
    posture: 'Tripod positioning',
    onset: 'Rapid, hours',
    fever: 'High fever, toxic appearance',
    diagnosis: 'Epiglottitis',
    explanation: 'AIRWAY EMERGENCY: Epiglottitis with classic 4 Ds - Drooling, Dysphagia, Dysphonia, Distress. Requires immediate airway management.'
  },
  {
    id: 3,
    age: '2 years',
    cough: 'Barky cough',
    voice: 'Hoarse',
    drooling: 'No',
    posture: 'Normal',
    onset: 'After URI symptoms',
    fever: 'Mild',
    diagnosis: 'Croup (Laryngotracheobronchitis)',
    explanation: 'Typical viral croup following upper respiratory infection. Subglottic inflammation causes characteristic barky cough and stridor.'
  },
  {
    id: 4,
    age: '5 years',
    cough: 'Minimal',
    voice: 'Muffled',
    drooling: 'Yes',
    posture: 'Tripod, refusing to lie down',
    onset: 'Acute, <12 hours',
    fever: 'High (40°C)',
    diagnosis: 'Epiglottitis',
    explanation: 'Life-threatening epiglottitis. Do NOT examine throat or agitate child. Secure airway in controlled setting (OR). Thumb sign on X-ray.'
  }
];

const Croup: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCaseSelect = (id: number) => {
    setSelectedCase(id);
    setShowAnswer(false);
  };

  const currentCase = airwayCases.find(c => c.id === selectedCase);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Airway Emergencies</h1>
          <p className="text-muted-foreground mt-1">Croup vs Epiglottitis differentiation</p>
        </div>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Croup vs Epiglottitis: Quick Comparison</CardTitle>
          <CardDescription>Critical differences for rapid diagnosis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Feature</th>
                  <th className="text-left py-3 px-2">Croup</th>
                  <th className="text-left py-3 px-2">Epiglottitis</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Age</td>
                  <td className="py-3 px-2">6 months - 3 years</td>
                  <td className="py-3 px-2">2-7 years (now rare due to Hib vaccine)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Onset</td>
                  <td className="py-3 px-2">Gradual (2-3 days)</td>
                  <td className="py-3 px-2">Rapid (hours)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Cough</td>
                  <td className="py-3 px-2">Barky, seal-like</td>
                  <td className="py-3 px-2">Minimal or absent</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Voice</td>
                  <td className="py-3 px-2">Hoarse</td>
                  <td className="py-3 px-2">Muffled ("hot potato")</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Drooling</td>
                  <td className="py-3 px-2">No</td>
                  <td className="py-3 px-2">Yes, profuse</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Position</td>
                  <td className="py-3 px-2">Variable</td>
                  <td className="py-3 px-2">Tripod, sniffing</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Appearance</td>
                  <td className="py-3 px-2">Generally well between episodes</td>
                  <td className="py-3 px-2">Toxic, anxious</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Fever</td>
                  <td className="py-3 px-2">Low-grade (&lt;38.5°C)</td>
                  <td className="py-3 px-2">High (&gt;39°C)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Stridor</td>
                  <td className="py-3 px-2">Inspiratory, worse with agitation</td>
                  <td className="py-3 px-2">Inspiratory, constant</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">X-ray finding</td>
                  <td className="py-3 px-2">Steeple sign (subglottic narrowing)</td>
                  <td className="py-3 px-2">Thumb sign (swollen epiglottis)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Croup Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Croup (Laryngotracheobronchitis)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Etiology:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Viral: Parainfluenza (most common), RSV, influenza</li>
                <li>Subglottic tracheal inflammation and edema</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Clinical Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Barky, seal-like cough</li>
                <li>Inspiratory stridor</li>
                <li>Hoarseness</li>
                <li>Symptoms worse at night</li>
                <li>Low-grade fever</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Management:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Mild: Supportive care, cool mist (limited evidence)</li>
                <li>Moderate-Severe: Dexamethasone (single dose, PO or IM)</li>
                <li>Severe: Nebulized epinephrine (temporary relief)</li>
                <li>Hospitalize if persistent stridor at rest or hypoxia</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">X-ray (if done):</h4>
              <p className="text-sm text-muted-foreground">
                Steeple sign - narrowing of subglottic trachea on AP view
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/50">
          <CardHeader>
            <CardTitle className="text-red-500">Epiglottitis - AIRWAY EMERGENCY</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-red-500/10 rounded-md">
              <p className="text-sm font-semibold">
                CRITICAL: Do NOT examine throat, do NOT agitate child, do NOT lay child down
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Etiology:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Haemophilus influenzae type B (rare now due to vaccine)</li>
                <li>Strep species, Staph aureus</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Classic Presentation - "4 Ds":</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Drooling (can't swallow secretions)</li>
                <li>Dysphagia (difficulty swallowing)</li>
                <li>Dysphonia (muffled voice)</li>
                <li>Distress (respiratory)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Additional Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Tripod positioning (leaning forward)</li>
                <li>Toxic appearance</li>
                <li>High fever (&gt;39°C)</li>
                <li>Inspiratory stridor</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Management:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Keep child calm, allow preferred position</li>
                <li>Secure airway in OR with experienced team</li>
                <li>Intubation often needed</li>
                <li>IV antibiotics after airway secured</li>
                <li>NO throat examination until airway secured</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Sorter */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Interactive Airway Emergency Sorter</CardTitle>
          <CardDescription>Practice differentiating croup from epiglottitis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Select a Case:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {airwayCases.map(c => (
                <Button
                  key={c.id}
                  variant={selectedCase === c.id ? 'default' : 'outline'}
                  onClick={() => handleCaseSelect(c.id)}
                  className="w-full"
                >
                  Case {c.id}
                </Button>
              ))}
            </div>
          </div>

          {currentCase && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div><span className="font-semibold">Age:</span> {currentCase.age}</div>
                  <div><span className="font-semibold">Cough:</span> {currentCase.cough}</div>
                  <div><span className="font-semibold">Voice:</span> {currentCase.voice}</div>
                  <div><span className="font-semibold">Drooling:</span> {currentCase.drooling}</div>
                </div>
                <div className="space-y-2">
                  <div><span className="font-semibold">Posture:</span> {currentCase.posture}</div>
                  <div><span className="font-semibold">Onset:</span> {currentCase.onset}</div>
                  <div><span className="font-semibold">Fever:</span> {currentCase.fever}</div>
                </div>
              </div>

              <Button onClick={() => setShowAnswer(!showAnswer)} className="w-full">
                {showAnswer ? 'Hide' : 'Show'} Diagnosis
              </Button>

              {showAnswer && (
                <div className={`p-4 rounded-md border space-y-2 ${
                  currentCase.diagnosis.includes('Epiglottitis')
                    ? 'bg-red-500/10 border-red-500/50'
                    : 'bg-green-500/10 border-green-500/50'
                }`}>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg">{currentCase.diagnosis}</h4>
                      <p className="text-sm mt-2">{currentCase.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
              <span>Croup: barky cough, hoarse voice, gradual onset, responds to steroids</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Epiglottitis: drooling, muffled voice, tripod position, toxic appearance - AIRWAY EMERGENCY</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Epiglottitis is now rare due to Hib vaccination</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>NEVER examine throat in suspected epiglottitis - can precipitate complete airway obstruction</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Steeple sign (croup) vs Thumb sign (epiglottitis) on X-ray</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Croup;
