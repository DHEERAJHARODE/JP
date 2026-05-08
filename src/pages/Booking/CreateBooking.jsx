import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import Input from "../../components/common/Input";
import MapView from "../../components/features/MapView"; 
import "./CreateBooking.css"; 

const CreateBooking = () => {
  // Context se location, customer details aur scheduling details nikal liye
  const { 
    pickup, drop, setPickup, setDrop,
    customerName, setCustomerName,
    customerPhone, setCustomerPhone,
    userEmail, setUserEmail,
    bookingType, setBookingType,
    scheduledDate, setScheduledDate,
    scheduledTime, setScheduledTime
  } = useBookingContext();
  
  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const navigate = useNavigate();

  // Aaj ki date nikali taaki user purani date select na kar sake
  const today = new Date().toISOString().split("T")[0];

  const geocodeAddress = async (address, type) => {
    if (!address) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        { headers: { "User-Agent": "ShipEase_App/1.0" } } 
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
    // 🟢 Validation: Bina naam, number aur time ke aage nahi badhne denge
    if (!pickup || !drop) {
      setError("Please enter both pickup and drop locations.");
      return;
    }
    if (!customerName || !customerPhone) {
      setError("Please provide your Name and Phone Number.");
      return;
    }
    if (customerPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    
    // Scheduled booking validation
    if (bookingType === "scheduled" && (!scheduledDate || !scheduledTime)) {
      setError("Please select both Date and Time for scheduled booking.");
      return;
    }

    setError(null);
    navigate("/booking/vehicle");
  };

  return (
    <div className="booking-page">
      <div className="main-container">
        
        <div className="header-section">
          <div className="progress-bar-container">
            <div className="progress-fill" style={{ width: "33%" }}></div>
          </div>
          <div className="step-indicator">
            <span className="step-text">Step 1 of 3</span>
            <h2 className="page-title">Booking Details</h2>
          </div>
        </div>

        <div className="content-grid">
          <div className="left-column">
            
            {/* --- LOCATION CARD --- */}
            <div className="booking-card" style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "1.1rem", color: "#1e293b" }}>📍 Route Details</h3>
              <div className="input-group">
                <div className="input-header">
                  <div className="icon-label">Pickup Location *</div>
                  <button onClick={handleCurrentLocation} className="locate-btn" disabled={locationLoading}>
                    {locationLoading ? "Locating..." : "🎯 Current Location"}
                  </button>
                </div>
                <Input
                  placeholder="e.g. 123, Main Street, Mumbai"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onBlur={() => handleBlur('pickup')} 
                />
              </div>

              <div className="connector-line"></div>

              <div className="input-group">
                <div className="input-header">
                   <div className="icon-label">Drop Location *</div>
                </div>
                <Input
                  placeholder="e.g. 456, Tech Park, Pune"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  onBlur={() => handleBlur('drop')} 
                />
              </div>
            </div>

            {/* --- CUSTOMER DETAILS CARD --- */}
            <div className="booking-card">
              <h3 style={{ marginBottom: "15px", fontSize: "1.1rem", color: "#1e293b" }}>👤 Contact Details</h3>
              
              <div className="input-group" style={{ marginBottom: "15px" }}>
                <div className="icon-label">Full Name *</div>
                <Input
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="input-group" style={{ marginBottom: "15px" }}>
                <div className="icon-label">Phone Number *</div>
                <Input
                  type="number"
                  placeholder="Enter 10-digit mobile number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div className="input-group">
                <div className="icon-label">Email ID (Optional)</div>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>

            {/* --- NAYA SECTION: SCHEDULE DETAILS CARD --- */}
            <div className="booking-card" style={{ marginTop: "20px" }}>
              <h3 style={{ marginBottom: "15px", fontSize: "1.1rem", color: "#1e293b" }}>🕒 Booking Time</h3>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="radio" 
                    value="instant" 
                    checked={bookingType === "instant"} 
                    onChange={() => setBookingType("instant")} 
                  />
                  Book Now (Instant)
                </label>
                
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="radio" 
                    value="scheduled" 
                    checked={bookingType === "scheduled"} 
                    onChange={() => setBookingType("scheduled")} 
                  />
                  Schedule for Later
                </label>
              </div>

              {bookingType === "scheduled" && (
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#64748b' }}>Select Date *</label>
                    <input 
                      type="date" 
                      value={scheduledDate} 
                      min={today} 
                      onChange={(e) => setScheduledDate(e.target.value)} 
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                      required 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#64748b' }}>Select Time *</label>
                    <input 
                      type="time" 
                      value={scheduledTime} 
                      onChange={(e) => setScheduledTime(e.target.value)} 
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                      required 
                    />
                  </div>
                </div>
              )}
            </div>

            {error && <div className="error-box" style={{ marginTop: "15px", color: "red", fontWeight: "500" }}>⚠️ {error}</div>}
          </div>

          <div className="right-column">
             <div className="map-wrapper">
                <MapView pickupCoords={pickupCoords} dropCoords={dropCoords} />
             </div>
             
             <div className="info-card">
                <h3 className="info-title">Quick Tips</h3>
                <ul className="benefit-list">
                  <li>• Type address & click outside to update map</li>
                  <li>• Provide active phone number for driver contact</li>
                </ul>
             </div>
          </div>
        </div>

        <div className="footer-bar">
          <button className="btn-secondary" onClick={() => navigate("/")}>Cancel</button>
          <button className="btn-primary" onClick={handleNext}>Find Vehicles &rarr;</button>
        </div>

      </div>
    </div>
  );
};

export default CreateBooking;