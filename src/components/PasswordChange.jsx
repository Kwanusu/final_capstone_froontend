import React, { useState } from 'react';
import axios from 'axios';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password1: '',
    new_password2: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/password_change/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Password changed successfully.');
    } catch (error) {
      setMessage('Error changing password.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
          <h2 className="mb-4 mt-4 text-center">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="old_password" className="form-label">Old Password</label>
              <input
                type="password"
                name="old_password"
                className="form-control"
                id="old_password"
                value={formData.old_password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new_password1" className="form-label">New Password</label>
              <input
                type="password"
                name="new_password1"
                className="form-control"
                id="new_password1"
                value={formData.new_password1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new_password2" className="form-label">Confirm New Password</label>
              <input
                type="password"
                name="new_password2"
                className="form-control"
                id="new_password2"
                value={formData.new_password2}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Change Password</button>
          </form>
          {message && <p className="mt-3 alert alert-info text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
