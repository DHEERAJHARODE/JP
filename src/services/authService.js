import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut 
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// 1. Register User & Send Email Link
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Naye user ko verification email bhejein
    await sendEmailVerification(userCredential.user);
    
    // User ko turant sign out karein taki wo bina verify kiye andar na ja paye
    await signOut(auth); 

    return { user: userCredential.user, error: null };
  } catch (error) {
    // Error message ko clean karke return karein
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') errorMessage = "This email is already registered.";
    if (error.code === 'auth/weak-password') errorMessage = "Password should be at least 6 characters.";
    
    return { user: null, error: errorMessage };
  }
};

// 2. Login User with Verification Check
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check karein ki email verify hua hai ya nahi
    if (!userCredential.user.emailVerified) {
      await signOut(auth); 
      return { user: null, error: "Kindly verify your email first. Check your inbox for the verification link." };
    }

    return { user: userCredential.user, error: null };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/invalid-credential') errorMessage = "Invalid email or password.";
    return { user: null, error: errorMessage };
  }
};

// 3. Google Login / Register
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// 4. Forgot Password (Reset Link Bhejna)
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};