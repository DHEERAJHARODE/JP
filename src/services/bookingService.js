import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Firestore collection reference
const bookingsRef = collection(db, "bookings");

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(bookingsRef, bookingData);
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// Get all bookings for a user
export const getUserBookings = async (userId) => {
  try {
    const q = query(bookingsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { bookings, error: null };
  } catch (error) {
    return { bookings: [], error: error.message };
  }
};
