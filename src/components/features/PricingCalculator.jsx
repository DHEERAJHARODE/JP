import React, { useEffect, useState } from "react";

const PricingCalculator = ({ distance = 0, vehicle, onPriceCalculated }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (vehicle && distance > 0) {
      const calculatedPrice = vehicle.pricePerKm * distance;
      setPrice(calculatedPrice);
      onPriceCalculated && onPriceCalculated(calculatedPrice);
    } else {
      setPrice(0);
      onPriceCalculated && onPriceCalculated(0);
    }
  }, [distance, vehicle, onPriceCalculated]);

  return (
    <div style={styles.container}>
      <h3>Pricing Details</h3>
      {vehicle ? (
        <>
          <p>Vehicle: {vehicle.name}</p>
          <p>Distance: {distance} km</p>
          <p>Total Price: ₹{price}</p>
        </>
      ) : (
        <p>Please select a vehicle</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: "#f9fafb",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
};

export default PricingCalculator;
