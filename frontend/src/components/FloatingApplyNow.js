import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';
import './FloatingApplyNow.css';

const initialForm = {
  name: '',
  mobile: '',
  email: '',
  course: '',
  state: '',
  city: '',
  question: ''
};

function FloatingApplyNow() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setLoading(false);
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        message:
          `Application Enquiry\n` +
          `Mobile: ${formData.mobile}\n` +
          `Course: ${formData.course}\n` +
          `State: ${formData.state}\n` +
          `City: ${formData.city}\n` +
          `Question: ${formData.question || 'N/A'}`
      });

      setStatus({ type: 'success', message: 'Application request submitted successfully.' });
      setFormData(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to submit right now. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="floating-apply-button"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Apply now"
      >
        Apply Now <span className="apply-arrow">&rarr;</span>
      </button>

      {isOpen && (
        <div className="apply-modal-backdrop" onClick={resetAndClose}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            <button className="apply-modal-close" type="button" onClick={resetAndClose} aria-label="Close">
              x
            </button>

            <h2>Start Your Enrollment For Session 2026-27</h2>
            <p className="apply-subtitle">
              Fill out the form below to begin your application process. Our admissions team will get in touch with
              you shortly.
            </p>

            <form className="apply-form" onSubmit={handleSubmit}>
              <div className="apply-grid">
                <div className="apply-field">
                  <label htmlFor="apply-name">Your Name *</label>
                  <input
                    id="apply-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="apply-field">
                  <label htmlFor="apply-mobile">Mobile Number *</label>
                  <input
                    id="apply-mobile"
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="apply-field">
                <label htmlFor="apply-email">Email Address *</label>
                <input
                  id="apply-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="apply-field">
                <label htmlFor="apply-course">Course *</label>
                <select id="apply-course" name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                </select>
              </div>

              <div className="apply-grid">
                <div className="apply-field">
                  <label htmlFor="apply-state">State *</label>
                  <input
                    id="apply-state"
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="apply-field">
                  <label htmlFor="apply-city">City *</label>
                  <input
                    id="apply-city"
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="apply-field">
                <label htmlFor="apply-question">Any Question? (Optional)</label>
                <textarea
                  id="apply-question"
                  name="question"
                  placeholder="Any Question? (Optional)"
                  rows="4"
                  value={formData.question}
                  onChange={handleChange}
                />
              </div>

              {status.message && <div className={`apply-alert ${status.type}`}>{status.message}</div>}

              <button className="apply-submit" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Register \u2192'}
              </button>

              <p className="apply-terms">
                By submitting this form, you agree to our{' '}
                <a href="https://huroorkee.ac.in/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{' '}
                and Terms of Service.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingApplyNow;
