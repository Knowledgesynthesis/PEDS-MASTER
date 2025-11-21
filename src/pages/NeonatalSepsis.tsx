import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Baby } from 'lucide-react';

const NeonatalSepsis: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [maternalFever, setMaternalFever] = useState(false);
  const [gbsStatus, setGbsStatus] = useState<string>('');
  const [prolongedRupture, setProlongedRupture] = useState(false);
  const [result, setResult] = useState<string>('');

  const calculateRisk = () => {
    let riskLevel = '';
    const ageInHours = parseInt(age);

    if (!age) {
      setResult('Please enter the newborn\'s age in hours.');
      return;
    }

    if (ageInHours < 72) {
      // Early onset sepsis
      if (maternalFever || gbsStatus === 'positive' || prolongedRupture) {
        riskLevel = 'HIGH RISK - Early Onset Sepsis: Consider full sepsis workup (CBC, blood culture, LP if indicated). Maternal risk factors present.';
      } else if (gbsStatus === 'unknown') {
        riskLevel = 'MODERATE RISK - Early Onset Sepsis: Unknown GBS status increases risk. Consider clinical monitoring and possible workup based on symptoms.';
      } else {
        riskLevel = 'LOW RISK - Early Onset Sepsis: No major maternal risk factors identified. Monitor for clinical signs.';
      }
    } else {
      // Late onset sepsis
      riskLevel = 'LATE ONSET SEPSIS (>72 hours): Different pathogens (E. coli, Staph). Consider environmental and nosocomial sources. Full workup if symptomatic.';
    }

    setResult(riskLevel);
  };

  const resetTool = () => {
    setAge('');
    setMaternalFever(false);
    setGbsStatus('');
    setProlongedRupture(false);
    setResult('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Baby className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Neonatal Sepsis</h1>
          <p className="text-muted-foreground mt-1">Early vs late onset, risk factors, and evaluation</p>
        </div>
      </div>

      {/* Educational Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Early Onset Sepsis (&lt;72 hours)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Risk Factors:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Maternal GBS colonization (positive status)</li>
                <li>Maternal fever &gt;38°C (100.4°F)</li>
                <li>Prolonged rupture of membranes (&gt;18 hours)</li>
                <li>Chorioamnionitis</li>
                <li>Prematurity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Pathogens:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Group B Streptococcus (GBS)</li>
                <li>E. coli</li>
                <li>Listeria monocytogenes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Late Onset Sepsis (&gt;72 hours)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Risk Factors:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Prolonged hospitalization</li>
                <li>Central lines or invasive devices</li>
                <li>Environmental exposure</li>
                <li>Prematurity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Pathogens:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Coagulase-negative Staphylococci</li>
                <li>E. coli</li>
                <li>Klebsiella</li>
                <li>Candida (in very premature infants)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Presentation */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Presentation</CardTitle>
          <CardDescription>Symptoms can be subtle and non-specific</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">General Signs:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Temperature instability (fever or hypothermia)</li>
                <li>Poor feeding or feeding intolerance</li>
                <li>Lethargy or irritability</li>
                <li>Hypotonia</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Specific Signs:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Respiratory distress (tachypnea, grunting)</li>
                <li>Apnea or bradycardia</li>
                <li>Jaundice (especially if early or severe)</li>
                <li>Abdominal distension</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Risk Assessment Tool */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Interactive Sepsis Risk Assessment</CardTitle>
          <CardDescription>Educational tool for understanding risk stratification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Newborn Age (hours):
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age in hours"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Maternal GBS Status:
              </label>
              <select
                value={gbsStatus}
                onChange={(e) => setGbsStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select...</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={maternalFever}
                onChange={(e) => setMaternalFever(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Maternal fever &gt;38°C during labor</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={prolongedRupture}
                onChange={(e) => setProlongedRupture(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Prolonged rupture of membranes (&gt;18 hours)</span>
            </label>
          </div>

          <div className="flex space-x-3">
            <Button onClick={calculateRisk} className="flex-1">
              Calculate Risk
            </Button>
            <Button onClick={resetTool} variant="outline">
              Reset
            </Button>
          </div>

          {result && (
            <div className={`p-4 rounded-md ${
              result.includes('HIGH') ? 'bg-red-500/10 border border-red-500/50' :
              result.includes('MODERATE') ? 'bg-yellow-500/10 border border-yellow-500/50' :
              'bg-green-500/10 border border-green-500/50'
            }`}>
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{result}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workup and Management */}
      <Card>
        <CardHeader>
          <CardTitle>Workup and Management</CardTitle>
          <CardDescription>Educational overview (not for clinical use)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Laboratory Evaluation:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>CBC with differential (look for leukopenia, left shift, thrombocytopenia)</li>
              <li>Blood culture (gold standard for diagnosis)</li>
              <li>C-reactive protein (CRP) - may be normal early</li>
              <li>Lumbar puncture (LP) if high clinical suspicion or abnormal labs</li>
              <li>Urine culture (typically in late-onset sepsis)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">When to Consider LP:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Positive blood culture</li>
              <li>High clinical suspicion for meningitis</li>
              <li>Abnormal labs (very high or low WBC)</li>
              <li>Persistent fever or clinical deterioration</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Empiric Treatment Considerations:</h4>
            <p className="text-sm text-muted-foreground mb-2">
              This platform does not provide specific dosing. Typical empiric coverage targets GBS and E. coli.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Early onset: Ampicillin + Gentamicin (or Cefotaxime)</li>
              <li>Late onset: Consider broader coverage based on risk factors</li>
              <li>Always adjust based on culture results and sensitivities</li>
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
              <span>Early onset (&lt;72h) vs late onset (&gt;72h) have different risk factors and pathogens</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Maternal GBS status, fever, and prolonged ROM are major early-onset risk factors</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Symptoms are often subtle: temperature instability, poor feeding, lethargy</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Blood culture is the gold standard for diagnosis</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>LP should be considered when suspicion is high or labs are abnormal</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeonatalSepsis;
