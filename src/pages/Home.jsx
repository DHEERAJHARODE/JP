import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>Fast & Reliable Transport</h1>
        <p>Book your ride instantly — anytime, anywhere.</p>
        <button onClick={() => navigate("/user/location")}>
          Book Now
        </button>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="services-section">
        <h2>Our Services</h2>

        <div className="services-grid">
          <div className="service-card">
            {/* Note: Ensure these images exist in your public/assets folder */}
            <img src="/assets/icons/car.svg" alt="Ride" />
            <h3>Ride</h3>
          </div>

          <div className="service-card">
            <img src="/assets/icons/van.svg" alt="Delivery" />
            <h3>Delivery</h3>
          </div>

          <div className="service-card">
            <img src="/assets/icons/truck.svg" alt="Cargo" />
            <h3>Cargo</h3>
          </div>

          <div className="service-card">
            <img src="/assets/icons/bike.svg" alt="Bike Ride" />
            <h3>Bike Ride</h3>
          </div>
        </div>
      </section>

      {/* QUICK FEATURES SECTION */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ Fast booking process</li>
          <li>✔ Real-time driver tracking</li>
          <li>✔ Multiple vehicle options</li>
          <li>✔ Safe & verified drivers</li>
        </ul>
      </section>

      {/* CTA FOOTER */}
      <section className="cta-footer">
        <button onClick={() => navigate("/user/my-orders")}>
          View My Orders
        </button>
      </section>
    </div>
  );
};

export default Home;