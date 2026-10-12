import { PhoneCall, Shield, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={{ 
      background: 'rgba(5, 8, 22, 0.12)', 
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: '#F8FAFC', 
      padding: '4rem 1.5rem 2rem', 
      marginTop: 'auto', 
      borderTop: '1px solid rgba(34, 211, 238, 0.3)',
      boxShadow: '0 -15px 40px rgba(0, 0, 0, 0.4)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        
        {/* Brand & Mission */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #FF3B30, #FF7A18)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(255, 59, 48, 0.35)' }}>
              <Shield size={24} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: '900', color: '#F8FAFC', letterSpacing: '-0.02em' }}>Cyber Saathi</h2>
              <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem' }}>Senior Care Portal</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
            A dedicated, accessible cybersecurity and scam incident reporting platform designed for senior citizens.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '1.1rem' }}>
            <Link to="/report" style={{ color: 'var(--orange-signal)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <ArrowRight size={16} /> <span>{t("Report Scam")}</span>
            </Link>
            <Link to="/check" style={{ color: 'var(--cyan-highlight)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <ArrowRight size={16} /> <span>{t("Check Scam")}</span>
            </Link>
            <Link to="/safety" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <ArrowRight size={16} /> <span>{t("Cyber Safety Tips")}</span>
            </Link>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.4rem', color: '#F8FAFC', fontWeight: '800', letterSpacing: '-0.01em' }}>
            {t("Emergency Contacts")}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <a href="tel:1930" style={{ textDecoration: 'none' }}>
              <div className="glass-capsule glass-capsule-red" style={{ padding: '0.65rem 1.2rem', width: '100%' }}>
                <PhoneCall size={20} color="var(--red-security)" />
                <span style={{ fontSize: '1.15rem' }}><strong>1930</strong> - {t("National Cyber Crime Helpline")}</span>
              </div>
            </a>
            <a href="tel:112" style={{ textDecoration: 'none' }}>
              <div className="glass-capsule glass-capsule-orange" style={{ padding: '0.65rem 1.2rem', width: '100%' }}>
                <ShieldAlert size={20} color="var(--orange-signal)" />
                <span style={{ fontSize: '1.15rem' }}><strong>112</strong> - {t("National Police Emergency")}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Academic Credentials */}
        <div>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '1.4rem', color: '#F8FAFC', fontWeight: '800', letterSpacing: '-0.01em' }}>
            PVG's COE Nashik
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>Department of Information Technology</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>Second Year Engineering Project (CEP)</p>
          <p style={{ color: 'var(--cyan-highlight)', fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1.4rem 0' }}>Savitribai Phule Pune University (SPPU)</p>
          <div>
            <Link to="/admin" className="glass-capsule glass-capsule-cyan" style={{ textDecoration: 'none', fontSize: '1.05rem', padding: '0.55rem 1.2rem' }}>
              <Cpu size={18} color="var(--cyan-highlight)" />
              <span>Admin Dashboard Demo</span>
            </Link>
          </div>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3.5rem', paddingTop: '1.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
        &copy; {new Date().getFullYear()} Cyber Saathi &bull; PVGCOE Nashik (SPPU) &bull; Designed for Senior Citizen Safety
      </div>
    </footer>
  );
};

export default Footer;
