import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
// Sidebar import हटा दिया गया है
// import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="layout-wrapper">
      {/* 1. Top Navbar (Fixed at top) */}
      <div className="layout-navbar">
        <Navbar />
      </div>

      <div className="layout-body">
        {/* Sidebar हटा दिया गया है */}
        
        {/* Page Content: अब यह पूरी स्क्रीन पर दिखेगा */}
        <main className="layout-main">
          {/* Outlet renders the Dashboard component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;