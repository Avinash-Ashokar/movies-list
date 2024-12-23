"use client";

import { auth } from "@/lib/firebase";
import { userStateContextProps } from "@/types";
import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const UserStateContext = createContext<userStateContextProps | undefined>(
  undefined
);

export const UserStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Handle user authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Wait for auth state to settle
        currentUser.reload().then(() => {
          setUser(currentUser);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserStateContext.Provider value={{ user, setUser }}>
      {children}
    </UserStateContext.Provider>
  );
};

export const useUserStateContext = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error(
      "useUserStateContext must be used within a useUserState provider"
    );
  }
  return context;
};
