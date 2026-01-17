import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking/create");
  };

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Fast & Reliable Truck Booking</h1>
        <p style={styles.subtitle}>
          Move your goods anywhere in India with ease and at affordable rates.
        </p>
        <Button styleType="primary" onClick={handleBookNow}>
          Book Now
        </Button>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
  },
  hero: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "60px 20px",
    background: "#f3f4f6",
    borderRadius: "12px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
  },
};

export default LandingPage;
