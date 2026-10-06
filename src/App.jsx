import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

function App() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState('normal'); // normal, large, xlarge

  const toggleHighContrast = () => setIsHighContrast(!isHighContrast);
  
  const cycleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  const textClass = textSize === 'large' ? 'text-large' : (textSize === 'xlarge' ? 'text-xlarge' : '');

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isHighContrast ? 'high-contrast' : ''} ${textClass}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar 
          toggleHighContrast={toggleHighContrast} 
          cycleTextSize={cycleTextSize}
          textSize={textSize}
        />
        
        <main style={{ flexGrow: 1, padding: '1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
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
    </Router>
  );
}

export default App;
