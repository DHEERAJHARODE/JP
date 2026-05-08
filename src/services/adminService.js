// src/services/adminService.js
import { db } from "./firebase";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";

// 1️⃣ Saari Job Applications laane ka function
export const getApplications = async () => {
  try {
    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { data: applications, error: null };
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { data: [], error: error.message };
  }
};

// 2️⃣ Saari Contact Queries laane ka function
export const getQueries = async () => {
  try {
    const q = query(collection(db, "queries"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const queries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { data: queries, error: null };
  } catch (error) {
    console.error("Error fetching queries:", error);
    return { data: [], error: error.message };
  }
};

// 3️⃣ Status update karne ka function (Mark as Read / Hired / Rejected)
export const updateDocumentStatus = async (collectionName, docId, newStatus) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, { status: newStatus });
    return { error: null };
  } catch (error) {
    console.error(`Error updating ${collectionName} status:`, error);
    return { error: error.message };
  }
};