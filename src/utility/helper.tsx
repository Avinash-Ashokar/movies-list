import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-toastify";

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

export const notifyError = (content: string) => toast.error(content);

export const notifySuccess = (content: string) => toast.success(content);

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6; // Password must be at least 6 characters
};
