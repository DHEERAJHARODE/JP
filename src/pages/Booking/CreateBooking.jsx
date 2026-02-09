import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import Input from "../../components/common/Input"; 

const CreateBooking = () => {
  const { pickup, drop, setPickup, setDrop } = useBookingContext();
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false); // New State
  const navigate = useNavigate();

  // --- NEW FEATURE: Auto Detect Location ---
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Coordinates se Address nikalna (Reverse Geocoding)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setPickup(data.display_name); // Pickup field me address set karein
            setError(null);
          } else {
            setError("Address not found via location.");
          }
        } catch (err) {
          setError("Failed to fetch address details.");
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location. Please allow access.");
        setLocationLoading(false);
      }
    );
  };

  const handleNext = () => {
    if (!pickup || !drop) {
      setError("Please enter both pickup and drop locations.");
      return;
    }
    setError(null);
    navigate("/booking/vehicle"); // Is step par 'calculateDistance' call hoga VehicleList page par
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        {/* Header Section same as before... */}
        <div style={styles.headerSection}>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBarFill}></div>
          </div>
          <div style={styles.stepIndicator}>
            <span style={styles.stepText}>Step 1 of 3</span>
            <h2 style={styles.pageTitle}>Where are we moving?</h2>
          </div>
        </div>

        <div style={styles.contentGrid}>
          {/* --- LEFT COLUMN --- */}
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              
              {/* Pickup Input with Location Button */}
              <div style={styles.inputGroup}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={styles.iconLabel}>📍 Pickup Location</div>
                  
                  {/* LOCATE ME BUTTON */}
                  <button 
                    onClick={handleCurrentLocation}
                    style={styles.locateBtn}
                    disabled={locationLoading}
                  >
                    {locationLoading ? "Locating..." : "🎯 Use Current Location"}
                  </button>
                </div>
                
                <Input
                  placeholder="e.g. 123, Main Street, Mumbai"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  style={styles.inputField} 
                />
              </div>

              <div style={styles.connectorLine}></div>

              <div style={styles.inputGroup}>
                <div style={styles.iconLabel}>🏁 Drop Location</div>
                <Input
                  placeholder="e.g. 456, Tech Park, Pune"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  style={styles.inputField}
                />
              </div>
            </div>

            {error && (
              <div style={styles.errorBox}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Right Column same as before... */}
          <div style={styles.rightColumn}>
             <div style={styles.mapPlaceholder}>
                <div style={{fontSize: '3rem', marginBottom: '10px'}}>🗺️</div>
                <p style={{color: '#64748b', textAlign: 'center'}}>
                  Estimated route will be calculated<br/>based on road traffic.
                </p>
             </div>
             {/* ... */}
          </div>
        </div>

        <div style={styles.footerBar}>
          <button style={styles.backBtn} onClick={() => navigate("/")}>Cancel</button>
          <div style={{flex: 1}}></div>
          <button style={styles.nextBtn} onClick={handleNext}>
            Find Vehicles &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

// Styles update karein
const styles = {
  // ... (purane styles same rakhein)
  pageBackground: { minHeight: "100vh", background: "#f8fafc", padding: "40px 20px 100px 20px", fontFamily: "'Inter', sans-serif" },
  mainContainer: { maxWidth: "1000px", margin: "0 auto" },
  headerSection: { marginBottom: "40px" },
  progressBarContainer: { width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "3px", marginBottom: "20px", overflow: "hidden" },
  progressBarFill: { width: "33%", height: "100%", background: "linear-gradient(90deg, #2563eb, #60a5fa)", borderRadius: "3px", transition: "width 0.3s ease" },
  stepIndicator: { display: "flex", flexDirection: "column", gap: "8px" },
  stepText: { textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "1px", fontWeight: "600", color: "#64748b" },
  pageTitle: { fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 },
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  rightColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  card: { background: "white", padding: "30px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" },
  inputGroup: { marginBottom: "10px" },
  iconLabel: { fontSize: "0.9rem", fontWeight: "600", color: "#334155", marginBottom: "8px" },
  connectorLine: { width: "2px", height: "30px", background: "#e2e8f0", marginLeft: "10px", margin: "5px 0" },
  errorBox: { padding: "16px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", color: "#ef4444", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" },
  mapPlaceholder: { height: "250px", background: "#e0f2fe", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #bae6fd" },
  footerBar: { position: "fixed", bottom: 0, left: 0, width: "100%", background: "white", padding: "20px 40px", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", zIndex: 100, borderTop: "1px solid #e2e8f0" },
  nextBtn: { padding: "14px 32px", background: "#2563eb", color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)" },
  backBtn: { padding: "14px 24px", background: "transparent", color: "#64748b", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
  
  // New Style for Locate Button
  locateBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  }
};

export default CreateBooking;