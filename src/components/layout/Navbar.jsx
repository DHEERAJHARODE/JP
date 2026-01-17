import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import "../../App.css";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          Ship<span style={{ color: "var(--primary)" }}>Ease</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          
          <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/dashboard/profile" className={`nav-item ${isActive('/dashboard/profile') ? 'active' : ''}`}>
                Profile
              </Link>
              <div className="user-menu">
                <span className="user-email">{user.email?.split('@')[0]}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* Professional Navbar Styles */
        .navbar {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0.75rem 0;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
          text-decoration: none;
          letter-spacing: -0.5px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-item {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
          position: relative;
        }
        .nav-item:hover, .nav-item.active {
          color: var(--primary);
        }
        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }
        .user-menu {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-left: 20px;
          border-left: 1px solid var(--border);
        }
        .user-email {
          font-weight: 600;
          font-size: 0.9rem;
        }
        .btn-logout {
          padding: 8px 16px;
          background: #ffe4e6;
          color: #e11d48;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .btn-logout:hover {
          background: #nfecaca;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-main);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            gap: 20px;
            border-bottom: 1px solid var(--border);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            display: none; /* Hidden by default */
          }
          .nav-links.mobile-open {
            display: flex; /* Show when open */
          }
          .user-menu {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--border);
            padding-top: 16px;
          }
          .btn-logout {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;