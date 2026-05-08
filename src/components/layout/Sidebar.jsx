import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // 🟢 useAuth import kiya

const Sidebar = () => {
  const { user } = useAuth(); // 🟢 Current user nikal liya

  // 🟢 Admin emails logic
  const ADMIN_EMAILS = ["admin@shipease.com","jayshrisonyy@gmail.com" ,"dheerajharode704@gmail.com"];
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>Dashboard</h2>

      <nav>
        <NavLink to="/dashboard" style={styles.link}>
          Overview
        </NavLink>

        <NavLink to="/dashboard/orders" style={styles.link}>
          My Orders
        </NavLink>

        <NavLink to="/dashboard/profile" style={styles.link}>
          Profile
        </NavLink>

        {/* 🟢 ORIGINAL RED STYLE ME 3 ADMIN LINKS */}
        {isAdmin && (
          <>
            <NavLink 
              to="/admin" 
              style={{...styles.link, color: "#ef4444", fontWeight: "bold", marginTop: "16px", borderTop: "1px solid #1e293b", paddingTop: "16px"}}
            >
              Bookings
            </NavLink>
            <NavLink 
              to="/admin/applications" 
              style={{...styles.link, color: "#ef4444", fontWeight: "bold"}}
            >
              Job Applications
            </NavLink>
            <NavLink 
              to="/admin/queries" 
              style={{...styles.link, color: "#ef4444", fontWeight: "bold"}}
            >
              User Queries
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    background: "#020617",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  link: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    marginBottom: "16px",
  },
};

export default Sidebar;