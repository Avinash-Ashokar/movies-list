import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";

export async function fetchAllMovies(uid: string) {
  try {
    const response = await fetch("/api/movies/all", {
      headers: {
        uid: uid,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchMoviesPage(
  uid: string,
  currentPage: number,
  moviesPerPage: number
) {
  try {
    const response = await fetch("/api/movies/page", {
      headers: {
        uid: uid,
        page: currentPage.toString(),
        limit: moviesPerPage.toString(),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
