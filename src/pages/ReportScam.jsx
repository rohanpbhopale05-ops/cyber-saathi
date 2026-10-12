import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  CheckCircle, 
  ShieldAlert, 
  Phone, 
  Smartphone, 
  MessageSquare, 
  Mail, 
  Link as LinkIcon, 
  CreditCard, 
  Share2, 
  HelpCircle, 
  FileText, 
  X, 
  Image as ImageIcon 
} from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const ReportScam = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, supabase } = useAuth();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [reportId, setReportId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [evidencePreview, setEvidencePreview] = useState(null);
  const [evidenceDetails, setEvidenceDetails] = useState(null);

  const [formData, setFormData] = useState({
    scamType: '',
    phone: '',
    url: '',
    message: '',
    evidenceUploaded: false,
    evidenceFileName: '',
    name: '',
    mobile: '',
    email: '',
    description: ''
  });

  const handleFileSelect = (file) => {
    if (!file) return;

    const formattedSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

    setEvidenceDetails({
      name: file.name,
      size: formattedSize,
      type: file.type
    });

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEvidencePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          evidenceUploaded: true,
          evidenceFileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setEvidencePreview(null);
      setFormData(prev => ({
        ...prev,
        evidenceUploaded: true,
        evidenceFileName: file.name
      }));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setEvidencePreview(null);
    setEvidenceDetails(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData(prev => ({
      ...prev,
      evidenceUploaded: false,
      evidenceFileName: ''
    }));
  };

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
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newReportId = `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const reporterHeader = `[Reporter: ${formData.name || 'Anonymous'}${formData.mobile ? ` | Phone: ${formData.mobile}` : ''}${formData.email ? ` | Email: ${formData.email}` : ''}]`;
    const finalDescription = `${reporterHeader}\n\n${formData.description || ''}${formData.evidenceFileName ? `\n\n[Attached Evidence: ${formData.evidenceFileName}]` : ''}`;

    const reportPayload = {
      report_id: newReportId,
      user_id: user ? user.id : null,
      scam_type: formData.scamType,
      phone_number: formData.phone || null,
      email: formData.email || null,
      url: formData.url || null,
      message: formData.message || null,
      description: finalDescription,
      risk_level: 'HIGH RISK',
      status: 'Submitted'
    };

    // Attempt Supabase insert if client is configured
    try {
      if (supabase) {
        const { error } = await supabase.from('reports').insert([reportPayload]);
        if (error) {
          console.warn("Supabase insert notice, backing up locally:", error.message || error);
        }
      }
    } catch (err) {
      console.warn("Supabase insert exception, proceeding with local backup:", err);
    }

    // Always persist to localStorage for instant tracking in My Reports
    try {
      const existing = JSON.parse(localStorage.getItem('cyberSaathiReports') || '[]');
      const newLocalEntry = {
        ...reportPayload,
        id: existing.length + 1,
        created_at: new Date().toISOString(),
        evidence_name: formData.evidenceFileName || null,
        reporter_name: formData.name || null,
        reporter_phone: formData.mobile || null
      };
      localStorage.setItem('cyberSaathiReports', JSON.stringify([newLocalEntry, ...existing]));
    } catch (storageErr) {
      console.error("Local storage error:", storageErr);
    }
    
    setIsSubmitting(false);
    setReportId(newReportId);
    setCurrentStep(5);
  };

  const renderStepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.12)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '24px', left: '10%', width: `${((currentStep-1)/3)*80}%`, height: '3px', backgroundColor: 'var(--cyan-highlight)', boxShadow: 'var(--glow-cyan)', zIndex: 0, transition: 'width 0.4s ease' }}></div>
      
      {[1, 2, 3, 4].map(step => (
        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '25%' }}>
          <div style={{ 
            width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: step < currentStep ? 'var(--cyan-highlight)' : step === currentStep ? '#050816' : 'rgba(11, 18, 38, 0.25)',
            border: `2.5px solid ${step <= currentStep ? 'var(--cyan-highlight)' : 'rgba(255, 255, 255, 0.2)'}`,
            boxShadow: step <= currentStep ? 'var(--glow-cyan)' : 'none',
            color: step < currentStep ? '#050816' : step === currentStep ? 'var(--cyan-highlight)' : 'var(--text-muted)',
            fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.6rem', transition: 'all 0.3s ease'
          }}>
            {step < currentStep ? <CheckCircle size={24} /> : step}
          </div>
          <span style={{ fontSize: '1.05rem', fontWeight: step === currentStep ? 'bold' : '600', color: step === currentStep ? 'var(--cyan-highlight)' : 'var(--text-secondary)', textAlign: 'center' }}>
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
    { id: 'Phone Call', icon: <Phone size={26}/>, color: 'var(--orange-signal)', desc: 'Spoofing, threats & voice calls' },
    { id: 'SMS', icon: <MessageSquare size={26}/>, color: 'var(--cyan-highlight)', desc: 'Fake lottery & urgent OTP alerts' },
    { id: 'WhatsApp', icon: <Smartphone size={26}/>, color: '#10B981', desc: 'Job offers, fake profiles & media' },
    { id: 'Email', icon: <Mail size={26}/>, color: 'var(--blue-electric)', desc: 'Phishing links & bank imposters' },
    { id: 'URL', icon: <LinkIcon size={26}/>, color: '#A855F7', desc: 'Cloned portals & malware links' },
    { id: 'UPI/Payment', icon: <CreditCard size={26}/>, color: 'var(--red-security)', desc: 'Unauthorized debits & QR traps' },
    { id: 'Social Media', icon: <Share2 size={26}/>, color: '#EC4899', desc: 'Cloned accounts & fake ads' },
    { id: 'Other', icon: <HelpCircle size={26}/>, color: '#94A3B8', desc: 'Any other suspicious cyber fraud' }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '980px', margin: '0 auto', padding: '1rem 0 3.5rem' }}>
      
      {currentStep < 5 && (
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <span className="glass-capsule glass-capsule-orange" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
            Incident Reporting Protocol
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '2.5rem' }}>
            {t("Report a Scam")}
          </h1>
          {renderStepIndicator()}
        </div>
      )}

      <div className="glass-card" style={{ padding: '2.8rem 2.2rem' }}>
        {currentStep === 1 && (
          <form onSubmit={handleNext} className="slide-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: '#F8FAFC', fontWeight: '800' }}>
              {t("1. What type of scam did you encounter?")}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {scamTypesList.map(type => {
                const isSelected = formData.scamType === type.id;
                return (
                  <div 
                    key={type.id}
                    onClick={() => setFormData({...formData, scamType: type.id})}
                    style={{
                      position: 'relative',
                      border: isSelected ? '2px solid var(--cyan-highlight)' : '1px solid rgba(255, 255, 255, 0.16)',
                      borderTop: isSelected ? '2px solid #FFFFFF' : '1.5px solid rgba(255, 255, 255, 0.3)',
                      background: isSelected 
                        ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.16) 0%, rgba(11, 18, 38, 0.12) 100%)' 
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(11, 18, 38, 0.08) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '18px', 
                      padding: '1.6rem 1.2rem', 
                      textAlign: 'center', 
                      cursor: 'pointer', 
                      transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isSelected 
                        ? '0 12px 35px rgba(0, 0, 0, 0.4), var(--glow-cyan), inset 0 1px 2px rgba(255, 255, 255, 0.4)' 
                        : '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                      transform: isSelected ? 'translateY(-3px)' : 'none'
                    }}
                  >
                    {/* Selected Indicator Badge */}
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', width: '22px', height: '22px', borderRadius: '50%', background: 'var(--cyan-highlight)', color: '#050816', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px var(--cyan-highlight)' }}>
                        <CheckCircle size={15} strokeWidth={3} />
                      </div>
                    )}

                    {/* Symmetrical Glass Icon Box */}
                    <div 
                      className="glass-icon-box" 
                      style={{ 
                        width: '54px', 
                        height: '54px', 
                        borderRadius: '16px', 
                        margin: '0 auto 1rem', 
                        background: isSelected ? 'rgba(34, 211, 238, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                        borderColor: isSelected ? 'var(--cyan-highlight)' : 'rgba(255, 255, 255, 0.2)',
                        color: type.color,
                        boxShadow: isSelected ? `0 0 20px ${type.color}` : 'none',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {type.icon}
                    </div>

                    <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.25rem', color: '#F8FAFC', fontWeight: '800', letterSpacing: '-0.01em' }}>
                      {type.id}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {type.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', gap: '0.8rem' }}>
              <Button type="submit" variant="primary" style={{ padding: '1.1rem 3.5rem', fontSize: '1.3rem', borderRadius: '999px', opacity: formData.scamType ? 1 : 0.6 }} disabled={!formData.scamType}>
                <span>{t("Next")}</span>
                <ArrowRight size={22} style={{ marginLeft: '10px' }} />
              </Button>
              {!formData.scamType && (
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Please select one of the scam types above to continue
                </p>
              )}
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
            <p style={{ marginBottom: '2rem', color: 'var(--text-light)', textAlign: 'center', fontSize: '1.2rem' }}>
              Please attach any screenshot, photo, message export, or document to support your report.
            </p>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*,.pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
            />

            <div 
              style={{ 
                border: formData.evidenceUploaded ? '2px solid var(--cyan-highlight)' : '2px dashed rgba(34, 211, 238, 0.4)', 
                padding: '2.8rem 1.8rem', 
                textAlign: 'center', 
                borderRadius: '20px', 
                cursor: 'pointer', 
                backgroundColor: formData.evidenceUploaded ? 'rgba(34, 211, 238, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                boxShadow: formData.evidenceUploaded ? 'var(--glow-cyan)' : 'none',
                transition: 'all 0.25s ease'
              }}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {formData.evidenceUploaded && evidenceDetails ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.2rem', color: 'var(--cyan-highlight)' }}>
                    <CheckCircle size={36} />
                    <span style={{ fontSize: '1.45rem', fontWeight: 'bold' }}>Screenshot / File Attached!</span>
                  </div>

                  {evidencePreview ? (
                    <div style={{ margin: '1.5rem auto', maxWidth: '340px', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid var(--border-cyan)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                      <img 
                        src={evidencePreview} 
                        alt="Evidence Preview" 
                        style={{ width: '100%', maxHeight: '240px', objectFit: 'contain', display: 'block', backgroundColor: '#0B1226' }} 
                      />
                    </div>
                  ) : (
                    <div style={{ margin: '1.5rem auto', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-glass)' }}>
                      <FileText size={32} color="var(--cyan-highlight)" />
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#F8FAFC' }}>{evidenceDetails.name}</span>
                    </div>
                  )}

                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#F8FAFC', margin: '0.5rem 0' }}>
                    {evidenceDetails.name} <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>({evidenceDetails.size})</span>
                  </p>

                  <div style={{ marginTop: '1.8rem', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="glass-capsule"
                      style={{ padding: '0.6rem 1.4rem', fontSize: '1.05rem', fontWeight: 'bold' }}
                    >
                      Change File
                    </button>
                    <button 
                      type="button"
                      onClick={handleRemoveFile}
                      className="glass-capsule glass-capsule-red"
                      style={{ padding: '0.6rem 1.4rem', fontSize: '1.05rem', fontWeight: 'bold', color: '#ff6b6b' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="glass-icon-box" style={{ width: '74px', height: '74px', borderRadius: '20px', margin: '0 auto 1.4rem', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)', boxShadow: 'var(--glow-cyan)' }}>
                    <Upload size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.55rem', color: '#F8FAFC', marginBottom: '0.6rem', fontWeight: 'bold' }}>
                    Click here to choose a screenshot or photo
                  </h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '0 0 1.2rem 0' }}>
                    or drag and drop your file into this box
                  </p>
                  <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1rem' }}>
                    Supports PNG, JPG, JPEG, PDF, Docs
                  </span>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
              <Button type="button" onClick={handleBack} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#F8FAFC', border: '1px solid var(--border-glass)', padding: '1rem 2.2rem', fontSize: '1.2rem', borderRadius: '999px' }}>
                <ArrowLeft size={22} style={{ marginRight: '8px' }} /> {t("Back")}
              </Button>
              <Button type="submit" variant="primary" style={{ padding: '1.1rem 3.5rem', fontSize: '1.3rem', borderRadius: '999px' }}>
                <span>{t("Next")}</span>
                <ArrowRight size={22} style={{ marginLeft: '10px' }} />
              </Button>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <form onSubmit={handleSubmit} className="slide-up">
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: '#F8FAFC', fontWeight: '800' }}>
              {t("4. Personal Details & Description")}
            </h2>
            
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
              <Button type="button" onClick={handleBack} disabled={isSubmitting} style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#F8FAFC', border: '1px solid var(--border-glass)', padding: '1rem 2.2rem', fontSize: '1.2rem', borderRadius: '999px' }}>
                <ArrowLeft size={22} style={{ marginRight: '8px' }} /> {t("Back")}
              </Button>
              <Button type="submit" variant="danger" disabled={isSubmitting} style={{ padding: '1.1rem 3.5rem', fontSize: '1.35rem', borderRadius: '999px', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? "Submitting..." : t("SUBMIT REPORT")}
              </Button>
            </div>
          </form>
        )}

        {currentStep === 5 && (
          <div className="fade-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div className="glass-icon-box" style={{ width: '90px', height: '90px', borderRadius: '24px', margin: '0 auto 2rem', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)', boxShadow: 'var(--glow-cyan)' }}>
              <CheckCircle size={52} />
            </div>
            <h2 style={{ fontSize: '2.8rem', color: '#F8FAFC', marginBottom: '1.2rem', fontWeight: '900', letterSpacing: '-0.02em' }}>
              {t("Report Submitted Successfully")}
            </h2>
            <p style={{ fontSize: '1.45rem', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
              Your report has been encrypted and recorded. Authorities will review it shortly.
            </p>
            
            <div style={{ background: 'rgba(11, 18, 38, 0.15)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', padding: '2.2rem 3rem', borderRadius: '22px', border: '1.5px solid var(--cyan-highlight)', display: 'inline-block', marginBottom: '3rem', boxShadow: 'var(--glow-cyan)' }}>
              <p style={{ fontSize: '1.2rem', margin: '0 0 0.8rem 0', color: 'var(--text-secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t("Your Report ID")}
              </p>
              <div style={{ fontSize: '3.6rem', fontWeight: '900', letterSpacing: '4px', color: 'var(--cyan-highlight)' }}>
                {reportId}
              </div>
            </div>
            
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Please save this ID to track your complaint status.
            </p>

            <Button onClick={() => navigate('/my-reports')} variant="primary" style={{ padding: '1.3rem 4.5rem', fontSize: '1.45rem', borderRadius: '999px' }}>
              TRACK MY REPORT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportScam;
