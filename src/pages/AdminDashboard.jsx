import { useState, useEffect } from 'react';
import { Users, AlertTriangle, FileText, CheckCircle, Search, Edit, Plus, Trash2, X, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { adminStats, adminRecentReports } from '../data/demoData';
import Button from '../components/Button';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  
  const [activeTab, setActiveTab] = useState('reports'); // reports, numbers, urls
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [numbers, setNumbers] = useState([]);
  const [urls, setUrls] = useState([]);
  
  // Modals state
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportNote, setReportNote] = useState('');
  const [reportStatus, setReportStatus] = useState('');
  
  const [newItemValue, setNewItemValue] = useState('');
  
  useEffect(() => {
    if (isAdmin && supabase) {
      fetchData();
    } else if (!supabase) {
      // Demo mode
      setReports(adminRecentReports);
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [repRes, numRes, urlRes] = await Promise.all([
        supabase.from('reports').select('*').order('created_at', { ascending: false }),
        supabase.from('suspicious_numbers').select('*').order('created_at', { ascending: false }),
        supabase.from('suspicious_urls').select('*').order('created_at', { ascending: false })
      ]);
      
      if (repRes.data) setReports(repRes.data);
      if (numRes.data) setNumbers(numRes.data);
      if (urlRes.data) setUrls(urlRes.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  if (!isAdmin && supabase) {
    return (
      <div className="fade-in" style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <div className="glass-card">
          <AlertTriangle size={60} color="var(--high-risk)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2rem', color: 'var(--high-risk)', marginBottom: '1rem' }}>Access Denied</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>You must have Administrator privileges to view this page.</p>
        </div>
      </div>
    );
  }

  const handleUpdateReport = async () => {
    if (!supabase) {
      alert("Demo Mode: Report updated locally.");
      setSelectedReport(null);
      return;
    }
    
    const { error } = await supabase
      .from('reports')
      .update({ status: reportStatus, admin_notes: reportNote })
      .eq('id', selectedReport.id);
      
    if (!error) {
      fetchData();
      setSelectedReport(null);
    } else {
      alert("Error updating report");
    }
  };

  const handleAddEntity = async (table) => {
    if (!newItemValue.trim()) return;
    if (!supabase) {
      alert("Demo Mode: Item added locally.");
      setNewItemValue('');
      return;
    }
    
    const column = table === 'suspicious_numbers' ? 'phone_number' : 'url';
    const { error } = await supabase.from(table).insert([{ [column]: newItemValue }]);
    
    if (!error) {
      fetchData();
      setNewItemValue('');
    } else {
      alert("Error adding item");
    }
  };
  
  const handleDeleteEntity = async (table, id) => {
    if (!supabase) return;
    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  // Filtering
  const filteredReports = reports.filter(r => {
    const matchesSearch = (r.report_id?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                          (r.phone_number?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (r.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? r.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="glass-capsule glass-capsule-cyan" style={{ fontSize: '0.95rem', padding: '0.35rem 1.15rem', marginBottom: '1rem' }}>
          Threat Intelligence Console
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: '#F8FAFC', fontWeight: '900', letterSpacing: '-0.02em', marginTop: '0.8rem', marginBottom: '0.5rem' }}>
          Admin Cyber Security Console
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', margin: 0 }}>
          Manage citizen scam incident logs, verify threats, and maintain active blocklists.
        </p>
      </div>

      {/* Top Stats Cards with Cyber Glows */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.8rem', marginBottom: '3.5rem' }}>
        <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid var(--cyan-highlight)', boxShadow: 'var(--glow-cyan)' }}>
          <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 1rem', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)' }}>
            <FileText size={28} />
          </div>
          <h2 style={{ fontSize: '2.8rem', margin: '0 0 0.4rem 0', color: '#F8FAFC', fontWeight: '900' }}>
            {supabase ? reports.length : adminStats.totalReports}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>Total Reports</p>
        </div>

        <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid var(--orange-signal)', boxShadow: 'var(--glow-orange)' }}>
          <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 1rem', color: 'var(--orange-signal)', borderColor: 'var(--border-orange)' }}>
            <Users size={28} />
          </div>
          <h2 style={{ fontSize: '2.8rem', margin: '0 0 0.4rem 0', color: '#F8FAFC', fontWeight: '900' }}>
            {supabase ? reports.filter(r => r.status === 'Submitted').length : adminStats.newToday}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>New / Submitted</p>
        </div>

        <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid var(--red-security)', boxShadow: 'var(--glow-red)' }}>
          <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 1rem', color: 'var(--red-security)', borderColor: 'var(--border-red)' }}>
            <AlertTriangle size={28} />
          </div>
          <h2 style={{ fontSize: '2.8rem', margin: '0 0 0.4rem 0', color: '#F8FAFC', fontWeight: '900' }}>
            {supabase ? numbers.length + urls.length : adminStats.highRisk}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>Blocked Threats</p>
        </div>

        <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid var(--low-risk)', boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)' }}>
          <div className="glass-icon-box" style={{ width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 1rem', color: 'var(--low-risk)', borderColor: 'var(--low-risk)' }}>
            <CheckCircle size={28} />
          </div>
          <h2 style={{ fontSize: '2.8rem', margin: '0 0 0.4rem 0', color: '#F8FAFC', fontWeight: '900' }}>
            {supabase ? reports.filter(r => r.status === 'Resolved').length : adminStats.resolved}
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>Resolved Cases</p>
        </div>
      </div>

      {/* Capsule Tabs */}
      <div style={{ display: 'flex', gap: '12px', background: 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: '999px', marginBottom: '2.5rem', flexWrap: 'wrap', border: '1px solid var(--border-glass)' }}>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`glass-capsule ${activeTab === 'reports' ? 'active' : ''}`}
          style={{ 
            flex: 1, 
            justifyContent: 'center',
            padding: '0.85rem 1.4rem', 
            fontSize: '1.15rem', 
            fontWeight: '700',
            background: activeTab === 'reports' ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'transparent',
            color: activeTab === 'reports' ? '#050816' : 'var(--text-secondary)',
            border: activeTab === 'reports' ? '1px solid var(--cyan-highlight)' : '1px solid transparent',
            boxShadow: activeTab === 'reports' ? 'var(--glow-cyan)' : 'none'
          }}
        >
          Manage Reports
        </button>
        <button 
          onClick={() => setActiveTab('numbers')}
          className={`glass-capsule ${activeTab === 'numbers' ? 'active' : ''}`}
          style={{ 
            flex: 1, 
            justifyContent: 'center',
            padding: '0.85rem 1.4rem', 
            fontSize: '1.15rem', 
            fontWeight: '700',
            background: activeTab === 'numbers' ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'transparent',
            color: activeTab === 'numbers' ? '#050816' : 'var(--text-secondary)',
            border: activeTab === 'numbers' ? '1px solid var(--cyan-highlight)' : '1px solid transparent',
            boxShadow: activeTab === 'numbers' ? 'var(--glow-cyan)' : 'none'
          }}
        >
          Suspicious Numbers
        </button>
        <button 
          onClick={() => setActiveTab('urls')}
          className={`glass-capsule ${activeTab === 'urls' ? 'active' : ''}`}
          style={{ 
            flex: 1, 
            justifyContent: 'center',
            padding: '0.85rem 1.4rem', 
            fontSize: '1.15rem', 
            fontWeight: '700',
            background: activeTab === 'urls' ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'transparent',
            color: activeTab === 'urls' ? '#050816' : 'var(--text-secondary)',
            border: activeTab === 'urls' ? '1px solid var(--cyan-highlight)' : '1px solid transparent',
            boxShadow: activeTab === 'urls' ? 'var(--glow-cyan)' : 'none'
          }}
        >
          Suspicious URLs
        </button>
      </div>

      {/* Tab Content */}
      <div className="glass-card" style={{ overflowX: 'auto', padding: '2.5rem' }}>
        
        {activeTab === 'reports' && (
          <>
            <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'rgba(11, 18, 38, 0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '0.6rem 1.2rem', borderRadius: '14px', border: '1.5px solid var(--border-glass)' }}>
                <Search size={22} color="var(--cyan-highlight)" style={{ marginRight: '10px' }} />
                <input 
                  type="text" 
                  placeholder="Search by ID, Phone, or Email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'none', fontSize: '1.15rem', width: '100%', outline: 'none', padding: 0, color: '#F8FAFC' }}
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '0.6rem 1.4rem', fontSize: '1.15rem', borderRadius: '14px', width: 'auto', minWidth: '180px' }}
              >
                <option value="" style={{ background: '#0B1226', color: '#F8FAFC' }}>All Statuses</option>
                <option value="Submitted" style={{ background: '#0B1226', color: '#F8FAFC' }}>Submitted</option>
                <option value="Under Review" style={{ background: '#0B1226', color: '#F8FAFC' }}>Under Review</option>
                <option value="Investigating" style={{ background: '#0B1226', color: '#F8FAFC' }}>Investigating</option>
                <option value="Need More Information" style={{ background: '#0B1226', color: '#F8FAFC' }}>Need More Information</option>
                <option value="Resolved" style={{ background: '#0B1226', color: '#F8FAFC' }}>Resolved</option>
                <option value="Rejected" style={{ background: '#0B1226', color: '#F8FAFC' }}>Rejected</option>
              </select>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.15rem', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-glass)', textAlign: 'left', color: 'var(--cyan-highlight)' }}>
                  <th style={{ padding: '1.2rem 1rem' }}>Report ID</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Date</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Type</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Status</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#F8FAFC' }}>{report.report_id || report.id}</td>
                    <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{report.created_at ? new Date(report.created_at).toLocaleDateString() : report.date}</td>
                    <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{report.scam_type || report.type}</td>
                    <td style={{ padding: '1.2rem 1rem' }}>
                      <span className="glass-capsule" style={{ 
                        fontSize: '0.85rem', 
                        padding: '0.25rem 0.85rem',
                        color: report.status === 'Resolved' ? 'var(--low-risk)' : (report.status === 'Rejected' ? 'var(--text-muted)' : 'var(--orange-signal)'),
                        borderColor: report.status === 'Resolved' ? 'var(--low-risk)' : (report.status === 'Rejected' ? 'var(--border-glass)' : 'var(--orange-signal)')
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1rem' }}>
                      <Button variant="primary" onClick={() => { setSelectedReport(report); setReportStatus(report.status); setReportNote(report.admin_notes || ''); }} style={{ padding: '0.45rem 1.1rem', fontSize: '1rem', borderRadius: '999px' }}>
                        <Edit size={16} style={{ marginRight: '6px' }} /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No reports match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {(activeTab === 'numbers' || activeTab === 'urls') && (
          <>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input 
                type="text" 
                placeholder={`Enter suspicious ${activeTab === 'numbers' ? 'phone number' : 'URL'}`}
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
                style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', background: 'rgba(11, 18, 38, 0.8)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'var(--text-primary)' }}
              />
              <Button onClick={() => handleAddEntity(activeTab === 'numbers' ? 'suspicious_numbers' : 'suspicious_urls')} variant="primary" style={{ padding: '0 2rem', borderRadius: '999px' }}>
                <Plus size={20} style={{ marginRight: '5px' }} /> Add
              </Button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem', minWidth: '400px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1.2rem 1rem' }}>{activeTab === 'numbers' ? 'Phone Number' : 'URL'}</th>
                  <th style={{ padding: '1.2rem 1rem' }}>Added On</th>
                  <th style={{ padding: '1.2rem 1rem', width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'numbers' ? numbers : urls).map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#F8FAFC' }}>{item.phone_number || item.url}</td>
                    <td style={{ padding: '1.2rem 1rem', color: 'var(--text-secondary)' }}>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '1.2rem 1rem' }}>
                      <button onClick={() => handleDeleteEntity(activeTab === 'numbers' ? 'suspicious_numbers' : 'suspicious_urls', item.id)} style={{ background: 'rgba(255, 59, 48, 0.15)', border: '1px solid rgba(255, 59, 48, 0.3)', borderRadius: '8px', padding: '0.4rem', color: 'var(--red-security)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(activeTab === 'numbers' ? numbers : urls).length === 0 && (
                  <tr><td colSpan="3" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No entries found.</td></tr>
                )}
              </tbody>
            </table>
          </>
        )}

      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 8, 22, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="glass-card slide-up" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', border: '1px solid rgba(34, 211, 238, 0.3)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(34, 211, 238, 0.15)' }}>
            <button onClick={() => setSelectedReport(null)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-glass)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={26} color="var(--cyan-highlight)" /> Review Report Details
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', padding: '1.2rem', borderRadius: '14px' }}>
              <div><strong style={{ color: 'var(--cyan-highlight)' }}>ID:</strong> <span style={{ color: '#F8FAFC' }}>{selectedReport.report_id || selectedReport.id}</span></div>
              <div><strong style={{ color: 'var(--cyan-highlight)' }}>Type:</strong> <span style={{ color: '#F8FAFC' }}>{selectedReport.scam_type || selectedReport.type}</span></div>
              <div><strong style={{ color: 'var(--cyan-highlight)' }}>Phone/Link:</strong> <span style={{ color: '#F8FAFC' }}>{selectedReport.phone_number || selectedReport.url || 'N/A'}</span></div>
              <div><strong style={{ color: 'var(--cyan-highlight)' }}>Email:</strong> <span style={{ color: '#F8FAFC' }}>{selectedReport.email || 'N/A'}</span></div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Description</h3>
              <p style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', padding: '1rem', borderRadius: '12px', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {selectedReport.description || 'No description provided.'}
              </p>
            </div>

            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Update Status</label>
              <select value={reportStatus} onChange={e => setReportStatus(e.target.value)} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', background: 'rgba(11, 18, 38, 0.55)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)', color: '#F8FAFC', fontSize: '1rem' }}>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Investigating">Investigating</option>
                <option value="Need More Information">Need More Information</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Admin Notes (Internal)</label>
              <textarea 
                rows="3" 
                value={reportNote} 
                onChange={e => setReportNote(e.target.value)}
                placeholder="Enter internal notes for this case..."
                style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', background: 'rgba(11, 18, 38, 0.55)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)', color: '#F8FAFC', fontSize: '1rem' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <Button variant="secondary" onClick={() => setSelectedReport(null)} style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-primary)', border: '1px solid var(--border-glass)' }}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdateReport}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
