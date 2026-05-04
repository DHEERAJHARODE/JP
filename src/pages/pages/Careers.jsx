import React from 'react';
import "../../App.css";
import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-wrapper">
      {/* Hero Section */}
      <header className="careers-hero">
        <div className="fade-in-up">
          <span className="pill-badge">Careers at ShipEase</span>
        </div>
        <h1 className="careers-title">
          Join Our <span className="gradient-text">Team</span>
        </h1>
        <p className="careers-subtitle">
          We are looking for talented individuals to help us build the next generation 
          of logistics solutions. Explore our open positions below.
        </p>
      </header>

      <main className="careers-container">
        {/* Application Form Card */}
        <section className="careers-card modern-card">
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.8rem' }}>Job Application Form</h2>
          
          <form className="application-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <div className="form-input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-input-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" required />
              </div>
              <div className="form-input-group">
                <label>Position Applied For</label>
                <select required>
                  <option value="">Select a position</option>
                  <option value="developer">Frontend Developer</option>
                  <option value="ops">Operations Manager</option>
                  <option value="driver">Driver Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-input-group" style={{ marginTop: '20px' }}>
              <label>Resume Link (Google Drive/Dropbox)</label>
              <input type="url" placeholder="Paste your resume link here" required />
            </div>

            <div className="form-input-group" style={{ marginTop: '20px' }}>
              <label>Professional Summary</label>
              <textarea rows="4" placeholder="Briefly describe your experience..."></textarea>
            </div>

            <button type="submit" className="submit-application-btn">
              Submit Application
            </button>
          </form>
        </section>

        {/* Contact Info Section */}
        <div className="careers-footer-info">
          <p>You can also send your resume directly to our HR team at <b>hr@shipease.com</b></p>
        </div>
      </main>
    </div>
  );
};

export default Careers;