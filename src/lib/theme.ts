import type { ModuleColor, Tone } from '@/content/types';

/** Static class strings so Tailwind can see them at build time. */
export const moduleColor: Record<ModuleColor, { text: string; bg: string; ring: string; bar: string }> = {
  slate: { text: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-500/10', ring: 'ring-slate-500/30', bar: 'bg-slate-500' },
  red: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', ring: 'ring-red-500/30', bar: 'bg-red-500' },
  pink: { text: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-500/10', ring: 'ring-pink-500/30', bar: 'bg-pink-500' },
  sky: { text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10', ring: 'ring-sky-500/30', bar: 'bg-sky-500' },
  orange: { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', ring: 'ring-orange-500/30', bar: 'bg-orange-500' },
  violet: { text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', ring: 'ring-violet-500/30', bar: 'bg-violet-500' },
  amber: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', ring: 'ring-amber-500/30', bar: 'bg-amber-500' },
  emerald: { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30', bar: 'bg-emerald-500' },
  cyan: { text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/30', bar: 'bg-cyan-500' },
  indigo: { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10', ring: 'ring-indigo-500/30', bar: 'bg-indigo-500' },
};

export const toneClass: Record<Tone, { box: string; title: string; dot: string }> = {
  danger: {
    box: 'border-red-500/40 bg-red-500/[0.07]',
    title: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
  },
  warn: {
    box: 'border-amber-500/40 bg-amber-500/[0.08]',
    title: 'text-amber-800 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  info: {
    box: 'border-sky-500/40 bg-sky-500/[0.07]',
    title: 'text-sky-800 dark:text-sky-300',
    dot: 'bg-sky-500',
  },
  success: {
    box: 'border-emerald-500/40 bg-emerald-500/[0.07]',
    title: 'text-emerald-800 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  update: {
    box: 'border-violet-500/40 bg-violet-500/[0.07]',
    title: 'text-violet-800 dark:text-violet-300',
    dot: 'bg-violet-500',
  },
  neutral: {
    box: 'border-border bg-muted/40',
    title: 'text-foreground',
    dot: 'bg-muted-foreground',
  },
};
