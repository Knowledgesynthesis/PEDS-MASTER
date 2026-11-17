import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { ToolId } from '@/content/types';

type Loader = () => Promise<Record<string, ComponentType>>;

const pick = (load: Loader, name: string): LazyExoticComponent<ComponentType> =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const neonatal = () => import('./neonatal') as unknown as Promise<Record<string, ComponentType>>;
const cardiac = () => import('./cardiac') as unknown as Promise<Record<string, ComponentType>>;
const resp = () => import('./respiratory') as unknown as Promise<Record<string, ComponentType>>;
const ent = () => import('./ent') as unknown as Promise<Record<string, ComponentType>>;
const growth = () => import('./growth') as unknown as Promise<Record<string, ComponentType>>;
const fluids = () => import('./fluids') as unknown as Promise<Record<string, ComponentType>>;
const dev = () => import('./development') as unknown as Promise<Record<string, ComponentType>>;

const REGISTRY: Record<ToolId, LazyExoticComponent<ComponentType>> = {
  vitals: pick(neonatal, 'VitalsTool'),
  'febrile-infant': pick(neonatal, 'FebrileInfantTool'),
  'eos-triage': pick(neonatal, 'EosTool'),
  'cchd-screen': pick(cardiac, 'CchdTool'),
  qpqs: pick(cardiac, 'QpQsTool'),
  'murmur-quiz': pick(cardiac, 'MurmurQuiz'),
  'bronchiolitis-disposition': pick(resp, 'BronchiolitisDispositionTool'),
  'bronchiolitis-sorter': pick(resp, 'BronchiolitisSorter'),
  westley: pick(resp, 'WestleyTool'),
  'stridor-sorter': pick(resp, 'StridorSorter'),
  'asthma-severity': pick(resp, 'AsthmaSeverityTool'),
  'asthma-control': pick(resp, 'AsthmaControlTool'),
  pram: pick(resp, 'PramTool'),
  aom: pick(ent, 'AomTool'),
  centor: pick(ent, 'CentorTool'),
  'growth-explorer': pick(growth, 'GrowthExplorer'),
  'weight-velocity': pick(growth, 'WeightVelocityTool'),
  'catch-up': pick(growth, 'CatchUpTool'),
  cds: pick(fluids, 'CdsTool'),
  maintenance: pick(fluids, 'MaintenanceTool'),
  'ort-plan': pick(fluids, 'OrtPlanTool'),
  'ge-sorter': pick(fluids, 'GastroSorter'),
  milestones: pick(dev, 'MilestoneTool'),
  mchat: pick(dev, 'MchatTool'),
};

export function ToolSlot({ id }: { id: ToolId }) {
  const Tool = REGISTRY[id];
  return <Tool />;
}
