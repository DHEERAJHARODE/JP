import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Yahan aap apne (owner ke) email daal sakte hain jo admin honge
const ADMIN_EMAILS = ["admin@shipease.com", "jayshrisonyy@gmail.com", "dheerajharode704@gmail.com"]; 

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  // Agar user login nahi hai ya verified nahi hai
  if (!user || !user.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  // Agar login user ka email Admin list me NAHI hai, toh normal dashboard bhej do
  if (!ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Agar admin hai, toh page khol do
  return <Outlet />;
};

export default AdminRoute;