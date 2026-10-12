import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Type, 
  Globe, 
  LogOut, 
  Home, 
  ShieldAlert, 
  Search, 
  BookOpen, 
  PhoneCall, 
  FileText, 
  Info, 
  LogIn 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ toggleHighContrast, cycleTextSize, textSize }) => {
  const { user, supabase } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-card" style={{ margin: '1rem', padding: '1.5rem', borderRadius: '16px', position: 'sticky', top: '10px', zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Shield size={48} color="var(--primary)" />
          <div>
            <h1 style={{ margin: 0, fontSize: '2.2rem', fontWeight: '900' }}>Cyber Saathi</h1>
            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: 'bold' }}>Senior Citizen Cyber Safety</p>
          </div>
        </Link>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
          <button onClick={toggleHighContrast} className="nav-action-btn" aria-label="Toggle High Contrast">
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
              <Eye size={18} />
            </span>
            <span>Contrast</span>
          </button>
          <button onClick={cycleTextSize} className="nav-action-btn" aria-label="Toggle Text Size">
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
              <Type size={18} />
            </span>
            <span>Size: {textSize === 'normal' ? 'Normal' : textSize === 'large' ? 'Large' : 'Extra Large'}</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="glass-icon-box" style={{ width: '36px', height: '36px', borderRadius: '10px' }}>
              <Globe size={18} />
            </span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ background: 'white', color: 'var(--primary)', padding: '0.45rem 0.8rem', borderRadius: '10px', fontSize: '1.05rem', border: '1.5px solid rgba(185,28,28,0.2)', fontWeight: 'bold' }}
            >
              <option value="English">English</option>
              <option value="Marathi">मराठी</option>
              <option value="Hindi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav style={{ maxWidth: '1200px', margin: '20px auto 0', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', borderTop: '2px solid rgba(185, 28, 28, 0.1)', paddingTop: '15px' }}>
        <Link to="/" className={`nav-link-btn ${isActive('/') ? 'active' : ''}`}>
          <span className="glass-icon-box">
            <Home size={19} />
          </span>
          <span>{t("Home")}</span>
        </Link>

        <Link to="/report" className={`nav-link-btn ${isActive('/report') ? 'active' : ''}`}>
          <span className="glass-icon-box">
            <ShieldAlert size={19} />
          </span>
          <span>{t("Report Scam")}</span>
        </Link>

        <Link to="/check" className={`nav-link-btn ${isActive('/check') ? 'active' : ''}`}>
          <span className="glass-icon-box">
            <Search size={19} />
          </span>
          <span>{t("Check Scam")}</span>
        </Link>

        <Link to="/safety" className={`nav-link-btn ${isActive('/safety') ? 'active' : ''}`}>
          <span className="glass-icon-box">
            <BookOpen size={19} />
          </span>
          <span>{t("Cyber Safety Tips")}</span>
        </Link>

        <Link to="/emergency" className={`nav-link-btn emergency ${isActive('/emergency') ? 'active' : ''}`}>
          <span className="glass-icon-box">
            <PhoneCall size={19} />
          </span>
          <span>{t("Emergency (1930)")}</span>
        </Link>
        
        {user && (
          <Link to="/my-reports" className={`nav-link-btn ${isActive('/my-reports') ? 'active' : ''}`}>
            <span className="glass-icon-box">
              <FileText size={19} />
            </span>
            <span>{t("My Reports")}</span>
          </Link>
        )}
        
        <Link to="/about" className={`nav-link-btn ${isActive('/about') ? 'active' : ''}`}>
          <span className="glass-icon-box">
            <Info size={19} />
          </span>
          <span>{t("About Project")}</span>
        </Link>
        
        <div style={{ flexGrow: 1 }}></div>
        
        {user ? (
          <button onClick={handleLogout} className="nav-link-btn nav-btn-solid">
            <span className="glass-icon-box">
              <LogOut size={19} />
            </span>
            <span>{t("Logout")}</span>
          </button>
        ) : (
          <Link to="/login" className={`nav-link-btn nav-btn-solid ${isActive('/login') ? 'active' : ''}`}>
            <span className="glass-icon-box">
              <LogIn size={19} />
            </span>
            <span>{t("Login / Signup")}</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
