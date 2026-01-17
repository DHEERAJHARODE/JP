import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
