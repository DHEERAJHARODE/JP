import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Order Summary</h2>
      <p><strong>Pickup:</strong> Mumbai</p>
      <p><strong>Drop:</strong> Pune</p>
      <p><strong>Vehicle:</strong> Tata Ace</p>
      <h3>Total Fare: ₹450</h3>
      <button 
        onClick={() => navigate("/book/finding")}
        style={{ width: "100%", padding: "12px", background: "#16a34a", color: "white" }}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default OrderSummary;