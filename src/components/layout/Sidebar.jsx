import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // 🟢 useAuth import kiya

const Sidebar = () => {
  const { user } = useAuth(); // 🟢 Current user nikal liya

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

        {/* 🟢 YAHAN BHI ADMIN LINK ADD KIYA HAI */}
        {user && user.email === "dheerajharode704@gmail.com" && (
          <NavLink 
            to="/admin" 
            style={{...styles.link, color: "#ef4444", fontWeight: "bold", marginTop: "16px", borderTop: "1px solid #1e293b", paddingTop: "16px"}}
          >
            Admin Panel
          </NavLink>
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