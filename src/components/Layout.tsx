import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, Monitor, Home, ClipboardCheck, FileText, BookOpen, Settings } from 'lucide-react';
import { MODULES } from '@/content';
import { useThemeStore, type ThemeMode } from '@/store/useThemeStore';
import { useMastery } from '@/lib/useMastery';
import { moduleColor } from '@/lib/theme';
import { cn, CONTENT_REVIEWED } from '@/lib/utils';
import { SearchDialog } from './SearchDialog';

const NEXT_MODE: Record<ThemeMode, ThemeMode> = { system: 'light', light: 'dark', dark: 'system' };
const MODE_ICON = { system: Monitor, light: Sun, dark: Moon };

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const { byModule } = useMastery();
  const link = 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors';
  const active = ({ isActive }: { isActive: boolean }) => cn(link, isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground');
  return (
    <nav className="space-y-6" aria-label="Main">
      <div className="space-y-1">
        <NavLink to="/" end className={active} onClick={onNavigate}>
          <Home className="h-4 w-4" /> Home
        </NavLink>
      </div>
      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modules</p>
        <div className="space-y-0.5">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            const s = byModule[m.slug];
            const pct = s.total ? s.mastered / s.total : 0;
            return (
              <NavLink key={m.slug} to={`/${m.slug}`} className={active} onClick={onNavigate}>
                <Icon className={cn('h-4 w-4 flex-none', moduleColor[m.color].text)} />
                <span className="min-w-0 flex-1 truncate">
                  <span className="mr-1 text-xs text-muted-foreground">{i}.</span>
                  {m.short}
                </span>
                <span className="h-1.5 w-8 flex-none overflow-hidden rounded-full bg-secondary" title={`${Math.round(pct * 100)}% mastered`}>
                  <span className={cn('block h-full rounded-full', moduleColor[m.color].bar)} style={{ width: `${pct * 100}%` }} />
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Practice</p>
        <div className="space-y-0.5">
          <NavLink to="/assessment" className={active} onClick={onNavigate}>
            <ClipboardCheck className="h-4 w-4" /> Exam builder
          </NavLink>
          <NavLink to="/cases" className={active} onClick={onNavigate}>
            <FileText className="h-4 w-4" /> Clinical cases
          </NavLink>
          <NavLink to="/glossary" className={active} onClick={onNavigate}>
            <BookOpen className="h-4 w-4" /> Glossary
          </NavLink>
          <NavLink to="/settings" className={active} onClick={onNavigate}>
            <Settings className="h-4 w-4" /> Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const { mode, setMode } = useThemeStore();
  const location = useLocation();
  const ModeIcon = MODE_ICON[mode];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setDrawer(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
          <button type="button" className="rounded-lg p-2 hover:bg-accent lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="./icon.svg" alt="" className="h-7 w-7" />
            <span className="text-lg font-bold tracking-tight">PEDS MASTER</span>
          </Link>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setSearch(true)}
            className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent"
            aria-label="Search (Ctrl+K)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border bg-muted px-1.5 text-[10px] font-medium sm:inline">Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={() => setMode(NEXT_MODE[mode])}
            className="rounded-lg p-2 hover:bg-accent"
            aria-label={`Theme: ${mode}. Switch to ${NEXT_MODE[mode]}`}
            title={`Theme: ${mode}`}
          >
            <ModeIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {drawer && (
        <div className="fixed inset-0 z-[55] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto border-r bg-background p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">PEDS MASTER</span>
              <button type="button" className="rounded-lg p-2 hover:bg-accent" onClick={() => setDrawer(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <Nav onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl gap-8 px-4">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 flex-none overflow-y-auto py-6 lg:block">
          <Nav />
        </aside>
        <main id="main" className="min-w-0 flex-1 py-6 lg:py-8">
          {children}
          <footer className="mt-16 border-t pt-6 text-xs text-muted-foreground">
            Content reviewed {CONTENT_REVIEWED}. Every recommendation is cited in its module. Verify doses against your local formulary.
          </footer>
        </main>
      </div>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </div>
  );
};
