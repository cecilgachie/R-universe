import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        contact: '',
        idNumber: '',
        role: 'user',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <img src="/cicgrouplogo.png" alt="CIC Group Logo" className="home-logo" />
                <h2>Create Account</h2>
                <div className="form-row">
                    <label>
                        <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </label>
                    <label>
                        <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </label>
                </div>
                <label>
                    <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <label>
                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    <input type="text" placeholder="Contact" name="contact" value={formData.contact} onChange={handleChange} required />
                </label>
                <label>
                    <input type="text" placeholder="ID Number" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
                </label>
                <label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="champion">Champion</option>
                    </select>
                </label>
                <label>
                    <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </label>
                <button type="submit">Create Account</button>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
