import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: NextRequest) {
  try {
    const uid = request.headers.get("uid");
    const page = request.headers.get("page")
      ? Number(request.headers.get("page"))
      : 1;
    const moviesPerPage = request.headers.get("limit")
      ? Number(request.headers.get("limit"))
      : 10;

    if (!uid) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const moviesRef = collection(db, "users", uid, "movies");
    let movieData: { [key: string]: any } = {};
    let movieQuery;

    if (page === 1) {
      movieQuery = query(moviesRef, orderBy("createdAt"), limit(moviesPerPage));
    } else {
      const lastVisibleDoc = query(
        moviesRef,
        orderBy("createdAt"),
        limit(moviesPerPage)
      );

      const documentSnapshots = await getDocs(lastVisibleDoc);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      movieQuery = query(
        moviesRef,
        orderBy("createdAt"),
        startAfter(lastVisible),
        limit(moviesPerPage)
      );
    }

    const querySnapshot = await getDocs(movieQuery);
    querySnapshot.forEach((doc) => {
      movieData[doc.id] = doc.data();
    });

    return Response.json({
      movieData,
    });
  } catch (error) {
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
