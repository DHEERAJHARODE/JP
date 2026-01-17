import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";

const Profile = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    // Logout handled via Navbar, this is optional
    alert("Logout from Navbar to change account.");
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <div style={styles.card}>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user.uid}
        </p>
        <p>
          <strong>Account Created:</strong> {user.metadata.creationTime}
        </p>
      </div>
      <Button styleType="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
  },
  card: {
    background: "#f3f4f6",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
};

export default Profile;
