import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Your Trusted Transport Partner</h1>
          <p>Safe rides, reliable deliveries, and professional drivers — anytime, anywhere.</p>

          <button className="btn-primary" onClick={() => navigate("/user/location")}>
            Book Now
          </button>

          <div className="trust-row">
            <div>⭐ 4.9 Rating</div>
            <div>🛡 Verified Drivers</div>
            <div>📍 Live Tracking</div>
          </div>
        </div>

        <div className="hero-image">
          <img src="/assets/illustrations/realistic-van.png" alt="Transport" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>Book a Service</h2>

        <div className="service-grid">

          <div className="service-card" onClick={() => navigate("/user/location")}>
            <img src="/assets/icons/car.svg" alt="Ride" />
            <h3>City Ride</h3>
            <p>Quick cabs for within city travel.</p>
          </div>

          <div className="service-card" onClick={() => navigate("/user/location")}>
            <img src="/assets/icons/bike.svg" alt="Bike Ride" />
            <h3>2-Wheeler</h3>
            <p>Affordable and fast bike taxis.</p>
          </div>

          <div className="service-card" onClick={() => navigate("/user/location")}>
            <img src="/assets/icons/van.svg" alt="Delivery" />
            <h3>Parcel Delivery</h3>
            <p>Doorstep pickup & safe delivery.</p>
          </div>

          <div className="service-card" onClick={() => navigate("/user/location")}>
            <img src="/assets/icons/truck.svg" alt="Cargo" />
            <h3>Cargo Transport</h3>
            <p>Reliable transport for heavy goods.</p>
          </div>

        </div>
      </section>

      {/* TRUST FACTORS */}
      <section className="trust-section">
        <h2>Why People Trust Us</h2>

        <div className="trust-grid">
          <div className="trust-card">
            <h4>Verified Professionals</h4>
            <p>All drivers undergo authentication and background checks.</p>
          </div>

          <div className="trust-card">
            <h4>Real-Time Tracking</h4>
            <p>Track your ride or delivery live in real-time.</p>
          </div>

          <div className="trust-card">
            <h4>Transparent Pricing</h4>
            <p>No hidden charges. Know your fare upfront.</p>
          </div>

          <div className="trust-card">
            <h4>24/7 Customer Support</h4>
            <p>Our support team is always available.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <button className="btn-secondary" onClick={() => navigate("/user/my-orders")}>
          View My Orders
        </button>
      </section>

    </div>
  );
};

export default Home;
