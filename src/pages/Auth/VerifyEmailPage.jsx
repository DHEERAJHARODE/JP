import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/common/Button";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Register page se bheja gaya email yahan receive karenge
  const email = location.state?.email || "your email address";

  return (
    <div className="verify-page">
      <div className="verify-card">
        {/* Animated Icon */}
        <div className="icon-container">
          <div className="animated-mail">
            <div className="mail-icon">✉️</div>
            <div className="mail-shadow"></div>
          </div>
        </div>

        <h3>Verify Your Email</h3>
        
        <p className="description">
          You're almost there! We've sent a verification link to:
        </p>
        
        <div className="email-box">
          {email}
        </div>

        <p className="instruction">
          Please check your inbox (and spam folder) and click on the link to activate your account.
        </p>

        <div className="action-button">
          <Button onClick={() => navigate("/login")} styleType="primary" className="w-full">
            Back to Login Page
          </Button>
        </div>
      </div>

      <style>{`
        .verify-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 20px;
        }

        .verify-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
          text-align: center;
          max-width: 450px;
          width: 100%;
          animation: slideUp 0.5s ease-out;
        }

        /* --- Animations --- */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes shadow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(0.8); opacity: 0.1; }
        }

        .icon-container {
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
          position: relative;
        }

        .animated-mail {
          position: relative;
        }

        .mail-icon {
          font-size: 4rem;
          animation: float 3s ease-in-out infinite;
          position: relative;
          z-index: 2;
        }

        .mail-shadow {
          width: 50px;
          height: 10px;
          background: black;
          border-radius: 50%;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          filter: blur(5px);
          opacity: 0.2;
          animation: shadow-pulse 3s ease-in-out infinite;
        }

        /* --- Typography & Layout --- */
        h3 {
          font-size: 1.8rem;
          color: #0f172a;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .description {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 16px;
        }

        .email-box {
          background: #f1f5f9;
          padding: 12px 16px;
          border-radius: 12px;
          color: #0f172a;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
        }

        .instruction {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .action-button {
          margin-top: auto;
        }
        
        .w-full { width: 100%; display: flex; justify-content: center; }
        .verify-card button { width: 100%; padding: 14px; font-size: 1rem; }
      `}</style>
    </div>
  );
};

export default VerifyEmailPage;