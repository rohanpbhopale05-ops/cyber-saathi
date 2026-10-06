import { Link } from 'react-router-dom';
import { ShieldAlert, Search, PhoneCall, ShieldCheck, FileWarning, BookOpen, AlertCircle, Zap, Gift, FileText, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '2rem 0' }}>
        <div style={{ display: 'inline-block', padding: '1.5rem', backgroundColor: 'var(--bg-alt)', borderRadius: '50%', marginBottom: '1.5rem' }}>
           <ShieldCheck size={70} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '800' }}>
          {t("Stay Safe. Stay Alert. Stay Cyber Smart.")}
        </h1>
        <p style={{ fontSize: '1.6rem', color: 'var(--text-light)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.6' }}>
          {t("A simple cyber-safety platform designed especially for senior citizens.")}
        </p>
      </div>

      {/* Main Action Buttons (Primary CTAs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        <Link to="/report" style={{ textDecoration: 'none' }}>
          <div className="glass-card slide-up" style={{ textAlign: 'center', border: '2px solid var(--warning)', cursor: 'pointer', height: '100%', padding: '3rem 2rem' }}>
            <ShieldAlert size={60} color="var(--warning)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--warning)', marginBottom: '1rem' }}>{t("REPORT A SCAM")}</h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text)' }}>{t("Did you lose money or receive a suspicious call? Report it here.")}</p>
          </div>
        </Link>
        <Link to="/check" style={{ textDecoration: 'none' }}>
          <div className="glass-card slide-up" style={{ textAlign: 'center', border: '2px solid var(--primary-light)', cursor: 'pointer', height: '100%', padding: '3rem 2rem', animationDelay: '0.1s' }}>
            <Search size={60} color="var(--primary-light)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-light)', marginBottom: '1rem' }}>{t("CHECK A SCAM")}</h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text)' }}>{t("Enter a phone number, message, or link to see if it is safe.")}</p>
          </div>
        </Link>
        <Link to="/emergency" style={{ textDecoration: 'none' }}>
          <div className="glass-card slide-up" style={{ textAlign: 'center', border: '2px solid var(--high-risk)', backgroundColor: 'var(--bg-alt)', cursor: 'pointer', height: '100%', padding: '3rem 2rem', animationDelay: '0.2s' }}>
            <PhoneCall size={60} color="var(--high-risk)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--high-risk)', marginBottom: '1rem' }}>{t("EMERGENCY HELP")}</h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text)' }}>{t("Find out what to do immediately if you have been scammed.")}</p>
          </div>
        </Link>
      </div>

      {/* Emergency Banner */}
      <div className="glass-card fade-in" style={{ backgroundColor: 'var(--high-risk)', color: 'white', textAlign: 'center', marginBottom: '5rem', padding: '3rem 2rem', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
          <AlertCircle size={40} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>National Cyber Crime Helpline: 1930</h2>
        </div>
        <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>Call 1930 immediately if you have lost money from your bank account.</p>
      </div>

      {/* How Cyber Saathi Helps */}
      <div style={{ marginBottom: '6rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', textAlign: 'center', marginBottom: '3rem' }}>{t("How Cyber Saathi Helps")}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Card 1: Check */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', borderTop: '6px solid var(--primary-light)' }}>
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
              <ShieldCheck size={40} color="var(--primary-light)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text)' }}>{t("CHECK")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{t("Check suspicious numbers, links and messages.")}</p>
          </div>
          
          {/* Card 2: Report */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', borderTop: '6px solid var(--secondary)', animationDelay: '0.1s' }}>
            <div style={{ backgroundColor: 'var(--secondary-light)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
              <FileWarning size={40} color="var(--secondary)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text)' }}>{t("REPORT")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{t("Report suspected scams with simple guided steps.")}</p>
          </div>
          
          {/* Card 3: Learn */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', borderTop: '6px solid var(--primary)', animationDelay: '0.2s' }}>
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
              <BookOpen size={40} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text)' }}>{t("LEARN")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{t("Learn simple cyber-safety practices.")}</p>
          </div>
          
          {/* Card 4: Get Help */}
          <div className="glass-card slide-up" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', borderTop: '6px solid var(--high-risk)', animationDelay: '0.3s' }}>
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
              <PhoneCall size={40} color="var(--high-risk)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text)' }}>{t("GET HELP")}</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: '1.6' }}>{t("Quickly find emergency cybercrime and police assistance.")}</p>
          </div>
        </div>
      </div>

      {/* Common Scam Types - Icon Based Cards */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', textAlign: 'center', marginBottom: '1rem' }}>{t("Common Scam Types")}</h2>
        <p style={{ fontSize: '1.3rem', color: 'var(--text-light)', textAlign: 'center', marginBottom: '3rem' }}>{t("Watch out for these frequent tricks used by fraudsters.")}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2rem' }}>
            <div style={{ backgroundColor: 'var(--secondary-light)', padding: '1.2rem', borderRadius: '12px', flexShrink: 0 }}>
              <Zap size={36} color="var(--secondary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{t("Electricity Bill Scam")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.5' }}>"Your power will be cut tonight, please pay immediately."</p>
            </div>
          </div>
          
          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.2rem', borderRadius: '12px', flexShrink: 0 }}>
              <Gift size={36} color="var(--primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{t("Lottery / Prize Scam")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.5' }}>"You won ₹25 Lakhs! Pay a small processing fee to claim it."</p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1.2rem', borderRadius: '12px', flexShrink: 0 }}>
              <FileText size={36} color="var(--primary-light)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{t("KYC Update Scam")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.5' }}>"Your bank account is blocked. Click the link to update KYC."</p>
            </div>
          </div>

          <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '2rem' }}>
            <div style={{ backgroundColor: 'var(--secondary-light)', padding: '1.2rem', borderRadius: '12px', flexShrink: 0 }}>
              <Headphones size={36} color="var(--high-risk)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{t("Fake Customer Care")}</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0, lineHeight: '1.5' }}>"I am calling from bank support, please install this remote app."</p>
            </div>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/safety" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.4rem' }}>
            {t("Read More Safety Tips")}
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
