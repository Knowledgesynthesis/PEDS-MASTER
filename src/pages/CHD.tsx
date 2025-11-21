import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart, AlertCircle } from 'lucide-react';

interface MurmurCase {
  id: number;
  timing: string;
  location: string;
  quality: string;
  radiation: string;
  otherFindings: string;
  diagnosis: string;
  explanation: string;
}

const murmurCases: MurmurCase[] = [
  {
    id: 1,
    timing: 'Continuous',
    location: 'Left infraclavicular area',
    quality: 'Machine-like',
    radiation: 'Back',
    otherFindings: 'Bounding pulses, wide pulse pressure',
    diagnosis: 'Patent Ductus Arteriosus (PDA)',
    explanation: 'Continuous "machinery" murmur is classic for PDA. The ductus connects the aorta to pulmonary artery, causing continuous flow throughout the cardiac cycle.'
  },
  {
    id: 2,
    timing: 'Holosystolic',
    location: 'Left lower sternal border',
    quality: 'Harsh, blowing',
    radiation: 'Across precordium',
    otherFindings: 'Failure to thrive, recurrent infections',
    diagnosis: 'Ventricular Septal Defect (VSD)',
    explanation: 'Holosystolic murmur at LLSB is characteristic of VSD. Left-to-right shunt can cause heart failure symptoms in infants with large defects.'
  },
  {
    id: 3,
    timing: 'Systolic ejection',
    location: 'Left upper sternal border',
    quality: 'Crescendo-decrescendo',
    radiation: 'Back',
    otherFindings: 'Fixed split S2, exercise intolerance',
    diagnosis: 'Atrial Septal Defect (ASD)',
    explanation: 'Fixed split S2 is pathognomonic for ASD. The left-to-right shunt at atrial level causes increased flow through the pulmonary valve, creating the ejection murmur.'
  },
  {
    id: 4,
    timing: 'Holosystolic',
    location: 'Apex',
    quality: 'High-pitched, blowing',
    radiation: 'Axilla',
    otherFindings: 'History of endocarditis',
    diagnosis: 'Mitral Regurgitation',
    explanation: 'Holosystolic murmur at apex radiating to axilla indicates mitral valve incompetence. Can be congenital or acquired (rheumatic fever, endocarditis).'
  },
  {
    id: 5,
    timing: 'Systolic ejection',
    location: 'Right upper sternal border',
    quality: 'Harsh, crescendo-decrescendo',
    radiation: 'Neck',
    otherFindings: 'Ejection click, normal S2',
    diagnosis: 'Aortic Stenosis',
    explanation: 'Ejection murmur at RUSB with radiation to neck suggests aortic stenosis. The click indicates a bicuspid aortic valve in many pediatric cases.'
  },
  {
    id: 6,
    timing: 'Systolic ejection',
    location: 'Left upper sternal border',
    quality: 'Crescendo-decrescendo',
    radiation: 'Back',
    otherFindings: 'No cyanosis, active child',
    diagnosis: 'Pulmonary Stenosis',
    explanation: 'Ejection murmur at LUSB with radiation to back suggests pulmonary stenosis. Often well-tolerated in mild-moderate cases.'
  }
];

