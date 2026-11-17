import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useThemeStore, resolveDark } from './store/useThemeStore';
import { MODULES } from './content';
import Home from './pages/Home';

const ModulePage = lazy(() => import('./pages/ModulePage'));
const Assessment = lazy(() => import('./pages/Assessment'));
const Cases = lazy(() => import('./pages/Cases'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ThemeSync() {
  const mode = useThemeStore((s) => s.mode);
  useEffect(() => {
    const apply = () => document.documentElement.classList.toggle('dark', resolveDark(mode));
    apply();
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [mode]);
  return null;
}

const Fallback = () => <div className="h-64 animate-pulse rounded-xl bg-muted/50" aria-busy="true" />;

export default function App() {
  return (
    <HashRouter>
      <ThemeSync />
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {MODULES.map((m) => (
              <Route key={m.slug} path={`/${m.slug}`} element={<ModulePage module={m} />} />
            ))}
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
}
