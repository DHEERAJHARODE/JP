import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../hooks/useAuth";
import { formatCurrency } from "../../utils/helpers";

const BookingSummary = () => {
  const { pickup, drop, vehicle, distance, resetBooking } = useBookingContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const finalPrice = (vehicle && distance) ? Math.round(distance * vehicle.pricePerKm) : 0;

  const handleConfirm = async () => {
    if (!pickup || !drop || !vehicle) {
      alert("Missing booking details!");
      return;
    }

    const bookingData = {
      userId: user?.uid || "guest",
      pickup,
      drop,
      vehicle: vehicle.name,
      distance,
      price: finalPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    try {
      const { id, error } = await createBooking(bookingData);
      if (error) {
        alert("Error creating booking: " + error);
      } else {
        alert("Booking Confirmed! ID: " + id);
        resetBooking();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* --- HEADER --- */}
        <div style={styles.headerSection}>
           <div style={styles.progressBarContainer}>
             <div style={styles.progressBarFill}></div>
           </div>
           <div style={styles.stepIndicator}>
             <span style={styles.stepText}>Step 3 of 3</span>
             <h2 style={styles.pageTitle}>Review & Confirm</h2>
           </div>
        </div>

        <div style={styles.contentGrid}>
          {/* --- LEFT COLUMN --- */}
          <div style={styles.leftColumn}>
            
            {/* Location Card */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📍 Route Details</h3>
              <div style={styles.row}>
                 <span style={styles.label}>Pickup</span>
                 <span style={styles.value}>{pickup}</span>
              </div>
              <div style={styles.connector}></div>
              <div style={styles.row}>
                 <span style={styles.label}>Drop</span>
                 <span style={styles.value}>{drop}</span>
              </div>
              <div style={{...styles.row, marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #e2e8f0'}}>
                 <span style={styles.label}>Total Distance</span>
                 <span style={styles.highlightValue}>{distance} km</span>
              </div>
            </div>

            {/* Vehicle Card (Updated Image Style) */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🚚 Vehicle Details</h3>
              {vehicle ? (
                <>
                  {/* --- Full Width Image Section --- */}
                  <div style={styles.vehicleImageContainer}>
                    {vehicle.image ? (
                        <img 
                            src={vehicle.image} 
                            alt={vehicle.name} 
                            style={styles.vehicleImage}
                        />
                    ) : (
                        <span style={{ fontSize: '3rem' }}>🚚</span>
                    )}
                  </div>
                  {/* ------------------------------- */}

                  <div style={styles.row}>
                    <span style={styles.label}>Type</span>
                    <span style={styles.value}>{vehicle.name}</span>
                  </div>
                  <div style={styles.row}>
                    <span style={styles.label}>Capacity</span>
                    <span style={styles.value}>{vehicle.capacity}</span>
                  </div>
                  <div style={styles.row}>
                    <span style={styles.label}>Size</span>
                    <span style={styles.value}>{vehicle.size}</span>
                  </div>
                  <div style={styles.row}>
                    <span style={styles.label}>Rate</span>
                    <span style={styles.value}>₹{vehicle.pricePerKm} / km</span>
                  </div>
                </>
              ) : (
                <p style={{color: '#ef4444'}}>No vehicle selected</p>
              )}
            </div>

          </div>

          {/* --- RIGHT COLUMN --- */}
          <div style={styles.rightColumn}>
            <div style={styles.priceCard}>
              <h3 style={styles.cardTitle}>Payment Summary</h3>
              
              <div style={styles.priceRow}>
                <span>Base Fare (Est.)</span>
                <span>{formatCurrency ? formatCurrency(finalPrice) : `₹${finalPrice}`}</span>
              </div>
              <div style={styles.priceRow}>
                <span>Taxes & Fees</span>
                <span>₹0</span>
              </div>
              
              <div style={styles.divider}></div>
              
              <div style={styles.totalRow}>
                <span>Total</span>
                <span>{formatCurrency ? formatCurrency(finalPrice) : `₹${finalPrice}`}</span>
              </div>

              <div style={{marginTop: '20px', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5'}}>
                * Payment will be collected at the time of pickup or drop. 
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div style={styles.footerBar}>
           <button style={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
           <div style={{flex: 1}}></div>
           <button style={styles.confirmBtn} onClick={handleConfirm}>
             Confirm Booking &rarr;
           </button>
        </div>

      </div>
    </div>
  );
};

// --- Styles ---
const styles = {
  pageBackground: { minHeight: "100vh", background: "#f8fafc", padding: "40px 20px 100px 20px", fontFamily: "'Inter', sans-serif" },
  mainContainer: { maxWidth: "1000px", margin: "0 auto" },
  
  headerSection: { marginBottom: "40px" },
  progressBarContainer: { width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "3px", marginBottom: "20px", overflow: "hidden" },
  progressBarFill: { width: "100%", height: "100%", background: "#22c55e", borderRadius: "3px" }, 
  stepIndicator: { display: "flex", flexDirection: "column", gap: "8px" },
  stepText: { textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "1px", fontWeight: "600", color: "#64748b" },
  pageTitle: { fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 },

  contentGrid: { display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  rightColumn: { display: "block" },

  card: { background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" },
  cardTitle: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "16px", color: "#0f172a" },

  // --- NEW IMAGE STYLES (Matching VehicleList) ---
  vehicleImageContainer: {
    width: '100%',
    height: '220px', // फिक्स्ड हाइट ताकि सब एक जैसे दिखें
    background: '#f1f5f9',
    borderRadius: '16px', // बॉर्डर रेडियस
    overflow: 'hidden', // इमेज बाहर न निकले
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    border: '1px solid #e2e8f0',
    padding: 0 // ✅ नो पैडिंग
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // ✅ फुल साइज (नो मार्जिन)
    display: 'block'
  },
  // -----------------------------------------------
  
  row: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
  label: { color: "#64748b", fontWeight: "500" },
  value: { color: "#334155", fontWeight: "600", textAlign: "right", maxWidth: "60%" },
  highlightValue: { color: "#2563eb", fontWeight: "700" },
  connector: { width: "2px", height: "15px", background: "#e2e8f0", margin: "-5px 0 8px 5px" },

  priceCard: { background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", position: "sticky", top: "20px" },
  priceRow: { display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#64748b", fontSize: "0.95rem" },
  divider: { height: "1px", background: "#e2e8f0", margin: "15px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" },

  footerBar: { position: "fixed", bottom: 0, left: 0, width: "100%", background: "white", padding: "20px 40px", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", zIndex: 100, borderTop: "1px solid #e2e8f0" },
  confirmBtn: { padding: "14px 32px", background: "#16a34a", color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(22, 163, 74, 0.2)" },
  backBtn: { padding: "14px 24px", background: "transparent", color: "#64748b", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
};

export default BookingSummary;