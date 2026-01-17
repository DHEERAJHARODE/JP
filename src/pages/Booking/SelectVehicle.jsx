import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import VehicleList from "../../components/features/VehicleList";
import Button from "../../components/common/Button";
import { VEHICLES } from "../../utils/constants";

const SelectVehicle = () => {
  const { vehicle, setVehicle } = useBookingContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (!vehicle) {
      setError("Please select a vehicle to continue");
      return;
    }
    navigate("/booking/summary");
  };

  return (
    <div style={styles.container}>
      <h2>Select a Vehicle</h2>
      <VehicleList
        vehicles={VEHICLES}
        onSelect={(v) => {
          setVehicle(v);
          setError(null);
        }}
      />
      {error && <p style={styles.error}>{error}</p>}
      <div style={{ marginTop: "20px" }}>
        <Button styleType="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
  },
  error: {
    color: "#ef4444",
    marginTop: "12px",
  },
};

export default SelectVehicle;
