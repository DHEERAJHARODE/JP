import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { resetPassword } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");

    const { success, error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      setMessage("Password reset link has been sent! Kindly check your email.");
      setEmail(""); 
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: '20px' }}>
      <div className="auth-card" style={{ background: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Forgot Password?</h3>
          <p style={{ color: '#64748b' }}>Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />

          {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
          {message && <div style={{ background: '#dcfce3', color: '#166534', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{message}</div>}

          <div style={{ marginTop: '24px' }}>
            <Button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem' }}>
            Remember your password? <Link to="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;