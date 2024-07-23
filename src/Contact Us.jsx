import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/contact_us/', formData); // Adjust URL to your endpoint
      setResponseMessage('Your message has been sent successfully.');
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred while sending your message. Please try again later.');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4" style={{ fontFamily: 'Arial' }}>Contact Us</h1>
      <div className="row">
        <div className="col-lg-6">
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px' }}>
            We would love to hear from you! If you have any questions, feedback, or concerns, please feel free to reach out
            to us using the contact information below or by filling out the contact form.
          </p>
          <h4>Contact Information</h4>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px' }}>
            <strong>Email:</strong> kwanusujoseph@gmail.com<br /><br />
            <strong>Phone:</strong> +123 456 7890<br /><br />
            <strong>Address:</strong> 1234 Dennis Pritt, Nairobi, Kenya
          </p>
        </div>
        <div className="col-lg-6 mb-4">
          <h4>Contact Form</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
