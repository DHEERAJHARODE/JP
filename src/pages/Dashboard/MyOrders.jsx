import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../services/bookingService";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { VEHICLES } from "../../utils/constants"; // 1. VEHICLES Import करें
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

  // Helper to get vehicle image
  const getVehicleImage = (vehicleName) => {
    const vehicle = VEHICLES.find((v) => v.name === vehicleName);
    return vehicle ? vehicle.image : null;
  };

  // Helper for status color
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed': // ✅ Confirmed के लिए Green कलर
        return { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
        
      case 'completed': 
        return { background: '#f0f9ff', color: '#0369a1' };
        
      case 'cancelled': 
        return { background: '#fee2e2', color: '#991b1b' };
        
      default: // pending या अन्य के लिए Blue
        return { background: '#eff6ff', color: '#1e40af' }; 
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{fontSize: '1.8rem', fontWeight: '800', color: '#0f172a'}}>Order History</h2>
        <span style={{ background: "white", padding: "8px 16px", borderRadius: "50px", color: "#64748b", fontWeight: "600", boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          {bookings.length} Orders
        </span>
      </div>

      {loading ? (
        <p>Loading your trips...</p>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "white", borderRadius: "24px", border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
          <h3 style={{fontSize: '1.5rem', marginBottom: '10px'}}>No bookings yet</h3>
          <p style={{ color: "#64748b" }}>Book a truck to see your history here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {bookings.map((b) => {
            // Safe name extraction
            const vehicleName = typeof b.vehicle === 'object' ? b.vehicle.name : b.vehicle;
            const imageSrc = getVehicleImage(vehicleName);

            return (
              <div key={b.id} style={styles.card}>
                
                {/* --- Left: Image Section (Full Cover) --- */}
                <div style={styles.imageSection}>
                  {imageSrc ? (
                    <img src={imageSrc} alt={vehicleName} style={styles.vehicleImage} />
                  ) : (
                    <span style={{fontSize: '3.5rem'}}>🚚</span>
                  )}
                </div>

                {/* --- Right: Content Section --- */}
                <div style={styles.contentSection}>
                  
                  {/* Header: Name & Price */}
                  <div style={styles.headerRow}>
                    <div>
                      <h3 style={styles.vehicleTitle}>{vehicleName}</h3>
                      <span style={styles.dateText}>
                        {formatDate(b.createdAt)} • ID: #{b.id.slice(0, 6)}
                      </span>
                    </div>
                    <div style={styles.priceTag}>
                      {formatCurrency(b.price)}
                    </div>
                  </div>

                  <div style={styles.divider}></div>

                  {/* Route Visual */}
                  <div style={styles.routeContainer}>
                    <div style={styles.locationRow}>
                      <div style={styles.dotGreen}></div>
                      <div style={styles.locationText}>
                        <span style={styles.label}>Pickup</span>
                        {b.pickup}
                      </div>
                    </div>
                    {/* Connecting Line */}
                    <div style={styles.line}></div>
                    <div style={styles.locationRow}>
                      <div style={styles.dotRed}></div>
                      <div style={styles.locationText}>
                        <span style={styles.label}>Drop</span>
                        {b.drop}
                      </div>
                    </div>
                  </div>

                  <div style={styles.divider}></div>

                  {/* Footer: Status */}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                     <span style={{...styles.statusBadge, ...getStatusStyle(b.status)}}>
                       {b.status || 'Pending'}
                     </span>
                     {/* You can add a 'View Details' button here if needed */}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- Updated Styles (Premium Look) ---
const styles = {
  card: {
    display: "flex",
    flexDirection: "row", // Desktop: Side-by-side
    flexWrap: "wrap",     // Mobile: Stacked
    background: "white",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s",
  },
  
  // Image Section (Same as VehicleList)
  imageSection: {
    flex: "1 1 200px", // Min width 200px
    minHeight: "180px", // Fixed height for consistency
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0, 
    position: "relative",
  },
  vehicleImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Full cover, no whitespace
    display: "block"
  },

  contentSection: {
    flex: "2 1 300px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
    gap: "10px"
  },
  vehicleTitle: {
    margin: "0 0 4px 0",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#0f172a",
  },
  dateText: {
    fontSize: "0.85rem",
    color: "#64748b",
  },
  priceTag: {
    fontSize: "1.2rem",
    fontWeight: "800",
    color: "#2563eb",
    background: "#eff6ff",
    padding: "6px 12px",
    borderRadius: "10px",
    whiteSpace: "nowrap"
  },

  divider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "16px 0",
  },

  // Route Styles
  routeContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingLeft: "8px",
  },
  locationRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    position: "relative",
    zIndex: 2,
  },
  locationText: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.95rem",
    color: "#334155",
    fontWeight: "500",
    lineHeight: "1.4"
  },
  label: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    color: "#94a3b8",
    fontWeight: "600",
    marginBottom: "2px",
  },
  line: {
    position: "absolute",
    left: "6px", // Center of the dots
    top: "8px",
    bottom: "8px",
    width: "2px",
    background: "#e2e8f0",
    zIndex: 1,
  },
  dotGreen: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#22c55e",
    border: "2px solid white",
    boxShadow: "0 0 0 2px #dcfce7",
    marginTop: "4px",
    flexShrink: 0,
  },
  dotRed: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#ef4444",
    border: "2px solid white",
    boxShadow: "0 0 0 2px #fee2e2",
    marginTop: "4px",
    flexShrink: 0,
  },

  statusBadge: {
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    textTransform: "capitalize",
    display: "inline-block"
  }
};

export default MyOrders;