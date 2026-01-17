import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useBookingContext } from "../../context/BookingContext";

const CreateBooking = () => {
  const { pickup, drop, setPickup, setDrop } = useBookingContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!pickup || !drop) {
      setError("Please enter both pickup and drop locations");
      return;
    }
    navigate("/booking/vehicle");
  };

  return (
    <div style={styles.container}>
      <h2>Create a Booking</h2>
      <div style={styles.form}>
        <Input
          label="Pickup Location"
          placeholder="Enter pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <Input
          label="Drop Location"
          placeholder="Enter drop location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
        />
        {error && <p style={styles.error}>{error}</p>}
        <Button styleType="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    color: "#ef4444",
    marginBottom: "12px",
  },
};

export default CreateBooking;
