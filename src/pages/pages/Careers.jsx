import React, { useState } from 'react';
import { db } from "../../services/firebase"; // Aapka firebase config path
import { collection, addDoc } from "firebase/firestore";
import "../../App.css";
import './Careers.css';

const Careers = () => {
  // 1. Form fields ke liye state banayein
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resumeLink: "",
    summary: ""
  });
  const [loading, setLoading] = useState(false);

  // 2. Input change handle karne ka function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Form submit karne ka function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase 'applications' collection me data add karein
      await addDoc(collection(db, "applications"), {
        ...formData,
        status: "Pending Review", // Admin ke liye default status
        createdAt: new Date().toISOString()
      });

      alert("Thank you! Your application has been submitted successfully.");
      // Form reset karein
      setFormData({ name: "", email: "", phone: "", position: "", resumeLink: "", summary: "" });
    } catch (error) {
      console.error("Error submitting application: ", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
              <div className="form-input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              <div className="form-input-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number" 
                  required 
                />
              </div>
              <div className="form-input-group">
                <label>Position Applied For</label>
                <select 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select a position</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Driver Partner">Driver Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-input-group" style={{ marginTop: '20px' }}>
              <label>Resume Link (Google Drive/Dropbox)</label>
              <input 
                type="url" 
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="Paste your resume link here" 
                required 
              />
            </div>

            <div className="form-input-group" style={{ marginTop: '20px' }}>
              <label>Professional Summary</label>
              <textarea 
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="4" 
                placeholder="Briefly describe your experience..."
              ></textarea>
            </div>

            <button type="submit" className="submit-application-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
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