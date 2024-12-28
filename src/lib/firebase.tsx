// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object containing API keys and identifiers
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY, // API key for Firebase
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN, // Auth domain for Firebase
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Project ID for Firebase
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET, // Storage bucket for Firebase
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID, // Messaging sender ID for Firebase
  appId: process.env.NEXT_PUBLIC_APP_ID, // App ID for Firebase
};

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and Firestore Database
export const auth = getAuth(app); // Export the authentication instance
export const db = getFirestore(app); // Export the Firestore database instance
