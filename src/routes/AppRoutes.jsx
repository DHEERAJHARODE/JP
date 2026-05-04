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
import About from "../pages/Home/About"; 
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword"; 
import VerifyEmailPage from "../pages/Auth/VerifyEmailPage";

import Careers from "../pages/pages/Careers";
import Blog from "../pages/pages/Blog";
import Product from "../pages/pages/Product";
import Support from "../pages/pages/Support";
import HelpCenter from "../pages/pages/HelpCenter";
import ContactUs from "../pages/pages/ContactUs";
import TermsPrivacy from "../pages/pages/TermsPrivacy";

// Booking Pages
import CreateBooking from "../pages/Booking/CreateBooking";
import SelectVehicle from "../pages/Booking/SelectVehicle";
import BookingSummary from "../pages/Booking/BookingSummary";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders";
import Profile from "../pages/Dashboard/Profile";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES (Accessible to Everyone) --- */}
      {/* These use MainLayout, so they will have the Header & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        
        {/* 👇 NAYE FOOTER PAGES KE ROUTES YAHAN ADD KIYE HAIN */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product" element={<Product />} />
        <Route path="/support" element={<Support />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-privacy" element={<TermsPrivacy />} />
      </Route>

      {/* --- GUEST ONLY ROUTES --- */}
      {/* Redirects to dashboard if already logged in */}
      <Route element={<PublicRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Route>

      {/* --- PROTECTED ROUTES (Booking) --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/booking/create" element={<CreateBooking />} />
          <Route path="/booking/vehicle" element={<SelectVehicle />} />
          <Route path="/booking/summary" element={<BookingSummary />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
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