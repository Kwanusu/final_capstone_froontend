import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    locality: '',
    city: '',
    mobile: '',
    state: '',
    zipcode: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        setMessage('Error fetching profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/profile/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage('Error updating profile.');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Locality</label>
          <input type="text" name="locality" value={formData.locality} onChange={handleChange} />
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>
        <div>
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </div>
        <div>
          <label>Zipcode</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileUpdate;
