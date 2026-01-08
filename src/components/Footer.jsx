import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: "20px", background: "#333", color: "#fff", textAlign: "center", marginTop: "auto" }}>
      <p>&copy; {new Date().getFullYear()} ShipEase Logistics. All rights reserved.</p>
    </footer>
  );
};

export default Footer;