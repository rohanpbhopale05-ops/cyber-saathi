import { useState } from 'react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Smartphone, 
  Link as LinkIcon, 
  MessageSquare,
  Radio,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const CheckScam = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('phone');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeInput = () => {
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      let riskScore = 0;
      let reasons = [];
      let recommendation = "";

      if (activeTab === 'phone') {
        const suspiciousPrefixes = ['+92', '+44', '140', '111'];
        if (suspiciousPrefixes.some(prefix => inputValue.startsWith(prefix))) {
          riskScore += 80;
          reasons.push("International or uncommon prefix commonly used in scams");
        }
        if (inputValue.length < 10 && !inputValue.startsWith('1')) {
          riskScore += 50;
          reasons.push("Number is too short to be a standard mobile number");
        }
        if (riskScore === 0) {
          riskScore = 10;
          reasons.push("Standard domestic number format");
        }
      }

      if (activeTab === 'url') {
        const urlRules = [
          { pattern: /http:\/\//, score: 30, reason: "Insecure connection (HTTP instead of HTTPS)" },
          { pattern: /(free|prize|lottery|win|gift)/i, score: 50, reason: "URL contains bait words" },
          { pattern: /-(update|kyc|support|bank)\./i, score: 60, reason: "Mimicking official domains using hyphens" },
          { pattern: /\.xyz|\.top|\.online/, score: 40, reason: "Suspicious top-level domain" },
        ];
        
        urlRules.forEach(rule => {
          if (rule.pattern.test(inputValue)) {
            riskScore += rule.score;
            reasons.push(rule.reason);
          }
        });
      }

      if (activeTab === 'message') {
        const messageRules = [
          { pattern: /OTP/i, score: 40, reason: "Requests OTP" },
          { pattern: /KYC.*(block|suspend|update)/i, score: 80, reason: "Threatens account block due to KYC" },
          { pattern: /(click|link|tap).*http/i, score: 50, reason: "Contains a link urging you to click" },
          { pattern: /(urgently|immediately|within 24 hours)/i, score: 30, reason: "Creates false sense of urgency" },
          { pattern: /(₹|Rs\.?).*(won|lottery|prize|gift)/i, score: 80, reason: "Promises free money or prize" },
        ];

        messageRules.forEach(rule => {
          if (rule.pattern.test(inputValue)) {
            riskScore += rule.score;
            reasons.push(rule.reason);
          }
        });
      }

      let level = "LOW RISK";
      if (riskScore >= 70) {
        level = "HIGH RISK";
        recommendation = "Do not interact! Block the sender immediately. Never share OTPs, passwords, or install any remote screen-sharing apps.";
      } else if (riskScore >= 30) {
        level = "SUSPICIOUS";
        recommendation = "Proceed with extreme caution. Verify independently by visiting your bank branch or calling official customer care.";
      } else {
        recommendation = "No immediate red flags detected, but always stay vigilant and do not share sensitive information like OTPs or PINs.";
      }

      setResult({
        score: riskScore,
        level,
        reasons: reasons.length > 0 ? reasons : ["No specific threat patterns identified."],
        recommendation
      });
      setIsAnalyzing(false);

    }, 850);
  };

  const handleCheck = () => {
    if (!inputValue.trim()) return;
    analyzeInput();
  };

  const getUIConfig = (level) => {
    if (level === 'HIGH RISK') return { 
      color: 'var(--red-security)', 
      bg: 'rgba(255, 59, 48, 0.15)',
      border: 'var(--red-security)',
      glow: 'var(--glow-red)',
      icon: <AlertOctagon size={44} color="var(--red-security)" /> 
    };
    if (level === 'SUSPICIOUS') return { 
      color: 'var(--orange-signal)', 
      bg: 'rgba(255, 122, 24, 0.15)',
      border: 'var(--orange-signal)',
      glow: 'var(--glow-orange)',
      icon: <AlertTriangle size={44} color="var(--orange-signal)" /> 
    };
    return { 
      color: 'var(--low-risk)', 
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'var(--low-risk)',
      glow: '0 0 25px rgba(16, 185, 129, 0.3)',
      icon: <ShieldCheck size={44} color="var(--low-risk)" /> 
    };
  };

  return (
    <div className="fade-in" style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem 0 3rem' }}>
      
      {/* Page Title & Cyber Badge */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
          <Radio size={16} color="var(--cyan-highlight)" />
          <span>Real-Time Threat Scanner</span>
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
          {t("Check Before You Trust")}
        </h1>
        <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          Paste a phone number, web link, or message below to check for fraud indicators and suspicious patterns.
        </p>
      </div>

      <div className="glass-card slide-up" style={{ padding: '2.5rem' }}>
        
        {/* Tab Selection as Glass Capsules */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button 
            onClick={() => {setActiveTab('phone'); setResult(null); setInputValue('');}}
            className={`glass-capsule ${activeTab === 'phone' ? 'active' : ''}`}
            style={{ 
              padding: '0.8rem 1.8rem', 
              fontSize: '1.2rem', 
              fontWeight: '700',
              background: activeTab === 'phone' ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'phone' ? '#050816' : 'var(--text-primary)',
              borderColor: activeTab === 'phone' ? 'var(--cyan-highlight)' : 'var(--border-glass)',
              boxShadow: activeTab === 'phone' ? 'var(--glow-cyan)' : 'none',
              cursor: 'pointer'
            }}
          >
            <Smartphone size={22} color={activeTab === 'phone' ? '#050816' : 'var(--cyan-highlight)'} />
            <span>{t("PHONE NUMBER")}</span>
          </button>

          <button 
            onClick={() => {setActiveTab('url'); setResult(null); setInputValue('');}}
            className={`glass-capsule ${activeTab === 'url' ? 'active' : ''}`}
            style={{ 
              padding: '0.8rem 1.8rem', 
              fontSize: '1.2rem', 
              fontWeight: '700',
              background: activeTab === 'url' ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'url' ? '#050816' : 'var(--text-primary)',
              borderColor: activeTab === 'url' ? 'var(--cyan-highlight)' : 'var(--border-glass)',
              boxShadow: activeTab === 'url' ? 'var(--glow-cyan)' : 'none',
              cursor: 'pointer'
            }}
          >
            <LinkIcon size={22} color={activeTab === 'url' ? '#050816' : 'var(--cyan-highlight)'} />
            <span>{t("URL")}</span>
          </button>

          <button 
            onClick={() => {setActiveTab('message'); setResult(null); setInputValue('');}}
            className={`glass-capsule ${activeTab === 'message' ? 'active' : ''}`}
            style={{ 
              padding: '0.8rem 1.8rem', 
              fontSize: '1.2rem', 
              fontWeight: '700',
              background: activeTab === 'message' ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'rgba(255, 255, 255, 0.06)',
              color: activeTab === 'message' ? '#050816' : 'var(--text-primary)',
              borderColor: activeTab === 'message' ? 'var(--cyan-highlight)' : 'var(--border-glass)',
              boxShadow: activeTab === 'message' ? 'var(--glow-cyan)' : 'none',
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={22} color={activeTab === 'message' ? '#050816' : 'var(--cyan-highlight)'} />
            <span>{t("MESSAGE")}</span>
          </button>
        </div>

        {/* Input & Radar Scanner Line */}
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', position: 'relative' }}>
          {isAnalyzing && (
            <div className="radar-sweep-bar" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}></div>
          )}

          {activeTab === 'message' ? (
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste suspicious SMS, WhatsApp, or email message text here..."
              rows="5"
              style={{ fontSize: '1.25rem', padding: '1.25rem' }}
            />
          ) : (
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={activeTab === 'phone' ? 'Enter phone number (e.g. +91 9876543210 or 140...)' : 'Enter website link (e.g. http://bank-update-kyc.xyz...)'}
              style={{ fontSize: '1.25rem', padding: '1.25rem' }}
            />
          )}
          
          <Button 
            onClick={handleCheck} 
            variant="primary" 
            style={{ 
              padding: '1.2rem', 
              marginTop: '0.8rem', 
              fontSize: '1.35rem', 
              opacity: isAnalyzing ? 0.75 : 1,
              width: '100%',
              borderRadius: '999px'
            }}
          >
            {isAnalyzing ? (
              <span>{t("ANALYZING...")}</span>
            ) : (
              <>
                <Search size={24} /> 
                <span>{t("CHECK")}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Analysis Results Card */}
      {result && (
        <div 
          className="glass-card slide-up" 
          style={{ 
            marginTop: '3.5rem', 
            borderTop: `6px solid ${getUIConfig(result.level).border}`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.5), ${getUIConfig(result.level).glow}`,
            background: `linear-gradient(180deg, ${getUIConfig(result.level).bg} 0%, rgba(11, 18, 38, 0.9) 100%)`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div className="glass-icon-box" style={{ width: '70px', height: '70px', borderRadius: '20px', borderColor: getUIConfig(result.level).color, background: getUIConfig(result.level).bg }}>
              {getUIConfig(result.level).icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ color: getUIConfig(result.level).color, fontSize: '2.6rem', margin: 0, fontWeight: '900', letterSpacing: '-0.02em' }}>
                  {t(result.level)}
                </h2>
                <span className="glass-capsule" style={{ fontSize: '0.9rem', padding: '0.3rem 0.85rem', borderColor: getUIConfig(result.level).color }}>
                  Score: {result.score}/100
                </span>
              </div>
              <p style={{ fontSize: '1.3rem', margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>
                {t("Risk Score")}: <strong>{result.score}</strong> out of 100
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', color: '#F8FAFC', fontWeight: '800' }}>
              Why is this suspicious?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.reasons.map((reason, idx) => (
                <div key={idx} className="glass-capsule" style={{ borderRadius: '14px', padding: '0.85rem 1.4rem', justifyContent: 'flex-start', background: 'rgba(255, 255, 255, 0.05)', width: '100%' }}>
                  <AlertCircle size={20} color={getUIConfig(result.level).color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'rgba(15, 23, 42, 0.45)', 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '2rem', 
            borderRadius: '18px', 
            border: `1.5px solid ${getUIConfig(result.level).color}`,
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#F8FAFC', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={24} color={getUIConfig(result.level).color} />
              <span>{t("Recommended Action:")}</span>
            </h3>
            <p style={{ fontSize: '1.3rem', margin: 0, lineHeight: '1.6', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {result.recommendation}
            </p>
          </div>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '2rem', fontStyle: 'italic', textAlign: 'center' }}>
            Important Note: This is an automated cyber intelligence rule scanner. Always verify with official authorities before sharing financial data.
          </p>
        </div>
      )}

    </div>
  );
};

export default CheckScam;
