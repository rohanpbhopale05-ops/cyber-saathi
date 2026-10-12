import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileSearch, Clock, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const MyReports = () => {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      let combinedReports = [];
      const localReports = JSON.parse(localStorage.getItem('cyberSaathiReports') || '[]');

      if (supabase && user) {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const dbIds = new Set(data.map(r => r.report_id));
          const onlyLocal = localReports.filter(r => !dbIds.has(r.report_id) && r.user_id === user.id);
          combinedReports = [...data, ...onlyLocal];
        } else {
          combinedReports = localReports.filter(r => r.user_id === user.id);
        }
      } else {
        combinedReports = localReports;
      }
      
      setReports(combinedReports);
      setLoading(false);
    };

    fetchReports();
  }, [user, supabase]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return 'var(--secondary)';
      case 'Under Review': return 'var(--secondary)';
      case 'Investigating': return 'var(--primary-light)';
      case 'Resolved': return 'var(--primary)';
      case 'Rejected': return 'var(--primary)';
      case 'Need More Information': return 'var(--secondary)';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Resolved') return <CheckCircle size={24} color="var(--primary)" />;
    if (status === 'Investigating' || status === 'Under Review') return <FileSearch size={24} color="var(--secondary)" />;
    return <Clock size={24} color="var(--primary-light)" />;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem' }}>Loading your reports...</div>;
  }

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
          Secure Incident Tracking
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.6rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '1rem' }}>
          {t("My Reports")}
        </h1>
        <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', margin: 0 }}>
          Track real-time status and official recommendations on submitted incidents.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4.5rem 2rem' }}>
          <div className="glass-icon-box" style={{ width: '90px', height: '90px', borderRadius: '24px', margin: '0 auto 2rem', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)', boxShadow: 'var(--glow-cyan)' }}>
            <ShieldCheck size={48} strokeWidth={2.2} />
          </div>
          <h2 style={{ fontSize: '2.2rem', color: '#F8FAFC', marginBottom: '1rem', fontWeight: '800' }}>No Reports on Record</h2>
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '550px', margin: '0 auto 2.5rem' }}>
            You haven't submitted any scam reports yet. If you suspect fraud, report it here.
          </p>
          <Button onClick={() => navigate('/report')} variant="primary" style={{ padding: '1.1rem 2.8rem', fontSize: '1.3rem', borderRadius: '999px' }}>
            Report a Scam Now
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {reports.map((report, idx) => (
            <div key={report.report_id || idx} className="glass-card slide-up" style={{ animationDelay: `${idx * 0.1}s`, padding: '1.8rem', cursor: 'pointer', borderLeft: `5px solid ${getStatusColor(report.status)}` }} onClick={() => setSelectedReport(report)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', margin: '0 0 0.5rem 0', color: '#F8FAFC', fontWeight: '800' }}>{report.report_id}</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {report.scam_type} &bull; {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="glass-capsule" style={{ borderColor: getStatusColor(report.status), padding: '0.6rem 1.4rem' }}>
                  {getStatusIcon(report.status)}
                  <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: getStatusColor(report.status) }}>{report.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 8, 22, 0.60)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', background: 'rgba(11, 18, 38, 0.20)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1.5px solid var(--border-glass-bright)', padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '2.2rem', margin: 0, color: '#F8FAFC', fontWeight: '900' }}>Report Details</h2>
              <button onClick={() => setSelectedReport(null)} style={{ background: 'none', border: 'none', fontSize: '2.4rem', cursor: 'pointer', color: 'var(--text-secondary)', lineHeight: 1 }}>&times;</button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.8rem' }}>
              <div>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '0 0 0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Report ID</p>
                <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: 'var(--cyan-highlight)' }}>{selectedReport.report_id}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '0 0 0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</p>
                  <span className="glass-capsule" style={{ borderColor: getStatusColor(selectedReport.status), color: getStatusColor(selectedReport.status), fontWeight: 'bold' }}>
                    {selectedReport.status}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '0 0 0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Risk Level</p>
                  <span className="glass-capsule glass-capsule-red" style={{ fontWeight: 'bold' }}>
                    {selectedReport.risk_level}
                  </span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: '0 0 0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Incident Description</p>
                <p style={{ fontSize: '1.25rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: '1.2rem', borderRadius: '14px', margin: 0, lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  {selectedReport.description}
                </p>
              </div>

              {selectedReport.admin_notes && (
                <div style={{ background: 'rgba(255, 122, 24, 0.12)', border: '1px solid var(--border-orange)', padding: '1.4rem', borderRadius: '14px', borderLeft: '4px solid var(--orange-signal)' }}>
                  <p style={{ fontSize: '1.05rem', color: 'var(--orange-signal)', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Authority Note / Resolution</p>
                  <p style={{ fontSize: '1.25rem', margin: 0, color: '#F8FAFC', lineHeight: '1.5' }}>{selectedReport.admin_notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReports;
