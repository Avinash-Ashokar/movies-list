"use client";

import UpdateMovie from "@/components/update-movie";
import { useUserStateContext } from "@/context/userStateContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddMoviePage() {
  // Access the user state from the context
  const { user } = useUserStateContext();
  // Get the router instance for navigation
  const router = useRouter();

  useEffect(() => {
    // If there is no user, redirect to the sign-in page
    if (!user) router.push("/signin");
  }, [user, router]); // Dependency array to re-run effect when user or router changes

  // Render the UpdateMovie component with a header title
  return <UpdateMovie headerTitle="Create a new movie" />;
}
