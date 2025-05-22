import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasskeyAuth from './PasskeyAuth';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { username, password });
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setError();
  };

  const handlePasskeySuccess = () => {
    console.log('Passkey authentication successful');
  };

  return (
    <div className="auth-container">
      {!showPasskey ? (
        <div className="auth-card">
          <img src="/cicgrouplogo.png" alt="CIC Group Logo" className="auth-logo" />
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter your username or email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </div>

            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>

            <button className="auth-button primary" type="submit">
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-social-buttons">
            <button className="auth-button microsoft" type="button">
              <img src="https://img.icons8.com/color/24/000000/microsoft.png" alt="Microsoft logo" />
              <span>Microsoft Account</span>
            </button>
            
            <button 
              className="auth-button passkey" 
              type="button"
              onClick={() => setShowPasskey(true)}
            >
              <img src="https://img.icons8.com/ios-filled/24/000000/fingerprint.png" alt="Passkey icon" />
              <span>Passkey</span>
            </button>
          </div>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      ) : (
        <div className="auth-card">
          <button 
            className="back-button" 
            onClick={() => setShowPasskey(false)}
          >
            ← Back to Login
          </button>
          <PasskeyAuth onSuccess={handlePasskeySuccess} />
        </div>
      )}
    </div>
  );
}

export default Login;
