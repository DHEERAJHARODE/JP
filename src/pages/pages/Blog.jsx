import React from 'react';
import "../../App.css";
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-wrapper">
      {/* Hero Header Section */}
      <header className="blog-hero">
        <div className="fade-in-up">
          <span className="pill-badge">🚚 ShipEase Logistics Insights</span>
        </div>
        <h1 className="blog-title">
          The <span className="gradient-text">Logistics Ledger</span>
        </h1>
        <p className="blog-subtitle">
          Expert advice on supply chain management, fleet optimization, and the 
          future of freight transport in India.
        </p>
      </header>

      <main className="blog-container">
        {/* Post 1: Technology Focus */}
        <article className="blog-post-card modern-card">
          <div className="post-header">
            <span className="category-tag tech">Tech Innovation</span>
            <span className="post-date">May 4, 2026</span>
          </div>
          <h2>Revolutionizing the Last Mile with AI Dispatching</h2>
          <div className="post-body">
            <p>
              The "Last Mile" is often the most expensive part of the journey. At ShipEase, 
              we are deploying proprietary AI algorithms that analyze thousands of data points 
              — from monsoon traffic patterns to local market unloading times.
            </p>
            <p>
              By automating the dispatch process, we reduce vehicle idle time by 40%. 
              This means drivers earn more per hour, and businesses get their goods 
              delivered faster without paying a premium.
            </p>
          </div>
        </article>

        {/* Post 2: Cost Saving Focus */}
        <article className="blog-post-card modern-card">
          <div className="post-header">
            <span className="category-tag savings">Cost Optimization</span>
            <span className="post-date">April 28, 2026</span>
          </div>
          <h2>How SMEs Can Reduce Logistics Costs by 30%</h2>
          <div className="post-body">
            <p>
              For small and medium enterprises, logistics costs can make or break a 
              fiscal quarter. The traditional method of keeping fixed fleets is 
              becoming obsolete.
            </p>
            <p>
              By switching to an on-demand marketplace like ShipEase, businesses only 
              pay for the space they use. Real-time GPS tracking eliminates the "hidden 
              cost" of manual follow-ups, allowing your team to focus on sales rather 
              than tracking trucks.
            </p>
          </div>
        </article>

        {/* Post 3: Industry News */}
        <article className="blog-post-card modern-card">
          <div className="post-header">
            <span className="category-tag safety">Safety First</span>
            <span className="post-date">April 15, 2026</span>
          </div>
          <h2>Our 100% Verified Driver Commitment</h2>
          <div className="post-body">
            <p>
              Trust is the currency of logistics. We don't just connect you with 
              drivers; we connect you with vetted partners. Every driver on our 
              platform undergoes a multi-step background check and digital 
              verification.
            </p>
            <p>
              From license validation to previous trip ratings, we ensure that your 
              cargo is in safe hands. In April 2026 alone, we crossed 50,000 
              successful safe trips across 15+ major Indian cities.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Blog;