import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Choice, NumberField, Result, ToolFrame } from '@/components/ui/Inputs';
import { num, round } from '@/lib/utils';
import { percentileToZ, interpretTrajectory, type GrowthPoint, velocityVerdict, catchUpKcalPerKg, RDA_KCAL, PATTERNS, type GrowthPatternKey } from '@/lib/calc/growth';

type PatternKey = GrowthPatternKey | 'custom';

const LINES = [2, 10, 25, 50, 75, 90, 98];

function zTickLabel(z: number) {
  const match = LINES.find((p) => Math.abs(percentileToZ(p) - z) < 0.02);
  return match ? `${match}th` : '';
}

export function GrowthExplorer() {
  const [key, setKey] = useState<PatternKey>('intake');
  const [custom, setCustom] = useState<string[][]>([
    ['2', '50', '50', '50'],
    ['6', '25', '50', '50'],
    ['12', '8', '40', '50'],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);
  const data: GrowthPoint[] = useMemo(() => {
    if (key !== 'custom') return PATTERNS[key].data;
    return custom
      .map((r) => r.map(num))
      .filter((r): r is [number, number, number, number] => r.every((v) => v !== null))
      .map(([age, weight, length, hc]) => ({ age, weight, length, hc }));
  }, [key, custom]);

  const chart = data
    .slice()
    .sort((a, b) => a.age - b.age)
    .map((p) => ({ age: p.age, Weight: round(percentileToZ(p.weight), 2), Length: round(percentileToZ(p.length), 2), Head: round(percentileToZ(p.hc), 2) }));
  const setCell = (r: number, c: number) => (v: string) => setCustom((s) => s.map((row, i) => (i === r ? row.map((x, j) => (j === c ? v : x)) : row)));

  return (
    <ToolFrame title="Growth trajectory explorer" subtitle="Which parameter falls first tells you the mechanism" source="WHO Child Growth Standards (0–2 y) as recommended by CDC; NICE NG75 Faltering Growth (2017); Homan GJ. Am Fam Physician 2016;94:295">
      <Choice
        label="Pattern"
        value={key}
        onChange={setKey}
        columns={3}
        options={[
          ...Object.entries(PATTERNS).map(([k, v]) => ({ value: k as PatternKey, label: v.label })),
          { value: 'custom' as PatternKey, label: 'Plot your own patient' },
        ]}
      />
      {key === 'custom' && (
        <div className="overflow-x-auto">
          <table className="tbl min-w-[28rem]">
            <thead>
              <tr>
                <th>Age (mo)</th>
                <th>Weight %ile</th>
                <th>Length %ile</th>
                <th>Head %ile</th>
              </tr>
            </thead>
            <tbody>
              {custom.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className="!p-1">
                      <input
                        aria-label={`Row ${r + 1} ${['age', 'weight percentile', 'length percentile', 'head percentile'][c]}`}
                        type="number"
                        inputMode="decimal"
                        value={cell}
                        onChange={(e) => setCell(r, c)(e.target.value)}
                        className="w-full rounded border border-input bg-card px-2 py-1 text-sm"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-1 text-xs text-muted-foreground">Enter percentiles between 0 and 100 (exclusive) from the WHO chart.</p>
        </div>
      )}
      <div className="h-72 w-full" role="img" aria-label="Percentile trajectories for weight, length, and head circumference">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chart} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="age" type="number" domain={[0, 'dataMax']} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'Age (months)', position: 'insideBottom', offset: -4, fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis
              domain={[-2.6, 2.6]}
              ticks={LINES.map(percentileToZ)}
              tickFormatter={zTickLabel}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              width={44}
            />
            {LINES.map((p) => (
              <ReferenceLine key={p} y={percentileToZ(p)} stroke="hsl(var(--muted-foreground))" strokeOpacity={p === 50 ? 0.6 : 0.25} strokeDasharray={p === 50 ? undefined : '4 4'} />
            ))}
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => `z ${v}`}
              labelFormatter={(l) => `${l} months`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="Weight" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="Length" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} strokeDasharray="6 3" />
            <Line type="monotone" dataKey="Head" stroke="#059669" strokeWidth={2.5} dot={{ r: 3 }} strokeDasharray="2 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Result verdict={interpretTrajectory(data)} />
    </ToolFrame>
  );
}

export function WeightVelocityTool() {
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [days, setDays] = useState('');
  const [age, setAge] = useState('');
  const a = num(w1);
  const b = num(w2);
  const d = num(days);
  const m = num(age);
  const ok = a !== null && b !== null && d !== null && m !== null && d > 0 && a > 0 && b > 0;
  return (
    <ToolFrame title="Weight-gain velocity" subtitle="Grams per day between two weights on the same scale" source="WHO Child Growth Standards velocity data (2009); AAP Pediatric Nutrition, 8th ed.">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Earlier weight" value={w1} onChange={setW1} unit="kg" />
        <NumberField label="Current weight" value={w2} onChange={setW2} unit="kg" />
        <NumberField label="Days between" value={days} onChange={setDays} unit="days" />
        <NumberField label="Current age" value={age} onChange={setAge} unit="months" />
      </div>
      <Result verdict={ok ? velocityVerdict(m!, ((b! - a!) * 1000) / d!) : null} empty="Enter both weights, the interval, and age." />
      <p className="text-xs text-muted-foreground">Newborns may lose up to ~7–10% of birth weight and should regain it by 10–14 days. Loss &gt;10% needs a feeding evaluation.</p>
    </ToolFrame>
  );
}

export function CatchUpTool() {
  const [actual, setActual] = useState('');
  const [ideal, setIdeal] = useState('');
  const [rda, setRda] = useState(108);
  const a = num(actual);
  const i = num(ideal);
  const ok = a !== null && i !== null && a > 0 && i > 0;
  const perKg = ok ? catchUpKcalPerKg(rda, i!, a!) : 0;
  const total = perKg * (a ?? 0);
  return (
    <ToolFrame title="Catch-up growth energy" subtitle="kcal/kg/day = RDA for weight-age × ideal weight ÷ actual weight" source="Peterson KE et al. Am J Dis Child 1984; AAP Pediatric Nutrition, 8th ed.">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Actual weight" value={actual} onChange={setActual} unit="kg" />
        <NumberField label="Ideal weight (50th %ile weight-for-length)" value={ideal} onChange={setIdeal} unit="kg" />
      </div>
      <Choice label="RDA kcal/kg for the child's weight-age" value={rda} onChange={setRda} columns={5} options={RDA_KCAL.map((r) => ({ value: r.value, label: r.label }))} />
      <Result
        verdict={
          ok
            ? {
                tone: 'info',
                title: `${round(perKg)} kcal/kg/day  ·  ${round(total)} kcal/day`,
                points: [
                  `Standard 20 kcal/oz formula (0.67 kcal/mL): ≈ ${round(total / 0.67)} mL/day. Concentrated 24 kcal/oz (0.8 kcal/mL): ≈ ${round(total / 0.8)} mL/day.`,
                  'Expect catch-up at 1.5–2× normal velocity; reweigh weekly initially.',
                  'Severe malnutrition: start lower and advance slowly — check phosphate, potassium, magnesium (refeeding syndrome).',
                ],
              }
            : null
        }
        empty="Enter actual and ideal weight."
      />
    </ToolFrame>
  );
}
