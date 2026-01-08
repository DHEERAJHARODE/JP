import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // Temporary logout logic
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", background: "#f8f9fa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#2563eb", margin: 0 }}>ShipEase</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>Home</Link>
        <Link to="/user/orders" style={{ textDecoration: "none", color: "#333" }}>Orders</Link>
        <Link to="/user/profile" style={{ textDecoration: "none", color: "#333" }}>Profile</Link>
        <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;