const CHD: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCaseSelect = (id: number) => {
    setSelectedCase(id);
    setShowAnswer(false);
  };

  const currentCase = murmurCases.find(c => c.id === selectedCase);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Heart className="h-8 w-8 text-pink-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Congenital Heart Disease</h1>
          <p className="text-muted-foreground mt-1">ASD, VSD, PDA - Murmurs and physiology</p>
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atrial Septal Defect (ASD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Fixed split S2 (pathognomonic)</li>
                <li>Systolic ejection murmur at LUSB</li>
                <li>Left-to-right shunt at atrial level</li>
                <li>Often asymptomatic in childhood</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Symptoms:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Exercise intolerance</li>
                <li>Fatigue</li>
                <li>Recurrent respiratory infections</li>
                <li>May be asymptomatic until adulthood</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventricular Septal Defect (VSD)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Holosystolic murmur at LLSB</li>
                <li>Harsh, blowing quality</li>
                <li>Left-to-right shunt at ventricular level</li>
                <li>Most common congenital heart defect</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Symptoms (large VSDs):</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Failure to thrive</li>
                <li>Tachypnea, diaphoresis with feeds</li>
                <li>Recurrent respiratory infections</li>
                <li>Small VSDs may be asymptomatic</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patent Ductus Arteriosus (PDA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Continuous "machine-like" murmur</li>
                <li>Best heard at left infraclavicular area</li>
                <li>Bounding pulses, wide pulse pressure</li>
                <li>Common in premature infants</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Symptoms:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Heart failure (if large)</li>
                <li>Failure to thrive</li>
                <li>Respiratory distress</li>
                <li>May be asymptomatic if small</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cyanotic vs Acyanotic */}
      <Card>
        <CardHeader>
          <CardTitle>Cyanotic vs Acyanotic CHD</CardTitle>
          <CardDescription>Classification based on presence of cyanosis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-500">Acyanotic (Left-to-Right Shunts)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Oxygenated blood from left heart mixes with right heart circulation
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>VSD (most common)</li>
                <li>ASD</li>
                <li>PDA</li>
                <li>AV canal defects</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Result:</strong> Increased pulmonary blood flow, possible heart failure
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-purple-500">Cyanotic (Right-to-Left Shunts)</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Deoxygenated blood bypasses lungs and enters systemic circulation
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Tetralogy of Fallot (most common)</li>
                <li>Transposition of great arteries</li>
                <li>Tricuspid atresia</li>
                <li>Total anomalous pulmonary venous return</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Result:</strong> Cyanosis, hypoxemia, clubbing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Murmur Mapper */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Interactive Murmur Mapper</CardTitle>
          <CardDescription>Practice identifying congenital heart defects based on murmur characteristics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Select a Case:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {murmurCases.map(c => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Timing:</span>
                    <p className="text-muted-foreground">{currentCase.timing}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span>
                    <p className="text-muted-foreground">{currentCase.location}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Quality:</span>
                    <p className="text-muted-foreground">{currentCase.quality}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Radiation:</span>
                    <p className="text-muted-foreground">{currentCase.radiation}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Other Findings:</span>
                    <p className="text-muted-foreground">{currentCase.otherFindings}</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => setShowAnswer(!showAnswer)} className="w-full">
                {showAnswer ? 'Hide' : 'Show'} Diagnosis
              </Button>

              {showAnswer && (
                <div className="p-4 rounded-md bg-primary/10 border border-primary/50 space-y-2">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
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

      {/* Shunt Physiology */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Shunt Physiology (Qp/Qs)</CardTitle>
          <CardDescription>Conceptual overview of pulmonary to systemic flow ratio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Qp/Qs represents the ratio of pulmonary blood flow (Qp) to systemic blood flow (Qs). It helps quantify the magnitude of shunting.
          </p>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="font-semibold min-w-24">Qp/Qs = 1:</span>
              <span className="text-sm text-muted-foreground">Normal - no shunt</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold min-w-24">Qp/Qs &gt; 1:</span>
              <span className="text-sm text-muted-foreground">Left-to-right shunt (ASD, VSD, PDA) - increased pulmonary flow</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold min-w-24">Qp/Qs &lt; 1:</span>
              <span className="text-sm text-muted-foreground">Right-to-left shunt (cyanotic lesions) - decreased pulmonary flow</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold min-w-24">Qp/Qs ≥ 2:</span>
              <span className="text-sm text-muted-foreground">Significant shunt - often requires intervention</span>
            </div>
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
              <span>Fixed split S2 is pathognomonic for ASD</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Holosystolic murmur at LLSB suggests VSD (most common CHD)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Continuous "machinery" murmur is classic for PDA</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Acyanotic lesions (L→R shunt) increase pulmonary blood flow</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Cyanotic lesions (R→L shunt) cause hypoxemia and cyanosis</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Large left-to-right shunts can cause heart failure and FTT in infants</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CHD;
