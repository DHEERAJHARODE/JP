import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <header className="support-header">
        <h1>Support</h1>
        <p>We're here to help you succeed. How can we assist you today?</p>
      </header>

      <main className="support-content">
        <div className="support-grid">
          <div className="support-card">
            <span className="support-icon">🎫</span>
            <h3>Submit a Ticket</h3>
            <p>Facing a technical issue? Submit a ticket and our team will get back to you within 24 hours.</p>
            <button className="support-btn">Open Ticket</button>
          </div>

          <div className="support-card">
            <span className="support-icon">💬</span>
            <h3>Live Chat</h3>
            <p>Need immediate assistance? Chat with our customer success team in real-time right now.</p>
            <button className="support-btn">Start Chat</button>
          </div>

          <div className="support-card">
            <span className="support-icon">📖</span>
            <h3>Knowledge Base</h3>
            <p>Browse our detailed guides, step-by-step tutorials, and FAQs to find answers instantly.</p>
            <button className="support-btn">Browse Docs</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;