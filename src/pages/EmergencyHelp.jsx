import { PhoneCall, ShieldAlert, Monitor } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EmergencyHelp = () => {
  const { t } = useLanguage();
  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '900' }}>Emergency Help</h1>
      <p style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '4rem' }}>
        Act immediately if you have lost money or suspect a cybercrime.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
        
        <a href="tel:1930" style={{ textDecoration: 'none' }}>
          <div className="glass-card slide-up" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', borderRadius: '16px', border: 'none', cursor: 'pointer' }}>
            <PhoneCall size={64} />
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: '900' }}>CALL 1930</h2>
              <p style={{ fontSize: '1.5rem', margin: '0.5rem 0 0 0', opacity: 0.9 }}>National Cyber Crime Helpline</p>
            </div>
          </div>
        </a>

        <a href="tel:112" style={{ textDecoration: 'none' }}>
          <div className="glass-card slide-up" style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', borderRadius: '16px', border: 'none', cursor: 'pointer', animationDelay: '0.1s' }}>
            <ShieldAlert size={64} />
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: '900' }}>CALL 112</h2>
              <p style={{ fontSize: '1.5rem', margin: '0.5rem 0 0 0', opacity: 0.9 }}>National Police Emergency</p>
            </div>
          </div>
        </a>

      </div>

      <div className="glass-card slide-up" style={{ animationDelay: '0.2s', padding: '3rem' }}>
        <Monitor size={48} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Report Cybercrime Online</h2>
        <p style={{ fontSize: '1.3rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
          You can also file a formal complaint online at the official Govt. of India portal.
        </p>
        <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.3rem', width: '100%', maxWidth: '400px' }}>
          Visit cybercrime.gov.in
        </a>
      </div>
    </div>
  );
};

export default EmergencyHelp;
