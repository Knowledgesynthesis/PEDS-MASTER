import { useState } from 'react';
import { Settings as SettingsIcon, Download, Trash2 } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useProgressStore } from '@/store/useProgressStore';
import { Choice } from '@/components/ui/Inputs';
import { Button } from '@/components/ui/Button';
import { useMastery } from '@/lib/useMastery';
import { CONTENT_REVIEWED } from '@/lib/utils';

export default function Settings() {
  const { mode, setMode } = useThemeStore();
  const reset = useProgressStore((s) => s.reset);
  const { mastered, total, answered } = useMastery();
  const [confirm, setConfirm] = useState(false);

  const exportProgress = () => {
    const s = useProgressStore.getState();
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), questions: s.questions, cards: s.cards, cases: s.cases }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'peds-master-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex items-start gap-3">
        <SettingsIcon className="mt-1 h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
      </header>

      <section className="space-y-4 rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Appearance</h2>
        <Choice
          label="Theme"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'system', label: 'System' },
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Progress</h2>
        <p className="text-sm text-muted-foreground">
          {answered} of {total} questions attempted, {mastered} mastered. Progress is stored only in this browser.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportProgress}>
            <Download className="h-4 w-4" /> Export progress
          </Button>
          {confirm ? (
            <>
              <Button
                variant="destructive"
                onClick={() => {
                  reset();
                  setConfirm(false);
                }}
              >
                Confirm reset
              </Button>
              <Button variant="ghost" onClick={() => setConfirm(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setConfirm(true)}>
              <Trash2 className="h-4 w-4" /> Reset progress
            </Button>
          )}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-5 text-sm">
        <h2 className="font-semibold">Content standards</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Recommendations follow current national guidelines (AAP, NAEPP, GINA, IDSA, AHA, ACOG, CDC, AAO-HNSF, NICE) and landmark trials; each module lists its sources.</li>
          <li>Where guidelines and newer trials disagree, both are shown with dates.</li>
          <li>Doses are standard published pediatric doses; check them against your local formulary.</li>
          <li>All cases are synthetic.</li>
        </ul>
        <p className="text-xs text-muted-foreground">Content last reviewed {CONTENT_REVIEWED} · PEDS MASTER v2.0 · Works offline after first load.</p>
      </section>
    </div>
  );
}
