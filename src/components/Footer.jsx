import { PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1e293b', color: 'white', padding: '2rem 1rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Emergency Contacts</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '1.2rem', color: '#fca5a5' }}>
            <PhoneCall size={24} />
            <strong>1930</strong> - National Cyber Crime Helpline
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: '#fca5a5' }}>
            <PhoneCall size={24} />
            <strong>112</strong> - Police Emergency
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '1rem' }}>About Cyber Saathi</h2>
          <p style={{ opacity: 0.8, marginBottom: '0.5rem' }}>A college CEP project designed to help senior citizens stay safe online.</p>
          <p style={{ opacity: 0.8 }}>Created by second-year IT engineering students.</p>
        </div>

        <div>
          <h2 style={{ marginBottom: '1rem' }}>PVG's College of Engineering</h2>
          <p style={{ opacity: 0.8 }}>Department of Information Technology</p>
          <p style={{ opacity: 0.8 }}>Nashik, Maharashtra</p>
          <p style={{ opacity: 0.8 }}>Affiliated to SPPU</p>
          <div style={{ marginTop: '1rem' }}>
             <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Admin Dashboard Demo</Link>
          </div>
        </div>

      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #334155', opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} Cyber Saathi - Demo Project Data
      </div>
    </footer>
  );
};

export default Footer;
