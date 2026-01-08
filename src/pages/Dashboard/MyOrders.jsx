import React from "react";

const MyOrders = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
        <h4>Order #12345 - Completed</h4>
        <p>Pickup: Home • Drop: Office</p>
        <p>Fare: ₹120</p>
      </div>
    </div>
  );
};

export default MyOrders;