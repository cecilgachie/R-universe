import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        // Here you would typically make an API call to send the OTP
        console.log('Sending OTP to:', email);
        
        // Redirect to OTP verification page with email in state
        navigate('/verify-otp', { state: { email } });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <img src="/cicgrouplogo.png" alt="CIC Group Logo" className="auth-logo" />
                <h2>Reset Password</h2>
                <p className="auth-subtitle">Enter your email to receive a verification code</p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button className="auth-button primary" type="submit">
                        Send Verification Code
                    </button>
                </form>

                <p className="auth-footer">
                    Remember your password? <Link to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
