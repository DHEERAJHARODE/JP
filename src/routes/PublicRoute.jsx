import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  // FIX: Agar user logged in hai aur usne email verify kar liya hai tabhi dashboard bhejo.
  // Isse naya account banate waqt wo register page se redirect ho payega aur verify-email page dekh payega.
  if (user && user.emailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;