import React, { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus } from "../../services/bookingService";
import "../../App.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { bookings, error } = await getAllBookings();
    if (!error) {
      setBookings(bookings);
    }
    setLoading(false);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    // Optimistic UI Update (UI me turant change dikhao)
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    
    // Database me update karo
    const { error } = await updateBookingStatus(bookingId, newStatus);
    if (error) {
      alert("Status update failed: " + error);
      fetchBookings(); // Agar fail ho toh wapas purana data le aao
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2>Admin Panel - All Bookings</h2>
        <div style={{ background: "#4f46e5", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "0.9rem" }}>
          Total Bookings: {bookings.length}
        </div>
      </div>

      <div className="glass-card" style={{ overflowX: "auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Loading all bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No bookings found in the system.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Date</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Customer Info</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Route (Pickup ➔ Drop)</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Vehicle & Price</th>
                <th style={{ padding: "16px", color: "#64748b", fontWeight: "600" }}>Status Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  
                  {/* 1. Date Column (Fixed for both 'createdAt' and 'date' fields) */}
                  <td style={{ padding: "16px", fontSize: "0.9rem" }}>
                    {booking.createdAt || booking.date 
                      ? new Date(booking.createdAt || booking.date).toLocaleDateString() 
                      : "N/A"}
                  </td>

                  {/* 2. Customer Info Column (With Call Button) */}
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "0.95rem", marginBottom: "4px" }}>
                      👤 {booking.customerName || booking.userName || "Unknown Customer"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "2px" }}>
                      📧 {booking.userEmail || booking.email || "No Email"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "8px" }}>
                      📞 {booking.customerPhone || booking.phone || "No Phone"}
                    </div>
                    
                    {/* Call Button - Sirf tab dikhega jab phone number data me hoga */}
                    {(booking.customerPhone || booking.phone) && (booking.customerPhone !== "No Phone") && (
                      <a 
                        href={`tel:${booking.customerPhone || booking.phone}`}
                        style={{
                          display: "inline-block",
                          background: "#22c55e",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          textDecoration: "none",
                          fontWeight: "600",
                          boxShadow: "0 2px 4px rgba(34, 197, 94, 0.2)"
                        }}
                      >
                        📞 Call User
                      </a>
                    )}
                  </td>

                  {/* 3. Route Column */}
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontSize: "0.9rem", marginBottom: "6px" }}>
                      <span style={{color: "#22c55e", fontWeight: "bold"}}>●</span> {booking.pickupLocation?.address || booking.pickup || "N/A"}
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      <span style={{color: "#ef4444", fontWeight: "bold"}}>●</span> {booking.dropLocation?.address || booking.drop || "N/A"}
                    </div>
                  </td>

                  {/* 4. Vehicle & Price Column (Fixed for String vs Object mismatch) */}
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "600", color: "#334155", marginBottom: "4px" }}>
                      {typeof booking.vehicle === 'string' 
                        ? booking.vehicle 
                        : booking.vehicle?.name || booking.vehicleName || "N/A"}
                    </div>
                    <div style={{ fontWeight: "700", color: "#4f46e5", fontSize: "1.1rem" }}>
                      ₹{booking.price || "0"}
                    </div>
                  </td>

                  {/* 5. Status Action Column */}
                  <td style={{ padding: "16px" }}>
                    <select 
                      value={booking.status || "Pending"}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: booking.status === "Completed" ? "#dcfce3" : booking.status === "Active" ? "#e0f2fe" : booking.status === "Cancelled" ? "#fee2e2" : "#fff",
                        color: booking.status === "Completed" ? "#166534" : booking.status === "Active" ? "#0369a1" : booking.status === "Cancelled" ? "#991b1b" : "#334155",
                        fontWeight: "600",
                        outline: "none",
                        cursor: "pointer",
                        width: "100%",
                        maxWidth: "180px"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active (In Transit)</option>
                      <option value="Completed">Completed (Delivered)</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;