import { PhoneCall, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem 1.5rem 1.5rem', marginTop: 'auto', borderTop: '4px solid var(--secondary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Shield size={32} color="#ffffff" />
            <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: '900' }}>Cyber Saathi</h2>
          </div>
          <p style={{ opacity: 0.9, fontSize: '1.15rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
            Senior Citizen Cyber Safety & Scam Reporting Portal
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '1.1rem' }}>
            <Link to="/report" style={{ color: '#ffedd5', textDecoration: 'none' }}>&rarr; {t("Report Scam")}</Link>
            <Link to="/check" style={{ color: '#ffedd5', textDecoration: 'none' }}>&rarr; {t("Check Scam")}</Link>
            <Link to="/safety" style={{ color: '#ffedd5', textDecoration: 'none' }}>&rarr; {t("Cyber Safety Tips")}</Link>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: '#ffedd5', fontWeight: 'bold' }}>{t("Emergency Contacts")}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '1.25rem' }}>
            <PhoneCall size={24} color="#ffedd5" />
            <span><strong>1930</strong> - {t("National Cyber Crime Helpline")}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem' }}>
            <PhoneCall size={24} color="#ffedd5" />
            <span><strong>112</strong> - {t("National Police Emergency")}</span>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: '#ffedd5', fontWeight: 'bold' }}>PVG's COE Nashik</h2>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>Department of Information Technology</p>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>Second Year Engineering Project (CEP)</p>
          <p style={{ opacity: 0.9, fontSize: '1.1rem', margin: '0 0 1.2rem 0' }}>Savitribai Phule Pune University (SPPU)</p>
          <div>
            <Link to="/admin" style={{ color: '#ffedd5', textDecoration: 'underline', fontSize: '1.05rem', fontWeight: '600' }}>
              Admin Dashboard Demo
            </Link>
          </div>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', opacity: 0.85, fontSize: '1rem' }}>
        &copy; {new Date().getFullYear()} Cyber Saathi &bull; PVGCOE Nashik (SPPU) &bull; Designed for Senior Citizen Safety
      </div>
    </footer>
  );
};

export default Footer;
