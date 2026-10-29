import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  ShieldAlert, 
  Globe, 
  ExternalLink, 
  Siren, 
  Copy, 
  Check, 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  X,
  Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';

const EmergencyHelp = () => {
  const { t } = useLanguage();
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // '1930' or '112'

  const handleCall = (number, title) => {
    // 1. Copy number to clipboard
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(number);
        setCopiedNumber(number);
        setTimeout(() => setCopiedNumber(null), 3000);
      }
    } catch {
      // ignore clipboard error
    }

    // 2. Open checklist modal for guidance
    setActiveModal({ number, title });

    // 3. Trigger phone dialer
    window.location.href = `tel:${number}`;
  };

  const handleCopyOnly = (e, number) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(number);
        setCopiedNumber(number);
        setTimeout(() => setCopiedNumber(null), 3000);
      }
    } catch {
      // ignore clipboard error
    }
  };

  const bankHelplines = [
    { name: "State Bank of India (SBI)", number: "18001234", alt: "1800 2100" },
    { name: "HDFC Bank", number: "18001600", alt: "1800 266 4060" },
    { name: "ICICI Bank", number: "18001080", alt: "1800 1080" },
    { name: "Punjab National Bank (PNB)", number: "18001800", alt: "1800 2021" },
    { name: "Bank of Baroda (BOB)", number: "18005700", alt: "1800 5700" },
    { name: "Axis Bank", number: "18604195555", alt: "1860 419 5555" }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem 0 4rem' }}>
      
      {/* Title & Badge */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span className="glass-capsule glass-capsule-red" style={{ fontSize: '0.95rem', padding: '0.4rem 1.3rem', marginBottom: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Siren size={18} color="var(--red-security)" />
          <span>Immediate Cyber Incident Response Hub</span>
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.6rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
          {t("Emergency Help")}
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          {t("Act immediately if you have lost money or suspect a cybercrime.")}
        </p>
      </div>

      {/* Floating Copied Toast Alert */}
      {copiedNumber && (
        <div 
          className="slide-up"
          style={{ 
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            zIndex: 9999, 
            background: 'linear-gradient(135deg, #10B981, #059669)', 
            color: '#FFFFFF', 
            padding: '1rem 1.6rem', 
            borderRadius: '999px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
            fontSize: '1.15rem',
            fontWeight: 'bold'
          }}
        >
          <Check size={22} />
          <span>Number {copiedNumber} copied to clipboard!</span>
        </div>
      )}

      {/* Primary Emergency Call Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
        
        {/* Helpline 1930 Card */}
        <div 
          className="glass-card slide-up" 
          onClick={() => handleCall("1930", "National Cyber Crime Helpline")}
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 59, 48, 0.16) 0%, rgba(11, 18, 38, 0.40) 100%)', 
            color: '#F8FAFC', 
            padding: '2.5rem 2rem', 
            borderRadius: '24px', 
            border: '2px solid rgba(255, 59, 48, 0.65)', 
            cursor: 'pointer', 
            boxShadow: '0 12px 35px rgba(255, 59, 48, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'relative',
            transition: 'all 0.25s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="glass-icon-box" style={{ width: '68px', height: '68px', borderRadius: '18px', background: 'rgba(255, 59, 48, 0.25)', borderColor: 'var(--red-security)', color: '#FFFFFF', boxShadow: 'var(--glow-red)' }}>
                <PhoneCall size={36} strokeWidth={2.4} />
              </div>
              <span className="glass-capsule glass-capsule-red" style={{ fontSize: '0.85rem', padding: '0.3rem 0.85rem' }}>
                Toll-Free 24x7
              </span>
            </div>

            <h2 style={{ fontSize: '2.8rem', margin: '0 0 0.5rem 0', fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              {t("CALL 1930")}
            </h2>
            <p style={{ fontSize: '1.3rem', margin: 0, color: '#FCA5A5', fontWeight: '700' }}>
              {t("National Cyber Crime Helpline")}
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.8rem', lineHeight: '1.5' }}>
              Call immediately if money has been deducted from your bank or UPI. The nodal team can freeze transactions in transit.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-danger" 
              style={{ flex: 1, padding: '0.9rem 1.4rem', fontSize: '1.15rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={(e) => { e.stopPropagation(); handleCall("1930", "National Cyber Crime Helpline"); }}
            >
              <Phone size={20} />
              <span>Call Now</span>
            </button>
            <button 
              type="button" 
              className="btn" 
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '0.9rem 1.2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={(e) => handleCopyOnly(e, "1930")}
              title="Copy phone number 1930"
            >
              <Copy size={18} />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Police Emergency 112 Card */}
        <div 
          className="glass-card slide-up" 
          onClick={() => handleCall("112", "National Police Emergency")}
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 122, 24, 0.16) 0%, rgba(11, 18, 38, 0.40) 100%)', 
            color: '#F8FAFC', 
            padding: '2.5rem 2rem', 
            borderRadius: '24px', 
            border: '2px solid rgba(255, 122, 24, 0.55)', 
            cursor: 'pointer', 
            animationDelay: '0.1s', 
            boxShadow: '0 12px 35px rgba(255, 122, 24, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'relative',
            transition: 'all 0.25s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="glass-icon-box" style={{ width: '68px', height: '68px', borderRadius: '18px', background: 'rgba(255, 122, 24, 0.25)', borderColor: 'var(--orange-signal)', color: 'var(--orange-signal)', boxShadow: 'var(--glow-orange)' }}>
                <ShieldAlert size={36} strokeWidth={2.4} />
              </div>
              <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.85rem', padding: '0.3rem 0.85rem' }}>
                All India Police
              </span>
            </div>

            <h2 style={{ fontSize: '2.8rem', margin: '0 0 0.5rem 0', fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              {t("CALL 112")}
            </h2>
            <p style={{ fontSize: '1.3rem', margin: 0, color: '#FDBA74', fontWeight: '700' }}>
              {t("National Police Emergency")}
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '0.8rem', lineHeight: '1.5' }}>
              Unified emergency services for urgent physical safety, harassment, digital extortion, or cyber blackmail threats.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-primary" 
              style={{ flex: 1, padding: '0.9rem 1.4rem', fontSize: '1.15rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={(e) => { e.stopPropagation(); handleCall("112", "National Police Emergency"); }}
            >
              <Phone size={20} />
              <span>Call Now</span>
            </button>
            <button 
              type="button" 
              className="btn" 
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '0.9rem 1.2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={(e) => handleCopyOnly(e, "112")}
              title="Copy phone number 112"
            >
              <Copy size={18} />
              <span>Copy</span>
            </button>
          </div>
        </div>

      </div>

      {/* Golden Hour Action Protocol */}
      <div className="glass-card slide-up" style={{ padding: '2.5rem', marginBottom: '3.5rem', borderLeft: '6px solid var(--orange-signal)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
          <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255, 122, 24, 0.15)', borderColor: 'var(--orange-signal)' }}>
            <Clock size={28} color="var(--orange-signal)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F8FAFC', margin: 0, fontWeight: '800' }}>
              The "Golden Hour" Protocol: What to Do in the First 2 Hours
            </h2>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Following these 4 steps immediately maximizes the chance of recovering lost money:
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--red-security)' }}>01.</span>
            <h3 style={{ fontSize: '1.3rem', color: '#F8FAFC', margin: '0.4rem 0 0.4rem' }}>Freeze Bank Account</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
              Call your bank's toll-free number immediately to block UPI, net banking, and debit/credit cards.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--orange-signal)' }}>02.</span>
            <h3 style={{ fontSize: '1.3rem', color: '#F8FAFC', margin: '0.4rem 0 0.4rem' }}>Call 1930 Helpline</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
              Provide the transaction reference / UTR number to initiate a lien hold on the scammer's receiving wallet.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--cyan-highlight)' }}>03.</span>
            <h3 style={{ fontSize: '1.3rem', color: '#F8FAFC', margin: '0.4rem 0 0.4rem' }}>Preserve Evidence</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
              Do not delete SMS, WhatsApp chats, or payment screenshots. Keep caller IDs and links saved.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.4rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--low-risk)' }}>04.</span>
            <h3 style={{ fontSize: '1.3rem', color: '#F8FAFC', margin: '0.4rem 0 0.4rem' }}>Formal FIR / Portal</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
              File an official cybercrime complaint on cybercrime.gov.in and obtain your complaint acknowledgement slip.
            </p>
          </div>
        </div>
      </div>

      {/* Bank Emergency Helplines Quick Directory */}
      <div className="glass-card slide-up" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
          <div className="glass-icon-box" style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-highlight)' }}>
            <Building2 size={28} color="var(--cyan-highlight)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: '#F8FAFC', margin: 0, fontWeight: '800' }}>
              Major Bank Emergency Fraud Helplines
            </h2>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Call your bank immediately to stop further unauthorized debit transactions:
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {bankHelplines.map((bank, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.04)', 
                padding: '1.2rem 1.4rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#F8FAFC', margin: '0 0 0.3rem 0', fontWeight: '700' }}>{bank.name}</h3>
                <span style={{ fontSize: '1.2rem', color: 'var(--cyan-highlight)', fontWeight: 'bold' }}>{bank.alt}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleCall(bank.number, `${bank.name} Fraud Desk`)}
                  style={{ padding: '0.6rem 0.9rem', borderRadius: '10px', background: 'var(--blue-electric)', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  title={`Call ${bank.name}`}
                >
                  <Phone size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleCopyOnly(e, bank.alt)}
                  style={{ padding: '0.6rem 0.9rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  title="Copy number"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Action Columns: Report on Cyber Saathi & Official Govt Portal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Report Scam on Cyber Saathi */}
        <div className="glass-card slide-up" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--orange-signal)' }}>
          <div>
            <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', margin: '0 0 1.2rem 0', background: 'rgba(255, 122, 24, 0.15)', borderColor: 'var(--orange-signal)', color: 'var(--orange-signal)' }}>
              <ShieldAlert size={30} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '800' }}>
              Report Scam on Cyber Saathi
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Log the scam details with evidence screenshots in our guided senior-citizen report wizard to get a tracking ID.
            </p>
          </div>
          <Link to="/report" style={{ textDecoration: 'none' }}>
            <Button variant="primary" style={{ width: '100%', padding: '1.1rem', fontSize: '1.25rem', borderRadius: '999px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <span>{t("REPORT A SCAM")}</span>
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>

        {/* Official Cybercrime Govt Portal */}
        <div className="glass-card slide-up" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--cyan-highlight)' }}>
          <div>
            <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', margin: '0 0 1.2rem 0', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-highlight)', color: 'var(--cyan-highlight)', boxShadow: 'var(--glow-cyan)' }}>
              <Globe size={30} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '800' }}>
              {t("Report Cybercrime Online")}
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              {t("You can also file a formal complaint online at the official Govt. of India portal.")}
            </p>
          </div>
          <a 
            href="https://cybercrime.gov.in/" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary" 
            style={{ padding: '1.1rem', fontSize: '1.25rem', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '10px', borderRadius: '999px', textDecoration: 'none' }}
          >
            <span>{t("Visit cybercrime.gov.in")}</span>
            <ExternalLink size={20} />
          </a>
        </div>

      </div>

      {/* Call Guidance Modal */}
      {activeModal && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(5, 8, 22, 0.85)', 
            backdropFilter: 'blur(16px)', 
            WebkitBackdropFilter: 'blur(16px)', 
            zIndex: 10000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1.5rem' 
          }}
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="glass-card slide-up" 
            style={{ 
              maxWidth: '560px', 
              width: '100%', 
              padding: '2.5rem', 
              border: '2px solid var(--red-security)', 
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), var(--glow-red)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="glass-icon-box" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 59, 48, 0.2)', borderColor: 'var(--red-security)' }}>
                  <PhoneCall size={26} color="var(--red-security)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.6rem', color: '#F8FAFC', margin: 0, fontWeight: '800' }}>
                    Calling {activeModal.number}
                  </h3>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{activeModal.title}</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '6px' }}
                aria-label="Close dialog"
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ background: 'rgba(255, 59, 48, 0.1)', padding: '1.2rem', borderRadius: '14px', border: '1px solid rgba(255, 59, 48, 0.3)', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#FCA5A5', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} />
                <span>Keep These 4 Details Ready Before Officer Answers:</span>
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.4rem', color: '#F8FAFC', fontSize: '1.05rem', lineHeight: '1.7' }}>
                <li>Your Bank Account Number & IFSC</li>
                <li>Transaction Reference ID / UTR Number</li>
                <li>Exact Time & Amount Deducted</li>
                <li>Scammer's Phone Number or UPI handle</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href={`tel:${activeModal.number}`}
                className="btn btn-danger"
                style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '999px' }}
              >
                <Phone size={20} />
                <span>Dial {activeModal.number}</span>
              </a>
              <button 
                type="button"
                className="btn"
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', padding: '1rem 1.4rem', fontSize: '1.1rem', borderRadius: '999px', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                onClick={(e) => handleCopyOnly(e, activeModal.number)}
              >
                <Copy size={18} />
                <span>Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmergencyHelp;
