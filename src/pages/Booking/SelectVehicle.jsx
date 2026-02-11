import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import VehicleList from "../../components/features/VehicleList";
import { useMaps } from "../../hooks/useMaps"; 
import { VEHICLES } from "../../utils/constants"; // ✅ Import Vehicles Constant
import "./SelectVehicle.css"; // ✅ Import New CSS

const SelectVehicle = () => {
  const { vehicle, setVehicle, pickup, drop, setDistance: setGlobalDistance } = useBookingContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { calculateDistance, distance, loading } = useMaps();

  useEffect(() => {
    if (pickup && drop) {
      calculateDistance(pickup, drop).then((calculatedDist) => {
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

  return (
    <div className="vehicle-page">
      <div className="main-container">
        
        {/* --- HEADER --- */}
        <div className="header-section">
          <div className="progress-bar-container">
            <div className="progress-fill" style={{ width: "66%" }}></div>
          </div>
          <div className="step-indicator">
            <span className="step-text">Step 2 of 3</span>
            <h2 className="page-title">Choose your fleet</h2>
          </div>
        </div>

        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* --- CONTENT GRID --- */}
        <div className="content-grid">
          
          {/* Left Column: Vehicle List */}
          <div className="vehicle-list-wrapper">
             {/* ✅ Passing Data to Component */}
             <VehicleList 
               vehicles={VEHICLES} 
               selectedVehicle={vehicle}
               onSelect={setVehicle}
               distance={distance}
             />
          </div>

          {/* Right Column: Info & Summary */}
          <aside className="info-card">
            <h3 className="info-title">Why ShipEase?</h3>
            
            {/* ✅ Description restored */}
            <p className="info-description">
              Reliable logistics partner for all your shifting needs. 
              We ensure safety, speed, and transparency in every move.
            </p>

            <ul className="benefit-list">
              <li className="benefit-item">
                <div className="benefit-icon">📍</div>
                <span><strong>Live Tracking</strong> enabled</span>
              </li>
              <li className="benefit-item">
                <div className="benefit-icon">🛡️</div>
                <span><strong>Insurance</strong> included</span>
              </li>
              <li className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <span><strong>Fastest</strong> in city</span>
              </li>
            </ul>
            
            <div className="divider"></div>

            {/* Distance Summary */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <span style={{color: '#64748b', fontSize: '0.95rem'}}>Est. Distance</span>
               <span style={{fontWeight: '800', color: '#1e293b', fontSize: '1.2rem'}}>
                 {loading ? "..." : distance ? `${distance} km` : "--"}
               </span>
            </div>
          </aside>

        </div>

        {/* --- FIXED FOOTER --- */}
        <div className="footer-bar">
          <button className="btn-secondary" onClick={() => navigate(-1)}>&larr; Back</button>
          <button className="btn-primary" onClick={handleNext}>Review Booking &rarr;</button>
        </div>

      </div>
    </div>
  );
};

export default SelectVehicle;