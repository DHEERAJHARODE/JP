import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useBookingContext } from "../../context/BookingContext";
import PricingCalculator from "../../components/features/PricingCalculator";
import { useMaps } from "../../hooks/useMaps";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../hooks/useAuth";
import { formatCurrency } from "../../utils/helpers";

const BookingSummary = () => {
  const { pickup, drop, vehicle, distance, setDistance, price, setPrice, resetBooking } =
    useBookingContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { calculateDistance } = useMaps();

  useEffect(() => {
    // Mock lat/lng for demonstration
    const pickupCoords = { lat: 28.6139, lng: 77.209 };
    const dropCoords = { lat: 28.7041, lng: 77.1025 };
    const d = calculateDistance(pickupCoords, dropCoords);
    setDistance(d);
  }, [pickup, drop]);

  const handleConfirm = async () => {
    const bookingData = {
      userId: user.uid,
      pickup,
      drop,
      vehicle,
      distance,
      price,
      createdAt: new Date().toISOString(),
    };

    const { id, error } = await createBooking(bookingData);
    if (error) {
      alert("Error creating booking: " + error);
    } else {
      alert("Booking confirmed! ID: " + id);
      resetBooking();
      navigate("/dashboard/orders");
    }
  };

  if (!vehicle) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Please select a vehicle first.</p>
        <Button onClick={() => navigate("/booking/vehicle")}>Back</Button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Booking Summary</h2>
      <div style={styles.details}>
        <p>
          <strong>Pickup:</strong> {pickup}
        </p>
        <p>
          <strong>Drop:</strong> {drop}
        </p>
        <p>
          <strong>Vehicle:</strong> {vehicle.name}
        </p>
        <p>
          <strong>Distance:</strong> {distance.toFixed(2)} km
        </p>
        <p>
          <strong>Price:</strong> {formatCurrency(vehicle.pricePerKm * distance)}
        </p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button styleType="primary" onClick={handleConfirm}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  details: {
    textAlign: "left",
    lineHeight: "1.8",
  },
};

export default BookingSummary;
