import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  FileWarning, 
  BookOpen, 
  AlertCircle, 
  Zap, 
  Gift, 
  FileText, 
  Headphones,
  Lock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3rem' }}>
      
      {/* Hero Section */}
      <div className="glass-card hero-container" style={{ marginBottom: '4.5rem' }}>
        <div className="hero-cyber-backdrop" aria-hidden="true"></div>

        <div className="hero-content">
          {/* Futuristic Concentric Digital Lock HUD Visual Anchor */}
          <div className="cyber-hud-lock" aria-hidden="true">
            <div className="cyber-hud-ripple"></div>
            <div className="cyber-hud-ring-outer"></div>
            <div className="cyber-hud-ring-inner"></div>
            <div className="cyber-hud-icon-core">
              <Lock size={44} color="var(--cyan-highlight)" strokeWidth={2.4} />
              <div className="cyber-hud-core-sweep"></div>
            </div>
          </div>

          {/* Capsule Badge */}
          <div style={{ marginBottom: '1.3rem' }}>
            <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '1rem', padding: '0.45rem 1.4rem', letterSpacing: '0.04em' }}>
              <ShieldCheck size={18} color="var(--cyan-highlight)" />
              <span>{t("CYBER SAFETY FOR EVERYONE")}</span>
            </span>
          </div>

          {/* Main Prominent Heading */}
          <h1 style={{ 
            fontSize: 'clamp(2.4rem, 5.2vw, 4rem)', 
            color: '#F8FAFC', 
            marginBottom: '1.25rem', 
            fontWeight: '900', 
            letterSpacing: '-0.025em', 
            lineHeight: 1.15,
            maxWidth: '960px',
            margin: '0 auto 1.25rem'
          }}>
            {t("Your Digital Safety, Our Priority")}
          </h1>

          {/* Supporting Text */}
          <p style={{ 
            fontSize: '1.35rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '820px', 
            margin: '0 auto 2.6rem', 
            lineHeight: '1.6', 
            fontWeight: '500' 
          }}>
            {t("Stay informed, recognize suspicious activities and find guidance to protect yourself from online scams.")}
          </p>

          {/* Three Interactive Glass-Style Capsule Action Buttons */}
          <div className="hero-action-buttons-group" style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <Link to="/report" className="glass-capsule glass-capsule-hero glass-capsule-orange" style={{ textDecoration: 'none' }}>
              <span className="glass-icon-box" style={{ width: '38px', height: '38px', borderRadius: '999px', background: 'rgba(255, 122, 24, 0.2)', borderColor: 'var(--orange-signal)' }}>
                <ShieldAlert size={20} color="var(--orange-signal)" />
              </span>
              <span style={{ fontSize: '1.18rem', fontWeight: '700' }}>{t("Report Scam")}</span>
            </Link>

            <Link to="/check" className="glass-capsule glass-capsule-hero glass-capsule-cyan" style={{ textDecoration: 'none' }}>
              <span className="glass-icon-box" style={{ width: '38px', height: '38px', borderRadius: '999px', background: 'rgba(34, 211, 238, 0.2)', borderColor: 'var(--cyan-highlight)' }}>
                <Search size={20} color="var(--cyan-highlight)" />
              </span>
              <span style={{ fontSize: '1.18rem', fontWeight: '700' }}>{t("Check Scam")}</span>
            </Link>

            <Link to="/emergency" className="glass-capsule glass-capsule-hero glass-capsule-red" style={{ textDecoration: 'none' }}>
              <span className="glass-icon-box" style={{ width: '38px', height: '38px', borderRadius: '999px', background: 'rgba(255, 59, 48, 0.25)', borderColor: 'var(--red-security)' }}>
                <PhoneCall size={20} color="#FFFFFF" />
              </span>
              <span style={{ fontSize: '1.18rem', fontWeight: '700' }}>{t("Emergency Help")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Action Buttons (Primary CTAs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        
        {/* 1. Report Scam */}
        <Link to="/report" style={{ textDecoration: 'none' }}>
          <div className="glass-card hero-card-report slide-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.8rem 2.2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(255, 122, 24, 0.15)', borderColor: 'var(--orange-signal)', color: 'var(--orange-signal)', boxShadow: 'var(--glow-orange)' }}>
                  <ShieldAlert size={34} strokeWidth={2.2} />
                </div>
                <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.85rem', padding: '0.3rem 0.85rem' }}>
                  {t("REPORT")}
                </span>
              </div>
              <h2 style={{ fontSize: '2rem', color: '#F8FAFC', marginBottom: '1rem', fontWeight: '800' }}>
                {t("REPORT A SCAM")}
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t("Did you lose money or receive a suspicious call? Report it here.")}
              </p>
            </div>
            <div style={{ marginTop: '2.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--orange-signal)', fontWeight: '700', fontSize: '1.15rem' }}>
              <span>{t("Start Guided Report")}</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>

        {/* 2. Check Scam */}
        <Link to="/check" style={{ textDecoration: 'none' }}>
          <div className="glass-card hero-card-check slide-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.8rem 2.2rem', animationDelay: '0.1s' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-highlight)', color: 'var(--cyan-highlight)', boxShadow: 'var(--glow-cyan)' }}>
                  <Search size={34} strokeWidth={2.2} />
                </div>
                <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.85rem', padding: '0.3rem 0.85rem' }}>
                  {t("CHECK")}
                </span>
              </div>
              <h2 style={{ fontSize: '2rem', color: '#F8FAFC', marginBottom: '1rem', fontWeight: '800' }}>
                {t("CHECK A SCAM")}
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t("Enter a phone number, message, or link to see if it is safe.")}
              </p>
            </div>
            <div style={{ marginTop: '2.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cyan-highlight)', fontWeight: '700', fontSize: '1.15rem' }}>
              <span>{t("Scan Suspicious Info")}</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>

        {/* 3. Emergency Help */}
        <Link to="/emergency" style={{ textDecoration: 'none' }}>
          <div className="glass-card hero-card-emergency slide-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.8rem 2.2rem', animationDelay: '0.2s' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'rgba(255, 59, 48, 0.25)', borderColor: 'var(--red-security)', color: '#FFFFFF', boxShadow: 'var(--glow-red)' }}>
                  <PhoneCall size={34} strokeWidth={2.2} />
                </div>
                <span className="glass-capsule glass-capsule-red" style={{ fontSize: '0.85rem', padding: '0.3rem 0.85rem' }}>
                  1930
                </span>
              </div>
              <h2 style={{ fontSize: '2rem', color: '#F8FAFC', marginBottom: '1rem', fontWeight: '800' }}>
                {t("EMERGENCY HELP")}
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t("Find out what to do immediately if you have been scammed.")}
              </p>
            </div>
            <div style={{ marginTop: '2.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b6b', fontWeight: '700', fontSize: '1.15rem' }}>
              <span>{t("Dial Helpline Now")}</span>
              <ArrowRight size={20} />
            </div>
          </div>
        </Link>

      </div>

      {/* Emergency Banner */}
      <div className="glass-card fade-in" style={{ 
        background: 'linear-gradient(135deg, rgba(255, 59, 48, 0.25) 0%, rgba(11, 18, 38, 0.45) 100%)', 
        border: '1.5px solid rgba(255, 59, 48, 0.45)', 
        color: '#F8FAFC', 
        textAlign: 'center', 
        marginBottom: '5.5rem', 
        padding: '3rem 2rem', 
        borderRadius: '24px',
        boxShadow: '0 0 35px rgba(255, 59, 48, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(255, 59, 48, 0.3)', color: '#FFFFFF', borderColor: 'var(--red-security)' }}>
            <AlertCircle size={32} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: 0, fontWeight: '900', letterSpacing: '-0.01em' }}>
            National Cyber Crime Helpline: 1930
          </h2>
        </div>
        <p style={{ fontSize: '1.45rem', color: 'var(--text-secondary)', maxWidth: '850px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Call 1930 immediately if you have lost money from your bank account.
        </p>
        <a href="tel:1930" className="btn btn-danger" style={{ fontSize: '1.3rem', padding: '1rem 2.8rem' }}>
          <PhoneCall size={22} />
          <span>Call 1930 Directly</span>
        </a>
      </div>

      {/* How Cyber Saathi Helps */}
      <div style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1.1rem', marginBottom: '1rem' }}>
            {t("How It Works")}
          </span>
          <h2 style={{ fontSize: '2.8rem', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem' }}>
            {t("How Cyber Saathi Helps")}
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
          {/* Card 1: Check */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.8rem', borderTop: '4px solid var(--cyan-highlight)' }}>
            <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 1.5rem', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-highlight)', color: 'var(--cyan-highlight)' }}>
              <ShieldCheck size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#F8FAFC', fontWeight: '800' }}>{t("CHECK")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t("Check suspicious numbers, links and messages.")}</p>
          </div>
          
          {/* Card 2: Report */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.8rem', borderTop: '4px solid var(--orange-signal)', animationDelay: '0.1s' }}>
            <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 1.5rem', background: 'rgba(255, 122, 24, 0.15)', borderColor: 'var(--orange-signal)', color: 'var(--orange-signal)' }}>
              <FileWarning size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#F8FAFC', fontWeight: '800' }}>{t("REPORT")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t("Report suspected scams with simple guided steps.")}</p>
          </div>
          
          {/* Card 3: Learn */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.8rem', borderTop: '4px solid var(--blue-electric)', animationDelay: '0.2s' }}>
            <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 1.5rem', background: 'rgba(22, 119, 255, 0.15)', borderColor: 'var(--blue-electric)', color: 'var(--cyan-highlight)' }}>
              <BookOpen size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#F8FAFC', fontWeight: '800' }}>{t("LEARN")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t("Learn simple cyber-safety practices.")}</p>
          </div>
          
          {/* Card 4: Get Help */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.8rem', borderTop: '4px solid var(--red-security)', animationDelay: '0.3s' }}>
            <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 1.5rem', background: 'rgba(255, 59, 48, 0.15)', borderColor: 'var(--red-security)', color: 'var(--red-security)' }}>
              <PhoneCall size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#F8FAFC', fontWeight: '800' }}>{t("GET HELP")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{t("Quickly find emergency cybercrime and police assistance.")}</p>
          </div>
        </div>
      </div>

      {/* Common Scam Types - Cyber Cards */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.95rem', padding: '0.35rem 1.1rem', marginBottom: '1rem' }}>
            {t("Common Scams")}
          </span>
          <h2 style={{ fontSize: '2.8rem', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
            {t("Common Scam Types")}
          </h2>
          <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
            {t("Watch out for these frequent tricks used by fraudsters.")}
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.8rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2.2rem', borderLeft: '4px solid var(--orange-signal)' }}>
            <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', color: 'var(--orange-signal)', borderColor: 'var(--border-orange)' }}>
              <Zap size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '700' }}>{t("Electricity Bill Scam")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                "Your power will be cut tonight, please pay immediately."
              </p>
            </div>
          </div>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2.2rem', borderLeft: '4px solid var(--cyan-highlight)' }}>
            <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)' }}>
              <Gift size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '700' }}>{t("Lottery / Prize Scam")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                "You won ₹25 Lakhs! Pay a small processing fee to claim it."
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2.2rem', borderLeft: '4px solid var(--blue-electric)' }}>
            <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', color: 'var(--cyan-highlight)', borderColor: 'rgba(22, 119, 255, 0.4)' }}>
              <FileText size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '700' }}>{t("KYC Update Scam")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                "Your bank account is blocked. Click the link to update KYC."
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2.2rem', borderLeft: '4px solid var(--red-security)' }}>
            <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', color: 'var(--red-security)', borderColor: 'var(--border-red)' }}>
              <Headphones size={30} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '700' }}>{t("Fake Customer Care")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                "I am calling from bank support, please install this remote app."
              </p>
            </div>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/safety" className="btn btn-primary" style={{ padding: '1.1rem 3.2rem', fontSize: '1.35rem' }}>
            <span>{t("Read More Safety Tips")}</span>
            <ChevronRight size={22} />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
