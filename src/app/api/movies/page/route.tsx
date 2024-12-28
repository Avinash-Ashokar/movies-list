import { NextRequest } from "next/server";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Movie } from "@/types";

export async function GET(request: NextRequest) {
  try {
    // Retrieve user ID from request headers
    const uid = request.headers.get("uid");
    // Get the current page number from request headers, defaulting to 1
    const page = request.headers.get("page")
      ? Number(request.headers.get("page"))
      : 1;
    // Get the number of movies to fetch per page from request headers, defaulting to 10
    const moviesPerPage = request.headers.get("limit")
      ? Number(request.headers.get("limit"))
      : 10;

    // If user ID is not provided, return an error response
    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    // Reference to the user's movies collection in Firestore
    const moviesRef = collection(db, "users", uid, "movies");
    const movieData: { [key: string]: Movie } = {};
    let movieQuery;

    // If it's the first page, create a query to fetch the first set of movies
    if (page === 1) {
      movieQuery = query(moviesRef, orderBy("createdAt"), limit(moviesPerPage));
    } else {
      // For subsequent pages, get the last visible document from the previous query
      const lastVisibleDoc = query(
        moviesRef,
        orderBy("createdAt"),
        limit(moviesPerPage)
      );

      const documentSnapshots = await getDocs(lastVisibleDoc);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      // Create a query to fetch the next set of movies starting after the last visible document
      movieQuery = query(
        moviesRef,
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(moviesPerPage)
      );
    }

    // Execute the movie query and store the results
    const querySnapshot = await getDocs(movieQuery);
    querySnapshot.forEach((doc) => {
      // Store each movie document's data in the movieData object
      movieData[doc.id] = doc.data() as Movie;
    });

    // Return the fetched movie data as a JSON response
    return Response.json({
      movieData,
    });
  } catch (error) {
    // Handle any errors that occur during the fetch process
    return Response.json(
      { error: error, errorMsg: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
