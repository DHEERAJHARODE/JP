import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { registerUser } from "../../services/authService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const { user, error } = await registerUser(email, password);
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {/* Left Side: Visual */}
        <div className="auth-visual">
          <div className="visual-content">
            <h2>Join ShipEase</h2>
            <p>Start shipping smarter today. Join thousands of businesses simplifying their logistics.</p>
          </div>
          <div className="visual-overlay"></div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-container">
          <div className="form-header">
            <h3>Create Account</h3>
            <p className="subtitle">It's free and takes less than a minute.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
            
            <div style={{marginTop: '16px'}}>
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
              />
            </div>

            <div style={{marginTop: '16px'}}>
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <Button type="submit" styleType="primary" disabled={loading} className="w-full">
                {loading ? "Creating Account..." : "Register Now"}
              </Button>
            </div>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          padding: 20px;
        }

        .auth-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          min-height: 600px;
        }

        /* --- Visual Section --- */
        .auth-visual {
          flex: 1;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); /* Different purple gradient for Register */
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          padding: 40px;
        }

        .visual-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .visual-content h2 {
          font-size: 2.5rem;
          margin-bottom: 16px;
          color: white;
        }

        .visual-content p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .visual-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          z-index: 1;
        }

        /* --- Form Section --- */
        .auth-form-container {
          flex: 1;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-header {
          margin-bottom: 32px;
          text-align: center;
        }

        .form-header h3 {
          font-size: 1.8rem;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #64748b;
        }

        .auth-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .error-message {
          background: #fee2e2;
          color: #ef4444;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          text-align: center;
        }

        .form-actions {
          margin-top: 24px;
        }
        
        .auth-form button {
           width: 100%;
           padding: 14px;
           font-size: 1rem;
        }

        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.9rem;
          color: #64748b;
        }

        .auth-footer a {
          color: #2563eb;
          font-weight: 600;
        }

        /* --- Mobile Responsiveness --- */
        @media (max-width: 768px) {
          .auth-visual {
            display: none;
          }

          .auth-card {
            max-width: 100%;
            min-height: auto;
            border-radius: 16px;
          }

          .auth-form-container {
            padding: 40px 24px;
          }
          
          .form-header h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;