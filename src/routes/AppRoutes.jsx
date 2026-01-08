import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar"; // Navbar har page pe dikhana hai
import Footer from "../components/Footer";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import SetLocation from "../pages/Booking/SetLocation";
import SelectVehicle from "../pages/Booking/SelectVehicle";
import OrderSummary from "../pages/Booking/OrderSummary";
import FindingDriver from "../pages/Booking/FindingDriver";
import LiveTracking from "../pages/Booking/LiveTracking";

import MyOrders from "../pages/Dashboard/MyOrders";
import Profile from "../pages/Dashboard/Profile";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Navbar ko Routes ke bahar rakha taaki wo har page par dikhe */}
      <Navbar /> 
      
      <div style={{ minHeight: "80vh" }}> {/* Main content area */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute><Register /></PublicRoute>
          } />

          {/* Protected Routes (Login required) */}
          <Route path="/book/location" element={
            <ProtectedRoute><SetLocation /></ProtectedRoute>
          } />
          <Route path="/book/vehicle" element={
            <ProtectedRoute><SelectVehicle /></ProtectedRoute>
          } />
          <Route path="/book/summary" element={
            <ProtectedRoute><OrderSummary /></ProtectedRoute>
          } />
          <Route path="/book/finding" element={
            <ProtectedRoute><FindingDriver /></ProtectedRoute>
          } />
          <Route path="/book/tracking" element={
            <ProtectedRoute><LiveTracking /></ProtectedRoute>
          } />

          <Route path="/user/orders" element={
            <ProtectedRoute><MyOrders /></ProtectedRoute>
          } />
          <Route path="/user/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}