import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Droplet, AlertCircle } from 'lucide-react';

const Fluids: React.FC = () => {
  const [skinTurgor, setSkinTurgor] = useState<string>('');
  const [mucousMembranes, setMucousMembranes] = useState<string>('');
  const [urine, setUrine] = useState<string>('');
  const [capRefill, setCapRefill] = useState<string>('');
  const [mentalStatus, setMentalStatus] = useState<string>('');
  const [dehydrationLevel, setDehydrationLevel] = useState<string>('');

  const assessDehydration = () => {
    if (!skinTurgor || !mucousMembranes || !urine || !capRefill || !mentalStatus) {
      setDehydrationLevel('Please answer all questions.');
      return;
    }

    // Simplified dehydration assessment
    if (
      skinTurgor === 'very-poor' ||
      mucousMembranes === 'very-dry' ||
      urine === 'minimal' ||
      capRefill === 'prolonged' ||
      mentalStatus === 'lethargic'
    ) {
      setDehydrationLevel('SEVERE DEHYDRATION (>9% weight loss): Signs of shock. Requires immediate IV fluid resuscitation. Bolus 20 mL/kg isotonic saline, repeat as needed.');
    } else if (
      skinTurgor === 'decreased' ||
      mucousMembranes === 'dry' ||
      urine === 'decreased' ||
      capRefill === 'delayed' ||
      mentalStatus === 'irritable'
    ) {
      setDehydrationLevel('MODERATE DEHYDRATION (6-9% weight loss): Requires fluid replacement. May try oral rehydration therapy (ORT) if tolerating. If not, IV fluids indicated.');
    } else {
      setDehydrationLevel('MILD DEHYDRATION (<5% weight loss): Can likely manage with oral rehydration therapy (ORT). Frequent small amounts of fluids, reassess frequently.');
    }
  };

  const resetAssessment = () => {
    setSkinTurgor('');
    setMucousMembranes('');
    setUrine('');
    setCapRefill('');
    setMentalStatus('');
    setDehydrationLevel('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Droplet className="h-8 w-8 text-cyan-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pediatric Dehydration & Fluids</h1>
          <p className="text-muted-foreground mt-1">Assessment and fluid management</p>
        </div>
      </div>

      {/* Dehydration Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Dehydration Severity Classification</CardTitle>
          <CardDescription>Clinical assessment of fluid deficit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Clinical Feature</th>
                  <th className="text-left py-3 px-2">Mild (&lt;5%)</th>
                  <th className="text-left py-3 px-2">Moderate (6-9%)</th>
                  <th className="text-left py-3 px-2">Severe (&gt;9%)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Mental status</td>
                  <td className="py-3 px-2">Alert, normal</td>
                  <td className="py-3 px-2">Irritable, restless</td>
                  <td className="py-3 px-2">Lethargic, obtunded</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Mucous membranes</td>
                  <td className="py-3 px-2">Slightly dry</td>
                  <td className="py-3 px-2">Dry</td>
                  <td className="py-3 px-2">Parched, cracked</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Tears</td>
                  <td className="py-3 px-2">Present</td>
                  <td className="py-3 px-2">Decreased</td>
                  <td className="py-3 px-2">Absent</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Skin turgor</td>
                  <td className="py-3 px-2">Normal</td>
                  <td className="py-3 px-2">Decreased (skin recoils in &lt;2 sec)</td>
                  <td className="py-3 px-2">Tenting (skin recoils in &gt;2 sec)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Capillary refill</td>
                  <td className="py-3 px-2">&lt;2 seconds</td>
                  <td className="py-3 px-2">2-3 seconds</td>
                  <td className="py-3 px-2">&gt;3 seconds</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Urine output</td>
                  <td className="py-3 px-2">Slightly decreased</td>
                  <td className="py-3 px-2">Decreased (&lt;1 mL/kg/hr)</td>
                  <td className="py-3 px-2">Minimal to absent</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Heart rate</td>
                  <td className="py-3 px-2">Normal</td>
                  <td className="py-3 px-2">Increased</td>
                  <td className="py-3 px-2">Very increased, thready pulse</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Blood pressure</td>
                  <td className="py-3 px-2">Normal</td>
                  <td className="py-3 px-2">Normal to low</td>
                  <td className="py-3 px-2">Low (hypotensive = shock)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Dehydration Assessment */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Interactive Dehydration Assessment</CardTitle>
          <CardDescription>Educational tool for practice assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Skin Turgor:</label>
            <select
              value={skinTurgor}
              onChange={(e) => setSkinTurgor(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="normal">Normal (immediate recoil)</option>
              <option value="decreased">Decreased (recoils &lt;2 sec)</option>
              <option value="very-poor">Tenting (recoils &gt;2 sec)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mucous Membranes:</label>
            <select
              value={mucousMembranes}
              onChange={(e) => setMucousMembranes(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="moist">Moist</option>
              <option value="dry">Dry</option>
              <option value="very-dry">Parched, cracked</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Urine Output:</label>
            <select
              value={urine}
              onChange={(e) => setUrine(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="normal">Normal</option>
              <option value="decreased">Decreased</option>
              <option value="minimal">Minimal to absent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Capillary Refill:</label>
            <select
              value={capRefill}
              onChange={(e) => setCapRefill(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="normal">&lt;2 seconds</option>
              <option value="delayed">2-3 seconds</option>
              <option value="prolonged">&gt;3 seconds</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mental Status:</label>
            <select
              value={mentalStatus}
              onChange={(e) => setMentalStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="alert">Alert, normal</option>
              <option value="irritable">Irritable, restless</option>
              <option value="lethargic">Lethargic, obtunded</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <Button onClick={assessDehydration} className="flex-1">
              Assess Dehydration
            </Button>
            <Button onClick={resetAssessment} variant="outline">
              Reset
            </Button>
          </div>

          {dehydrationLevel && (
            <div className={`p-4 rounded-md ${
              dehydrationLevel.includes('SEVERE') ? 'bg-red-500/10 border border-red-500/50' :
              dehydrationLevel.includes('MODERATE') ? 'bg-yellow-500/10 border border-yellow-500/50' :
              'bg-green-500/10 border border-green-500/50'
            }`}>
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{dehydrationLevel}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fluid Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Oral Rehydration Therapy (ORT)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Indications:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Mild to moderate dehydration</li>
                <li>Child able to tolerate oral fluids</li>
                <li>No shock or severe illness</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Approach:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Frequent, small amounts (5 mL every 1-2 minutes)</li>
                <li>Increase volume as tolerated</li>
                <li>Use commercial ORS (proper electrolyte balance)</li>
                <li>Avoid high-sugar drinks (juice, soda)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">ORT Volume (educational):</h4>
              <p className="text-sm text-muted-foreground">
                Mild dehydration: 50 mL/kg over 4 hours<br />
                Moderate dehydration: 100 mL/kg over 4 hours<br />
                Plus replacement of ongoing losses
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IV Fluid Therapy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Indications:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Severe dehydration or shock</li>
                <li>Unable to tolerate oral fluids (persistent vomiting)</li>
                <li>Altered mental status</li>
                <li>Failed ORT</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Approach (educational):</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Resuscitation (if shock):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Isotonic saline bolus 20 mL/kg over 20-30 minutes</li>
                <li>Repeat up to 60 mL/kg total if needed</li>
                <li>Reassess after each bolus</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3 mb-2">
                <strong>Rehydration:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Replace deficit over 24-48 hours</li>
                <li>Add maintenance fluids</li>
                <li>Replace ongoing losses</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Fluids */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Fluid Calculations</CardTitle>
          <CardDescription>Educational overview - not for clinical calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Holliday-Segar Method (4-2-1 Rule):</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">For calculating hourly maintenance fluid rates:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>First 10 kg: 4 mL/kg/hr</li>
                <li>Second 10 kg (10-20 kg): 2 mL/kg/hr</li>
                <li>Each kg above 20 kg: 1 mL/kg/hr</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                <strong>Example:</strong> For a 25 kg child:<br />
                (10 × 4) + (10 × 2) + (5 × 1) = 40 + 20 + 5 = 65 mL/hr
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Daily Fluid Requirements (Alternative):</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>0-10 kg: 100 mL/kg/day</li>
              <li>10-20 kg: 1000 mL + 50 mL/kg for each kg above 10</li>
              <li>&gt;20 kg: 1500 mL + 20 mL/kg for each kg above 20</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-md">
            <p className="text-sm">
              <strong>Important:</strong> These are educational formulas. Clinical fluid management must consider the child's specific condition, ongoing losses, and electrolyte abnormalities. Always verify with current clinical guidelines.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Common Causes */}
      <Card>
        <CardHeader>
          <CardTitle>Common Causes of Dehydration in Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Gastrointestinal:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Viral gastroenteritis (most common)</li>
                <li>Bacterial gastroenteritis</li>
                <li>Vomiting from any cause</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Other Causes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Fever (increased insensible losses)</li>
                <li>Decreased intake (stomatitis, pharyngitis)</li>
                <li>Diabetic ketoacidosis</li>
                <li>Burns</li>
              </ul>
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
              <span>Assess dehydration severity using multiple clinical signs (skin turgor, mucous membranes, cap refill, mental status)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>ORT is effective for mild-moderate dehydration and preferred when tolerated</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Severe dehydration/shock requires immediate IV bolus (20 mL/kg isotonic saline)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Use proper oral rehydration solution (ORS) - not juice or soda</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>4-2-1 rule helps estimate maintenance fluid needs (educational)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Viral gastroenteritis is the most common cause of dehydration in children</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fluids;
