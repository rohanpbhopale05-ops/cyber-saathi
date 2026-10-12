import { useState, useEffect } from 'react';
import { ShieldAlert, FileText, PhoneCall, Link as LinkIcon, AlertTriangle, PlayCircle, PauseCircle, QrCode, Smartphone, Gift, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CyberSafety = () => {
  const { t, language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tips = [
    { 
      title: "OTP Safety", 
      icon: <ShieldAlert size={28} />, 
      color: "var(--orange-signal)",
      signs: "Caller or SMS asking for a 6-digit OTP code to resolve an issue.", 
      doNot: "Never share your OTP with anyone. Banks and official agencies will NEVER ask for it.", 
      whatToDo: "Disconnect the call immediately and inform your bank." 
    },
    { 
      title: "UPI Safety", 
      icon: <FileText size={28} />, 
      color: "var(--cyan-highlight)",
      signs: "Caller says 'enter your UPI PIN to receive prize or refund money'.", 
      doNot: "UPI PIN is entered ONLY to SEND money, never to RECEIVE money.", 
      whatToDo: "Decline the request immediately in your UPI application." 
    },
    { 
      title: "KYC Scams", 
      icon: <LinkIcon size={28} />, 
      color: "#F59E0B",
      signs: "SMS warning: 'Your bank account/SIM card is suspended, update KYC immediately'.", 
      doNot: "Never click on KYC update links received through SMS or WhatsApp.", 
      whatToDo: "Visit your physical bank branch or service center in person to verify." 
    },
    { 
      title: "Fake Bank Calls", 
      icon: <PhoneCall size={28} />, 
      color: "var(--red-security)",
      signs: "Caller pretends to be a bank manager warning your ATM card is expiring.", 
      doNot: "Never disclose your card number, CVV (3 digits on the back), or expiry date.", 
      whatToDo: "Cut the call and dial the customer care number printed on your physical passbook." 
    },
    { 
      title: "Phishing Links", 
      icon: <Mail size={28} />, 
      color: "var(--blue-electric)",
      signs: "Emails or texts with strange links offering government subsidies or rewards.", 
      doNot: "Do not tap on unknown links or enter your passwords on strange web pages.", 
      whatToDo: "Delete the message and mark the sender as spam." 
    },
    { 
      title: "WhatsApp Scams", 
      icon: <Smartphone size={28} />, 
      color: "#10B981",
      signs: "Messages from unknown numbers claiming to be a relative in an emergency needing cash.", 
      doNot: "Do not transfer money in haste without direct voice verification.", 
      whatToDo: "Call that relative directly on their known phone number to verify first." 
    },
    { 
      title: "Fake Customer Care", 
      icon: <PhoneCall size={28} />, 
      color: "#EC4899",
      signs: "Customer care numbers searched on Google that ask you to download apps.", 
      doNot: "Never trust phone numbers found casually on search engine results.", 
      whatToDo: "Get verified numbers solely from the back of your credit/debit card or official app." 
    },
    { 
      title: "Lottery Scams", 
      icon: <Gift size={28} />, 
      color: "#EAB308",
      signs: "Messages claiming you won ₹25 Lakhs or a car in a lucky draw you never entered.", 
      doNot: "Never pay any 'processing fee', 'GST', or 'clearance charges' to claim prizes.", 
      whatToDo: "Ignore and block the sender. Real lotteries do not ask for advance payment." 
    },
    { 
      title: "Remote Access Apps", 
      icon: <AlertTriangle size={28} />, 
      color: "var(--red-security)",
      signs: "Caller asks you to install AnyDesk, TeamViewer, or QuickSupport on your device.", 
      doNot: "Never install remote screen-sharing applications on instruction from callers.", 
      whatToDo: "Hang up. If already installed, turn off Wi-Fi/mobile data and uninstall immediately." 
    },
    { 
      title: "QR Code Scams", 
      icon: <QrCode size={28} />, 
      color: "var(--cyan-highlight)",
      signs: "Buyer on OLX or marketplace sends a QR code saying 'Scan this to receive payment'.", 
      doNot: "Scanning a QR code and entering your PIN ALWAYS debits money from your account.", 
      whatToDo: "Refuse to scan QR codes for receiving payments. Receiving money never needs a PIN." 
    }
  ];

  // Stop speech if user leaves the page
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = tips.map(t => `${t.title}. Warning Signs: ${t.signs}. Never Share: ${t.doNot}. What To Do: ${t.whatToDo}.`).join(' ');
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Slightly slower for senior citizens
    utterance.pitch = 1.0;

    // Pick appropriate language voice if available
    const voices = window.speechSynthesis.getVoices();
    if (language === 'Hindi') {
      const hiVoice = voices.find(v => v.lang.startsWith('hi'));
      if (hiVoice) utterance.voice = hiVoice;
    } else if (language === 'Marathi') {
      const mrVoice = voices.find(v => v.lang.startsWith('mr'));
      if (mrVoice) utterance.voice = mrVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3.5rem', maxWidth: '1080px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
          Educational Defense Guide
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.6rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
          {t("Cyber Safety Tips")}
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '780px', margin: '0 auto', lineHeight: '1.6' }}>
          Learn about the most common online tricks and how to protect your hard-earned money.
        </p>
        
        <button 
          onClick={handleReadAloud}
          className="btn btn-primary" 
          style={{ marginTop: '2rem', padding: '1rem 2.8rem', fontSize: '1.3rem', display: 'inline-flex', alignItems: 'center', gap: '12px', borderRadius: '999px' }}
          aria-label={isSpeaking ? "Stop Reading Aloud" : "Read Safety Tips Aloud"}
        >
          {isSpeaking ? (
            <>
              <PauseCircle size={26} /> <span>STOP READING</span>
            </>
          ) : (
            <>
              <PlayCircle size={26} /> <span>READ ALOUD</span>
            </>
          )}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {tips.map((tip, index) => (
          <div key={index} className="glass-card slide-up" style={{ animationDelay: `${index * 0.05}s`, borderTop: '4px solid var(--cyan-highlight)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.8rem' }}>
              <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)' }}>
                {tip.icon}
              </div>
              <h2 style={{ fontSize: '1.65rem', color: '#F8FAFC', margin: 0, fontWeight: '800' }}>{t(tip.title)}</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ background: 'rgba(255, 122, 24, 0.1)', padding: '1.2rem', borderRadius: '14px', borderLeft: '4px solid var(--orange-signal)' }}>
                <strong style={{ display: 'block', color: 'var(--orange-signal)', marginBottom: '0.4rem', fontSize: '1.15rem' }}>Warning Signs:</strong>
                <span style={{ fontSize: '1.18rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{tip.signs}</span>
              </div>
              
              <div style={{ background: 'rgba(255, 59, 48, 0.12)', padding: '1.2rem', borderRadius: '14px', borderLeft: '4px solid var(--red-security)' }}>
                <strong style={{ display: 'block', color: 'var(--red-security)', marginBottom: '0.4rem', fontSize: '1.15rem' }}>Never Share:</strong>
                <span style={{ fontSize: '1.18rem', color: '#ffffff', fontWeight: 'bold', lineHeight: '1.5' }}>{tip.doNot}</span>
              </div>

              <div style={{ background: 'rgba(34, 211, 238, 0.1)', padding: '1.2rem', borderRadius: '14px', borderLeft: '4px solid var(--cyan-highlight)' }}>
                <strong style={{ display: 'block', color: 'var(--cyan-highlight)', marginBottom: '0.4rem', fontSize: '1.15rem' }}>What To Do:</strong>
                <span style={{ fontSize: '1.18rem', color: 'var(--text-primary)', fontWeight: '600', lineHeight: '1.5' }}>{tip.whatToDo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberSafety;
