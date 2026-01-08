import React from "react";
import { useNavigate } from "react-router-dom";

const LiveTracking = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ padding: "20px" }}>
      <h2>📍 Live Tracking</h2>
      <div style={{ height: "300px", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Map will appear here
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Driver is on the way!</h3>
        <button onClick={() => navigate("/")} style={{ padding: "10px" }}>Go Home</button>
      </div>
    </div>
  );
};

export default LiveTracking;