import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Activity, AlertCircle } from 'lucide-react';

const Asthma: React.FC = () => {
  const [daytimeSymptoms, setDaytimeSymptoms] = useState<string>('');
  const [nightAwakenings, setNightAwakenings] = useState<string>('');
  const [interferenceActivity, setInterferenceActivity] = useState<string>('');
  const [rescueUse, setRescueUse] = useState<string>('');
  const [classification, setClassification] = useState<string>('');

  const classifyAsthma = () => {
    if (!daytimeSymptoms || !nightAwakenings || !interferenceActivity || !rescueUse) {
      setClassification('Please answer all questions.');
      return;
    }

    // Simplified classification logic
    if (
      daytimeSymptoms === 'daily' ||
      nightAwakenings === 'often' ||
      interferenceActivity === 'extreme' ||
      rescueUse === 'daily'
    ) {
      setClassification('SEVERE PERSISTENT: Daily symptoms, frequent nighttime awakenings, extremely limiting activities. Requires step 5-6 therapy (high-dose ICS + LABA + possibly oral steroids).');
    } else if (
      daytimeSymptoms === 'most-days' ||
      nightAwakenings === 'weekly' ||
      interferenceActivity === 'some' ||
      rescueUse === 'most-days'
    ) {
      setClassification('MODERATE PERSISTENT: Daily symptoms, >1 nighttime awakening/week, some activity limitation. Requires step 3-4 therapy (medium-dose ICS or low-dose ICS + LABA).');
    } else if (
      daytimeSymptoms === 'few-days' ||
      nightAwakenings === 'monthly' ||
      interferenceActivity === 'minor' ||
      rescueUse === 'few-days'
    ) {
      setClassification('MILD PERSISTENT: Symptoms >2 days/week but not daily, 3-4 nighttime awakenings/month. Requires step 2 therapy (low-dose ICS).');
    } else {
      setClassification('INTERMITTENT: Symptoms ≤2 days/week, ≤2 nighttime awakenings/month, no interference with activities. Step 1: SABA as needed only.');
    }
  };

  const resetClassification = () => {
    setDaytimeSymptoms('');
    setNightAwakenings('');
    setInterferenceActivity('');
    setRescueUse('');
    setClassification('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Activity className="h-8 w-8 text-green-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Childhood Asthma</h1>
          <p className="text-muted-foreground mt-1">Classification and step-up/down therapy</p>
        </div>
      </div>

      {/* Asthma Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Asthma Severity Classification</CardTitle>
          <CardDescription>Based on impairment and risk (for children ≥5 years)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Components</th>
                  <th className="text-left py-3 px-2">Intermittent</th>
                  <th className="text-left py-3 px-2">Mild Persistent</th>
                  <th className="text-left py-3 px-2">Moderate Persistent</th>
                  <th className="text-left py-3 px-2">Severe Persistent</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Daytime symptoms</td>
                  <td className="py-3 px-2">≤2 days/week</td>
                  <td className="py-3 px-2">&gt;2 days/week but not daily</td>
                  <td className="py-3 px-2">Daily</td>
                  <td className="py-3 px-2">Throughout the day</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Nighttime awakenings</td>
                  <td className="py-3 px-2">≤2x/month</td>
                  <td className="py-3 px-2">3-4x/month</td>
                  <td className="py-3 px-2">&gt;1x/week</td>
                  <td className="py-3 px-2">Often (7x/week)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">SABA use</td>
                  <td className="py-3 px-2">≤2 days/week</td>
                  <td className="py-3 px-2">&gt;2 days/week but not daily</td>
                  <td className="py-3 px-2">Daily</td>
                  <td className="py-3 px-2">Several times/day</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Activity limitation</td>
                  <td className="py-3 px-2">None</td>
                  <td className="py-3 px-2">Minor</td>
                  <td className="py-3 px-2">Some</td>
                  <td className="py-3 px-2">Extremely limited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 font-semibold">Therapy Step</td>
                  <td className="py-3 px-2">Step 1</td>
                  <td className="py-3 px-2">Step 2</td>
                  <td className="py-3 px-2">Step 3-4</td>
                  <td className="py-3 px-2">Step 5-6</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Note:</strong> Classification is determined by the most severe category in which any feature occurs.
          </p>
        </CardContent>
      </Card>

      {/* Interactive Classifier */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Interactive Asthma Severity Classifier</CardTitle>
          <CardDescription>Educational tool for practice classification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              How often does the child have daytime symptoms?
            </label>
            <select
              value={daytimeSymptoms}
              onChange={(e) => setDaytimeSymptoms(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="rare">≤2 days/week</option>
              <option value="few-days">&gt;2 days/week but not daily</option>
              <option value="most-days">Daily</option>
              <option value="daily">Throughout the day</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How often does the child wake up at night due to asthma?
            </label>
            <select
              value={nightAwakenings}
              onChange={(e) => setNightAwakenings(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="rare">≤2 times/month</option>
              <option value="monthly">3-4 times/month</option>
              <option value="weekly">&gt;1 time/week</option>
              <option value="often">Often (7x/week)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How much do symptoms interfere with normal activities?
            </label>
            <select
              value={interferenceActivity}
              onChange={(e) => setInterferenceActivity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="none">None</option>
              <option value="minor">Minor limitation</option>
              <option value="some">Some limitation</option>
              <option value="extreme">Extremely limited</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How often is rescue inhaler (SABA) used?
            </label>
            <select
              value={rescueUse}
              onChange={(e) => setRescueUse(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select...</option>
              <option value="rare">≤2 days/week</option>
              <option value="few-days">&gt;2 days/week but not daily</option>
              <option value="most-days">Daily</option>
              <option value="daily">Several times per day</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <Button onClick={classifyAsthma} className="flex-1">
              Classify Asthma
            </Button>
            <Button onClick={resetClassification} variant="outline">
              Reset
            </Button>
          </div>

          {classification && (
            <div className="p-4 rounded-md bg-primary/10 border border-primary/50">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{classification}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stepwise Therapy */}
      <Card>
        <CardHeader>
          <CardTitle>Stepwise Approach to Asthma Management</CardTitle>
          <CardDescription>Educational overview (not for clinical dosing)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Step 1: Intermittent</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Preferred:</strong> SABA as needed only
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Step 2: Mild Persistent</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Preferred:</strong> Low-dose ICS<br />
                  <strong>Alternative:</strong> LTRA
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Step 3: Moderate</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Preferred:</strong> Medium-dose ICS OR Low-dose ICS + LABA<br />
                  <strong>Alternative:</strong> Low-dose ICS + LTRA
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Step 4: Moderate</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Preferred:</strong> Medium-dose ICS + LABA
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Step 5: Severe</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Preferred:</strong> High-dose ICS + LABA<br />
                  Consider: Anti-IgE (omalizumab) if allergic
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Step 6: Severe</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Preferred:</strong> High-dose ICS + LABA + oral corticosteroid
                </p>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-md">
              <h4 className="font-semibold mb-2">Key Abbreviations:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>SABA:</strong> Short-acting beta-agonist (rescue inhaler)</li>
                <li><strong>ICS:</strong> Inhaled corticosteroid (controller)</li>
                <li><strong>LABA:</strong> Long-acting beta-agonist (always use with ICS)</li>
                <li><strong>LTRA:</strong> Leukotriene receptor antagonist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exacerbation Management */}
      <Card>
        <CardHeader>
          <CardTitle>Asthma Exacerbation Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2">Severity Assessment:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="font-semibold min-w-24 text-green-600">Mild:</span>
                <span className="text-muted-foreground">Can speak in sentences, RR slightly increased, O2 sat &gt;95%</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold min-w-24 text-yellow-600">Moderate:</span>
                <span className="text-muted-foreground">Speaks in phrases, accessory muscle use, RR increased, O2 sat 90-95%</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold min-w-24 text-red-600">Severe:</span>
                <span className="text-muted-foreground">Single words only, significant retractions, altered mental status, O2 sat &lt;90%</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Treatment Approach:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Oxygen to maintain O2 sat ≥90%</li>
              <li>SABA (albuterol) - repeated doses or continuous nebulization if severe</li>
              <li>Systemic corticosteroids (oral or IV)</li>
              <li>Consider ipratropium (especially in severe exacerbations)</li>
              <li>Magnesium sulfate for severe cases unresponsive to initial therapy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Discharge Criteria:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>O2 sat &gt;90% on room air</li>
              <li>Sustained improvement after treatment</li>
              <li>SABA needed no more than every 4 hours</li>
              <li>No respiratory distress</li>
              <li>Follow-up arranged, action plan provided</li>
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
              <span>Nighttime awakenings are a KEY indicator of asthma severity and control</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Classify by the MOST severe category in which any feature occurs</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Rescue (SABA) vs Controller (ICS) medications - know the difference</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>NEVER use LABA without ICS in children (black box warning)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Step up if poorly controlled, step down if well-controlled for 3+ months</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Systemic steroids are important in moderate-severe exacerbations</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Asthma;
