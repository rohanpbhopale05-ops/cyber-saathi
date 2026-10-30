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
  LogIn,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ toggleHighContrast, cycleTextSize, textSize, isHighContrast }) => {
  const { user, supabase } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth intelligent auto-hide on scroll
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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
          setMobileMenuOpen(false);
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

  const navLinks = [
    { to: '/', label: t("Home"), icon: <Home size={18} /> },
    { to: '/report', label: t("Report Scam"), icon: <ShieldAlert size={18} /> },
    { to: '/check', label: t("Check Scam"), icon: <Search size={18} /> },
    { to: '/safety', label: t("Cyber Safety Tips"), icon: <BookOpen size={18} /> },
    { to: '/emergency', label: t("Emergency (1930)"), icon: <PhoneCall size={18} />, emergency: true },
    { to: '/my-reports', label: t("My Reports"), icon: <FileText size={18} /> },
    { to: '/about', label: t("About Project"), icon: <Info size={18} /> },
  ];

  return (
    <>
      <header 
        className={`glass-card navbar-header ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`} 
        style={{ 
          margin: '1rem auto', 
          maxWidth: '1240px', 
          width: 'calc(100% - 2rem)', 
          padding: '0.8rem 1.2rem', 
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #FF3B30 0%, #FF7A18 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255, 59, 48, 0.35)', flexShrink: 0 }}>
              <Shield size={24} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 className="navbar-brand-title" style={{ margin: 0, fontSize: '1.65rem', fontWeight: '900', color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>Cyber Saathi</h1>
                <span className="glass-capsule glass-capsule-cyan navbar-badge-hide" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan-highlight)', borderColor: 'rgba(34, 211, 238, 0.4)' }}>Senior Care</span>
              </div>
              <p className="navbar-subtitle-hide" style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Senior Citizen Cyber Safety & Scam Portal</p>
            </div>
          </Link>
          
          {/* Desktop Utility Controls */}
          <div className="navbar-utility-desktop" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
            <button 
              type="button"
              onClick={toggleHighContrast} 
              className="nav-action-btn" 
              aria-label="Toggle High Contrast Mode"
              title="Toggle High Contrast"
              style={isHighContrast ? { borderColor: '#FFFFFF', background: 'rgba(255, 255, 255, 0.22)', color: '#FFFFFF', boxShadow: '0 0 16px rgba(255, 255, 255, 0.4)' } : {}}
            >
              <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '999px', background: isHighContrast ? '#FFFFFF' : undefined, color: isHighContrast ? '#000000' : undefined }}>
                <Eye size={16} />
              </span>
              <span className="nav-btn-label">Contrast{isHighContrast ? ': On' : ''}</span>
            </button>
            
            <button 
              type="button"
              onClick={cycleTextSize} 
              className="nav-action-btn" 
              aria-label="Toggle Text Size"
              title="Cycle Text Size: Normal → Large → Extra Large"
              style={textSize !== 'normal' ? { borderColor: 'var(--cyan-highlight)', background: 'rgba(34, 211, 238, 0.18)', color: '#FFFFFF', boxShadow: '0 0 16px rgba(34, 211, 238, 0.35)' } : {}}
            >
              <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '999px', background: textSize !== 'normal' ? 'rgba(34, 211, 238, 0.25)' : undefined, color: textSize !== 'normal' ? 'var(--cyan-highlight)' : undefined }}>
                <Type size={16} />
              </span>
              <span className="nav-btn-label">Size: {textSize === 'normal' ? 'Normal' : textSize === 'large' ? 'Large' : 'XL'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.06)', padding: '0.25rem 0.7rem 0.25rem 0.35rem', borderRadius: '999px', border: '1px solid var(--border-glass)' }}>
              <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '999px', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'rgba(34, 211, 238, 0.35)' }}>
                <Globe size={16} color="var(--cyan-highlight)" />
              </span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language"
                style={{ background: 'transparent', color: '#F8FAFC', padding: '0.15rem 0.3rem', border: 'none', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', outline: 'none' }}
              >
                <option value="English" style={{ background: '#0B1226', color: '#F8FAFC' }}>English</option>
                <option value="Marathi" style={{ background: '#0B1226', color: '#F8FAFC' }}>मराठी</option>
                <option value="Hindi" style={{ background: '#0B1226', color: '#F8FAFC' }}>हिंदी</option>
              </select>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none', /* shown via CSS on mobile */
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '0.5rem',
              color: '#F8FAFC',
              cursor: 'pointer',
              flexShrink: 0,
              zIndex: 101
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Navigation Row */}
        <nav className="navbar-desktop-nav" style={{ margin: '10px auto 0', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '10px' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={`nav-link-btn ${link.emergency ? 'emergency' : ''} ${isActive(link.to) ? 'active' : ''}`}>
              <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '10px' }}>
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
          
          <div style={{ flexGrow: 1 }}></div>
          
          {user ? (
            <button onClick={handleLogout} className="nav-link-btn nav-btn-solid">
              <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '10px' }}>
                <LogOut size={18} />
              </span>
              <span>{t("Logout")}</span>
            </button>
          ) : (
            <Link to="/login" className={`nav-link-btn nav-btn-solid ${isActive('/login') ? 'active' : ''}`}>
              <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '10px' }}>
                <LogIn size={18} />
              </span>
              <span>{t("Login / Signup")}</span>
            </Link>
          )}
        </nav>
      </header>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
        />
      )}
      <div 
        className={`mobile-menu-panel ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 85vw)',
          background: 'rgba(5, 8, 22, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto',
          padding: '1.5rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        {/* Mobile Menu Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #FF3B30 0%, #FF7A18 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#F8FAFC' }}>Menu</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '0.4rem',
              color: '#F8FAFC',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        {navLinks.map(link => (
          <Link 
            key={link.to} 
            to={link.to} 
            onClick={() => setMobileMenuOpen(false)}
            className={`nav-link-btn ${link.emergency ? 'emergency' : ''} ${isActive(link.to) ? 'active' : ''}`}
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '1.05rem' }}
          >
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
              {link.icon}
            </span>
            <span>{link.label}</span>
          </Link>
        ))}

        <div style={{ margin: '0.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}></div>

        {/* Mobile Login/Logout */}
        {user ? (
          <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="nav-link-btn nav-btn-solid" style={{ width: '100%', padding: '0.65rem 1rem' }}>
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
              <LogOut size={18} />
            </span>
            <span>{t("Logout")}</span>
          </button>
        ) : (
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className={`nav-link-btn nav-btn-solid ${isActive('/login') ? 'active' : ''}`} style={{ width: '100%', padding: '0.65rem 1rem' }}>
            <span className="glass-icon-box" style={{ width: '32px', height: '32px', borderRadius: '10px' }}>
              <LogIn size={18} />
            </span>
            <span>{t("Login / Signup")}</span>
          </Link>
        )}

        <div style={{ margin: '0.5rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}></div>

        {/* Mobile Utility Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            type="button"
            onClick={toggleHighContrast} 
            className="nav-action-btn" 
            style={{ width: '100%', justifyContent: 'flex-start', ...(isHighContrast ? { borderColor: '#FFFFFF', background: 'rgba(255, 255, 255, 0.22)', color: '#FFFFFF' } : {}) }}
          >
            <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '999px', background: isHighContrast ? '#FFFFFF' : undefined, color: isHighContrast ? '#000000' : undefined }}>
              <Eye size={16} />
            </span>
            <span>Contrast{isHighContrast ? ': On' : ''}</span>
          </button>
          
          <button 
            type="button"
            onClick={cycleTextSize} 
            className="nav-action-btn" 
            style={{ width: '100%', justifyContent: 'flex-start', ...(textSize !== 'normal' ? { borderColor: 'var(--cyan-highlight)', background: 'rgba(34, 211, 238, 0.18)', color: '#FFFFFF' } : {}) }}
          >
            <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '999px', background: textSize !== 'normal' ? 'rgba(34, 211, 238, 0.25)' : undefined, color: textSize !== 'normal' ? 'var(--cyan-highlight)' : undefined }}>
              <Type size={16} />
            </span>
            <span>Size: {textSize === 'normal' ? 'Normal' : textSize === 'large' ? 'Large' : 'XL'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.06)', padding: '0.4rem 0.8rem', borderRadius: '999px', border: '1px solid var(--border-glass)' }}>
            <span className="glass-icon-box" style={{ width: '30px', height: '30px', borderRadius: '999px', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'rgba(34, 211, 238, 0.35)' }}>
              <Globe size={16} color="var(--cyan-highlight)" />
            </span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select Language"
              style={{ background: 'transparent', color: '#F8FAFC', padding: '0.2rem 0.4rem', border: 'none', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', outline: 'none', flex: 1 }}
            >
              <option value="English" style={{ background: '#0B1226', color: '#F8FAFC' }}>English</option>
              <option value="Marathi" style={{ background: '#0B1226', color: '#F8FAFC' }}>मराठी</option>
              <option value="Hindi" style={{ background: '#0B1226', color: '#F8FAFC' }}>हिंदी</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
