import React from 'react';
import "../../App.css";
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      {/* Hero Header Section */}
      <header className="contact-hero">
        <div className="fade-in-up">
          <span className="pill-badge">Connect with ShipEase</span>
        </div>
        <h1 className="contact-title">
          We're here to <span className="gradient-text">help you move</span>
        </h1>
        <p className="contact-subtitle">
          Have questions about our logistics services or need a custom quote? 
          Our team is ready to assist you.
        </p>
      </header>

      <main className="contact-container">
        <div className="contact-grid">
          {/* Contact Information Side */}
          <div className="contact-details-side">
            <h2 className="side-heading">Contact Information</h2>
            <p className="side-text">Reach out to us through any of these channels.</p>
            
            <div className="contact-info-list">
              <div className="info-card modern-card">
                <span className="info-icon">📍</span>
                <div>
                  <h4>Our Office</h4>
                  <p>45/C Logistics Lane, Pithampur Industrial Area, MP</p>
                </div>
              </div>

              <div className="info-card modern-card">
                <span className="info-icon">📧</span>
                <div>
                  <h4>Email Us</h4>
                  <p>support@shipease.com</p>
                </div>
              </div>

              <div className="info-card modern-card">
                <span className="info-icon">📞</span>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-side modern-card">
            <h3 style={{ marginBottom: '24px', fontWeight: '800' }}>Send a Message</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" required />
              </div>

              <div className="form-input-group">
                <label>Email Address</label>
                <input type="email" placeholder="email@example.com" required />
              </div>

              <div className="form-input-group">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Booking Issue</option>
                  <option>Business Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-input-group">
                <label>Message</label>
                <textarea rows="4" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;