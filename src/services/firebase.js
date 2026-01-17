// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9x2fNfnb4Fuo_O3v9JBuOnD8npg7L31g",
  authDomain: "shipease-f37c6.firebaseapp.com",
  projectId: "shipease-f37c6",
  storageBucket: "shipease-f37c6.firebasestorage.app",
  messagingSenderId: "899652357232",
  appId: "1:899652357232:web:c838026ae30b2099e638b5",
  measurementId: "G-CECY5S7DXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;