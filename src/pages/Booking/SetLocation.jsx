import React from "react";
import { useNavigate } from "react-router-dom";

const SetLocation = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Where to?</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", margin: "20px 0" }}>
        <input type="text" placeholder="Pickup Location (Current Location)" style={{ padding: "10px" }} />
        <input type="text" placeholder="Drop Location" style={{ padding: "10px" }} />
      </div>
      <button 
        onClick={() => navigate("/book/vehicle")}
        style={{ width: "100%", padding: "12px", background: "#2563eb", color: "white" }}
      >
        Next: Select Vehicle
      </button>
    </div>
  );
};

export default SetLocation;