import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Pages
import LandingPage from "../pages/Home/LandingPage";
import About from "../pages/Home/About"; // Import the new About page
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Booking Pages
import CreateBooking from "../pages/Booking/CreateBooking";
import SelectVehicle from "../pages/Booking/SelectVehicle";
import BookingSummary from "../pages/Booking/BookingSummary";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders";
import Profile from "../pages/Dashboard/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES (Accessible to Everyone) --- */}
      {/* These use MainLayout, so they will have the Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* --- GUEST ONLY ROUTES --- */}
      {/* Redirects to dashboard if already logged in */}
      <Route element={<PublicRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* --- PROTECTED ROUTES (Booking) --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/booking/create" element={<CreateBooking />} />
          <Route path="/booking/vehicle" element={<SelectVehicle />} />
          <Route path="/booking/summary" element={<BookingSummary />} />
        </Route>
      </Route>

      {/* --- DASHBOARD ROUTES --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<MyOrders />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;