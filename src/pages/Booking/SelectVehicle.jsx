import React from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

const SelectVehicle = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Select Vehicle</h2>
      <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
        <h3>🚚 Tata Ace</h3>
        <p>Capacity: 750kg • Price: ₹450</p>
      </div>
      <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
        <h3>🏍️ 2-Wheeler</h3>
        <p>Capacity: 20kg • Price: ₹80</p>
      </div>
      <button 
        onClick={() => navigate("/book/summary")}
        style={{ width: "100%", padding: "12px", background: "#2563eb", color: "white" }}
      >
        Review Order
      </button>
    </div>
  );
};

export default SelectVehicle;