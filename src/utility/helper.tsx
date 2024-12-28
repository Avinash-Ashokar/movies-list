// Import necessary modules and libraries
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

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

export const compressImage = async (imageFile: File) => {
  // Define options for image compression
  const options = {
    maxSizeMB: 0.2, // Maximum size in MB
    maxWidthOrHeight: 1920, // Maximum width/height
    useWebWorker: true, // Use web worker for better performance
  };

  try {
    // Attempt to compress the image file using the specified options
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile; // Return the compressed file
  } catch (error) {
    // Log any errors that occur during compression
    console.error("Error compressing image:", error);
    return null; // Return null if compression fails
  }
};
