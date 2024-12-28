"use client";

// Import necessary modules and types
import { auth } from "@/lib/firebase"; // Firebase authentication
import { userStateContextProps } from "@/types"; // Type definitions for user state context
import { onAuthStateChanged, User } from "firebase/auth"; // Firebase auth functions and User type
import React, {
  createContext, // Function to create a context
  useContext, // Hook to use context
  useState, // Hook for state management
  ReactNode, // Type for React children
  useEffect, // Hook for side effects
} from "react";

// Create a context for user state with an initial value of undefined
const UserStateContext = createContext<userStateContextProps | undefined>(
  undefined
);

// UserStateProvider component to manage user authentication state
export const UserStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to hold the current user or null if not authenticated
  const [user, setUser] = useState<User | null>(null);

  // Handle user authentication state change
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If a user is authenticated, wait for the auth state to settle
        currentUser.reload().then(() => {
          setUser(currentUser); // Update user state
        });
      } else {
        setUser(null); // No user is authenticated
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Provide user state and updater function to children components
  return (
    <UserStateContext.Provider value={{ user, setUser }}>
      {children}
    </UserStateContext.Provider>
  );
};

// Custom hook to use the UserStateContext
export const useUserStateContext = () => {
  const context = useContext(UserStateContext); // Access context
  if (!context) {
    throw new Error(
      "useUserStateContext must be used within a useUserState provider" // Error if used outside provider
    );
  }
  return context; // Return context value
};
