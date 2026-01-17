import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../../App.css"; 

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle Logout locally if needed, or rely on Navbar
  const handleLogout = () => {
    // Logic usually in Navbar, but we can add a 'Sign Out' button here too
    navigate("/login");
  };

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: "24px" }}>Account Settings</h2>
      
      <div className="glass-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Profile Header */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "4px" }}>
              {user.email?.split('@')[0]}
            </h3>
            <span style={styles.badge}>Rb Verified User</span>
          </div>
        </div>

        <hr style={styles.divider} />

        {/* Details Grid */}
        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.value}>{user.email}</div>
          </div>
          
          <div style={styles.field}>
            <label style={styles.label}>Member Since</label>
            <div style={styles.value}>
              {new Date(user.metadata.creationTime).toLocaleDateString()}
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>User ID</label>
            <div style={styles.value} title={user.uid}>
              {user.uid.slice(0, 12)}...
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <div style={styles.value}>+91 98765 43210 <span style={{fontSize:'0.7rem', color:'var(--primary)'}}>(Verify)</span></div>
          </div>
        </div>

        <div style={{ marginTop: "40px", textAlign: "right" }}>
           <button className="btn btn-secondary" style={{ color: "#ef4444", borderColor: "#fee2e2" }} onClick={handleLogout}>
             Sign Out
           </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%)",
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
  },
  badge: {
    background: "#ecfdf5",
    color: "#059669",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    border: "1px solid #a7f3d0",
  },
  divider: {
    border: "0",
    borderBottom: "1px solid #e2e8f0",
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "32px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.875rem",
    color: "var(--text-muted)",
    marginBottom: "8px",
    fontWeight: "500",
  },
  value: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "var(--text-main)",
  }
};

export default Profile;