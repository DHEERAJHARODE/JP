import { db } from "./firebase"; 
import { collection, addDoc, getDocs, updateDoc, doc, orderBy, query, where } from "firebase/firestore";

// 1️⃣ NAYI BOOKING BANANE KA FUNCTION 
export const createBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      pickup: bookingData.pickup || "",
      drop: bookingData.drop || "",
      vehicle: bookingData.vehicleName || bookingData.vehicle || "N/A", 
      price: bookingData.price || 0,
      distance: bookingData.distance || 0,
      userId: bookingData.userId || "",
      status: bookingData.status || "Pending",
      createdAt: bookingData.createdAt || new Date().toISOString(),
      customerName: bookingData.customerName || "Unknown Customer",
      customerPhone: bookingData.customerPhone || "No Phone",
      userEmail: bookingData.userEmail || "No Email",
      
      // 🟢 FIX: Yahan in 3 fields ko add karna zaroori tha, varna DB mein save nahi honge!
      bookingType: bookingData.bookingType || "instant",
      scheduledDate: bookingData.scheduledDate || "",
      scheduledTime: bookingData.scheduledTime || ""
    });
    
    return { id: docRef.id, error: null };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { id: null, error: error.message };
  }
};

// 2️⃣ ADMIN PANEL KE LIYE SAARI BOOKINGS LAANE KA FUNCTION
export const getAllBookings = async () => {
  try {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() // Ye automatic naye fields ko bhi fetch kar lega
    }));
    
    return { bookings, error: null };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { bookings: [], error: error.message };
  }
};

// 3️⃣ ADMIN PANEL ME STATUS UPDATE KARNE KA FUNCTION
export const updateBookingStatus = async (bookingId, newStatus) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status: newStatus
    });
    return { error: null };
  } catch (error) {
    console.error("Error updating status:", error);
    return { error: error.message };
  }
};

// 4️⃣ USER DASHBOARD KE LIYE SIRF USKI BOOKINGS LAANE KA FUNCTION
export const getUserBookings = async (userId) => {
  try {
    // Sirf wahi bookings laao jinka userId match karta ho
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Bookings ko latest date ke hisaab se sort kar do
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return { bookings, error: null };
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return { bookings: [], error: error.message };
  }
};