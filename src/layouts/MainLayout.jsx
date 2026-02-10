import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar Fixed Top */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* FIX: paddingTop added to push content down */}
      <main style={{ flex: 1, paddingTop: "80px", width: "100%" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;