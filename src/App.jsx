import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CyberBackground from './components/CyberBackground';

// Pages
import Home from './pages/Home';
import ReportScam from './pages/ReportScam';
import CheckScam from './pages/CheckScam';
import CyberSafety from './pages/CyberSafety';
import MyReports from './pages/MyReports';
import EmergencyHelp from './pages/EmergencyHelp';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';

function MainLayout() {
  const [isHighContrast, setIsHighContrast] = useState(() => {
    return localStorage.getItem('cyber_saathi_high_contrast') === 'true';
  });
  const [textSize, setTextSize] = useState(() => {
    return localStorage.getItem('cyber_saathi_text_size') || 'normal';
  });
  const location = useLocation();

  const toggleHighContrast = () => setIsHighContrast(prev => !prev);
  
  const cycleTextSize = () => {
    setTextSize(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'normal';
    });
  };

  // Synchronize document.documentElement font scaling for full rem scaling across all components
  useEffect(() => {
    try {
      localStorage.setItem('cyber_saathi_text_size', textSize);
    } catch {
      // ignore storage errors
    }
    document.documentElement.classList.remove('text-large', 'text-xlarge');
    if (textSize === 'large') {
      document.documentElement.classList.add('text-large');
    } else if (textSize === 'xlarge') {
      document.documentElement.classList.add('text-xlarge');
    }
  }, [textSize]);

  // Synchronize high-contrast mode to document root
  useEffect(() => {
    try {
      localStorage.setItem('cyber_saathi_high_contrast', isHighContrast ? 'true' : 'false');
    } catch {
      // ignore storage errors
    }
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  const textClass = textSize === 'large' ? 'text-large' : (textSize === 'xlarge' ? 'text-xlarge' : '');
  const isSubdued = location.pathname !== '/';

  return (
    <div className={`min-h-screen flex flex-col ${isHighContrast ? 'high-contrast' : ''} ${textClass}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CyberBackground isSubdued={isSubdued} isHighContrast={isHighContrast} />

      <Navbar 
        toggleHighContrast={toggleHighContrast} 
        cycleTextSize={cycleTextSize}
        textSize={textSize}
        isHighContrast={isHighContrast}
      />
      
      <main style={{ flexGrow: 1, padding: '1rem', maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportScam />} />
          <Route path="/check" element={<CheckScam />} />
          <Route path="/safety" element={<CyberSafety />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
