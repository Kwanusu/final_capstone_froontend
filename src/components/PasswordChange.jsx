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
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password</label>
          <input type="password" name="old_password" value={formData.old_password} onChange={handleChange} />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" name="new_password1" value={formData.new_password1} onChange={handleChange} />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input type="password" name="new_password2" value={formData.new_password2} onChange={handleChange} />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordChange;
