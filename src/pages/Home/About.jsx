import React from "react";
import "../../App.css";

const About = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ background: "white", borderRadius: "16px", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
          Driving the Future of <span style={{ color: "var(--primary)" }}>Logistics</span>
        </h1>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", color: "var(--text-muted)" }}>
          ShipEase is India's leading intra-city logistics marketplace. We connect businesses and individuals with reliable truck drivers for seamless goods transport.
        </p>
      </section>

      {/* Stats Grid */}
      <div className="grid-2" style={{ marginBottom: "60px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", textAlign: "center" }}>
        <div className="modern-card">
          <h2 style={{ color: "var(--primary)", fontSize: "2.5rem" }}>50k+</h2>
          <p>Successful Trips</p>
        </div>
        <div className="modern-card">
          <h2 style={{ color: "var(--primary)", fontSize: "2.5rem" }}>2000+</h2>
          <p>Verified Drivers</p>
        </div>
        <div className="modern-card">
          <h2 style={{ color: "var(--primary)", fontSize: "2.5rem" }}>15+</h2>
          <p>Cities Covered</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid-2">
        <div style={{ padding: "20px" }}>
          <h3 style={{ marginBottom: "16px", fontSize: "1.75rem" }}>Our Mission</h3>
          <p style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
            To organize the logistics industry by bringing transparency, reliability, and efficiency to every booking. We aim to empower driver-partners with better earnings while providing customers with instant, hassle-free truck rentals.
          </p>
        </div>
        <div className="modern-card" style={{ background: "#eff6ff", border: "none" }}>
          <h3 style={{ marginBottom: "12px" }}>Why Choose Us?</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "12px", display: "flex", gap: "10px" }}>
              <span>✅</span> Instant booking confirmation
            </li>
            <li style={{ marginBottom: "12px", display: "flex", gap: "10px" }}>
              <span>✅</span> Real-time GPS tracking
            </li>
            <li style={{ marginBottom: "12px", display: "flex", gap: "10px" }}>
              <span>✅</span> Transparent pricing (No haggling)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;