import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, Type, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ toggleHighContrast, cycleTextSize, textSize }) => {
  const { user, supabase } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/');
  };

  const navLinkStyle = {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: '600',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center'
  };

  const actionBtnStyle = {
    background: 'rgba(185, 28, 28, 0.05)',
    border: '2px solid rgba(185, 28, 28, 0.2)',
    color: 'var(--primary)',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  };

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
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
          <button onClick={toggleHighContrast} style={actionBtnStyle} aria-label="Toggle High Contrast">
            <Eye size={24} /> Contrast
          </button>
          <button onClick={cycleTextSize} style={actionBtnStyle} aria-label="Toggle Text Size">
            <Type size={24} /> Size: {textSize === 'normal' ? 'Normal' : textSize === 'large' ? 'Large' : 'Extra Large'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Globe size={24} color="var(--primary)" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ background: 'white', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px', fontSize: '1.1rem', border: '2px solid rgba(185,28,28,0.2)', fontWeight: 'bold' }}
            >
              <option value="English">English</option>
              <option value="Marathi">मराठी</option>
              <option value="Hindi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav style={{ maxWidth: '1200px', margin: '20px auto 0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', borderTop: '2px solid rgba(185, 28, 28, 0.1)', paddingTop: '15px' }}>
        <Link to="/" style={navLinkStyle}>{t("Home")}</Link>
        <Link to="/report" style={navLinkStyle}>{t("Report Scam")}</Link>
        <Link to="/check" style={navLinkStyle}>{t("Check Scam")}</Link>
        <Link to="/safety" style={navLinkStyle}>{t("Cyber Safety Tips")}</Link>
        <Link to="/emergency" style={{...navLinkStyle, color: 'var(--danger)', fontWeight: 'bold', backgroundColor: '#fef2f2'}}>{t("Emergency (1930)")}</Link>
        
        {user && <Link to="/my-reports" style={navLinkStyle}>{t("My Reports")}</Link>}
        
        <Link to="/about" style={navLinkStyle}>{t("About Project")}</Link>
        
        <div style={{ flexGrow: 1 }}></div>
        
        {user ? (
          <button onClick={handleLogout} style={{ ...actionBtnStyle, background: 'var(--primary)', color: 'white' }}>
            <LogOut size={20} /> {t("Logout")}
          </button>
        ) : (
          <Link to="/login" style={{ ...actionBtnStyle, textDecoration: 'none', backgroundColor: 'var(--primary)', color: 'white' }}>
            {t("Login / Signup")}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
