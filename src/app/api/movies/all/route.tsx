import { db } from "@/lib/firebase"; // Importing the Firebase database instance
import { collection, getDocs } from "firebase/firestore"; // Importing Firestore functions
import { NextRequest } from "next/server"; // Importing Next.js request type

// Function to handle GET requests for fetching movies
export async function GET(request: NextRequest) {
  try {
    // Retrieve the user ID from the request headers
    const uid = request.headers.get("uid");

    // Check if the user ID is provided; if not, return an error response
    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 401 });
    }

    // Reference to the user's movies collection in Firestore
    const moviesRef = collection(db, "users", uid, "movies");
    // Fetching documents from the movies collection
    const snapshot = await getDocs(moviesRef);

    // Mapping the documents to an array of movie objects
    const movies = snapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Spread operator to include all document data
    }));

    // Returning the movies and total count in a JSON response
    return Response.json({
      movies, // Array of movie objects
      totalMovies: snapshot.size, // Total number of movies fetched
      success: true, // Indicating the request was successful
    });
  } catch (error: unknown) {
    // Handling any errors that occur during the process
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
