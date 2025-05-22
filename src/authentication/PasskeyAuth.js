import React, { useState, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { QRCodeSVG } from 'qrcode.react';
import './login.css';

const PasskeyAuth = ({ onSuccess }) => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const generateRegistrationOptions = async () => {
    try {
      const response = await fetch('/api/auth/passkey/register-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const options = await response.json();
      
      // Generate QR code with registration options
      const qrData = JSON.stringify({
        type: 'registration',
        options: options,
      });
      setQrCode(qrData);
      setIsRegistering(true);
    } catch (err) {
      setError('Failed to generate registration options');
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('/api/auth/passkey/register-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const options = await response.json();

      const registrationResponse = await startRegistration(options);
      
      const verificationResponse = await fetch('/api/auth/passkey/verify-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationResponse),
      });

      const verification = await verificationResponse.json();
      
      if (verification.verified) {
        onSuccess();
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Registration failed: ' + err.message);
    }
  };

  const handleAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/passkey/authenticate-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const options = await response.json();

      const authenticationResponse = await startAuthentication(options);
      
      const verificationResponse = await fetch('/api/auth/passkey/verify-authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authenticationResponse),
      });

      const verification = await verificationResponse.json();
      
      if (verification.verified) {
        onSuccess();
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Authentication failed: ' + err.message);
    }
  };

  return (
    <div className="passkey-auth-container">
      <h2>Passkey Authentication</h2>
      {error && <div className="error-message">{error}</div>}
      
      {qrCode && (
        <div className="qr-code-container">
          <QRCodeSVG value={qrCode} size={256} />
          <p>Scan this QR code with your phone to {isRegistering ? 'register' : 'authenticate'}</p>
        </div>
      )}

      <div className="passkey-buttons">
        <button onClick={generateRegistrationOptions} className="passkey-button">
          Register New Passkey
        </button>
        <button onClick={handleAuthentication} className="passkey-button">
          Login with Passkey
        </button>
      </div>
    </div>
  );
};

export default PasskeyAuth; 