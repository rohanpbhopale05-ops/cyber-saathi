import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { supabase, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/my-reports');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    
    if (!supabase) {
      navigate('/my-reports');
      setIsLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else navigate('/my-reports');
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            mobile: mobile
          }
        }
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Signup successful! You can now log in (or check your email to confirm if email confirmations are enabled).");
        setIsLogin(true);
        setPassword('');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '540px', margin: '2.5rem auto 4rem', padding: '1rem 0' }}>
      <div className="glass-card" style={{ padding: '3rem 2.5rem', borderTop: '4px solid var(--cyan-highlight)' }}>
        
        {/* Security Vault Lock Icon & Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="glass-icon-box" style={{ width: '64px', height: '64px', borderRadius: '20px', margin: '0 auto 1.2rem', color: 'var(--cyan-highlight)', borderColor: 'var(--border-cyan)', boxShadow: 'var(--glow-cyan)' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '2.2rem', color: '#F8FAFC', fontWeight: '900', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
            {isLogin ? 'Citizen Portal Login' : 'Register New Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', margin: 0 }}>
            Secure access to your incident reports & alerts
          </p>
        </div>

        {/* Capsule Tabs */}
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px', borderRadius: '999px', marginBottom: '2.5rem', border: '1px solid var(--border-glass)' }}>
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`glass-capsule ${isLogin ? 'active' : ''}`}
            style={{ 
              flex: 1, 
              justifyContent: 'center',
              padding: '0.75rem', 
              fontSize: '1.15rem', 
              fontWeight: '700', 
              background: isLogin ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'transparent',
              color: isLogin ? '#050816' : 'var(--text-secondary)',
              border: isLogin ? '1px solid var(--cyan-highlight)' : '1px solid transparent',
              boxShadow: isLogin ? 'var(--glow-cyan)' : 'none'
            }}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`glass-capsule ${!isLogin ? 'active' : ''}`}
            style={{ 
              flex: 1, 
              justifyContent: 'center',
              padding: '0.75rem', 
              fontSize: '1.15rem', 
              fontWeight: '700', 
              background: !isLogin ? 'linear-gradient(135deg, var(--blue-electric), var(--cyan-highlight))' : 'transparent',
              color: !isLogin ? '#050816' : 'var(--text-secondary)',
              border: !isLogin ? '1px solid var(--cyan-highlight)' : '1px solid transparent',
              boxShadow: !isLogin ? 'var(--glow-cyan)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: '1rem 1.2rem', backgroundColor: 'rgba(255, 59, 48, 0.15)', border: '1px solid var(--red-security)', color: '#ff6b6b', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ padding: '1rem 1.2rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--low-risk)', color: '#34d399', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="slide-up">
          
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required={!isLogin} placeholder="e.g. Ramesh Kumar" />
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input type="tel" pattern="[0-9]{10}" maxLength="10" title="Please enter a valid 10-digit mobile number" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} required={!isLogin} placeholder="10-digit number" />
              </div>
            </>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength="8" placeholder="Minimum 8 characters" />
          </div>
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1.5rem', padding: '1.2rem', fontSize: '1.25rem', borderRadius: '999px' }} disabled={isLoading}>
            {isLoading ? 'Processing Security Clearance...' : (isLogin ? 'Login to Dashboard' : 'Create Account')}
          </Button>
        </form>

        {!supabase && (
          <p style={{ textAlign: 'center', marginTop: '1.8rem', color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: '600' }}>
            Offline/Demo Mode – Instant access enabled.
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;
