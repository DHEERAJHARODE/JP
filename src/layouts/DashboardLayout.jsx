import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar"; // Navbar import kiya
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Top Navbar: Sabse upar */}
      <Navbar />

      {/* 2. Main Content Area: Navbar ke niche */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* Sidebar: Left side */}
        <Sidebar />

        {/* Page Content: Right side */}
        <main style={{ flex: 1, padding: "24px", background: "#f8fafc" }}>
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;