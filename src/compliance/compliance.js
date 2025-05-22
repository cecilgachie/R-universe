import React from 'react';
import './compliance.css';
import { Link } from 'react-router-dom';

function Compliance() {
  return (
    <div className="risk-container">
      <header className="risk-header">
        <h1 className="risk-title">Compliance Management</h1>
        <div className="risk-underline"></div>
        <p className="risk-subtitle">
          Welcome to the Compliance Management page.
        </p>
      </header>
      <main className="risk-main">
        <div className="home-cards">
          <div className="home-card">
            <span className="home-card-icon">🔍</span>
            <div className="home-card-title">Compliance Track</div>
            <div className="home-card-underline"></div>
          </div>
          <div className="home-card">
            <span className="home-card-icon">💻</span>
            <div className="home-card-title">Conflict of Interest</div>
            <div className="home-card-underline"></div>
          </div>
          <div className="home-card">
            <span className="home-card-icon">🔍</span>
            <div className="home-card-title">Fit & Proper Assessment</div>
            <div className="home-card-underline"></div>
          </div>
        </div>
      </main>
      <footer className="home-footer">
        © 2025 CIC Insurance Group. All rights reserved.
      </footer>
    </div>
  );
}

export default Compliance;
