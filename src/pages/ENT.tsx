import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Ear } from 'lucide-react';

const ENT: React.FC = () => {
  const [tmAppearance, setTmAppearance] = useState<string>('');
  const [acuteSymptoms, setAcuteSymptoms] = useState(false);
  const [earPain, setEarPain] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string>('');

  const diagnoseTM = () => {
    if (!tmAppearance) {
      setDiagnosis('Please select a tympanic membrane appearance.');
      return;
    }

    if (tmAppearance === 'bulging' && (acuteSymptoms || earPain)) {
      setDiagnosis('Acute Otitis Media (AOM): Bulging TM with acute symptoms indicates middle ear infection requiring treatment.');
    } else if (tmAppearance === 'bulging' && !acuteSymptoms && !earPain) {
      setDiagnosis('Likely Otitis Media with Effusion (OME): Bulging TM without acute symptoms suggests fluid without infection. Observation often appropriate.');
    } else if (tmAppearance === 'retracted' || tmAppearance === 'dull') {
      setDiagnosis('Otitis Media with Effusion (OME): Retracted or dull TM suggests middle ear fluid without infection. Watchful waiting typically appropriate.');
    } else if (tmAppearance === 'normal') {
      setDiagnosis('Normal TM: No evidence of otitis media.');
    } else {
      setDiagnosis('Perforated TM: May see drainage. Consider AOM with perforation if acute symptoms present.');
    }
  };

  const resetDiagnosis = () => {
    setTmAppearance('');
    setAcuteSymptoms(false);
    setEarPain(false);
    setDiagnosis('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Ear className="h-8 w-8 text-purple-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ENT & Throat Infections</h1>
          <p className="text-muted-foreground mt-1">Otitis media and strep pharyngitis</p>
        </div>
      </div>

      {/* AOM vs OME */}
      <Card>
        <CardHeader>
          <CardTitle>AOM vs OME: Critical Distinction</CardTitle>
          <CardDescription>Proper diagnosis determines need for antibiotics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Feature</th>
                  <th className="text-left py-3 px-2">AOM (Acute Otitis Media)</th>
                  <th className="text-left py-3 px-2">OME (Otitis Media with Effusion)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">TM Appearance</td>
                  <td className="py-3 px-2">Bulging, opaque, decreased mobility</td>
                  <td className="py-3 px-2">Retracted or neutral, air-fluid level, decreased mobility</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Symptoms</td>
                  <td className="py-3 px-2">Acute onset, ear pain, fever, irritability</td>
                  <td className="py-3 px-2">No acute symptoms, may have hearing loss</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Middle Ear Effusion</td>
                  <td className="py-3 px-2">Present + infection</td>
                  <td className="py-3 px-2">Present, no infection</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Treatment</td>
                  <td className="py-3 px-2">Antibiotics (if meets criteria)</td>
                  <td className="py-3 px-2">Observation, resolves spontaneously</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Acute Otitis Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acute Otitis Media (AOM)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Diagnostic Criteria (ALL required):</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Acute onset of symptoms</li>
                <li>Middle ear effusion (bulging TM, decreased mobility)</li>
                <li>Signs of middle ear inflammation (otalgia, TM erythema)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Common Pathogens:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Streptococcus pneumoniae</li>
                <li>Haemophilus influenzae (non-typeable)</li>
                <li>Moraxella catarrhalis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Treatment Approach:</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Observation vs immediate antibiotics based on:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Age &lt;6 months: Always treat</li>
                <li>Age 6-24 months with certain diagnosis: Treat</li>
                <li>Age ≥24 months with mild symptoms: May observe 48-72h</li>
                <li>Severe symptoms (fever ≥39°C, severe pain): Treat</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Complications:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Mastoiditis</li>
                <li>TM perforation</li>
                <li>Hearing loss (usually temporary)</li>
                <li>Intracranial (rare): meningitis, abscess</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Otitis Media with Effusion (OME)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-2">Definition:</h4>
              <p className="text-sm text-muted-foreground">
                Middle ear fluid without signs or symptoms of acute infection. Often follows AOM or URI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Clinical Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>No otalgia or fever</li>
                <li>May have hearing loss (conductive)</li>
                <li>Retracted or dull TM</li>
                <li>Air-fluid level or bubbles visible</li>
                <li>Decreased TM mobility on pneumatic otoscopy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Management:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Observation - most resolve in 3 months</li>
                <li>No antibiotics indicated</li>
                <li>Monitor hearing if persistent (&gt;3 months)</li>
                <li>Consider tympanostomy tubes if persistent &gt;3 months with hearing loss</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">When to Refer ENT:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Persistent effusion &gt;3 months with hearing loss</li>
                <li>Structural damage to TM</li>
                <li>Recurrent AOM (≥3 in 6 months or ≥4 in 12 months)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive TM Diagnosis Tool */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Interactive Otitis Media Diagnostic Tool</CardTitle>
          <CardDescription>Practice distinguishing AOM from OME</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tympanic Membrane Appearance:
            </label>
            <select
              value={tmAppearance}
              onChange={(e) => setTmAppearance(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="bulging">Bulging, opaque</option>
              <option value="retracted">Retracted</option>
              <option value="dull">Dull, air-fluid level</option>
              <option value="normal">Normal, translucent</option>
              <option value="perforation">Perforation with drainage</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={acuteSymptoms}
                onChange={(e) => setAcuteSymptoms(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Acute onset of symptoms (fever, irritability)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={earPain}
                onChange={(e) => setEarPain(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Ear pain (otalgia)</span>
            </label>
          </div>

          <div className="flex space-x-3">
            <Button onClick={diagnoseTM} className="flex-1">
              Diagnose
            </Button>
            <Button onClick={resetDiagnosis} variant="outline">
              Reset
            </Button>
          </div>

          {diagnosis && (
            <div className="p-4 rounded-md bg-primary/10 border border-primary/50">
              <p className="text-sm">{diagnosis}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strep Pharyngitis */}
      <Card>
        <CardHeader>
          <CardTitle>Streptococcal Pharyngitis</CardTitle>
          <CardDescription>Group A Streptococcus (GAS) pharyngitis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Centor Criteria (Modified):</h4>
                <p className="text-sm text-muted-foreground mb-2">Estimate probability of strep pharyngitis:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Tonsillar exudates (+1)</li>
                  <li>Tender anterior cervical lymphadenopathy (+1)</li>
                  <li>Fever &gt;38°C (+1)</li>
                  <li>Absence of cough (+1)</li>
                  <li>Age 3-14 years (+1) or Age ≥45 years (-1)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Score ≥4: High probability, test and treat if positive
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Diagnosis:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Rapid antigen detection test (RADT)</li>
                  <li>Throat culture (if RADT negative in children)</li>
                  <li>Do NOT treat based on clinical criteria alone</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Classic Presentation:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Sudden onset sore throat</li>
                  <li>Fever, often &gt;38.5°C</li>
                  <li>Tonsillar exudates (white patches)</li>
                  <li>Palatal petechiae</li>
                  <li>Tender anterior cervical nodes</li>
                  <li>Absence of cough, rhinorrhea, conjunctivitis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Complications (if untreated):</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Acute rheumatic fever (most important reason to treat)</li>
                  <li>Post-streptococcal glomerulonephritis</li>
                  <li>Peritonsillar abscess</li>
                  <li>Scarlet fever (rash)</li>
                </ul>
              </div>
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
              <span>AOM requires ALL three: acute onset, middle ear effusion, signs of inflammation</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>OME has middle ear fluid WITHOUT acute symptoms - no antibiotics needed</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Not all AOM requires immediate antibiotics - consider observation in older children with mild symptoms</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Strep pharyngitis: Use Centor criteria to guide testing, confirm with RADT or culture</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Treat strep to prevent acute rheumatic fever, not just to shorten illness</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ENT;
