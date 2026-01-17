import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="page-container">
        <div className="footer-grid">
          
          {/* Column 1: Brand & App Links */}
          <div className="footer-col">
            <h3 className="footer-brand">Ship<span style={{color: 'var(--primary)'}}>Ease</span></h3>
            <p className="footer-desc">
              India's most reliable intra-city logistics partner. Moving goods, growing businesses.
            </p>
            <div className="app-badges">
              {/* Placeholders for App Store buttons */}
              <div className="store-badge">Get it on <b>Google Play</b></div>
              <div className="store-badge">Download on <b>App Store</b></div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Logistics Blog</Link>
            <Link to="/press">Press & Media</Link>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <Link to="/booking/create">Rent Mini Trucks</Link>
            <Link to="/services/packers">Packers & Movers</Link>
            <Link to="/services/enterprise">Enterprise Logistics</Link>
            <Link to="/services/courier">Two-Wheeler Delivery</Link>
          </div>

          {/* Column 4: Support */}
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/insurance">Goods Insurance</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShipEase Logistics Pvt Ltd. All rights reserved.</p>
          <div className="social-links">
            <span>cX</span>
            <span>in</span>
            <span>fb</span>
            <span>ig</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: #0f172a; /* Dark Slate - Industry Standard */
          color: #94a3b8;
          padding-top: 60px;
          border-top: 1px solid #1e293b;
          font-size: 0.9rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 40px;
        }

        .footer-brand {
          color: white;
          font-size: 1.5rem;
          margin-bottom: 16px;
        }

        .footer-desc {
          margin-bottom: 24px;
          line-height: 1.6;
          max-width: 300px;
        }

        .footer-col h4 {
          color: white;
          font-size: 1rem;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .footer-col a {
          display: block;
          color: #94a3b8;
          margin-bottom: 12px;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: var(--primary); /* Blue hover */
          transform: translateX(4px);
        }

        /* App Store Badges (Simulated) */
        .app-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .store-badge {
          background: #1e293b;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.75rem;
          border: 1px solid #334155;
          cursor: pointer;
        }

        .footer-bottom {
          border-top: 1px solid #1e293b;
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .social-links {
          display: flex;
          gap: 16px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        /* Responsive Footer */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;