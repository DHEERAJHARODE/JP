import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";

const VehicleList = ({ vehicles = [], onSelect }) => {
  return (
    <div style={styles.grid}>
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} style={styles.card}>
          <h3>{vehicle.name}</h3>
          <p>Capacity: {vehicle.capacity}</p>
          <p>Price per km: ₹{vehicle.pricePerKm}</p>
          <Button onClick={() => onSelect(vehicle)}>Select</Button>
        </Card>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  card: {
    textAlign: "center",
    padding: "20px",
  },
};

export default VehicleList;
