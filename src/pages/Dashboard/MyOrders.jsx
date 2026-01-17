import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../services/bookingService";
import { formatCurrency, formatDate } from "../../utils/helpers";
import "../../App.css";

const MyOrders = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { bookings, error } = await getUserBookings(user.uid);
      if (!error) setBookings(bookings);
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2>Order History</h2>
        <span style={{ background: "#eff6ff", padding: "6px 12px", borderRadius: "8px", color: "var(--primary)", fontWeight: "600" }}>
          {bookings.length} Orders
        </span>
      </div>

      {loading ? (
        <p>Loading your trips...</p>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "white", borderRadius: "16px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📦</div>
          <h3>No bookings yet</h3>
          <p style={{ color: "var(--text-muted)" }}>Book a truck to see your history here.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {bookings.map((b) => (
            <div key={b.id} className="glass-card" style={styles.orderCard}>
              
              {/* Order Header: ID & Date */}
              <div style={styles.cardHeader}>
                <span style={{ fontWeight: "700", color: "var(--text-main)" }}>#{b.id.slice(0, 8)}</span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{formatDate(b.createdAt)}</span>
              </div>

              {/* Route Visual */}
              <div style={styles.routeContainer}>
                <div style={styles.location}>
                  <span style={styles.dotGreen}></span>
                  <div>
                    <div style={styles.label}>Pickup</div>
                    <div>{b.pickup}</div>
                  </div>
                </div>
                <div style={styles.line}></div>
                <div style={styles.location}>
                  <span style={styles.dotRed}></span>
                  <div>
                    <div style={styles.label}>Drop</div>
                    <div>{b.drop}</div>
                  </div>
                </div>
              </div>

              {/* Footer: Vehicle & Price */}
              <div style={styles.cardFooter}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>🚚</span>
                  <span style={{ fontWeight: "500" }}>{b.vehicle.name}</span>
                </div>
                <div style={styles.priceTag}>
                  {formatCurrency(b.price)}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  orderCard: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "12px",
  },
  routeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "relative",
    paddingLeft: "8px",
  },
  location: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    fontWeight: "600",
    marginBottom: "2px",
  },
  dotGreen: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    marginTop: "4px",
    flexShrink: 0,
  },
  dotRed: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#ef4444",
    marginTop: "4px",
    flexShrink: 0,
  },
  line: {
    position: "absolute",
    left: "13px",
    top: "14px",
    bottom: "34px",
    width: "2px",
    background: "#e2e8f0",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #f1f5f9",
  },
  priceTag: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "var(--primary)",
  }
};

export default MyOrders;