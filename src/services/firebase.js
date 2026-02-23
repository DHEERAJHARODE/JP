import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // GoogleAuthProvider import karein
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9x2fNfnb4Fuo_O3v9JBuOnD8npg7L31g",
  authDomain: "shipease-f37c6.firebaseapp.com",
  projectId: "shipease-f37c6",
  storageBucket: "shipease-f37c6.firebasestorage.app",
  messagingSenderId: "899652357232",
  appId: "1:899652357232:web:c838026ae30b2099e638b5",
  measurementId: "G-CECY5S7DXX"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Provider yahan initialize karein
export const googleProvider = new GoogleAuthProvider();

export default app;