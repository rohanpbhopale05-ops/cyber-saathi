import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileSearch, Clock, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

const MyReports = () => {
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
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '900' }}>{t("My Reports")}</h1>
      <p style={{ fontSize: '1.3rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
        Track the status of the cyber scam reports you have submitted.
      </p>

      {reports.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <ShieldCheck size={80} color="var(--primary-light)" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
          <h2 style={{ fontSize: '2rem', color: 'var(--text-light)', marginBottom: '1rem' }}>No reports found</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>You haven't submitted any reports yet.</p>
          <Button onClick={() => window.location.href = '/report'} variant="primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
            Report a Scam Now
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {reports.map((report, idx) => (
            <div key={report.report_id || idx} className="glass-card slide-up" style={{ animationDelay: `${idx * 0.1}s`, padding: '1.5rem', cursor: 'pointer' }} onClick={() => setSelectedReport(report)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{report.report_id}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', margin: 0 }}>
                    {report.scam_type} &bull; {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc', padding: '0.8rem 1.5rem', borderRadius: '30px', border: `1px solid ${getStatusColor(report.status)}` }}>
                  {getStatusIcon(report.status)}
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: getStatusColor(report.status) }}>{report.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>Report Details</h2>
              <button onClick={() => setSelectedReport(null)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-light)' }}>&times;</button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', margin: '0 0 0.5rem 0' }}>Report ID</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>{selectedReport.report_id}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-light)', margin: '0 0 0.5rem 0' }}>Status</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: getStatusColor(selectedReport.status) }}>{selectedReport.status}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-light)', margin: '0 0 0.5rem 0' }}>Risk Level</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: 'var(--high-risk)' }}>{selectedReport.risk_level}</p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '1rem', color: 'var(--text-light)', margin: '0 0 0.5rem 0' }}>Description</p>
                <p style={{ fontSize: '1.2rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', margin: 0, lineHeight: '1.6' }}>{selectedReport.description}</p>
              </div>

              {selectedReport.admin_notes && (
                <div style={{ backgroundColor: '#fff7ed', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary)' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--secondary)', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Admin Note / Reply</p>
                  <p style={{ fontSize: '1.2rem', margin: 0 }}>{selectedReport.admin_notes}</p>
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
