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
    <header className="glass-card" style={{ margin: '1rem auto', maxWidth: '1240px', width: 'calc(100% - 2rem)', padding: '1.25rem 1.6rem', borderRadius: '22px', position: 'sticky', top: '12px', zIndex: 100, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)' }}>
      <div style={{ margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #FF3B30 0%, #FF7A18 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255, 59, 48, 0.35)', flexShrink: 0 }}>
            <Shield size={28} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '2.1rem', fontWeight: '900', color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Cyber Saathi</h1>
              <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan-highlight)', borderColor: 'rgba(34, 211, 238, 0.4)' }}>Senior Care</span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Senior Citizen Cyber Safety & Scam Portal</p>
          </div>
        </Link>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={toggleHighContrast} className="nav-action-btn" aria-label="Toggle High Contrast">
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '999px' }}>
              <Eye size={17} />
            </span>
            <span>Contrast</span>
          </button>
          <button onClick={cycleTextSize} className="nav-action-btn" aria-label="Toggle Text Size">
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '999px' }}>
              <Type size={17} />
            </span>
            <span>Size: {textSize === 'normal' ? 'Normal' : textSize === 'large' ? 'Large' : 'XL'}</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="glass-icon-box" style={{ width: '34px', height: '34px', borderRadius: '999px' }}>
              <Globe size={18} />
            </span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ background: 'rgba(11, 18, 38, 0.85)', color: '#F8FAFC', padding: '0.45rem 0.85rem', borderRadius: '999px', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.2)', fontWeight: '700', cursor: 'pointer', outline: 'none' }}
            >
              <option value="English" style={{ background: '#0B1226', color: '#F8FAFC' }}>English</option>
              <option value="Marathi" style={{ background: '#0B1226', color: '#F8FAFC' }}>मराठी</option>
              <option value="Hindi" style={{ background: '#0B1226', color: '#F8FAFC' }}>हिंदी</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav style={{ margin: '18px auto 0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '16px' }}>
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
