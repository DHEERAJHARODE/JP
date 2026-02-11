import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import Input from "../../components/common/Input";
import MapView from "../../components/features/MapView"; 
import "./CreateBooking.css"; // CSS Import कर ली गई है

const CreateBooking = () => {
  const { pickup, drop, setPickup, setDrop } = useBookingContext();
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Coordinates State
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const navigate = useNavigate();

  // Helper: Address text se Coordinates nikalna
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
        
        setPickupCoords(coords); 

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
    <div className="booking-page">
      <div className="main-container">
        
        {/* --- Header --- */}
        <div className="header-section">
          <div className="progress-bar-container">
            <div className="progress-fill" style={{ width: "33%" }}></div>
          </div>
          <div className="step-indicator">
            <span className="step-text">Step 1 of 3</span>
            <h2 className="page-title">Where are we moving?</h2>
          </div>
        </div>

        {/* --- Content Grid (Responsive) --- */}
        <div className="content-grid">
          {/* --- LEFT COLUMN --- */}
          <div className="left-column">
            <div className="booking-card">
              
              <div className="input-group">
                <div className="input-header">
                  <div className="icon-label">📍 Pickup Location</div>
                  <button onClick={handleCurrentLocation} className="locate-btn" disabled={locationLoading}>
                    {locationLoading ? "Locating..." : "🎯 Use Current Location"}
                  </button>
                </div>
                <Input
                  placeholder="e.g. 123, Main Street, Mumbai"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onBlur={() => handleBlur('pickup')} 
                />
              </div>

              {/* Connecting Line Design */}
              <div className="connector-line"></div>

              <div className="input-group">
                <div className="input-header">
                   <div className="icon-label">🏁 Drop Location</div>
                </div>
                <Input
                  placeholder="e.g. 456, Tech Park, Pune"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  onBlur={() => handleBlur('drop')} 
                />
              </div>
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}
          </div>

          {/* --- RIGHT COLUMN: MAP VIEW --- */}
          <div className="right-column">
             <div className="map-wrapper">
                <MapView pickupCoords={pickupCoords} dropCoords={dropCoords} />
             </div>
             
             <div className="info-card">
                <h3 className="info-title">Quick Tips</h3>
                <ul className="benefit-list">
                  <li>• Type address & click outside to update map</li>
                  <li>• Use 'Current Location' for accuracy</li>
                </ul>
             </div>
          </div>
        </div>

        {/* --- Fixed Footer --- */}
        <div className="footer-bar">
          <button className="btn-secondary" onClick={() => navigate("/")}>Cancel</button>
          <button className="btn-primary" onClick={handleNext}>Find Vehicles &rarr;</button>
        </div>

      </div>
    </div>
  );
};

export default CreateBooking;