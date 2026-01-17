import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../services/bookingService";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, spent: 0, active: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { bookings } = await getUserBookings(user.uid);
      if (bookings) {
        const spent = bookings.reduce((acc, curr) => acc + (curr.price || 0), 0);
        setStats({
          total: bookings.length,
          spent: spent,
          active: bookings.length > 0 ? 1 : 0, // Mock logic for active
        });
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="page-container">
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.8rem" }}>Dashboard Overview</h2>
        <p style={{ color: "var(--text-muted)" }}>Welcome back, {user.email?.split('@')[0]}</p>
      </div>

      {/* --- STATS WIDGETS --- */}
      <div className="bento-grid" style={{ marginTop: "0", marginBottom: "40px" }}>
        
        {/* Widget 1: Total Bookings */}
        <div className="glass-card" style={styles.widget}>
          <div style={styles.iconBlue}>📦</div>
          <div>
            <div style={styles.widgetLabel}>Total Bookings</div>
            <div style={styles.widgetValue}>{stats.total}</div>
          </div>
        </div>

        {/* Widget 2: Total Spent */}
        <div className="glass-card" style={styles.widget}>
          <div style={styles.iconGreen}>₹</div>
          <div>
            <div style={styles.widgetLabel}>Total Spent</div>
            <div style={styles.widgetValue}>₹{stats.spent.toLocaleString()}</div>
          </div>
        </div>

        {/* Widget 3: Quick Action */}
        <div 
          className="glass-card" 
          style={{ ...styles.widget, cursor: "pointer", border: "1px solid var(--primary)" }}
          onClick={() => navigate("/booking/create")}
        >
          <div style={styles.iconOrange}>+</div>
          <div>
            <div style={styles.widgetLabel}>New Request</div>
            <div style={{ ...styles.widgetValue, fontSize: "1.2rem", color: "var(--primary)" }}>
              Book Now
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h3>Recent Activity</h3>
          <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }} onClick={() => navigate("/dashboard/orders")}>
            View All
          </button>
        </div>
        <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
          Check your "My Orders" tab for detailed shipment tracking.
        </p>
      </div>

    </div>
  );
};

const styles = {
  widget: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "24px",
  },
  widgetLabel: {
    fontSize: "0.9rem",
    color: "var(--text-muted)",
    marginBottom: "4px",
  },
  widgetValue: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "var(--text-main)",
  },
  iconBlue: {
    width: "50px", height: "50px", borderRadius: "12px", background: "#eff6ff", color: "#2563eb",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"
  },
  iconGreen: {
    width: "50px", height: "50px", borderRadius: "12px", background: "#f0fdf4", color: "#16a34a",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"
  },
  iconOrange: {
    width: "50px", height: "50px", borderRadius: "12px", background: "#fff7ed", color: "#ea580c",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"
  }
};

export default Dashboard;