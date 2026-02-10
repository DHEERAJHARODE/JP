import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../services/bookingService";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 
import "../../App.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, spent: 0, active: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.uid) return;
      
      const { bookings } = await getUserBookings(user.uid);
      if (bookings) {
        const spent = bookings.reduce((acc, curr) => acc + (curr.price || 0), 0);
        setStats({
          total: bookings.length,
          spent: spent,
          active: bookings.length > 0 ? 1 : 0,
        });
      }
    };
    fetchStats();
  }, [user]);

  const username = user?.email ? user.email.split('@')[0] : "Member";

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        
        {/* --- HEADER SECTION --- */}
        <header className="dash-header">
          <div className="header-text">
            <h1>Hello, <span className="highlight-text">{username}</span> 👋</h1>
            <p className="subtitle">Here is your shipment overview.</p>
          </div>
          <div className="header-action">
             {/* Date or small profile badge could go here */}
             <span className="date-badge">{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        {/* --- MAIN GRID --- */}
        <section className="stats-grid">
          
          {/* Card 1: Total Orders */}
          <div className="stat-card">
            <div className="icon-box blue-gradient">
              <span className="icon">📦</span>
            </div>
            <div className="stat-details">
              <h3>Total Orders</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>

          {/* Card 2: Total Spent */}
          <div className="stat-card">
            <div className="icon-box green-gradient">
              <span className="icon">₹</span>
            </div>
            <div className="stat-details">
              <h3>Total Spent</h3>
              <p className="stat-number">₹{stats.spent.toLocaleString()}</p>
            </div>
          </div>

          {/* Card 3: Call To Action (Book Now) */}
          <div 
            className="stat-card cta-card" 
            onClick={() => navigate("/booking/create")}
          >
            <div className="icon-box orange-gradient">
              <span className="icon">🚀</span>
            </div>
            <div className="stat-details">
              <h3>Send Package</h3>
              <p className="cta-text">Book New Shipment &rarr;</p>
            </div>
          </div>

        </section>

        {/* --- RECENT ACTIVITY SECTION --- */}
        <section className="activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="text-btn" onClick={() => navigate("/dashboard/orders")}>
              View All Orders
            </button>
          </div>
          
          <div className="activity-card">
             {/* If stats.total is 0, show empty state, else show a teaser */}
             {stats.total === 0 ? (
               <div className="empty-state">
                 <div className="empty-icon">📮</div>
                 <p>No shipments yet. Start your first delivery today!</p>
               </div>
             ) : (
               <div className="info-state">
                 <p>Visit <strong>My Orders</strong> to track your {stats.total} active shipments.</p>
                 <div className="progress-bar">
                    <div className="progress-fill" style={{width: '60%'}}></div>
                 </div>
                 <span className="status-text">Tracking Active</span>
               </div>
             )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;