import { useLanguage } from '../context/LanguageContext';
import { Shield, Users, Globe } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '900' }}>{t("About Project")}</h1>
      <p style={{ fontSize: '1.4rem', color: 'var(--text-light)', marginBottom: '4rem' }}>
        Senior Citizen Cyber Safety & Scam Reporting Portal
      </p>
      
      <div className="glass-card slide-up" style={{ padding: '3rem 2rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>College Details</h2>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '2px solid rgba(185,28,28,0.1)', padding: '2rem', borderRadius: '12px' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text)' }}>PVG's College of Engineering and Technology, Nashik</p>
          <p style={{ fontSize: '1.3rem', marginTop: '1rem' }}>Department of Information Technology</p>
          <p style={{ fontSize: '1.3rem' }}>Second Year Engineering Project (CEP)</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-light)' }}>SPPU</p>
        </div>
      </div>

      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>Project Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card slide-up" style={{ padding: '2rem', borderTop: '4px solid var(--primary)' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Rohan Bhopale</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary-light)', fontWeight: 'bold', margin: 0 }}>Team Leader</p>
          </div>
          <div className="glass-card slide-up" style={{ padding: '2rem', animationDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Swayam Adik</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0 }}>Team Member</p>
          </div>
          <div className="glass-card slide-up" style={{ padding: '2rem', animationDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Sakshi Badgujar</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0 }}>Team Member</p>
          </div>
          <div className="glass-card slide-up" style={{ padding: '2rem', animationDelay: '0.3s' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Yash Bhamare</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0 }}>Team Member</p>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>About Cyber Saathi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Users size={48} color="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Senior Citizen Friendly</h3>
          </div>
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Shield size={48} color="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Simple Reporting</h3>
          </div>
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Shield size={48} color="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Cyber Awareness</h3>
          </div>
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Globe size={48} color="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Multilingual Support</h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
