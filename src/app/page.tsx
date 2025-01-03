"use client"; // Indicates that this component is a client component in Next.js

import MovieList from "@/components/movie-list"; // Importing the MovieList component
import { useEffect, useState } from "react"; // Importing React hooks
import { useRouter } from "next/navigation"; // Importing the router for navigation
import Button from "@/components/button"; // Importing the Button component
import { fetchAllMovies } from "@/utility/helper"; // Importing a helper function to fetch movies
import { useUserStateContext } from "@/context/userStateContext"; // Importing user state context
import Header from "@/components/header"; // Importing the Header component

// Component to display when the user's movie list is empty
const EmptyPage = () => {
  const router = useRouter(); // Getting the router instance

  return (
    <div className="flex justify-center items-center flex-col min-h-[calc(100vh-111px)] p-24 gap-y-40">
      <h2 className="text-heading-3 font-semibold font-montserrat text-center sm:text-heading-2">
        Your movie list is empty
      </h2>
      <div
        className="w-full sm:w-[202px]"
        onClick={() => router.push("/add-movie")} // Redirects to the add movie page on click
      >
        <Button label="Add a new movie" type="action" />
      </div>
    </div>
  );
};

// Main HomePage component
export default function HomePage() {
  const { user } = useUserStateContext(); // Accessing user state from context

  const router = useRouter(); // Getting the router instance

  const [totalMovies, setTotalMovies] = useState<number | undefined>(0); // State to hold total movies
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Effect to fetch movies when user is available
  useEffect(() => {
    if (!user) {
      router.push("/signin"); // Redirects to sign-in page if no user
      setLoading(false); // Set loading to false if redirecting
      return; // Exit the effect early
    }

    const fetchData = async () => {
      if (user) {
        // Check if user is not null
        const res = await fetchAllMovies(user.uid); // Fetching movies for the user
        setTotalMovies(res.totalMovies); // Setting the total movies in state
      }
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData(); // Calling the fetch function
  }, [user, router]); // Added 'router' to the dependency array

  if (loading) return null; // Prevent rendering until loading is complete

  // If there are no movies, render the EmptyPage component
  if (totalMovies === 0) return <EmptyPage />;

  // Main render of the HomePage component
  return (
    <div className="flex-grow flex flex-col px-24 sm:px-120 mb-80">
      <Header />
      <MovieList />
    </div>
  );
}
