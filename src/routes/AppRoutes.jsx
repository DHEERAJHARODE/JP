import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Public Pages
import LandingPage from "../pages/Home/LandingPage";
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
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Booking Routes (Authenticated but no dashboard layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/booking/create" element={<CreateBooking />} />
          <Route path="/booking/vehicle" element={<SelectVehicle />} />
          <Route path="/booking/summary" element={<BookingSummary />} />
        </Route>
      </Route>

      {/* Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<MyOrders />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
