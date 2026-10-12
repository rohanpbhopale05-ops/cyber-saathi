import { useState, useEffect } from 'react';
import { ShieldAlert, FileText, PhoneCall, Link as LinkIcon, AlertTriangle, PlayCircle, PauseCircle, QrCode, Smartphone, Gift, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CyberSafety = () => {
  const { t, language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tips = [
    { 
      title: "OTP Safety", 
      icon: <ShieldAlert size={40} />, 
      signs: "Caller or SMS asking for a 6-digit OTP code to resolve an issue.", 
      doNot: "Never share your OTP with anyone. Banks and official agencies will NEVER ask for it.", 
      whatToDo: "Disconnect the call immediately and inform your bank." 
    },
    { 
      title: "UPI Safety", 
      icon: <FileText size={40} />, 
      signs: "Caller says 'enter your UPI PIN to receive prize or refund money'.", 
      doNot: "UPI PIN is entered ONLY to SEND money, never to RECEIVE money.", 
      whatToDo: "Decline the request immediately in your UPI application." 
    },
    { 
      title: "KYC Scams", 
      icon: <LinkIcon size={40} />, 
      signs: "SMS warning: 'Your bank account/SIM card is suspended, update KYC immediately'.", 
      doNot: "Never click on KYC update links received through SMS or WhatsApp.", 
      whatToDo: "Visit your physical bank branch or service center in person to verify." 
    },
    { 
      title: "Fake Bank Calls", 
      icon: <PhoneCall size={40} />, 
      signs: "Caller pretends to be a bank manager warning your ATM card is expiring.", 
      doNot: "Never disclose your card number, CVV (3 digits on the back), or expiry date.", 
      whatToDo: "Cut the call and dial the customer care number printed on your physical passbook." 
    },
    { 
      title: "Phishing Links", 
      icon: <Mail size={40} />, 
      signs: "Emails or texts with strange links offering government subsidies or rewards.", 
      doNot: "Do not tap on unknown links or enter your passwords on strange web pages.", 
      whatToDo: "Delete the message and mark the sender as spam." 
    },
    { 
      title: "WhatsApp Scams", 
      icon: <Smartphone size={40} />, 
      signs: "Messages from unknown numbers claiming to be a relative in an emergency needing cash.", 
      doNot: "Do not transfer money in haste without direct voice verification.", 
      whatToDo: "Call that relative directly on their known phone number to verify first." 
    },
    { 
      title: "Fake Customer Care", 
      icon: <PhoneCall size={40} />, 
      signs: "Customer care numbers searched on Google that ask you to download apps.", 
      doNot: "Never trust phone numbers found casually on search engine results.", 
      whatToDo: "Get verified numbers solely from the back of your credit/debit card or official app." 
    },
    { 
      title: "Lottery Scams", 
      icon: <Gift size={40} />, 
      signs: "Messages claiming you won ₹25 Lakhs or a car in a lucky draw you never entered.", 
      doNot: "Never pay any 'processing fee', 'GST', or 'clearance charges' to claim prizes.", 
      whatToDo: "Ignore and block the sender. Real lotteries do not ask for advance payment." 
    },
    { 
      title: "Remote Access Apps", 
      icon: <AlertTriangle size={40} />, 
      signs: "Caller asks you to install AnyDesk, TeamViewer, or QuickSupport on your device.", 
      doNot: "Never install remote screen-sharing applications on instruction from callers.", 
      whatToDo: "Hang up. If already installed, turn off Wi-Fi/mobile data and uninstall immediately." 
    },
    { 
      title: "QR Code Scams", 
      icon: <QrCode size={40} />, 
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
    <div className="fade-in" style={{ padding: '2rem 0', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '800' }}>{t("Cyber Safety Tips")}</h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-light)', maxWidth: '750px', margin: '0 auto' }}>
          Learn about the most common online tricks and how to protect your hard-earned money.
        </p>
        
        <button 
          onClick={handleReadAloud}
          className="btn btn-primary" 
          style={{ marginTop: '1.8rem', padding: '1rem 2.5rem', fontSize: '1.3rem', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(185, 28, 28, 0.25)' }}
          aria-label={isSpeaking ? "Stop Reading Aloud" : "Read Safety Tips Aloud"}
        >
          {isSpeaking ? (
            <>
              <PauseCircle size={28} /> STOP READING
            </>
          ) : (
            <>
              <PlayCircle size={28} /> READ ALOUD
            </>
          )}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {tips.map((tip, index) => (
          <div key={index} className="glass-card slide-up" style={{ animationDelay: `${index * 0.05}s`, borderTop: '6px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0 }}>
                {tip.icon}
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', margin: 0, fontWeight: '800' }}>{t(tip.title)}</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary)' }}>
                <strong style={{ display: 'block', color: 'var(--secondary)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Warning Signs:</strong>
                <span style={{ fontSize: '1.15rem', color: 'var(--text)', lineHeight: '1.5' }}>{tip.signs}</span>
              </div>
              
              <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
                <strong style={{ display: 'block', color: 'var(--danger)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Never Share:</strong>
                <span style={{ fontSize: '1.15rem', color: 'var(--text)', fontWeight: 'bold', lineHeight: '1.5' }}>{tip.doNot}</span>
              </div>

              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(185,28,28,0.2)', borderLeft: '4px solid var(--primary)' }}>
                <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>What To Do:</strong>
                <span style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: '600', lineHeight: '1.5' }}>{tip.whatToDo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberSafety;
