import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mouse parallax effect state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Limit movement on mobile for performance
      if (window.innerWidth > 768) {
        setMousePos({
          x: (e.clientX / window.innerWidth) * 20,
          y: (e.clientY / window.innerHeight) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNav = (path) => {
    if (!user && path.includes("booking")) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="landing-wrapper">
      {/* Internal Styles for Mobile Responsiveness */}
      <style>{`
        .landing-wrapper {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
          background: #ffffff;
          width: 100%;
        }

        /* --- HERO SECTION --- */
        .hero-section {
          position: relative;
          z-index: 1;
          padding: 120px 0 80px 0;
          min-height: 90vh;
          display: flex;
          align-items: center;
        }

        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 50px;
          padding: 0 20px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-content {
          flex: 1;
          min-width: 300px; /* Adjusted for smaller screens */
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem); /* Responsive font size */
          font-weight: 900;
          line-height: 1.1;
          color: #0f172a;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 540px;
        }

        .btn-group {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap; /* Buttons stack on very small screens */
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 30px;
          padding-top: 30px;
          border-top: 1px solid #f1f5f9;
        }

        /* --- VISUALS --- */
        .hero-visual {
          flex: 1;
          min-width: 300px;
          position: relative;
          display: flex;
          justify-content: center;
          perspective: 1000px;
        }

        .phone-mockup {
          width: 300px;
          height: 600px;
          background: #0f172a;
          border-radius: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 8px #334155;
          padding: 12px;
          position: relative;
          transform: rotateY(-15deg) rotateX(10deg);
          transition: transform 0.5s ease;
          max-width: 90vw; /* Prevent overflow on mobile */
          height: auto;
          aspect-ratio: 1/2;
        }

        /* --- FEATURES --- */
        .features-section {
          padding: 80px 20px;
          background: #fff;
          max-width: 1200px;
          margin: 0 auto;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .feature-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border-color: #3b82f6;
        }

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 0 60px 0;
            text-align: center; /* Center align text on mobile */
          }
          
          .hero-container {
            flex-direction: column;
            gap: 40px;
          }

          .hero-content {
            width: 100%;
          }

          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
            font-size: 1rem;
          }

          .btn-group {
            justify-content: center;
          }
          
          .stats-row {
            justify-content: center;
            gap: 20px;
          }

          .hero-visual {
            width: 100%;
            transform: scale(0.9); /* Slightly smaller phone on mobile */
            margin-top: 20px;
          }
          
          .phone-mockup {
            transform: rotateY(0deg) rotateX(0deg); /* Flatten 3D effect on mobile for better view */
          }

          .blob {
            opacity: 0.3; /* Reduce distraction on mobile */
          }

          .cta-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>

      {/* Background Mesh Gradient */}
      <div style={styles.backgroundMesh}>
        <div className="blob" style={{...styles.blob, top: "-10%", left: "-10%", background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`}}></div>
        <div className="blob" style={{...styles.blob, bottom: "20%", right: "-10%", background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", transform: `translate(${mousePos.x}px, ${mousePos.y}px)`}}></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-container">
          
          {/* Left Content */}
          <div className="hero-content">
            <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
              <span style={styles.pillBadge}>✨ #1 Logistics App in India</span>
            </div>
            
            <h1 className="hero-title fade-in-up" style={{animationDelay: '0.2s'}}>
              Move Anything, <br />
              <span style={styles.gradientText}>Anywhere, Instantly.</span>
            </h1>
            
            <p className="hero-subtitle fade-in-up" style={{animationDelay: '0.3s'}}>
              Experience the future of logistics with ShipEase. Connect with verified drivers, 
              track goods in real-time, and save up to 30% on every shipment.
            </p>

            <div className="btn-group fade-in-up" style={{animationDelay: '0.4s'}}>
              <button className="primary-btn" onClick={() => handleNav("/booking/create")}>
                Book Now &rarr;
              </button>
              <button className="secondary-btn" onClick={() => navigate("/about")}>
                View Demo
              </button>
            </div>

            <div className="stats-row fade-in-up" style={{animationDelay: '0.5s'}}>
              <div style={styles.statItem}>
                <h4 style={styles.statNum}>50k+</h4>
                <span style={styles.statLabel}>Deliveries</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <h4 style={styles.statNum}>4.8/5</h4>
                <span style={styles.statLabel}>User Rating</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <h4 style={styles.statNum}>100%</h4>
                <span style={styles.statLabel}>Safe</span>
              </div>
            </div>
          </div>

          {/* Right Visual (Phone Mockup) */}
          <div className="hero-visual float-animation">
            <div className="phone-mockup">
              <div style={styles.phoneNotch}></div>
              <div style={styles.phoneScreen}>
                {/* Mockup Header */}
                <div style={{padding: '15px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{width:'20px', height:'20px', borderRadius:'50%', background:'#cbd5e1'}}></div>
                    <div style={{fontSize:'0.8rem', fontWeight:'bold', color:'#334155'}}>ShipEase</div>
                    <div style={{fontSize:'1rem'}}>☰</div>
                  </div>
                </div>
                {/* Mockup Map Area */}
                <div style={{height: '140px', background: '#e0f2fe', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{fontSize: '2rem'}}>🗺️</div>
                  <div style={{position: 'absolute', bottom: '10px', right: '10px', background: 'white', padding: '5px 10px', borderRadius: '10px', fontSize: '0.7rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                    Driver is 5 min away
                  </div>
                </div>
                {/* Mockup List */}
                <div style={{padding: '15px'}}>
                   <div style={styles.mockupItem}>
                      <div style={styles.mockupIcon}>📦</div>
                      <div>
                        <div style={{fontWeight: '600', fontSize: '0.8rem'}}>Order #2931</div>
                        <div style={{fontSize: '0.65rem', color: '#64748b'}}>In Transit • Arriving 2:00 PM</div>
                      </div>
                   </div>
                   <div style={styles.mockupItem}>
                      <div style={styles.mockupIcon}>🚚</div>
                      <div>
                        <div style={{fontWeight: '600', fontSize: '0.8rem'}}>Vehicle Matched</div>
                        <div style={{fontSize: '0.65rem', color: '#64748b'}}>Tata Ace • MH 12 AB 1234</div>
                      </div>
                   </div>
                   <button style={{width: '100%', padding: '10px', marginTop: '10px', background: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.8rem', fontWeight: '600'}}>Track Live</button>
                </div>
              </div>
            </div>
            
            {/* Floating Elements - Hidden on very small screens via CSS if needed, currently shown */}
            <div className="glass-card bounce-card" style={styles.floatCard1}>
              <span>⚡ Fast</span>
            </div>
            <div className="glass-card bounce-card" style={{...styles.floatCard2, animationDelay: '1s'}}>
              <span>🛡️ Insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="features-section">
        <div style={{textAlign: "center", marginBottom: "40px"}}>
          <h2 style={styles.sectionTitle}>Everything you need to <span style={{color: '#3b82f6'}}>grow</span></h2>
          <p style={styles.sectionSubtitle}>
            Powerful features designed to streamline your logistics operations.
          </p>
        </div>

        <div className="grid-container">
          {/* Card 1 */}
          <div className="feature-card" onClick={() => handleNav("/booking/create")}>
            <div style={{...styles.iconBox, background: '#eff6ff', color: '#3b82f6'}}>📍</div>
            <h3 style={styles.cardTitle}>Instant Booking</h3>
            <p style={styles.cardText}>
              Get a verified truck at your doorstep in minutes using our AI-powered matching system.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card" onClick={() => handleNav("/dashboard/orders")}>
            <div style={{...styles.iconBox, background: '#f0fdf4', color: '#22c55e'}}>📡</div>
            <h3 style={styles.cardTitle}>Live Tracking</h3>
            <p style={styles.cardText}>
              Monitor your goods with GPS precision. Share tracking links with your customers instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card" onClick={() => handleNav("/booking/vehicle")}>
            <div style={{...styles.iconBox, background: '#fff7ed', color: '#f97316'}}>🚛</div>
            <h3 style={styles.cardTitle}>Diverse Fleet</h3>
            <p style={styles.cardText}>
              From 2-wheelers for documents to 10-ton trucks for industrial loads, we have it all.
            </p>
          </div>
        </div>
      </section>
      
      {/* --- CALL TO ACTION --- */}
      <section style={styles.ctaSection}>
        <div className="page-container" style={styles.ctaContainer}>
            <h2 className="cta-title" style={{color: 'white', fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.2'}}>Ready to move?</h2>
            <p style={{color: '#e0e7ff', marginBottom: '30px', maxWidth: '600px', fontSize: '1.1rem'}}>Join thousands of businesses who trust ShipEase for their daily logistics.</p>
            <button style={styles.ctaButton} onClick={() => handleNav("/booking/create")}>Get Started for Free</button>
        </div>
      </section>

    </div>
  );
};

// --- STATIC STYLES (Helpers) ---
const styles = {
  backgroundMesh: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  blob: {
    position: "absolute",
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.4,
    transition: "transform 0.2s ease-out",
  },
  pillBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "30px",
    background: "rgba(59, 130, 246, 0.1)",
    color: "#2563eb",
    fontWeight: "600",
    fontSize: "0.9rem",
    marginBottom: "24px",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },
  gradientText: {
    background: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
  },
  statNum: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
    marginTop: "4px",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "#cbd5e1",
  },
  phoneScreen: {
    width: "100%",
    height: "100%",
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    position: "relative",
  },
  phoneNotch: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    height: "25px",
    background: "#0f172a",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    zIndex: 10,
  },
  mockupItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px",
    background: "white",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },
  mockupIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  floatCard1: {
    position: "absolute",
    top: "20%",
    left: "-20px",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontWeight: "bold",
    color: "#0f172a",
    border: "1px solid rgba(255,255,255,0.5)",
    zIndex: 2,
  },
  floatCard2: {
    position: "absolute",
    bottom: "20%",
    right: "-30px",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontWeight: "bold",
    color: "#0f172a",
    border: "1px solid rgba(255,255,255,0.5)",
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 4vw, 2.5rem)",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "16px",
  },
  sectionSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    maxWidth: "600px",
    margin: "0 auto",
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#0f172a",
  },
  cardText: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
  },
  ctaSection: {
    padding: "80px 20px",
    background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
    textAlign: "center",
  },
  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ctaButton: {
    padding: "16px 48px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#1e40af",
    background: "#ffffff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease",
  }
};

export default LandingPage;