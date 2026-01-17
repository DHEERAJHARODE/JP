import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        TruckBooking
      </Link>

      <div>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 24px",
    background: "#0f172a",
    color: "#fff",
  },
  logo: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
  },
  link: {
    color: "#fff",
    marginRight: "16px",
    textDecoration: "none",
  },
  button: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    cursor: "pointer",
  },
};

export default Navbar;
