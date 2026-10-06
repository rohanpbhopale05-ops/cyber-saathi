import { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, AlertOctagon, Smartphone, Link as LinkIcon, MessageSquare } from 'lucide-react';
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

      riskScore = Math.min(riskScore, 100);

      let level = 'LOW RISK';
      if (riskScore >= 70) {
        level = 'HIGH RISK';
        recommendation = "Do not share OTP, PIN or payment information. Block the number and delete the message.";
      } else if (riskScore >= 40) {
        level = 'SUSPICIOUS';
        recommendation = "Proceed with caution. Verify the sender's identity through official channels before sharing any information.";
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

    }, 800);
  };

  const handleCheck = () => {
    if (!inputValue.trim()) return;
    analyzeInput();
  };

  const getUIConfig = (level) => {
    if (level === 'HIGH RISK') return { color: 'var(--high-risk)', icon: <AlertOctagon size={48} color="var(--high-risk)" /> };
    if (level === 'SUSPICIOUS') return { color: 'var(--warning)', icon: <AlertTriangle size={48} color="var(--warning)" /> };
    return { color: 'var(--text)', icon: <ShieldCheck size={48} color="var(--text)" /> };
  };

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '800' }}>{t("Check Before You Trust")}</h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-light)' }}>
          Paste a phone number, web link, or message below to check for red flags.
        </p>
      </div>

      <div className="glass-card slide-up">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => {setActiveTab('phone'); setResult(null); setInputValue('');}}
            style={{ 
              padding: '1.5rem', fontSize: '1.3rem', fontWeight: 'bold', 
              border: activeTab === 'phone' ? '3px solid var(--primary)' : '2px solid transparent',
              backgroundColor: activeTab === 'phone' ? 'var(--bg-alt)' : 'rgba(255,255,255,0.5)',
              borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.2s', color: 'var(--text)'
            }}
          >
            <Smartphone size={28} color={activeTab === 'phone' ? 'var(--primary)' : 'var(--text)'} />
            {t("PHONE NUMBER")}
          </button>
          <button 
            onClick={() => {setActiveTab('url'); setResult(null); setInputValue('');}}
            style={{ 
              padding: '1.5rem', fontSize: '1.3rem', fontWeight: 'bold', 
              border: activeTab === 'url' ? '3px solid var(--primary)' : '2px solid transparent',
              backgroundColor: activeTab === 'url' ? 'var(--bg-alt)' : 'rgba(255,255,255,0.5)',
              borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.2s', color: 'var(--text)'
            }}
          >
            <LinkIcon size={28} color={activeTab === 'url' ? 'var(--primary)' : 'var(--text)'} />
            {t("URL")}
          </button>
          <button 
            onClick={() => {setActiveTab('message'); setResult(null); setInputValue('');}}
            style={{ 
              padding: '1.5rem', fontSize: '1.3rem', fontWeight: 'bold', 
              border: activeTab === 'message' ? '3px solid var(--primary)' : '2px solid transparent',
              backgroundColor: activeTab === 'message' ? 'var(--bg-alt)' : 'rgba(255,255,255,0.5)',
              borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.2s', color: 'var(--text)'
            }}
          >
            <MessageSquare size={28} color={activeTab === 'message' ? 'var(--primary)' : 'var(--text)'} />
            {t("MESSAGE")}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
          {activeTab === 'message' ? (
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste suspicious message here..."
              rows="5"
              style={{ padding: '1.5rem', fontSize: '1.3rem', border: '2px solid rgba(185,28,28,0.2)', borderRadius: '12px', width: '100%', resize: 'vertical' }}
            />
          ) : (
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={activeTab === 'phone' ? 'Enter 10-digit number or international number' : 'Enter website link (e.g. http://...)'}
              style={{ padding: '1.5rem', fontSize: '1.3rem', border: '2px solid rgba(185,28,28,0.2)', borderRadius: '12px', width: '100%' }}
            />
          )}
          
          <Button onClick={handleCheck} variant="primary" style={{ padding: '1.5rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', fontSize: '1.4rem', opacity: isAnalyzing ? 0.7 : 1 }}>
            {isAnalyzing ? t("ANALYZING...") : <><Search size={28} style={{ marginRight: '10px' }} /> {t("CHECK")}</>}
          </Button>
        </div>
      </div>

      {result && (
        <div className="glass-card slide-up" style={{ marginTop: '3rem', borderTop: `6px solid ${getUIConfig(result.level).color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {getUIConfig(result.level).icon}
            <div>
              <h2 style={{ color: getUIConfig(result.level).color, fontSize: '2.5rem', margin: 0, fontWeight: '900' }}>{t(result.level)}</h2>
              <p style={{ fontSize: '1.3rem', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>{t("Risk Score")}: {result.score}/100</p>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text)' }}>Why is this suspicious?</h3>
            <ul style={{ fontSize: '1.3rem', lineHeight: '1.8', color: 'var(--text-light)' }}>
              {result.reasons.map((reason, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{reason}</li>
              ))}
            </ul>
          </div>

          <div style={{ backgroundColor: '#fff7ed', padding: '1.5rem', borderRadius: '12px', borderLeft: '6px solid var(--secondary)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{t("Recommended Action:")}</h3>
            <p style={{ fontSize: '1.3rem', margin: 0, lineHeight: '1.6', fontWeight: 'bold', color: 'var(--text-light)' }}>
              {result.recommendation}
            </p>
          </div>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginTop: '2rem', fontStyle: 'italic', textAlign: 'center' }}>
            Important Note: This is a demo rule-based scanner. Never claim that a result guarantees safety.
          </p>
        </div>
      )}

    </div>
  );
};

export default CheckScam;
