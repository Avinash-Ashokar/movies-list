import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    // Retrieve the user ID from the request headers
    const uid = request.headers.get("uid");
    const { movieId } = await params; // Await the params Promise

    // Check if the user ID is provided
    if (!uid) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 401 }
      );
    }

    // Reference the specific movie document in Firestore
    const docRef = doc(db, "users", uid, "movies", movieId);
    const docSnap = await getDoc(docRef);

    // Check if the document exists and return the data or an error
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error, errorMsg: "Internal server error" },
      { status: 500 }
    );
  }
}
