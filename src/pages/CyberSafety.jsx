import { ShieldAlert, FileText, PhoneCall, Link as LinkIcon, AlertTriangle, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CyberSafety = () => {
  const { t } = useLanguage();
  const tips = [
    { title: "OTP Safety", icon: <ShieldAlert size={40} />, signs: "Asking for 6-digit code via SMS", doNot: "Never share OTP. Bank will NEVER ask.", whatToDo: "Cut the call immediately." },
    { title: "UPI & Payment Scams", icon: <FileText size={40} />, signs: "Says 'enter PIN to get refund'", doNot: "UPI PIN is only to SEND money, not RECEIVE.", whatToDo: "Decline the request in your UPI app." },
    { title: "KYC Scams", icon: <LinkIcon size={40} />, signs: "SMS saying 'Account blocked, update KYC here'", doNot: "Never click KYC links in SMS.", whatToDo: "Visit your bank branch directly." },
    { title: "Fake Customer Care", icon: <PhoneCall size={40} />, signs: "Number found on Google Search", doNot: "Do not trust numbers from Google.", whatToDo: "Use the official bank app to find numbers." },
    { title: "Remote Access Apps", icon: <AlertTriangle size={40} />, signs: "Caller asks to install AnyDesk or TeamViewer", doNot: "Never install screen sharing apps.", whatToDo: "Uninstall the app immediately if downloaded." }
  ];

  return (
    <div className="fade-in" style={{ padding: '2rem 0', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '800' }}>{t("Cyber Safety Tips")}</h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-light)' }}>
          Learn about the most common online tricks and how to protect your money.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '1.5rem', padding: '1rem 2rem', fontSize: '1.3rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <PlayCircle size={28} /> READ ALOUD
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {tips.map((tip, index) => (
          <div key={index} className="glass-card slide-up" style={{ animationDelay: `${index * 0.1}s`, borderTop: '6px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
                {tip.icon}
              </div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text)', margin: 0 }}>{tip.title}</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Warning Signs:</strong>
                <span style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{tip.signs}</span>
              </div>
              
              <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: 'var(--danger)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Never Share:</strong>
                <span style={{ fontSize: '1.2rem', color: 'var(--text)', fontWeight: 'bold' }}>{tip.doNot}</span>
              </div>

              <div style={{ backgroundColor: 'var(--bg-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(185,28,28,0.2)' }}>
                <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>What To Do:</strong>
                <span style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{tip.whatToDo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyberSafety;
