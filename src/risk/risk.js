import React from 'react';
import './risk.css';
import { Link } from 'react-router-dom';

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
        <div className="home-cards">
          <Link to="/login" className="home-card" style={{ textDecoration: 'none' }}>
            <span className="home-card-icon">⚙️</span>
            <div className="home-card-title">Risk Control Self Assessment</div>
            <div className="home-card-underline"></div>
          </Link>
          <div className="home-card">
            <span className="home-card-icon">💻</span>
            <div className="home-card-title">Incident Report</div>
            <div className="home-card-underline"></div>
          </div>
          <div className="home-card">
            <span className="home-card-icon">🔍</span>
            <div className="home-card-title">Business Continuity Plan</div>
            <div className="home-card-underline"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Risk;
