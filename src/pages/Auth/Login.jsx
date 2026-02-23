import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { loginUser, loginWithGoogle } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { user, error } = await loginUser(email, password);
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { user, error } = await loginWithGoogle();
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
            <h2>Welcome Back!</h2>
            <p>Log in to manage your shipments and track deliveries in real-time.</p>
          </div>
          <div className="visual-overlay"></div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-container">
          <div className="form-header">
            <h3>Login to ShipEase</h3>
            <p className="subtitle">Enter your details below</p>
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
                placeholder="••••••••"
                required
              />
              
              {/* Forgot Password Link */}
              <div style={{ textAlign: "right", marginTop: "8px" }}>
                <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: "500", textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <Button type="submit" styleType="primary" disabled={loading} className="w-full">
                {loading ? "Logging in..." : "Sign In"}
              </Button>
            </div>

            <div className="divider-container">
              <hr className="divider-line" />
              <span className="divider-text">OR</span>
              <hr className="divider-line" />
            </div>

            <Button 
              type="button" 
              onClick={handleGoogleLogin} 
              disabled={loading} 
              className="w-full google-btn"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
              {loading ? "Please wait..." : "Continue with Google"}
            </Button>

            <p className="auth-footer">
              Don't have an account? <Link to="/register">Create free account</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f1f5f9; padding: 20px; }
        .auth-card { display: flex; width: 100%; max-width: 900px; background: white; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); overflow: hidden; min-height: 550px; }
        .auth-visual { flex: 1; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); position: relative; display: flex; align-items: center; justify-content: center; color: white; padding: 40px; }
        .visual-content { position: relative; z-index: 2; text-align: center; }
        .visual-content h2 { font-size: 2.5rem; margin-bottom: 16px; color: white; }
        .visual-content p { color: rgba(255, 255, 255, 0.8); font-size: 1.1rem; line-height: 1.6; }
        .visual-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); z-index: 1; }
        .auth-form-container { flex: 1; padding: 60px; display: flex; flex-direction: column; justify-content: center; }
        .form-header { margin-bottom: 32px; text-align: center; }
        .form-header h3 { font-size: 1.8rem; color: #0f172a; margin-bottom: 8px; }
        .subtitle { color: #64748b; }
        .auth-form { width: 100%; max-width: 400px; margin: 0 auto; }
        .error-message { background: #fee2e2; color: #ef4444; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.9rem; text-align: center; margin-top: 16px;}
        .form-actions { margin-top: 24px; }
        .w-full { width: 100%; display: flex; justify-content: center; }
        .auth-form button { width: 100%; padding: 14px; font-size: 1rem; }
        .google-btn { background-color: #ffffff !important; color: #334155 !important; border: 1px solid #cbd5e1 !important; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 500; transition: all 0.2s ease; }
        .google-btn:hover { background-color: #f8fafc !important; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .google-icon { width: 20px; height: 20px; }
        .divider-container { display: flex; align-items: center; margin: 20px 0; }
        .divider-line { flex: 1; border: none; border-top: 1px solid #e2e8f0; }
        .divider-text { padding: 0 16px; color: #94a3b8; font-size: 0.85rem; font-weight: 500; }
        .auth-footer { margin-top: 24px; text-align: center; font-size: 0.9rem; color: #64748b; }
        .auth-footer a { color: #2563eb; font-weight: 600; }
        @media (max-width: 768px) { .auth-visual { display: none; } .auth-card { max-width: 100%; min-height: auto; border-radius: 16px; } .auth-form-container { padding: 40px 24px; } .form-header h3 { font-size: 1.5rem; } }
      `}</style>
    </div>
  );
};

export default Login;