import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}