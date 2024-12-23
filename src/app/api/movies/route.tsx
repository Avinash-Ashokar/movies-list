// app/api/movies/route.ts
import { db } from "@/lib/firebase";
import { Movie } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const uid = request.headers.get("uid");
    const movieData: Movie = await request.json();

    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 401 });
    }

    if (!movieData.title || !movieData.year) {
      return Response.json(
        { error: "Title and publishing year are required" },
        { status: 400 }
      );
    }

    const uniqueId = movieData.id || uuidv4();

    await setDoc(doc(db, "users", uid, "movies", uniqueId), {
      title: movieData.title,
      year: movieData.year,
      imageUrl: movieData.imageUrl,
      createdAt: new Date(),
      id: uniqueId,
    });

    return Response.json({
      message: "Movie added successfully",
      movieId: uniqueId,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
