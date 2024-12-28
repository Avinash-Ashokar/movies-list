// app/api/movies/route.ts
import { db } from "@/lib/firebase";
import { Movie } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Retrieve the user ID from the request headers
    const uid = request.headers.get("uid");
    // Parse the incoming JSON request body to get movie data
    const movieData: Movie = await request.json();

    // Check if the user ID is provided; if not, return an error response
    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 401 });
    }

    // Validate that both title and year are provided in the movie data
    if (!movieData.title || !movieData.year) {
      return Response.json(
        { error: "Title and publishing year are required" },
        { status: 400 }
      );
    }

    // Generate a unique ID for the movie if not provided
    const uniqueId = movieData.id || uuidv4();

    // Save the movie data to the Firestore database under the user's movies collection
    await setDoc(doc(db, "users", uid, "movies", uniqueId), {
      title: movieData.title,
      year: movieData.year,
      imageUrl: movieData.imageUrl,
      createdAt: new Date(),
      id: uniqueId,
    });

    // Return a success response with the unique movie ID
    return Response.json({
      message: "Movie added successfully",
      movieId: uniqueId,
    });
  } catch (error: unknown) {
    // Handle any errors that occur during the process and return an error response
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
