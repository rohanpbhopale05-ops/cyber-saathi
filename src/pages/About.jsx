import { useLanguage } from '../context/LanguageContext';
import { Shield, Users, Globe, Award, GraduationCap, Code } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ maxWidth: '1080px', margin: '0 auto', padding: '1rem 0 3.5rem', textAlign: 'center' }}>
      
      {/* Title & Badge */}
      <div style={{ marginBottom: '3.5rem' }}>
        <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
          <GraduationCap size={18} color="var(--cyan-highlight)" />
          <span>Academic Innovation Initiative</span>
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.6rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
          {t("About Project")}
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
          Senior Citizen Cyber Security & Scam Reporting Portal
        </p>
      </div>
      
      {/* College Details Card */}
      <div className="glass-card slide-up" style={{ padding: '3rem 2.5rem', marginBottom: '4.5rem', borderTop: '4px solid var(--cyan-highlight)' }}>
        <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 1.5rem', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-highlight)', color: 'var(--cyan-highlight)', boxShadow: 'var(--glow-cyan)' }}>
          <GraduationCap size={36} />
        </div>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '1.8rem', color: '#F8FAFC', fontWeight: '800' }}>
          Academic Affiliation
        </h2>
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', padding: '2.5rem 2rem', borderRadius: '18px', maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--cyan-highlight)', margin: '0 0 1rem 0' }}>
            PVG's College of Engineering and Technology, Nashik
          </p>
          <p style={{ fontSize: '1.35rem', color: '#F8FAFC', margin: '0.5rem 0', fontWeight: '600' }}>
            Department of Information Technology
          </p>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
            Second Year Engineering Project (CEP / Project Based Learning)
          </p>
          <p style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--orange-signal)', margin: '1rem 0 0 0' }}>
            Savitribai Phule Pune University (SPPU)
          </p>
        </div>
      </div>

      {/* Project Team Section */}
      <div style={{ marginBottom: '5.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.9rem', padding: '0.3rem 1rem' }}>
            Engineering Developers
          </span>
          <h2 style={{ fontSize: '2.6rem', color: '#F8FAFC', fontWeight: '900', marginTop: '0.8rem' }}>
            Project Team
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.8rem' }}>
          
          <div className="glass-card slide-up" style={{ padding: '2.2rem 1.8rem', borderTop: '4px solid var(--orange-signal)', background: 'linear-gradient(180deg, rgba(255, 122, 24, 0.10) 0%, rgba(11, 18, 38, 0.10) 100%)' }}>
            <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', margin: '0 auto 1.2rem', color: 'var(--orange-signal)', borderColor: 'var(--border-orange)' }}>
              <Award size={28} />
            </div>
            <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.6rem 0', color: '#F8FAFC', fontWeight: '800' }}>Rohan Bhopale</h3>
            <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.85rem', padding: '0.25rem 0.85rem' }}>Team Leader</span>
          </div>

          <div className="glass-card slide-up" style={{ padding: '2.2rem 1.8rem', animationDelay: '0.1s', borderTop: '4px solid var(--cyan-highlight)' }}>
            <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', margin: '0 auto 1.2rem', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)' }}>
              <Code size={28} />
            </div>
            <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.6rem 0', color: '#F8FAFC', fontWeight: '800' }}>Swayam Adik</h3>
            <span className="glass-capsule" style={{ fontSize: '0.85rem', padding: '0.25rem 0.85rem' }}>Team Member</span>
          </div>

          <div className="glass-card slide-up" style={{ padding: '2.2rem 1.8rem', animationDelay: '0.2s', borderTop: '4px solid var(--blue-electric)' }}>
            <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', margin: '0 auto 1.2rem', color: 'var(--cyan-highlight)', borderColor: 'rgba(22, 119, 255, 0.4)' }}>
              <Code size={28} />
            </div>
            <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.6rem 0', color: '#F8FAFC', fontWeight: '800' }}>Sakshi Badgujar</h3>
            <span className="glass-capsule" style={{ fontSize: '0.85rem', padding: '0.25rem 0.85rem' }}>Team Member</span>
          </div>

          <div className="glass-card slide-up" style={{ padding: '2.2rem 1.8rem', animationDelay: '0.3s', borderTop: '4px solid var(--red-security)' }}>
            <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', margin: '0 auto 1.2rem', color: 'var(--red-security)', borderColor: 'var(--border-red)' }}>
              <Code size={28} />
            </div>
            
            <span className="glass-capsule" style={{ fontSize: '0.85rem', padding: '0.25rem 0.85rem' }}>Team Member</span>
          </div>

        </div>
      </div>

      {/* Cyber Saathi Pillars */}
      <div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', color: '#F8FAFC', fontWeight: '900' }}>
          Core Mission Pillars
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.8rem' }}>
          
          <div className="glass-card" style={{ padding: '2.5rem 1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="glass-icon-box" style={{ width: '60px', height: '60px', borderRadius: '18px', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)' }}>
              <Users size={32} />
            </div>
            <h3 style={{ fontSize: '1.45rem', margin: 0, color: '#F8FAFC', fontWeight: '700' }}>Senior Citizen Friendly</h3>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>Simplified visual interface with large legible text and zero confusing jargon.</p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem 1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="glass-icon-box" style={{ width: '60px', height: '60px', borderRadius: '18px', color: 'var(--orange-signal)', borderColor: 'var(--border-orange)' }}>
              <Shield size={32} />
            </div>
            <h3 style={{ fontSize: '1.45rem', margin: 0, color: '#F8FAFC', fontWeight: '700' }}>Simple Reporting</h3>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>Guided step-by-step reporting with automatic evidence attachment and tracking.</p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem 1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="glass-icon-box" style={{ width: '60px', height: '60px', borderRadius: '18px', color: 'var(--blue-electric)', borderColor: 'rgba(22, 119, 255, 0.4)' }}>
              <Shield size={32} />
            </div>
            <h3 style={{ fontSize: '1.45rem', margin: 0, color: '#F8FAFC', fontWeight: '700' }}>Cyber Awareness</h3>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>Read-aloud safety guides and real-time scam detection indicators.</p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem 1.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div className="glass-icon-box" style={{ width: '60px', height: '60px', borderRadius: '18px', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)' }}>
              <Globe size={32} />
            </div>
            <h3 style={{ fontSize: '1.45rem', margin: 0, color: '#F8FAFC', fontWeight: '700' }}>Multilingual Support</h3>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>Available in English, Marathi (मराठी), and Hindi (हिंदी) with instant toggling.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;
