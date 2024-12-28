// Import necessary modules and libraries
import { toast } from "react-toastify";

// Fetch all movies for a given user ID
export async function fetchAllMovies(uid: string) {
  try {
    // Make a request to the API to get all movies
    const response = await fetch("/api/movies/all", {
      headers: {
        uid: uid, // Include user ID in the request headers
      },
    });

    const data = await response.json();

    // Check if the response is not OK and throw an error if so
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data; // Return the fetched data
  } catch (error) {
    throw error; // Rethrow the error for handling elsewhere
  }
}

// Fetch a specific page of movies for a given user ID
export async function fetchMoviesPage(
  uid: string,
  currentPage: number,
  moviesPerPage: number
) {
  try {
    // Make a request to the API to get movies for the specified page
    const response = await fetch("/api/movies/page", {
      headers: {
        uid: uid, // Include user ID in the request headers
        page: currentPage.toString(), // Current page number
        limit: moviesPerPage.toString(), // Number of movies per page
      },
    });

    const data = await response.json();

    // Check if the response is not OK and throw an error if so
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data; // Return the fetched data
  } catch (error) {
    throw error; // Rethrow the error for handling elsewhere
  }
}

// Notify the user of an error using toast notifications
export const notifyError = (content: string) => toast.error(content);

// Notify the user of a success using toast notifications
export const notifySuccess = (content: string) => toast.success(content);

// Validate an email address format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
  return emailRegex.test(email); // Return true if valid, false otherwise
};

// Validate the password length
export const validatePassword = (password: string): boolean => {
  return password.length >= 6; // Password must be at least 6 characters
};
