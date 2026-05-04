import React from 'react';
import "../../App.css";
import './Product.css';

const Product = () => {
  return (
    <div className="product-wrapper">
      {/* Hero Section */}
      <header className="product-hero">
        <div className="fade-in-up">
          <span className="pill-badge">Innovation in Motion</span>
        </div>
        <h1 className="product-title">
          The <span className="gradient-text">ShipEase Ecosystem</span>
        </h1>
        <p className="product-subtitle">
          A seamless integration of technology and logistics designed to empower 
          businesses and drivers across India.
        </p>
      </header>

      <main className="product-container">
        {/* Core Product Grid */}
        <div className="product-feature-grid">
          
          {/* Feature 1 */}
          <div className="product-main-card modern-card">
            <div className="product-icon-wrap">📱</div>
            <h3>Smart Booking App</h3>
            <p>
              Our consumer-facing app allows for instant vehicle booking with 
              transparent pricing and real-time GPS tracking for every trip.
            </p>
            <ul className="mini-features">
              <li>Instant Matching</li>
              <li>Multiple Vehicle Options</li>
              <li>Digital Payments</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="product-main-card modern-card">
            <div className="product-icon-wrap">🚛</div>
            <h3>Partner Network</h3>
            <p>
              A dedicated platform for our driver-partners that optimizes their 
              earnings through smart route planning and consistent load availability.
            </p>
            <ul className="mini-features">
              <li>Verified Documentation</li>
              <li>Route Optimization</li>
              <li>Transparent Earnings</li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="product-main-card modern-card">
            <div className="product-icon-wrap">📊</div>
            <h3>Enterprise Suite</h3>
            <p>
              A powerful dashboard for businesses to manage high-volume logistics, 
              track performance, and integrate via custom APIs.
            </p>
            <ul className="mini-features">
              <li>Bulk Order Management</li>
              <li>Data Analytics</li>
              <li>Priority Support</li>
            </ul>
          </div>

        </div>

        {/* Technical Edge Section */}
        <section className="tech-edge modern-card">
          <div className="tech-text">
            <h2>The Technical Edge</h2>
            <p>
              At the heart of ShipEase is our proprietary AI dispatch engine that 
              analyzes traffic, load weight, and driver proximity to ensure your 
              goods move efficiently.
            </p>
          </div>
          <button className="primary-btn" onClick={() => window.location.href='/careers'}>
            Build with Us
          </button>
        </section>
      </main>
    </div>
  );
};

export default Product;