import React from 'react';
import "../../App.css";
import './TermsPrivacy.css';

const TermsPrivacy = () => {
  return (
    <div className="terms-wrapper">
      {/* Header Section */}
      <header className="terms-hero">
        <div className="fade-in-up">
          <span className="pill-badge">Legal & Policy</span>
        </div>
        <h1 className="terms-title">
          Terms & <span className="gradient-text">Privacy</span>
        </h1>
        <p className="terms-subtitle">
          Please read our terms of service and privacy policy carefully to understand 
          how we operate and protect your data.
        </p>
      </header>

      <main className="terms-container">
        {/* Terms of Service Section */}
        <section className="terms-card modern-card">
          <h2>Terms of Service</h2>
          <p className="last-updated">Last updated: May 2026</p>
          
          <div className="legal-content">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using the ShipEase platform, you agree to be bound by these 
              terms. If you do not agree, please refrain from using our services.
            </p>

            <h3>2. Service Usage</h3>
            <p>
              Our platform must be used for lawful logistics purposes only. Any attempt 
              to impair the service's accessibility or security is strictly prohibited.
            </p>
            
            <h3>3. Modifications</h3>
            <p>
              We reserve the right to update these terms at any time. Continued use of 
              the site after changes constitutes your acceptance of the new terms.
            </p>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section className="terms-card modern-card">
          <h2>Privacy Policy</h2>
          <p className="last-updated">Last updated: May 2026</p>
          
          <div className="legal-content">
            <h3>1. Data Collection</h3>
            <p>
              We collect information such as your name, contact details, and location 
              data to provide seamless logistics and real-time tracking features.
            </p>

            <h3>2. Information Usage</h3>
            <p>
              Collected data is used to maintain service quality, protect users from 
              fraud, and offer personalized logistics content and updates.
            </p>

            <h3>3. Data Security</h3>
            <p>
              We use industry-standard encryption and regular security audits to ensure 
              that your personal and business data remains safe with us.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsPrivacy;