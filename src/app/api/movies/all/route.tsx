// app/api/movies/all/route.ts
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const uid = request.headers.get("uid");

    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 401 });
    }

    const moviesRef = collection(db, "users", uid, "movies");
    const snapshot = await getDocs(moviesRef);

    const movies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json({
      movies,
      totalMovies: snapshot.size,
      success: true,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
