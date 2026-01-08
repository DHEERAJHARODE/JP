import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FindingDriver = () => {
  const navigate = useNavigate();

  // 3 second baad automatically Tracking page par bhej dega (Simulation)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/book/tracking");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>🔍 Finding a driver nearby...</h2>
      <p>Please wait while we connect you to a partner.</p>
    </div>
  );
};

export default FindingDriver;