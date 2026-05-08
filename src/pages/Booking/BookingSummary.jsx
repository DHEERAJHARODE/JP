import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import { useAuth } from "../../hooks/useAuth";
import { createBooking } from "../../services/bookingService"; 
import Button from "../../components/common/Button";

const BookingSummary = () => {
  // 🟢 Context se sabhi details nikal li hain
  const { 
    pickup, 
    drop, 
    vehicle, 
    distance,
    customerName,    
    customerPhone,   
    userEmail,
    bookingType,     // 🟢 Naya
    scheduledDate,   // 🟢 Naya
    scheduledTime    // 🟢 Naya
  } = useBookingContext();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  // Price Calculation Logic
  const baseFare = distance * (vehicle?.pricePerKm || 0);
  const tax = baseFare * 0.18; // 18% GST
  const serviceFee = 50; // Fixed Platform Fee
  const totalAmount = Math.round(baseFare + tax + serviceFee);

  const handleConfirmBooking = async () => {
    if (!user) {
      alert("Please login to complete the booking.");
      return;
    }

    setLoading(true);

    // 🟢 100% WORKING PAYLOAD FOR FIRESTORE
    const bookingData = {
      pickup: pickup,
      drop: drop,
      vehicleName: vehicle?.name || "Unknown Vehicle",
      price: totalAmount,
      distance: distance,
      customerName: customerName || user.displayName || "User", 
      customerPhone: customerPhone, 
      userEmail: userEmail || user.email || "", 
      createdAt: new Date().toISOString(), 
      userId: user.uid,
      status: "Pending", 
      
      // ✅ YE TEEN FIELDS AB DATABASE ME JAYENGE:
      bookingType: bookingType || "instant",
      scheduledDate: bookingType === "scheduled" ? scheduledDate : "", // Khali string bheji error se bachne ke liye
      scheduledTime: bookingType === "scheduled" ? scheduledTime : "", 
    };

    try {
      const { id, error } = await createBooking(bookingData);

      if (error) {
        throw new Error(error);
      }
      
      console.log("Booking Created with ID:", id);
      alert("Booking Confirmed Successfully! 🚚"); 
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle || !pickup) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h2>No booking details found.</h2>
        <button onClick={() => navigate("/booking/create")}>Start New Booking</button>
      </div>
    );
  }

  return (
    <div className="summary-page">
      <div className="page-container">
        
        {/* --- HEADER --- */}
        <div className="summary-header">
           <button onClick={() => navigate(-1)} className="back-link">← Back</button>
           <h1 className="page-title">Review & Pay</h1>
        </div>

        <div className="content-grid">
          
          {/* --- LEFT: ORDER DETAILS --- */}
          <div className="details-section">
            
            {/* Route Card */}
            <div className="card route-card">
              <h3 className="card-title">Route Details</h3>
              <div className="route-timeline">
                <div className="timeline-item">
                   <div className="dot green-dot"></div>
                   <div className="address-box">
                      <span className="label">Pickup</span>
                      <p className="address-text">{pickup}</p>
                   </div>
                </div>
                <div className="timeline-line"></div>
                <div className="timeline-item">
                   <div className="dot red-dot"></div>
                   <div className="address-box">
                      <span className="label">Dropoff</span>
                      <p className="address-text">{drop}</p>
                   </div>
                </div>
              </div>
              <div className="distance-badge">
                 🛣️ Total Distance: <strong>{distance} km</strong>
              </div>
            </div>

            {/* 🟢 NAYA SCHEDULE CARD (UI ke liye) */}
            <div className="card schedule-card">
               <h3 className="card-title">Booking Timing</h3>
               <div style={{ padding: '16px', backgroundColor: '#e0f2fe', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                 <p style={{ margin: 0, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ fontSize: '1.4rem' }}>{bookingType === 'instant' ? '⚡' : '📅'}</span>
                   <strong style={{ fontSize: '1.05rem' }}>
                     {bookingType === "instant" 
                       ? "As soon as possible (Instant)" 
                       : `Scheduled on ${scheduledDate} at ${scheduledTime}`}
                   </strong>
                 </p>
               </div>
            </div>

            {/* Vehicle Card */}
            <div className="card vehicle-card">
               <h3 className="card-title">Vehicle Selected</h3>
               <div className="vehicle-info">
                  <div className="vehicle-icon-box">
                     <span style={{fontSize: '2rem'}}>🚚</span>
                  </div>
                  <div>
                    <h4 className="vehicle-name">{vehicle.name}</h4>
                    <p className="vehicle-desc">{vehicle.size} • {vehicle.capacity}</p>
                  </div>
                  <button className="change-btn" onClick={() => navigate("/booking/vehicle")}>Change</button>
               </div>
            </div>

            {/* Customer Details Card */}
            <div className="card customer-card">
               <h3 className="card-title">Contact Information</h3>
               <div style={{ color: "#334155", fontSize: "0.95rem" }}>
                  <p style={{ margin: "4px 0" }}><strong>Name:</strong> {customerName}</p>
                  <p style={{ margin: "4px 0" }}><strong>Phone:</strong> {customerPhone}</p>
                  {userEmail && <p style={{ margin: "4px 0" }}><strong>Email:</strong> {userEmail}</p>}
               </div>
            </div>

            {/* Payment Method (Mock) */}
            <div className="card payment-card">
               <h3 className="card-title">Payment Method</h3>
               <div className="payment-option">
                  <div className="radio-selected"></div>
                  <span>Cash on Delivery / UPI upon arrival</span>
               </div>
            </div>

          </div>

          {/* --- RIGHT: BILL SUMMARY --- */}
          <div className="bill-section">
            <div className="bill-card">
              <h3 className="card-title">Fare Breakdown</h3>
              
              <div className="bill-row">
                 <span>Trip Fare ({distance} km)</span>
                 <span>₹{Math.round(baseFare)}</span>
              </div>
              <div className="bill-row">
                 <span>Service Fee</span>
                 <span>₹{serviceFee}</span>
              </div>
              <div className="bill-row">
                 <span>GST (18%)</span>
                 <span>₹{Math.round(tax)}</span>
              </div>

              <div className="divider"></div>

              <div className="total-row">
                 <span>Total to Pay</span>
                 <span className="total-amount">₹{totalAmount}</span>
              </div>

              <button 
                className="confirm-btn" 
                onClick={handleConfirmBooking}
                disabled={loading}
              >
                 {loading ? "Processing..." : "Confirm Booking"}
              </button>
              
              <p className="terms-text">
                By booking, you agree to ShipEase's Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .summary-page {
          min-height: 100vh;
          background: #f8fafc;
          padding: 40px 20px 80px 20px;
          font-family: 'Inter', sans-serif;
        }

        .page-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .back-link {
          background: none;
          border: none;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }

        .card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
        }

        .route-timeline {
          position: relative;
          padding-left: 10px;
        }

        .timeline-item {
          display: flex;
          gap: 16px;
          position: relative;
          z-index: 2;
        }

        .timeline-line {
          position: absolute;
          left: 14px;
          top: 10px;
          bottom: 30px;
          width: 2px;
          background: #e2e8f0;
          z-index: 1;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
          outline: 4px solid white;
        }
        .green-dot { background: #22c55e; }
        .red-dot { background: #ef4444; }

        .address-box {
          margin-bottom: 24px;
        }

        .label {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #94a3b8;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }

        .address-text {
          color: #334155;
          font-size: 1rem;
          line-height: 1.5;
        }

        .distance-badge {
          background: #eff6ff;
          color: #1d4ed8;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .vehicle-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .vehicle-icon-box {
          width: 60px;
          height: 60px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vehicle-name { margin: 0; font-size: 1.1rem; color: #0f172a; }
        .vehicle-desc { margin: 4px 0 0 0; color: #64748b; font-size: 0.9rem; }
        
        .change-btn {
          margin-left: auto;
          color: #2563eb;
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid #2563eb;
          background: #eff6ff;
          border-radius: 12px;
          color: #1e40af;
          font-weight: 500;
        }
        .radio-selected {
          width: 16px; height: 16px;
          border: 5px solid #2563eb;
          border-radius: 50%;
          background: white;
        }

        .bill-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 30px;
          position: sticky;
          top: 20px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: #64748b;
          font-size: 0.95rem;
        }

        .divider {
          height: 1px;
          background: #e2e8f0;
          margin: 20px 0;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .total-row span {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
        }

        .total-amount {
          font-size: 1.8rem !important;
          color: #2563eb !important;
        }

        .confirm-btn {
          width: 100%;
          padding: 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
        }
        
        .confirm-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .terms-text {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          margin-top: 16px;
          line-height: 1.4;
        }

        @media (max-width: 850px) {
          .content-grid {
             grid-template-columns: 1fr;
          }
          
          .bill-card {
             position: relative;
             top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingSummary;