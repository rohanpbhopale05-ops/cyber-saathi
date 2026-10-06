import { useState, useEffect } from 'react';
import { Users, AlertTriangle, FileText, CheckCircle, Search, Edit, Plus, Trash2, X } from 'lucide-react';
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
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '2rem' }}>Admin Dashboard</h1>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ textAlign: 'center', backgroundColor: 'var(--primary)', color: 'white' }}>
          <FileText size={40} style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{supabase ? reports.length : adminStats.totalReports}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Total Reports</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', backgroundColor: 'var(--primary-light)', color: 'white' }}>
          <Users size={40} style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{supabase ? reports.filter(r => r.status === 'Submitted').length : adminStats.newToday}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>New / Submitted</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', backgroundColor: 'var(--high-risk)', color: 'white' }}>
          <AlertTriangle size={40} style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{supabase ? numbers.length + urls.length : adminStats.highRisk}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Blocked Indicators</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', backgroundColor: 'var(--low-risk)', color: 'white' }}>
          <CheckCircle size={40} style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{supabase ? reports.filter(r => r.status === 'Resolved').length : adminStats.resolved}</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Resolved</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('reports')}
          style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', background: 'none', borderBottom: activeTab === 'reports' ? '4px solid var(--primary)' : '4px solid transparent', cursor: 'pointer' }}
        >Manage Reports</button>
        <button 
          onClick={() => setActiveTab('numbers')}
          style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', background: 'none', borderBottom: activeTab === 'numbers' ? '4px solid var(--primary)' : '4px solid transparent', cursor: 'pointer' }}
        >Suspicious Numbers</button>
        <button 
          onClick={() => setActiveTab('urls')}
          style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', background: 'none', borderBottom: activeTab === 'urls' ? '4px solid var(--primary)' : '4px solid transparent', cursor: 'pointer' }}
        >Suspicious URLs</button>
      </div>

      {/* Tab Content */}
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        
        {activeTab === 'reports' && (
          <>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <Search size={20} color="#64748b" style={{ marginRight: '10px' }} />
                <input 
                  type="text" 
                  placeholder="Search by ID, Phone, or Email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'none', fontSize: '1.1rem', width: '100%', outline: 'none' }}
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '0.5rem 1rem', fontSize: '1.1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              >
                <option value="">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Investigating">Investigating</option>
                <option value="Need More Information">Need More Information</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Report ID</th>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem' }}>Type</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem' }}>{report.report_id || report.id}</td>
                    <td style={{ padding: '1rem' }}>{report.created_at ? new Date(report.created_at).toLocaleDateString() : report.date}</td>
                    <td style={{ padding: '1rem' }}>{report.scam_type || report.type}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: report.status === 'Resolved' ? 'var(--low-risk)' : (report.status === 'Rejected' ? 'var(--text-light)' : 'var(--warning)') }}>
                      {report.status}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <Button variant="primary" onClick={() => { setSelectedReport(report); setReportStatus(report.status); setReportNote(report.admin_notes || ''); }} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
                        <Edit size={16} style={{ marginRight: '5px' }} /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>No reports found.</td></tr>
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
                style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', border: '1px solid #cbd5e1', borderRadius: '8px' }}
              />
              <Button onClick={() => handleAddEntity(activeTab === 'numbers' ? 'suspicious_numbers' : 'suspicious_urls')} variant="primary" style={{ padding: '0 2rem' }}>
                <Plus size={20} style={{ marginRight: '5px' }} /> Add
              </Button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem', minWidth: '400px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>{activeTab === 'numbers' ? 'Phone Number' : 'URL'}</th>
                  <th style={{ padding: '1rem' }}>Added On</th>
                  <th style={{ padding: '1rem', width: '100px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'numbers' ? numbers : urls).map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.phone_number || item.url}</td>
                    <td style={{ padding: '1rem' }}>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleDeleteEntity(activeTab === 'numbers' ? 'suspicious_numbers' : 'suspicious_urls', item.id)} style={{ background: 'none', border: 'none', color: 'var(--high-risk)', cursor: 'pointer' }}>
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(activeTab === 'numbers' ? numbers : urls).length === 0 && (
                  <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>No entries found.</td></tr>
                )}
              </tbody>
            </table>
          </>
        )}

      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="card slide-up" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setSelectedReport(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Report Details</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-alt)', padding: '1.5rem', borderRadius: '8px' }}>
              <div><strong>ID:</strong> {selectedReport.report_id || selectedReport.id}</div>
              <div><strong>Type:</strong> {selectedReport.scam_type || selectedReport.type}</div>
              <div><strong>Phone/Link:</strong> {selectedReport.phone_number || selectedReport.url || 'N/A'}</div>
              <div><strong>Email:</strong> {selectedReport.email || 'N/A'}</div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                {selectedReport.description || 'No description provided.'}
              </p>
            </div>

            <div className="input-group">
              <label>Update Status</label>
              <select value={reportStatus} onChange={e => setReportStatus(e.target.value)}>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Investigating">Investigating</option>
                <option value="Need More Information">Need More Information</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="input-group">
              <label>Admin Notes (Internal)</label>
              <textarea 
                rows="3" 
                value={reportNote} 
                onChange={e => setReportNote(e.target.value)}
                placeholder="Enter notes for this case..."
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => setSelectedReport(null)} style={{ backgroundColor: '#e2e8f0', color: '#1e293b' }}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdateReport}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
