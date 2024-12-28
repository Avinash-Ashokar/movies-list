// when we are calling that function inside a server action
// or a server component it doesn't save the response on the
// local storage of the browser making the onAuthStateChanged
// malfunction as it's not getting any data from the local
// storage of the browser. So this api is not been called
// from the server

// Import necessary functions and types from Firebase
import { auth } from "@/lib/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Function to log in a user
export const loginUser = async (
  email: string, // User's email address
  password: string, // User's password
  rememberMe: boolean // Flag to determine persistence type
) => {
  // Determine persistence type based on rememberMe flag
  const persistenceType = rememberMe
    ? browserLocalPersistence // Use local storage if rememberMe is true
    : inMemoryPersistence; // Use in-memory storage if false

  try {
    // Set the persistence for the authentication session
    await setPersistence(auth, persistenceType);
    // Attempt to create a new user with the provided email and password
    await createUserWithEmailAndPassword(auth, email, password);

    return { ok: true }; // Return success response
  } catch (error) {
    const err = error as Error;
    // Check if the error is due to the email already being in use
    if (err.message === "Firebase: Error (auth/email-already-in-use).") {
      // If user already exists, attempt to sign in instead
      try {
        // Set the persistence again for signing in
        await setPersistence(auth, persistenceType);
        // Sign in the user with the provided email and password
        const res = await signInWithEmailAndPassword(auth, email, password);

        return { ok: true }; // Return success response
      } catch (createError) {
        const err = createError as Error;

        return { ok: false, errorMessage: err.message }; // Return error response
      }
    } else {
      const err = error as Error;

      return { ok: false, errorMessage: err.message }; // Return error response for other errors
    }
  }
};
