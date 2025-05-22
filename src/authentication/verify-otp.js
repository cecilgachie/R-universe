import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';

function VerifyOTP() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // Get email from location state
    const email = location.state?.email;

    // If no email in state, redirect to forgot password
    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        
        if (otpValue.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        // Here you would typically verify the OTP with your backend
        console.log('Verifying OTP:', otpValue, 'for email:', email);
        
        // If verification successful, redirect to reset password page
        navigate('/reset-password', { state: { email, otp: otpValue } });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <img src="/cicgrouplogo.png" alt="CIC Group Logo" className="auth-logo" />
                <h2>Verify Your Email</h2>
                <p className="auth-subtitle">
                    Enter the 6-digit code sent to {email}
                </p>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="otp-container">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`otp-${index}`}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                required
                                className="otp-input"
                            />
                        ))}
                    </div>

                    <button className="auth-button primary" type="submit">
                        Verify Code
                    </button>
                </form>

                <p className="auth-footer">
                    Didn't receive the code? <button className="link-button">Resend Code</button>
                </p>
            </div>
        </div>
    );
}

export default VerifyOTP; 