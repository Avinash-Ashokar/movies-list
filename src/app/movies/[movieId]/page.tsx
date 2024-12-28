"use client"; // Indicates that this component is a client component in Next.js

import UpdateMovie from "@/components/update-movie"; // Importing the UpdateMovie component
import { useUserStateContext } from "@/context/userStateContext"; // Importing user state context for user information
import { Movie } from "@/types"; // Importing Movie type definition
import { usePathname, useRouter } from "next/navigation"; // Importing hook to get the current pathname
import { useEffect, useState } from "react"; // Importing React hooks

// Function to extract movie ID from the URL
function getMovieId(url: string) {
  const parts = url.split("/"); // Split the string by '/'
  return parts[2]; // Return the part after '/movie/'
}

// Main component for the Movie Page
export default function MoviePage() {
  const { user } = useUserStateContext(); // Get user information from context
  const router = useRouter();

  const pathUrl = usePathname(); // Get the current URL path

  const movieId = getMovieId(pathUrl); // Extract movie ID from the URL

  const [movieData, setMovieData] = useState<Movie | null>(); // State to hold movie data

  useEffect(() => {
    if (!user) router.push("/signin"); // If no user is logged in, exit early

    // Function to fetch movie data from the API
    async function fetchMovieData(uid: string, movieId: string) {
      try {
        const response = await fetch(`/api/movies/${movieId}`, {
          // Fetch movie data from API
          headers: {
            uid: uid, // Include user ID in the request headers
          },
        });

        const data = await response.json(); // Parse the JSON response

        if (!response.ok) throw new Error(data.error); // Throw an error if the response is not ok

        setMovieData(data); // Update state with fetched movie data
      } catch (error) {
        throw error; // Rethrow the error for handling
      }
    }

    if (user) {
      // Check if user is not null
      fetchMovieData(user.uid, movieId); // Call the function to fetch movie data
    }
  }, [user, movieId]); // Dependency array to re-run effect when user or movieId changes

  if (!user) return; // If no user is logged in, exit early

  // Render the UpdateMovie component with the fetched movie data
  return <UpdateMovie headerTitle="Edit" selectedMovieData={movieData} />;
}
