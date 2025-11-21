import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Wind, AlertCircle } from 'lucide-react';

const Bronchiolitis: React.FC = () => {
  const [rr, setRr] = useState<string>('');
  const [o2Sat, setO2Sat] = useState<string>('');
  const [feeding, setFeeding] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  const assessSeverity = () => {
    const respiratoryRate = parseInt(rr);
    const saturation = parseInt(o2Sat);

    if (!rr || !o2Sat || !feeding) {
      setSeverity('Please fill in all fields.');
      return;
    }

    let level = '';
    let recommendation = '';

    // Severe criteria
    if (saturation < 90 || respiratoryRate > 70 || feeding === 'unable') {
      level = 'SEVERE';
      recommendation = 'Consider hospitalization. Needs close monitoring, supplemental oxygen likely needed. May require IV fluids if unable to feed.';
    }
    // Moderate criteria
    else if ((saturation >= 90 && saturation < 94) || (respiratoryRate >= 60 && respiratoryRate <= 70) || feeding === 'reduced') {
      level = 'MODERATE';
      recommendation = 'Close observation required. May need hospitalization depending on age and risk factors. Consider supplemental oxygen if saturations remain <94%.';
    }
    // Mild criteria
    else {
      level = 'MILD';
      recommendation = 'Likely safe for outpatient management with close follow-up. Supportive care, adequate hydration, return precautions for worsening.';
    }

    setSeverity(`Severity: ${level}\n\n${recommendation}`);
  };

  const resetAssessment = () => {
    setRr('');
    setO2Sat('');
    setFeeding('');
    setSeverity('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Wind className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bronchiolitis (RSV)</h1>
          <p className="text-muted-foreground mt-1">Viral pathophysiology and supportive management</p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Viral infection of the small airways (bronchioles)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2">Definition:</h4>
            <p className="text-sm text-muted-foreground">
              Bronchiolitis is a lower respiratory tract infection affecting the small airways (bronchioles), most commonly in infants and children under 2 years of age. It is characterized by inflammation, edema, and mucus plugging of the bronchioles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Epidemiology:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Peak incidence: 2-6 months of age</li>
              <li>Seasonal: Winter and early spring</li>
              <li>Leading cause of hospitalization in infants</li>
              <li>Nearly all children infected by age 2</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Etiology */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Common Pathogens</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-24">RSV (70%):</span>
                <span className="text-muted-foreground">Most common cause, especially in infants</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-24">Rhinovirus:</span>
                <span className="text-muted-foreground">Second most common</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-24">Other viruses:</span>
                <span className="text-muted-foreground">Parainfluenza, adenovirus, influenza, human metapneumovirus</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High-Risk Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Premature infants (especially &lt;35 weeks)</li>
              <li>Chronic lung disease (BPD)</li>
              <li>Congenital heart disease</li>
              <li>Immunodeficiency</li>
              <li>Age &lt;3 months</li>
              <li>Neuromuscular disorders</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Presentation */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Presentation</CardTitle>
          <CardDescription>Typical progression over 3-5 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Prodrome (1-3 days):</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Rhinorrhea, congestion</li>
                <li>Low-grade fever</li>
                <li>Decreased appetite</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lower Respiratory Phase (Days 3-5):</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Tachypnea (increased respiratory rate)</li>
                <li>Increased work of breathing (retractions, nasal flaring)</li>
                <li>Wheezing, crackles on exam</li>
                <li>Hypoxia (low oxygen saturation)</li>
                <li>Difficulty feeding due to respiratory distress</li>
                <li>Apnea (especially in young infants &lt;3 months)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Physical Exam Findings:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Tachypnea, tachycardia</li>
                <li>Subcostal and intercostal retractions</li>
                <li>Nasal flaring, grunting</li>
                <li>Bilateral wheezing and crackles</li>
                <li>Prolonged expiratory phase</li>
                <li>Hyperinflation of chest</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Severity Assessment */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Bronchiolitis Severity Assessment</CardTitle>
          <CardDescription>Educational tool for severity stratification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Respiratory Rate (breaths/min):
              </label>
              <input
                type="number"
                value={rr}
                onChange={(e) => setRr(e.target.value)}
                placeholder="e.g., 45"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Oxygen Saturation (%):
              </label>
              <input
                type="number"
                value={o2Sat}
                onChange={(e) => setO2Sat(e.target.value)}
                placeholder="e.g., 92"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Feeding Status:
            </label>
            <select
              value={feeding}
              onChange={(e) => setFeeding(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="normal">Normal feeding</option>
              <option value="reduced">Reduced feeding (&lt;50% of normal)</option>
              <option value="unable">Unable to feed</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <Button onClick={assessSeverity} className="flex-1">
              Assess Severity
            </Button>
            <Button onClick={resetAssessment} variant="outline">
              Reset
            </Button>
          </div>

          {severity && (
            <div className={`p-4 rounded-md ${
              severity.includes('SEVERE') ? 'bg-red-500/10 border border-red-500/50' :
              severity.includes('MODERATE') ? 'bg-yellow-500/10 border border-yellow-500/50' :
              'bg-green-500/10 border border-green-500/50'
            }`}>
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm whitespace-pre-line">{severity}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Management */}
      <Card>
        <CardHeader>
          <CardTitle>Management</CardTitle>
          <CardDescription>Supportive care is the cornerstone of treatment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Supportive Care:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Oxygen supplementation to maintain SpO2 ≥90%</li>
              <li>Hydration (oral or IV fluids if unable to feed)</li>
              <li>Nasal suctioning for secretion clearance</li>
              <li>Positioning (head of bed elevated)</li>
              <li>Close monitoring of respiratory status</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-md">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Important: Bronchodilators NOT Helpful</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Multiple studies show that bronchodilators (albuterol, salbutamol) do not improve outcomes in bronchiolitis. They are not routinely recommended. This is different from asthma management.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">What NOT to Do:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Routine bronchodilators (albuterol) - not beneficial</li>
              <li>Routine corticosteroids - not beneficial</li>
              <li>Antibiotics (unless secondary bacterial infection suspected)</li>
              <li>Chest physiotherapy - not beneficial</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Indications for Hospitalization:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Oxygen saturation &lt;90% on room air</li>
              <li>Severe respiratory distress (RR &gt;70, significant retractions)</li>
              <li>Apnea episodes</li>
              <li>Dehydration or inability to feed</li>
              <li>Age &lt;3 months or high-risk conditions</li>
              <li>Unreliable follow-up or social concerns</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Prevention */}
      <Card>
        <CardHeader>
          <CardTitle>Prevention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2">RSV Prophylaxis (Palivizumab):</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Monthly injections during RSV season for high-risk infants:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Premature infants &lt;29 weeks gestation in first year of life</li>
              <li>Infants with chronic lung disease requiring therapy</li>
              <li>Infants with hemodynamically significant congenital heart disease</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">General Prevention:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Hand hygiene</li>
              <li>Avoid exposure to sick contacts</li>
              <li>No smoking around infants</li>
              <li>Breastfeeding (protective)</li>
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
              <span>RSV is the most common cause of bronchiolitis in infants</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Supportive care is the mainstay of treatment - NO bronchodilators or steroids routinely</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Assess severity based on oxygen saturation, respiratory rate, and feeding ability</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>High-risk groups: premature infants, chronic lung disease, CHD, age &lt;3 months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Hospitalize for hypoxia (SpO2 &lt;90%), severe distress, or inability to feed</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bronchiolitis;
