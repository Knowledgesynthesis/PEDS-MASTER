import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useThemeStore } from './store/useThemeStore';

// Pages
import Home from './pages/Home';
import Settings from './pages/Settings';
import Glossary from './pages/Glossary';
import NeonatalSepsis from './pages/NeonatalSepsis';
import CHD from './pages/CHD';
import Bronchiolitis from './pages/Bronchiolitis';
import Croup from './pages/Croup';
import ENT from './pages/ENT';
import FTT from './pages/FTT';
import Asthma from './pages/Asthma';
import Fluids from './pages/Fluids';
import Development from './pages/Development';
import Cases from './pages/Cases';
import Assessment from './pages/Assessment';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/neonatal-sepsis" element={<NeonatalSepsis />} />
          <Route path="/chd" element={<CHD />} />
          <Route path="/bronchiolitis" element={<Bronchiolitis />} />
          <Route path="/croup" element={<Croup />} />
          <Route path="/ent" element={<ENT />} />
          <Route path="/ftt" element={<FTT />} />
          <Route path="/asthma" element={<Asthma />} />
          <Route path="/fluids" element={<Fluids />} />
          <Route path="/development" element={<Development />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/assessment" element={<Assessment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
