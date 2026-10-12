import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Upload, CheckCircle, ShieldAlert, Phone, MessageSquare, Mail, Link as LinkIcon, CreditCard, Share2, HelpCircle } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const ReportScam = () => {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [reportId, setReportId] = useState('');
  
  const [formData, setFormData] = useState({
    scamType: '',
    phone: '',
    url: '',
    message: '',
    evidenceUploaded: false,
    name: '',
    mobile: '',
    email: '',
    description: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0,0);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReportId = `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const reportPayload = {
      report_id: newReportId,
      user_id: user ? user.id : null,
      scam_type: formData.scamType,
      phone_number: formData.phone || null,
      email: formData.email || null,
      url: formData.url || null,
      message: formData.message || null,
      description: formData.description,
      risk_level: 'HIGH RISK',
      status: 'Submitted'
    };

    if (supabase) {
      await supabase.from('reports').insert([reportPayload]);
    } else {
      const existing = JSON.parse(localStorage.getItem('cyberSaathiReports') || '[]');
      localStorage.setItem('cyberSaathiReports', JSON.stringify([{...reportPayload, id: existing.length + 1, created_at: new Date().toISOString()}, ...existing]));
    }
    
    setReportId(newReportId);
    setCurrentStep(5);
  };

  const renderStepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '4px', backgroundColor: '#e2e8f0', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '24px', left: '10%', width: `${((currentStep-1)/3)*80}%`, height: '4px', backgroundColor: 'var(--primary)', zIndex: 0, transition: 'width 0.3s ease' }}></div>
      
      {[1, 2, 3, 4].map(step => (
        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '25%' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: step <= currentStep ? 'var(--primary)' : 'white',
            border: `3px solid ${step <= currentStep ? 'var(--primary)' : '#cbd5e1'}`,
            color: step <= currentStep ? 'white' : '#64748b',
            fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', transition: 'all 0.3s ease'
          }}>
            {step < currentStep ? <CheckCircle size={24} /> : step}
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: step === currentStep ? 'bold' : 'normal', color: step === currentStep ? 'var(--primary)' : 'var(--text-light)', textAlign: 'center' }}>
            {step === 1 && "Scam Type"}
            {step === 2 && "Details"}
            {step === 3 && "Evidence"}
            {step === 4 && "Submit"}
          </span>
        </div>
      ))}
    </div>
  );

  const scamTypesList = [
    { id: 'Phone Call', icon: <Phone size={32}/> },
    { id: 'SMS', icon: <MessageSquare size={32}/> },
    { id: 'WhatsApp', icon: <MessageSquare size={32}/> },
    { id: 'Email', icon: <Mail size={32}/> },
    { id: 'URL', icon: <LinkIcon size={32}/> },
    { id: 'UPI/Payment', icon: <CreditCard size={32}/> },
    { id: 'Social Media', icon: <Share2 size={32}/> },
    { id: 'Other', icon: <HelpCircle size={32}/> }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 0' }}>
      
      {currentStep < 5 && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '2rem', fontWeight: '800' }}>{t("Report a Scam")}</h1>
          {renderStepIndicator()}
        </div>
      )}

      <div className="glass-card">
        {currentStep === 1 && (
          <form onSubmit={handleNext} className="slide-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>{t("1. What type of scam did you encounter?")}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {scamTypesList.map(type => (
                <div 
                  key={type.id}
                  onClick={() => setFormData({...formData, scamType: type.id})}
                  style={{
                    border: formData.scamType === type.id ? '3px solid var(--primary)' : '2px solid rgba(185,28,28,0.1)',
                    backgroundColor: formData.scamType === type.id ? 'var(--bg-alt)' : 'rgba(255,255,255,0.8)',
                    borderRadius: '12px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: formData.scamType === type.id ? '0 4px 12px rgba(185,28,28,0.15)' : 'none'
                  }}
                >
                  <div style={{ color: formData.scamType === type.id ? 'var(--primary)' : 'var(--text-light)', marginBottom: '1rem' }}>
                    {type.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text)' }}>{type.id}</h3>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button type="submit" variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.3rem' }} disabled={!formData.scamType}>
                {t("Next")} <ArrowRight size={24} style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleNext} className="slide-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>{t("2. Provide specific scam details")}</h2>
            
            <div className="input-group">
              <label>Suspicious Phone Number (if any)</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="e.g. +91 9876543210" />
            </div>
            
            <div className="input-group">
              <label>Suspicious Web Link / URL (if any)</label>
              <input type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="e.g. http://fake-bank.com" />
            </div>

            <div className="input-group">
              <label>Suspicious Message Content (if any)</label>
              <textarea rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Paste the message here..."></textarea>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Button type="button" onClick={handleBack} style={{ backgroundColor: '#94a3b8', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1.2rem' }}>
                <ArrowLeft size={24} style={{ marginRight: '10px' }} /> {t("Back")}
              </Button>
              <Button type="submit" variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
                {t("Next")} <ArrowRight size={24} style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleNext} className="slide-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>{t("3. Upload Evidence (Optional)")}</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-light)', textAlign: 'center', fontSize: '1.2rem' }}>Please provide any screenshots, photos, or documents that can help us.</p>
            
            <div 
              style={{ border: '3px dashed rgba(185,28,28,0.3)', padding: '4rem 2rem', textAlign: 'center', borderRadius: '16px', cursor: 'pointer', backgroundColor: formData.evidenceUploaded ? '#f0fdf4' : 'rgba(255,255,255,0.8)' }}
              onClick={() => setFormData({...formData, evidenceUploaded: true})}
            >
              {formData.evidenceUploaded ? (
                <>
                  <CheckCircle size={60} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
                  <p style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 'bold' }}>Evidence attached successfully! (Demo)</p>
                </>
              ) : (
                <>
                  <Upload size={60} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
                  <p style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Click here to select a photo from your phone or computer</p>
                </>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Button type="button" onClick={handleBack} style={{ backgroundColor: '#94a3b8', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1.2rem' }}>
                <ArrowLeft size={24} style={{ marginRight: '10px' }} /> {t("Back")}
              </Button>
              <Button type="submit" variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
                {t("Next")} <ArrowRight size={24} style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <form onSubmit={handleSubmit} className="slide-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>{t("4. Personal Details & Description")}</h2>
            
            <div className="input-group">
              <label>Your Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="e.g. Ramesh Kumar" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="input-group">
                <label>Mobile Number</label>
                <input type="tel" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} required placeholder="10-digit number" />
              </div>
              <div className="input-group">
                <label>Email (Optional)</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" />
              </div>
            </div>

            <div className="input-group">
              <label>Incident Description</label>
              <textarea 
                rows="5" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required 
                placeholder="Please explain what happened in your own words..."
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Button type="button" onClick={handleBack} style={{ backgroundColor: '#94a3b8', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1.2rem' }}>
                <ArrowLeft size={24} style={{ marginRight: '10px' }} /> {t("Back")}
              </Button>
              <Button type="submit" variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.4rem' }}>
                {t("SUBMIT REPORT")}
              </Button>
            </div>
          </form>
        )}

        {currentStep === 5 && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle size={100} color="var(--primary)" style={{ margin: '0 auto 2rem' }} />
            <h2 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '800' }}>{t("Report Submitted Successfully")}</h2>
            <p style={{ fontSize: '1.5rem', marginBottom: '3rem', color: 'var(--text-light)' }}>Your report has been received and will be reviewed shortly.</p>
            
            <div style={{ backgroundColor: 'var(--bg-alt)', padding: '2rem', borderRadius: '16px', border: '2px solid var(--primary-light)', display: 'inline-block', marginBottom: '3rem' }}>
              <p style={{ fontSize: '1.3rem', margin: '0 0 1rem 0', color: 'var(--text-light)', fontWeight: 'bold' }}>{t("Your Report ID")}</p>
              <div style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '4px', color: 'var(--primary)' }}>
                {reportId}
              </div>
            </div>
            
            <p style={{ fontSize: '1.3rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
              Please save this ID to track your complaint status.
            </p>

            <Button onClick={() => navigate('/my-reports')} variant="primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
              TRACK MY REPORT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportScam;
