import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home/home';
import Risk from './risk/risk';

function App() {
  return (
    <Router>
      <nav style={{ textAlign: 'center', margin: '24px 0' }}>
        <Link to="/" style={{ fontWeight: 'bold', color: '#a6192e', textDecoration: 'none', fontSize: '1.2rem' }}>
          CIC Group Risk & Compliance
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/risk" element={<Risk />} />
        {/* Add more routes here as you create new pages */}
      </Routes>
    </Router>
  );
}

export default App;
