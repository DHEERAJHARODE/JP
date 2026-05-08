import React, { useState } from 'react';
import { db } from "../../services/firebase"; // Aapka firebase config path
import { collection, addDoc } from "firebase/firestore";
import "../../App.css";
import './ContactUs.css';

const ContactUs = () => {
  // 1. Form fields ke liye state banayein
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
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
      // Firebase 'queries' collection me data add karein
      await addDoc(collection(db, "queries"), {
        ...formData,
        status: "Unread", // Admin ke liye default status
        createdAt: new Date().toISOString()
      });

      alert("Thank you! Your message has been sent successfully.");
      // Form reset karein
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
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
          {/* Contact Information Side (Same as before) */}
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

          {/* Form Side - Updated with state and submit handler */}
          <div className="contact-form-side modern-card">
            <h3 style={{ marginBottom: '24px', fontWeight: '800' }}>Send a Message</h3>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name" 
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
                  placeholder="email@example.com" 
                  required 
                />
              </div>

              <div className="form-input-group">
                <label>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Issue">Booking Issue</option>
                  <option value="Business Partnership">Business Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-input-group">
                <label>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="How can we help?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;