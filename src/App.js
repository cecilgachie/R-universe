import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Risk from './risk/risk';
import Login from './authentication/login';
import Compliance from './compliance/compliance';
import Register from './authentication/register';
import ForgotPassword from './authentication/forgot-password';
import VerifyOTP from './authentication/verify-otp';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/login" element={<Login />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes here as you create new pages */}
      </Routes>
    </Router>
  );
}

export default App;
