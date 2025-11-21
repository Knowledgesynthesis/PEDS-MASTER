import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FTT: React.FC = () => {
  // Example growth data showing FTT pattern
  const growthData = [
    { age: '0 mo', weight: 50, height: 75, normal_weight: 50 },
    { age: '2 mo', weight: 45, height: 70, normal_weight: 50 },
    { age: '4 mo', weight: 25, height: 50, normal_weight: 50 },
    { age: '6 mo', weight: 10, height: 40, normal_weight: 50 },
    { age: '9 mo', weight: 5, height: 30, normal_weight: 50 },
    { age: '12 mo', weight: 3, height: 25, normal_weight: 50 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingDown className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Failure to Thrive (FTT)</h1>
          <p className="text-muted-foreground mt-1">Growth patterns and differential diagnosis</p>
        </div>
      </div>

      {/* Definition */}
      <Card>
        <CardHeader>
          <CardTitle>Definition & Epidemiology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2">Definition:</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Failure to thrive (FTT) refers to inadequate weight gain or weight loss in children, resulting in failure to meet expected growth standards.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Crossing two major percentile lines downward on growth chart</li>
              <li>Weight &lt;3rd percentile for age</li>
              <li>Weight-for-length &lt;5th percentile</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Epidemiology:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Affects 5-10% of children in primary care</li>
              <li>Most common in children under 2 years</li>
              <li>Higher prevalence in low socioeconomic settings</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Growth Chart Example */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Example Growth Pattern: Failure to Thrive</CardTitle>
          <CardDescription>Weight percentile declining over time (crossing percentile lines)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="age" className="text-sm" />
              <YAxis label={{ value: 'Percentile', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="normal_weight"
                stroke="#10b981"
                name="Normal (50th percentile)"
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#ef4444"
                name="Patient Weight Percentile"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-4">
            This chart shows a concerning pattern where the child's weight percentile falls from the 50th percentile to below the 5th percentile, crossing multiple percentile lines - classic for FTT.
          </p>
        </CardContent>
      </Card>

      {/* Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Classification: Organic vs Non-Organic</CardTitle>
          <CardDescription>Modern approach recognizes most cases are multifactorial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Organic Causes (Medical)</h4>
              <div>
                <h5 className="font-semibold mb-2">Inadequate Intake:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Feeding difficulties (cleft palate, neurologic)</li>
                  <li>Dysphagia, odynophagia</li>
                  <li>Chronic illness reducing appetite</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Malabsorption:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Celiac disease</li>
                  <li>Cystic fibrosis</li>
                  <li>Milk protein allergy</li>
                  <li>Inflammatory bowel disease</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Increased Metabolic Demand:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Congenital heart disease</li>
                  <li>Hyperthyroidism</li>
                  <li>Chronic infection</li>
                  <li>Malignancy</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Defective Utilization:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Metabolic disorders</li>
                  <li>Renal tubular acidosis</li>
                  <li>Chronic liver disease</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Non-Organic Causes (Psychosocial)</h4>
              <div>
                <h5 className="font-semibold mb-2">Inadequate Caloric Intake:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Food insecurity, poverty</li>
                  <li>Parental knowledge deficit</li>
                  <li>Incorrect formula preparation</li>
                  <li>Overly restrictive diet</li>
                  <li>Feeding aversion (poor feeding interactions)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Psychosocial Factors:</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Neglect or abuse</li>
                  <li>Parental depression or mental illness</li>
                  <li>Substance abuse in household</li>
                  <li>Chaotic home environment</li>
                  <li>Parent-child interaction problems</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Important:</strong> Most FTT is multifactorial, with both organic and psychosocial contributors. Avoid rigid categorization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Parameters to Assess</CardTitle>
          <CardDescription>Patterns help narrow differential diagnosis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Weight, Length/Height, Head Circumference:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <span className="font-semibold min-w-32">Weight alone ↓:</span>
                  <span>Acute malnutrition, inadequate intake (most common pattern in FTT)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold min-w-32">Weight + Height ↓:</span>
                  <span>Chronic malnutrition, endocrine disorders, genetic syndromes</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold min-w-32">All three ↓:</span>
                  <span>Congenital infection, genetic syndrome, severe chronic malnutrition</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-semibold min-w-32">Head circ alone ↓:</span>
                  <span>Microcephaly (CNS pathology, genetic, congenital infection)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Caloric Needs Overview:</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Educational reference only (not for clinical calculations):
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Infants 0-6 months: ~100-120 kcal/kg/day</li>
                <li>Infants 6-12 months: ~90-100 kcal/kg/day</li>
                <li>Children 1-3 years: ~75-90 kcal/kg/day</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Approach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">History - Key Questions:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Detailed feeding history (intake, volume, frequency)</li>
              <li>Formula preparation (if applicable)</li>
              <li>Developmental milestones</li>
              <li>Stool patterns (diarrhea, steatorrhea)</li>
              <li>Vomiting, regurgitation</li>
              <li>Social history (food security, support, home environment)</li>
              <li>Review of systems (looking for systemic disease)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Physical Exam:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Accurate measurements (weight, length/height, head circumference)</li>
              <li>Plot on growth chart and assess trajectory</li>
              <li>Look for dysmorphic features (genetic syndromes)</li>
              <li>Assess development</li>
              <li>Signs of neglect or abuse</li>
              <li>Observe feeding if possible</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Laboratory Evaluation:</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Guided by history and physical (avoid shotgun approach):
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Basic: CBC, CMP (electrolytes, kidney/liver function)</li>
              <li>Urinalysis and culture</li>
              <li>Consider: Celiac screen, stool studies, TSH, sweat test</li>
              <li>Based on specific concerns: chromosomal analysis, metabolic workup</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Management */}
      <Card>
        <CardHeader>
          <CardTitle>Management Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2">Address Underlying Causes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Treat identified medical conditions</li>
              <li>Address psychosocial factors (social work, parenting support)</li>
              <li>Ensure food security (WIC, food assistance programs)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Nutritional Intervention:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Optimize caloric intake (higher calorie density)</li>
              <li>Frequent, smaller meals</li>
              <li>Dietitian referral for individualized plan</li>
              <li>Consider nutritional supplements if needed</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Follow-up:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Close monitoring (weekly initially for severe FTT)</li>
              <li>Serial growth measurements</li>
              <li>Reassess if not improving</li>
              <li>Multidisciplinary approach often needed</li>
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
              <span>FTT is defined by crossing two major percentile lines or weight &lt;3rd percentile</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Most cases are multifactorial with both organic and psychosocial contributors</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Pattern of growth parameters helps narrow differential (weight vs weight+height vs all three)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Detailed feeding history is essential - most common cause is inadequate intake</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Lab workup should be targeted based on history/exam, not shotgun approach</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Management requires multidisciplinary approach and close follow-up</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FTT;
