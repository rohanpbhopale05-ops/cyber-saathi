import { PhoneCall, ShieldAlert, Globe, ExternalLink, Siren } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EmergencyHelp = () => {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ maxWidth: '880px', margin: '0 auto', padding: '1rem 0 3.5rem', textAlign: 'center' }}>
      
      {/* Title & Badge */}
      <div style={{ marginBottom: '3.5rem' }}>
        <span className="glass-capsule glass-capsule-red" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
          <Siren size={18} color="var(--red-security)" />
          <span>Immediate Cyber Incident Response</span>
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.6rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
          {t("Emergency Help")}
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          {t("Act immediately if you have lost money or suspect a cybercrime.")}
        </p>
      </div>

      {/* Emergency Call Action Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', marginBottom: '4rem' }}>
        
        {/* Helpline 1930 */}
        <a href="tel:1930" style={{ textDecoration: 'none' }}>
          <div 
            className="glass-card slide-up" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 59, 48, 0.22) 0%, rgba(11, 18, 38, 0.45) 100%)', 
              color: '#F8FAFC', 
              padding: '3rem 2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '28px', 
              borderRadius: '24px', 
              border: '2px solid rgba(255, 59, 48, 0.6)', 
              cursor: 'pointer', 
              boxShadow: '0 12px 35px rgba(255, 59, 48, 0.35)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="glass-icon-box" style={{ width: '80px', height: '80px', borderRadius: '22px', background: 'rgba(255, 59, 48, 0.25)', borderColor: 'var(--red-security)', color: '#FFFFFF', boxShadow: 'var(--glow-red)' }}>
              <PhoneCall size={42} strokeWidth={2.3} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>{t("CALL 1930")}</h2>
                <span className="glass-capsule glass-capsule-red" style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>Toll-Free</span>
              </div>
              <p style={{ fontSize: '1.4rem', margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {t("National Cyber Crime Helpline")}
              </p>
            </div>
          </div>
        </a>

        {/* Police Emergency 112 */}
        <a href="tel:112" style={{ textDecoration: 'none' }}>
          <div 
            className="glass-card slide-up" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 122, 24, 0.18) 0%, rgba(11, 18, 38, 0.45) 100%)', 
              color: '#F8FAFC', 
              padding: '3rem 2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '28px', 
              borderRadius: '24px', 
              border: '2px solid rgba(255, 122, 24, 0.5)', 
              cursor: 'pointer', 
              animationDelay: '0.1s', 
              boxShadow: '0 12px 35px rgba(255, 122, 24, 0.25)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="glass-icon-box" style={{ width: '80px', height: '80px', borderRadius: '22px', background: 'rgba(255, 122, 24, 0.2)', borderColor: 'var(--orange-signal)', color: 'var(--orange-signal)', boxShadow: 'var(--glow-orange)' }}>
              <ShieldAlert size={42} strokeWidth={2.3} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>{t("CALL 112")}</h2>
                <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>All India</span>
              </div>
              <p style={{ fontSize: '1.4rem', margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {t("National Police Emergency")}
              </p>
            </div>
          </div>
        </a>

      </div>

      {/* Online Official Cybercrime Portal */}
      <div className="glass-card slide-up" style={{ animationDelay: '0.2s', padding: '3rem 2.5rem', borderTop: '4px solid var(--cyan-highlight)' }}>
        <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 1.5rem', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-highlight)', color: 'var(--cyan-highlight)', boxShadow: 'var(--glow-cyan)' }}>
          <Globe size={36} />
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#F8FAFC', fontWeight: '800' }}>
          {t("Report Cybercrime Online")}
        </h2>
        <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          {t("You can also file a formal complaint online at the official Govt. of India portal.")}
        </p>
        <a 
          href="https://cybercrime.gov.in/" 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-primary" 
          style={{ padding: '1.2rem 3rem', fontSize: '1.35rem', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
        >
          <span>{t("Visit cybercrime.gov.in")}</span>
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
};

export default EmergencyHelp;
