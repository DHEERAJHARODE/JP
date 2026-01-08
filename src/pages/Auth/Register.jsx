import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="card" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Create Account</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Full Name" style={{ padding: "10px" }} />
        <input type="email" placeholder="Email Address" style={{ padding: "10px" }} />
        <input type="password" placeholder="Password" style={{ padding: "10px" }} />
        <button type="submit" style={{ padding: "10px", background: "#2563eb", color: "white" }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;