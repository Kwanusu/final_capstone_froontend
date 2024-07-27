import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/password_reset/', formData);
      setMessage('Password reset email sent. Follow the link to reset password');
    } catch (error) {
      setMessage('Error sending password reset email.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="form-group mt-3">
          <div>
            <label>Email</label>
            <input type="email"  className="form-control mt-1" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary mt-2 mb-2">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
