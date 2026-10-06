import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  if (user) {
    navigate('/my-reports');
  }

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
    <div className="fade-in" style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem 0' }}>
      <div className="glass-card">
        
        <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem' }}>
          <button 
            onClick={() => { setIsLogin(true); setErrorMsg(''); setSuccessMsg(''); }}
            style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', background: 'none', borderBottom: isLogin ? '4px solid var(--primary)' : '4px solid transparent', cursor: 'pointer' }}
          >Login</button>
          <button 
            onClick={() => { setIsLogin(false); setErrorMsg(''); setSuccessMsg(''); }}
            style={{ flex: 1, padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', background: 'none', borderBottom: !isLogin ? '4px solid var(--primary)' : '4px solid transparent', cursor: 'pointer' }}
          >Sign Up</button>
        </div>

        {errorMsg && <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 'bold' }}>{errorMsg}</div>}
        {successMsg && <div style={{ padding: '1rem', backgroundColor: 'var(--bg-alt)', color: 'var(--primary)', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 'bold' }}>{successMsg}</div>}

        <form onSubmit={handleSubmit} className="slide-up">
          
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required={!isLogin} placeholder="e.g. Ramesh Kumar" />
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required={!isLogin} placeholder="10-digit number" />
              </div>
            </>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength="6" placeholder="Minimum 6 characters" />
          </div>
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem', padding: '1.2rem', fontSize: '1.2rem' }} disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Login to Dashboard' : 'Create Account')}
          </Button>
        </form>

        {!supabase && (
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-light)', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Demo Mode – No real account is required.
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;
