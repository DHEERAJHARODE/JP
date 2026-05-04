import React, { useState } from 'react';
import "../../App.css";
import './HelpCenter.css';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { 
      q: "How do I track my truck in real-time?", 
      a: "Once your booking is confirmed, go to 'My Orders' in your dashboard. You will see a 'Live Track' button next to your active trip which shows the GPS location of the driver." 
    },
    { 
      q: "What payment methods are supported?", 
      a: "We accept all major payment methods including UPI (GPay, PhonePe), Credit/Debit cards, and Net Banking. Business accounts can also opt for monthly invoicing." 
    },
    { 
      q: "How does ShipEase ensure cargo safety?", 
      a: "All driver partners are strictly vetted through a 5-step verification process. Additionally, every trip is monitored via real-time GPS." 
    },
    { 
      q: "Can I modify my pickup time after booking?", 
      a: "Yes, you can reschedule your booking through the dashboard up to 1 hour before the original pickup time." 
    }
  ];

  // Logic to filter FAQs based on search input
  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hc-minimal-wrapper">
      <header className="hc-minimal-hero">
        <h1 className="hc-hero-title">Support <span className="gradient-text">Center</span></h1>
        <p className="hc-hero-subtitle">Search our resources or browse frequently asked questions below.</p>
        
        {/* Working Search Bar */}
        <div className="hc-search-minimal modern-card">
          <input 
            type="text" 
            placeholder="Type your question here..." 
            className="hc-clean-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Ab ye kaam karega
          />
          <div className="hc-search-icon-fixed">🔍</div>
        </div>
      </header>

      <main className="hc-main-content">
        <div className="hc-accordion-group">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`hc-accordion-item ${activeFaq === index ? 'is-open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="hc-question-row">
                  <h3>{faq.q}</h3>
                  <span className="hc-icon-toggle"></span>
                </div>
                <div className="hc-answer-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No results found for "{searchTerm}". Try a different keyword.</p>
            </div>
          )}
        </div>

        <section className="hc-direct-contact modern-card">
          <h2>Still have questions?</h2>
          <p>If you couldn't find the answer, please get in touch with our team.</p>
          <button className="secondary-btn" onClick={() => window.location.href='/contact-us'}>
            Contact Support &rarr;
          </button>
        </section>
      </main>
    </div>
  );
};

export default HelpCenter;