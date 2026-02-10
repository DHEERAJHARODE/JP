import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import VehicleList from "../../components/features/VehicleList";
import { VEHICLES } from "../../utils/constants";
import { useMaps } from "../../hooks/useMaps"; 

const SelectVehicle = () => {
  // 1. Get setDistance from context to save the result globally
  const { vehicle, setVehicle, pickup, drop, setDistance: setGlobalDistance } = useBookingContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // 2. Use the hook to calculate actual road distance
  const { calculateDistance, distance, loading } = useMaps();

  useEffect(() => {
    // Calculate distance when page loads
    if (pickup && drop) {
      calculateDistance(pickup, drop).then((calculatedDist) => {
        // 3. Save the calculated distance to the Global Context
        if (calculatedDist) {
          setGlobalDistance(calculatedDist);
        }
      });
    }
  }, [pickup, drop]); 

  const handleNext = () => {
    if (!vehicle) {
      setError("Please select a vehicle type to proceed.");
      return;
    }
    navigate("/booking/summary");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* --- PROGRESS HEADER --- */}
        <div style={styles.headerSection}>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBarFill}></div>
          </div>
          <div style={styles.stepIndicator}>
            <span style={styles.stepText}>Step 2 of 3</span>
            <h2 style={styles.pageTitle}>Choose your Vehicle</h2>
          </div>
        </div>

        <div style={styles.contentGrid}>
          {/* --- LEFT COLUMN: VEHICLE LIST --- */}
          <div style={styles.leftColumn}>
            
            {/* Header with Distance Info */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
              <p style={styles.helperText}>
                Choose a vehicle that fits your load size & dimensions.
              </p>
              {loading ? (
                <span style={{color: '#2563eb', fontSize: '0.9rem'}}>🔄 Calculating route...</span>
              ) : distance > 0 ? (
                <span style={{color: '#059669', fontWeight: '600', fontSize: '0.9rem'}}>
                  🛣️ Distance: {distance} km
                </span>
              ) : null}
            </div>
            
            {/* The Vehicle List Component */}
            {/* Note: Removed the white 'listWrapper' box to let cards float on the background */}
            <div style={styles.listWrapper}>
              <VehicleList
                vehicles={VEHICLES}
                selectedVehicle={vehicle} 
                distance={distance} // Pass distance for dynamic pricing
                onSelect={(v) => {
                  setVehicle(v);
                  setError(null);
                }}
              />
            </div>

            {error && <div style={styles.errorBox}>⚠️ {error}</div>}
          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div style={styles.rightColumn}>
             <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Estimated Fare</h3>
                {vehicle && distance > 0 ? (
                  <div style={{marginBottom: '20px'}}>
                     <div style={{fontSize: '2rem', fontWeight: '800', color: '#0f172a'}}>
                       ₹{Math.round(distance * vehicle.pricePerKm)}
                     </div>
                     <p style={{color: '#64748b', fontSize: '0.9rem'}}>
                       for {vehicle.name} ({distance} km)
                     </p>
                  </div>
                ) : (
                   <p style={{color: '#94a3b8', marginBottom: '20px'}}>
                     Select a vehicle to see the total estimated fare.
                   </p>
                )}
                <div style={styles.divider}></div>
                <h3 style={styles.infoTitle}>Why ShipEase?</h3>
                <ul style={styles.benefitList}>
                  <li style={styles.benefitItem}>✓ Transparent Pricing</li>
                  <li style={styles.benefitItem}>✓ Real-time tracking</li>
                  <li style={styles.benefitItem}>✓ Verified drivers</li>
                </ul>
             </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div style={styles.footerBar}>
          <button style={styles.backBtn} onClick={handleBack}>&larr; Back</button>
          <div style={{flex: 1}}></div>
          <button style={styles.nextBtn} onClick={handleNext}>Proceed to Summary &rarr;</button>
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageBackground: { minHeight: "100vh", background: "#f8fafc", padding: "40px 20px 100px 20px", fontFamily: "'Inter', sans-serif" },
  mainContainer: { maxWidth: "1000px", margin: "0 auto" },
  headerSection: { marginBottom: "40px" },
  progressBarContainer: { width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "3px", marginBottom: "20px", overflow: "hidden" },
  progressBarFill: { width: "66%", height: "100%", background: "linear-gradient(90deg, #2563eb, #60a5fa)", borderRadius: "3px", transition: "width 0.3s ease" },
  stepIndicator: { display: "flex", flexDirection: "column", gap: "8px" },
  stepText: { textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "1px", fontWeight: "600", color: "#64748b" },
  pageTitle: { fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 300px", gap: "40px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  rightColumn: { display: "block" },
  helperText: { fontSize: "1rem", color: "#64748b" },
  
  // Updated List Wrapper to be transparent
  listWrapper: { 
    marginTop: "10px",
    overflow: "visible" 
  },
  
  errorBox: { padding: "16px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", color: "#ef4444", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" },
  infoCard: { background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", position: "sticky", top: "20px" },
  infoTitle: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a" },
  benefitList: { listStyle: "none", padding: 0, margin: 0 },
  benefitItem: { fontSize: "0.9rem", color: "#475569", marginBottom: "10px" },
  divider: { height: "1px", background: "#f1f5f9", margin: "20px 0" },
  footerBar: { position: "fixed", bottom: 0, left: 0, width: "100%", background: "white", padding: "20px 40px", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", zIndex: 100, borderTop: "1px solid #e2e8f0" },
  nextBtn: { padding: "14px 32px", background: "#2563eb", color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)" },
  backBtn: { padding: "14px 24px", background: "transparent", color: "#64748b", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }
};

export default SelectVehicle;