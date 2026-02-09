import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import Input from "../../components/common/Input";
import MapView from "../../components/features/MapView"; // Import MapView

const CreateBooking = () => {
  const { pickup, drop, setPickup, setDrop } = useBookingContext();
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Coordinates State (Map dikhane ke liye)
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const navigate = useNavigate();

  // Helper: Address text se Coordinates nikalna (Nominatim API)
  const geocodeAddress = async (address, type) => {
    if (!address) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        if (type === 'pickup') setPickupCoords(coords);
        if (type === 'drop') setDropCoords(coords);
      }
    } catch (err) {
      console.error("Geocoding failed", err);
    }
  };

  // 1. Current Location Button Logic
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];
        
        // Map par update karein
        setPickupCoords(coords); 

        // Address fetch karein
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setPickup(data.display_name);
            setError(null);
          }
        } catch (err) {
          setError("Address fetch failed.");
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setError("Location access denied.");
        setLocationLoading(false);
      }
    );
  };

  // 2. Manual Input Blur Logic (Jab user type karke bahar click kare)
  const handleBlur = (type) => {
    if (type === 'pickup') geocodeAddress(pickup, 'pickup');
    if (type === 'drop') geocodeAddress(drop, 'drop');
  };

  const handleNext = () => {
    if (!pickup || !drop) {
      setError("Please enter both pickup and drop locations.");
      return;
    }
    setError(null);
    navigate("/booking/vehicle");
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
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
              
              <div style={styles.inputGroup}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={styles.iconLabel}>📍 Pickup Location</div>
                  <button onClick={handleCurrentLocation} style={styles.locateBtn} disabled={locationLoading}>
                    {locationLoading ? "Locating..." : "🎯 Use Current Location"}
                  </button>
                </div>
                <Input
                  placeholder="e.g. 123, Main Street, Mumbai"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onBlur={() => handleBlur('pickup')} // Type karne ke baad map update hoga
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
                  onBlur={() => handleBlur('drop')} // Type karne ke baad map update hoga
                  style={styles.inputField}
                />
              </div>
            </div>

            {error && <div style={styles.errorBox}>⚠️ {error}</div>}
          </div>

          {/* --- RIGHT COLUMN: MAP VIEW --- */}
          <div style={styles.rightColumn}>
             {/* Map Container - Ab yahan actual Map dikhega */}
             <div style={styles.mapContainer}>
                <MapView pickupCoords={pickupCoords} dropCoords={dropCoords} />
             </div>
             
             <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Quick Tips</h3>
                <ul style={styles.benefitList}>
                  <li style={styles.benefitItem}>• Type address & click outside to update map</li>
                  <li style={styles.benefitItem}>• Use 'Current Location' for accuracy</li>
                </ul>
             </div>
          </div>
        </div>

        <div style={styles.footerBar}>
          <button style={styles.backBtn} onClick={() => navigate("/")}>Cancel</button>
          <div style={{flex: 1}}></div>
          <button style={styles.nextBtn} onClick={handleNext}>Find Vehicles &rarr;</button>
        </div>

      </div>
    </div>
  );
};

// CSS Update: mapPlaceholder ko mapContainer se replace karein
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
  
  // Updated Map Container Style
  mapContainer: { 
    height: "300px", // Fixed height for map
    background: "#e2e8f0", 
    borderRadius: "16px", 
    overflow: "hidden", 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  
  infoCard: { background: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" },
  infoTitle: { fontSize: "1rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a" },
  benefitList: { listStyle: "none", padding: 0, margin: 0, color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" },
  footerBar: { position: "fixed", bottom: 0, left: 0, width: "100%", background: "white", padding: "20px 40px", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", zIndex: 100, borderTop: "1px solid #e2e8f0" },
  nextBtn: { padding: "14px 32px", background: "#2563eb", color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)" },
  backBtn: { padding: "14px 24px", background: "transparent", color: "#64748b", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
  locateBtn: { background: "none", border: "none", color: "#2563eb", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", padding: "4px 8px", borderRadius: "4px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }
};

export default CreateBooking;