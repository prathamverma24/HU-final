import React, { useState } from 'react';
import Footer from '../components/Footer';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const lmsEndpoint = process.env.REACT_APP_LMS_ENDPOINT || 'http://lms.rceroorkee.ac.in/contact-form-leads';
      const lmsCompany = process.env.REACT_APP_LMS_COMPANY || 'rceroorkee';
      const query = new URLSearchParams({
        company: lmsCompany,
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        location: '',
        message: formData.message,
        city: '',
        lead_source: 'website_contact',
        state: ''
      });
      const lmsUrl = `${lmsEndpoint}?${query.toString()}`;
      window.location.href = lmsUrl;
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          {status.message && (
            <div className={`alert alert-${status.type}`}>
              {status.message}
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
