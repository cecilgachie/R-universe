import React from 'react';
import './risk.css';

function Risk() {
  return (
    <div className="risk-container">
      <header className="risk-header">
        <h1 className="risk-title">Risk Management</h1>
        <div className="risk-underline"></div>
        <p className="risk-subtitle">
          Manage and assess organizational risks efficiently and effectively.
        </p>
      </header>
      <main className="risk-main">
        <div className="risk-content">
          {/* Add your risk management content here */}
          <p>Welcome to the Risk Management page.</p>
        </div>
      </main>
    </div>
  );
}

export default Risk;
