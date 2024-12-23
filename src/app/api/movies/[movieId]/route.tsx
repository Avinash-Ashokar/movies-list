import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { movieId: string } }
) {
  try {
    const uid = request.headers.get("uid");
    const { movieId } = params;

    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 401 });
    }

    const docRef = doc(db, "users", uid, "movies", movieId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Response.json(docSnap.data());
    } else {
      return Response.json({ error: "Movie not found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
