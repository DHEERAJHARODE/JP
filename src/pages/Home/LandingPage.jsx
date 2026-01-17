import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNav = (path) => {
    if (!user && path.includes("booking")) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      
      {/* --- HERO SECTION --- */}
      <section style={styles.heroWrapper}>
        {/* Background blobs for modern look */}
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>

        <div className="page-container" style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>🚀 #1 Logistics Platform in India</div>
            <h1 style={styles.heroTitle}>
              Move anything, <br />
              <span className="gradient-text">Anywhere, Anytime.</span>
            </h1>
            <p style={styles.heroText}>
              Experience seamless logistics with ShipEase. Instant booking, 
              real-time tracking, and reliable drivers at your fingertips.
            </p>
            
            <div style={styles.heroButtons}>
              <button className="btn btn-primary" onClick={() => handleNav("/booking/create")}>
                Book a Truck →
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/about")}>
                How it works
              </button>
            </div>

            <div style={styles.statsRow}>
              <div>
                <strong style={styles.statNumber}>50k+</strong>
                <div style={styles.statLabel}>Happy Customers</div>
              </div>
              <div style={styles.statDivider}></div>
              <div>
                <strong style={styles.statNumber}>4.8/5</strong>
                <div style={styles.statLabel}>App Rating</div>
              </div>
            </div>
          </div>

          {/* Visual Side (Abstract Representation) */}
          <div style={styles.heroVisual}>
             <div className="glass-card" style={styles.floatCard1}>
               <div style={{fontSize: '2rem'}}>🚚</div>
               <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>On the way</div>
               <div style={{fontSize: '0.8rem', color: '#64748b'}}>Arriving in 10 mins</div>
             </div>
             <div className="glass-card" style={styles.floatCard2}>
               <div style={{fontSize: '2rem'}}>📦</div>
               <div style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Package Safe</div>
               <div style={{fontSize: '0.8rem', color: '#64748b'}}>Insured up to ₹10k</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID (Bento Style) --- */}
      <section className="page-container" style={{ paddingBottom: "100px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px", fontSize: "2rem" }}>
          Everything you need
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "40px" }}>
          Powerful features to manage your logistics efficiently.
        </p>

        <div className="bento-grid">
          {/* Card 1 */}
          <div className="glass-card" onClick={() => handleNav("/booking/create")} style={{cursor: 'pointer'}}>
            <div style={styles.iconBox}>📍</div>
            <h3>Instant Booking</h3>
            <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>
              Get a truck at your doorstep in minutes. No waiting, no haggling.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card" onClick={() => handleNav("/dashboard/orders")} style={{cursor: 'pointer'}}>
            <div style={styles.iconBox}>📡</div>
            <h3>Live Tracking</h3>
            <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>
              Watch your goods move in real-time on our interactive map.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card" onClick={() => handleNav("/booking/vehicle")} style={{cursor: 'pointer'}}>
            <div style={styles.iconBox}>🚛</div>
            <h3>Diverse Fleet</h3>
            <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>
              From 2-wheelers to 10-ton trucks, choose what fits your load.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

const styles = {
  heroWrapper: {
    position: "relative",
    padding: "80px 0",
    overflow: "hidden",
  },
  heroContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "60px",
    position: "relative",
    zIndex: 2,
    flexWrap: "wrap",
  },
  heroContent: {
    flex: 1,
    minWidth: "300px",
  },
  heroVisual: {
    flex: 1,
    minWidth: "300px",
    height: "400px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blob1: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
    zIndex: 1,
  },
  blob2: {
    position: "absolute",
    bottom: "10%",
    left: "-10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
    zIndex: 1,
  },
  badge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "50px",
    background: "#eff6ff",
    color: "var(--primary)",
    fontWeight: "600",
    fontSize: "0.85rem",
    marginBottom: "24px",
    border: "1px solid #dbeafe",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "800",
    marginBottom: "24px",
    lineHeight: "1.1",
    color: "#0f172a",
  },
  heroText: {
    fontSize: "1.125rem",
    color: "#475569",
    marginBottom: "40px",
    maxWidth: "500px",
  },
  heroButtons: {
    display: "flex",
    gap: "16px",
    marginBottom: "48px",
    flexWrap: "wrap",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  statNumber: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0f172a",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#64748b",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "#e2e8f0",
  },
  // Floating Card Styles for visual interest
  floatCard1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    zIndex: 2,
    width: "200px",
  },
  floatCard2: {
    position: "absolute",
    bottom: "20%",
    right: "10%",
    zIndex: 3,
    width: "220px",
  },
  iconBox: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.75rem",
    marginBottom: "24px",
  }
};

export default LandingPage;