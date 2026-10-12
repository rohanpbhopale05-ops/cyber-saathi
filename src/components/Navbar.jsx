import { useState, useEffect, useRef } from 'react';
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

const Navbar = ({ toggleHighContrast, cycleTextSize, textSize, isHighContrast }) => {
  const { user, supabase } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth intelligent auto-hide on scroll
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at or near top
      if (currentScrollY <= 45) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      // Scroll threshold of 10px to prevent jitter from minor movements
      if (Math.abs(diff) > 10) {
        if (diff > 0 && currentScrollY > 75) {
          // Scrolling DOWN -> smoothly slide out
          setIsVisible(false);
        } else if (diff < 0) {
          // Scrolling UP -> smoothly slide in
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`glass-card navbar-header ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`} 
      style={{ 
        margin: '1rem auto', 
        maxWidth: '1240px', 
        width: 'calc(100% - 2rem)', 
        padding: '1.15rem 1.6rem', 
        borderRadius: '22px', 
        position: 'sticky', 
        top: '12px', 
        zIndex: 100, 
        backdropFilter: 'blur(24px) saturate(180%)', 
        WebkitBackdropFilter: 'blur(24px) saturate(180%)', 
        border: '1px solid rgba(255, 255, 255, 0.18)', 
        boxShadow: isVisible 
          ? '0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.22), 0 0 20px rgba(34, 211, 238, 0.08)' 
          : 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(-125%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease, box-shadow 300ms ease',
        willChange: 'transform, opacity'
      }}
    >
      {/* Brand & Top Utility Controls */}
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
        
        {/* Streamlined Utility Controls */}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.06)', padding: '0.3rem 0.8rem 0.3rem 0.45rem', borderRadius: '999px', border: '1px solid var(--border-glass)' }}>
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '999px', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'rgba(34, 211, 238, 0.35)' }}>
              <Globe size={17} color="var(--cyan-highlight)" />
            </span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select Language"
              style={{ background: 'transparent', color: '#F8FAFC', padding: '0.2rem 0.4rem', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', outline: 'none' }}
            >
              <option value="English" style={{ background: '#0B1226', color: '#F8FAFC' }}>English</option>
              <option value="Marathi" style={{ background: '#0B1226', color: '#F8FAFC' }}>मराठी</option>
              <option value="Hindi" style={{ background: '#0B1226', color: '#F8FAFC' }}>हिंदी</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Navigation Row - Efficient Icon & Capsule Alignment */}
      <nav style={{ margin: '14px auto 0', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '14px' }}>
        <Link to="/" className={`nav-link-btn ${isActive('/') ? 'active' : ''}`}>
          <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            <Home size={18} />
          </span>
          <span>{t("Home")}</span>
        </Link>

        <Link to="/report" className={`nav-link-btn ${isActive('/report') ? 'active' : ''}`}>
          <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            <ShieldAlert size={18} />
          </span>
          <span>{t("Report Scam")}</span>
        </Link>

        <Link to="/check" className={`nav-link-btn ${isActive('/check') ? 'active' : ''}`}>
          <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            <Search size={18} />
          </span>
          <span>{t("Check Scam")}</span>
        </Link>

        <Link to="/safety" className={`nav-link-btn ${isActive('/safety') ? 'active' : ''}`}>
          <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            <BookOpen size={18} />
          </span>
          <span>{t("Cyber Safety Tips")}</span>
        </Link>

        <Link to="/emergency" className={`nav-link-btn emergency ${isActive('/emergency') ? 'active' : ''}`}>
          <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            <PhoneCall size={18} />
          </span>
          <span>{t("Emergency (1930)")}</span>
        </Link>
        
        {user && (
          <Link to="/my-reports" className={`nav-link-btn ${isActive('/my-reports') ? 'active' : ''}`}>
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
              <FileText size={18} />
            </span>
            <span>{t("My Reports")}</span>
          </Link>
        )}
        
        <Link to="/about" className={`nav-link-btn ${isActive('/about') ? 'active' : ''}`}>
          <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
            <Info size={18} />
          </span>
          <span>{t("About Project")}</span>
        </Link>
        
        <div style={{ flexGrow: 1 }}></div>
        
        {user ? (
          <button onClick={handleLogout} className="nav-link-btn nav-btn-solid">
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
              <LogOut size={18} />
            </span>
            <span>{t("Logout")}</span>
          </button>
        ) : (
          <Link to="/login" className={`nav-link-btn nav-btn-solid ${isActive('/login') ? 'active' : ''}`}>
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
              <LogIn size={18} />
            </span>
            <span>{t("Login / Signup")}</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
