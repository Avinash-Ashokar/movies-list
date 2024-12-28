import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { movieId: string } }
) {
  try {
    // Retrieve the user ID from the request headers
    const uid = request.headers.get("uid");
    const { movieId } = params; // Extract movieId from the request parameters

    // Check if the user ID is provided
    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 401 });
    }

    // Reference the specific movie document in Firestore
    const docRef = doc(db, "users", uid, "movies", movieId);
    const docSnap = await getDoc(docRef); // Fetch the document snapshot

    // Check if the document exists and return the data or an error
    if (docSnap.exists()) {
      return Response.json(docSnap.data()); // Return movie data
    } else {
      return Response.json({ error: "Movie not found" }, { status: 404 }); // Movie not found error
    }
  } catch (error) {
    // Handle any unexpected errors
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
