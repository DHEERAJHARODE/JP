import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <h2 className="logo">Ship<span style={{color: '#3b82f6'}}>Ease</span></h2>
          <p>India's most trusted logistics partner. Move anything, anywhere, anytime.</p>
        </div>

        {/* Links Column 1 */}
        <div className="footer-links">
           <h4>Company</h4>
           <Link to="/about">About Us</Link>
           <Link to="/careers">Careers</Link>
           <Link to="/blog">Blog</Link>
        </div>

        {/* Links Column 2 */}
        <div className="footer-links">
           <h4>Product</h4>
           <Link to="/booking/create">Book Truck</Link>
           <Link to="/enterprise">Enterprise</Link>
           <Link to="/pricing">Pricing</Link>
        </div>

        {/* Links Column 3 */}
        <div className="footer-links">
           <h4>Support</h4>
           <Link to="/help">Help Center</Link>
           <Link to="/contact">Contact Us</Link>
           <Link to="/terms">Terms & Privacy</Link>
        </div>

      </div>
      
      <div className="footer-bottom">
         <p>&copy; {new Date().getFullYear()} ShipEase Logistics Pvt Ltd. All rights reserved.</p>
      </div>

      <style>{`
        .footer {
           background: #0f172a;
           color: white;
           padding: 60px 0 20px 0;
           margin-top: auto;
        }

        .footer-container {
           max-width: 1200px;
           margin: 0 auto;
           padding: 0 20px;
           display: grid;
           grid-template-columns: 2fr 1fr 1fr 1fr;
           gap: 40px;
           margin-bottom: 40px;
        }

        .footer-brand .logo {
           font-size: 1.8rem;
           margin-bottom: 16px;
           color: white;
        }

        .footer-brand p {
           color: #94a3b8;
           line-height: 1.6;
           max-width: 300px;
        }

        .footer-links {
           display: flex;
           flex-direction: column;
           gap: 12px;
        }

        .footer-links h4 {
           color: white;
           font-size: 1.1rem;
           margin-bottom: 8px;
        }

        .footer-links a {
           color: #94a3b8;
           text-decoration: none;
           transition: color 0.2s;
           font-size: 0.95rem;
        }

        .footer-links a:hover { color: #3b82f6; }

        .footer-bottom {
           text-align: center;
           border-top: 1px solid #1e293b;
           padding-top: 20px;
           color: #64748b;
           font-size: 0.85rem;
        }

        /* Mobile */
        @media (max-width: 768px) {
           .footer-container {
              grid-template-columns: 1fr;
              gap: 30px;
              text-align: center;
           }
           
           .footer-brand p { margin: 0 auto; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;