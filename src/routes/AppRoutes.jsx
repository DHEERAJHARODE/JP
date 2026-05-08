import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop"; 

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute"; // 🟢 NAYA: AdminRoute import kiya

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

// Dashboard & Admin Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders";
import Profile from "../pages/Dashboard/Profile";

// 🟢 NAYA: Admin pages import kiye
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import ApplicationsList from "../pages/Dashboard/ApplicationsList";
import QueriesList from "../pages/Dashboard/QueriesList";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product" element={<Product />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/terms" element={<TermsPrivacy />} />
        </Route>

        {/* --- GUEST ONLY ROUTES --- */}
        <Route element={<PublicRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>

        {/* --- PROTECTED ROUTES (Booking & Dashboard) --- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/booking/create" element={<CreateBooking />} />
            <Route path="/booking/vehicle" element={<SelectVehicle />} />
            <Route path="/booking/summary" element={<BookingSummary />} />
          </Route>
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/orders" element={<MyOrders />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* 🟢 NAYA: ADMIN ONLY ROUTES --- */}
        <Route element={<AdminRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/applications" element={<ApplicationsList />} />
            <Route path="/admin/queries" element={<QueriesList />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;