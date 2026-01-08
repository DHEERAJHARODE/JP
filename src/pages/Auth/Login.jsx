import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary Logic: Token set karke Home bhej do
    localStorage.setItem("authToken", "12345"); 
    navigate("/");
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Phone Number" required style={{ padding: "10px" }} />
        <button type="submit" style={{ padding: "10px", background: "#2563eb", color: "white" }}>Login</button>
      </form>
      <p>New here? <Link to="/register">Create Account</Link></p>
    </div>
  );
};

export default Login;