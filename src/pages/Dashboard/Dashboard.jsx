import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../services/bookingService";
import { formatCurrency, formatDate } from "../../utils/helpers";

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { bookings, error } = await getUserBookings(user.uid);
      if (!error) {
        setBookings(bookings);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  return (
    <div style={styles.container}>
      <h2>Welcome, {user.email}</h2>
      <h3>Your Recent Bookings</h3>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Vehicle</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.pickup}</td>
                <td>{b.drop}</td>
                <td>{b.vehicle.name}</td>
                <td>{formatCurrency(b.price)}</td>
                <td>{formatDate(b.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#f3f4f6",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
  },
};

export default Dashboard;
