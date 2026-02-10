import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // स्क्रॉल होने पर बैकग्राउंड ट्रांसपेरेंट से सॉलिड करने के लिए
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // रूट बदलते ही मोबाइल मेनू बंद कर दें
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          Ship<span style={{ color: "#2563eb" }}>Ease</span>
        </Link>

        {/* Mobile Toggle Button (Hamburger with Animation) */}
        <button 
          className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
            <NavLinks 
              user={user} 
              isActive={isActive} 
              handleLogout={handleLogout} 
            />
        </div>

        {/* Mobile Navigation Overlay (Side Drawer) */}
        <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div style={{marginBottom: '30px'}}>
               <h3 style={{color: '#2563eb', fontSize: '1.5rem'}}>Menu</h3>
            </div>
            <NavLinks 
              user={user} 
              isActive={isActive} 
              handleLogout={handleLogout} 
              isMobile={true}
            />
        </div>
      </div>

      <style>{`
        /* --- Navbar Base Styles --- */
        .navbar {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          position: fixed; /* Fixed to stay on top */
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1rem 0;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          border-bottom: 1px solid #e2e8f0;
          padding: 0.75rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
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
          color: #0f172a;
          text-decoration: none;
          letter-spacing: -0.5px;
          z-index: 1002;
        }

        /* --- Desktop Links --- */
        .nav-links.desktop-only {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-item {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
          position: relative;
          cursor: pointer;
        }

        .nav-item:hover, .nav-item.active {
          color: #2563eb;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
        }

        /* --- Buttons --- */
        .btn-register {
          background: #2563eb;
          color: white !important;
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .btn-register:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          color: white;
        }
        .btn-register.active::after { display: none; } /* Remove underline for button */

        .user-menu {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-left: 20px;
          border-left: 1px solid #e2e8f0;
        }

        .user-email {
          font-weight: 600;
          font-size: 0.9rem;
          color: #334155;
        }

        .btn-logout {
          padding: 8px 16px;
          background: #fee2e2;
          color: #ef4444;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .btn-logout:hover {
          background: #fecaca;
        }

        /* --- Mobile Toggle (Hamburger) --- */
        .mobile-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 30px;
          height: 25px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1002;
        }

        .bar {
          width: 30px;
          height: 3px;
          background: #0f172a;
          border-radius: 10px;
          transition: all 0.3s linear;
          position: relative;
          transform-origin: 1px;
        }

        /* Hamburger Animation */
        .mobile-toggle.open .bar:nth-child(1) {
          transform: rotate(45deg);
        }
        .mobile-toggle.open .bar:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }
        .mobile-toggle.open .bar:nth-child(3) {
          transform: rotate(-45deg);
        }

        /* --- Mobile Menu Drawer --- */
        .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
            z-index: 999;
        }
        .mobile-overlay.open {
            opacity: 1;
            pointer-events: all;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%; /* Hidden by default */
          width: 75%;
          max-width: 300px;
          height: 100vh;
          background: white;
          box-shadow: -5px 0 15px rgba(0,0,0,0.1);
          padding: 80px 30px 30px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
        }

        .mobile-menu.open {
          right: 0;
        }

        /* --- Responsive Queries --- */
        @media (max-width: 768px) {
          .nav-links.desktop-only {
            display: none;
          }
          
          .mobile-toggle {
            display: flex;
          }

          .user-menu {
            flex-direction: column;
            align-items: flex-start;
            border-left: none;
            padding-left: 0;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            width: 100%;
            margin-top: 10px;
          }
          
          .user-email {
            margin-bottom: 15px;
            font-size: 1rem;
          }

          .btn-logout {
            width: 100%;
            text-align: center;
            padding: 12px;
          }

          .nav-item {
            font-size: 1.1rem;
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
            width: 100%;
            display: block;
          }
          
          .nav-item.active::after {
            display: none; 
          }
          .nav-item.active {
             color: #2563eb;
             font-weight: 700;
             padding-left: 10px;
             border-left: 4px solid #2563eb;
             border-bottom: none;
          }
          
          .btn-register {
             margin-top: 10px;
             text-align: center;
             display: block;
             width: 100%;
          }
        }
      `}</style>
    </nav>
  );
};

// Sub-component to organize links
const NavLinks = ({ user, isActive, handleLogout, isMobile = false }) => (
  <>
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
        <Link to="/login" className={`nav-item ${isActive('/login') ? 'active' : ''}`}>Login</Link>
        <Link to="/register" className={`nav-item btn-register`}>
          Get Started
        </Link>
      </>
    )}
  </>
);

export default Navbar;