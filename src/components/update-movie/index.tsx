"use client"; // Indicates that this component is a client component in Next.js

import { FC, useEffect } from "react"; // Importing necessary hooks and types
import InputField from "@/components/input-field"; // Importing custom InputField component
import Button from "@/components/button"; // Importing custom Button component
import { useState } from "react"; // Importing useState hook for state management
import { UpdateMovieProps, Movie } from "@/types"; // Importing types for props and movie data
import { useRouter } from "next/navigation"; // Importing useRouter for navigation
import Link from "next/link"; // Importing Link for client-side navigation
import { useUserStateContext } from "@/context/userStateContext"; // Importing user context for authentication
import ImageUpload from "../image-upload"; // Importing ImageUpload component for image handling
import { notifyError, notifySuccess } from "@/utility/helper"; // Importing notification helper functions
import useKeyPress from "@/hooks/useKeyPress";

// Functional component for updating movie details
const UpdateMovie: FC<UpdateMovieProps> = ({
  headerTitle, // Title for the header
  selectedMovieData, // Data of the movie to be updated
}) => {
  const { user } = useUserStateContext(); // Getting user state from context
  const router = useRouter(); // Initializing router for navigation

  // Effect to redirect to sign-in if user is not authenticated
  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);

  // State to hold movie data
  const [movieData, setMovieData] = useState<Movie>({
    title: selectedMovieData?.title || "", // Initial title from selected movie data
    year: selectedMovieData?.year || "", // Initial year from selected movie data
    imageUrl: selectedMovieData?.imageUrl || "", // Initial image URL from selected movie data
    id: selectedMovieData?.id || "", // Initial ID from selected movie data
  });

  // Effect to update movie data when selected movie data changes
  useEffect(() => {
    setMovieData({
      title: selectedMovieData?.title || "",
      year: selectedMovieData?.year || "",
      imageUrl: selectedMovieData?.imageUrl || "",
      id: selectedMovieData?.id || "",
    });
  }, [selectedMovieData]);

  // Function to add or update movie data via API
  async function addMovie(uid: string, movieData: Movie) {
    try {
      const response = await fetch("/api/movies", {
        method: "POST", // HTTP method for adding movie
        headers: {
          "Content-Type": "application/json", // Setting content type to JSON
          uid: uid, // Including user ID in headers
        },
        body: JSON.stringify(movieData), // Sending movie data as JSON
      });

      const data = await response.json(); // Parsing response data

      if (!response.ok) {
        throw new Error(data.error); // Throwing error if response is not OK
      }

      return data; // Returning response data
    } catch (error) {
      throw error; // Propagating error
    }
  }

  // State to hold input errors for validation
  const [inputError, setInputError] = useState<{
    title: string; // Error message for title
    imageUrl: string; // Error message for image URL
    year: string; // Error message for year
  }>({
    title: "",
    imageUrl: "",
    year: "",
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    const { title, year, imageUrl } = movieData; // Destructuring movie data
    setInputError({ title: "", imageUrl: "", year: "" }); // Resetting input errors

    // Validating input fields
    if (!imageUrl || !title || !year) {
      if (!imageUrl)
        setInputError((prev) => ({ ...prev, imageUrl: "Image is required" }));
      if (!title)
        setInputError((prev) => ({ ...prev, title: "Title is required" }));
      if (!year)
        setInputError((prev) => ({
          ...prev,
          year: "Publishing year is required",
        }));

      notifyError("All Fields are required"); // Notifying user of missing fields
      return; // Exiting function if validation fails
    }

    try {
      if (user) {
        await addMovie(user.uid, movieData); // Adding movie if user is authenticated
        notifySuccess("Movie data updated successfully!"); // Notifying success
      } else {
        notifyError("User is not authenticated."); // Notifying if user is not authenticated
      }
    } catch (error) {
      notifyError("There was an error saving your data."); // Notifying error during submission
    }

    router.push("/"); // Redirecting to home after submission
  };

  // Function to set movie field values
  const setMovieFieldValues = (data: string, keyName: string) =>
    setMovieData((prevData) => ({
      ...prevData,
      [keyName]: data, // Updating specific field in movie data
    }));

  // Handling key press events for Escape and Enter keys
  useKeyPress("Escape", () => {
    router.push("/"); // Redirecting to home on Escape
  });

  useKeyPress("Enter", () => {
    handleSubmit(); // Submitting form on Enter
  });

  // Rendering the component
  return (
    <div className="px-24 sm:px-80 lg:px-120 flex-grow flex flex-col sm:mb-80">
      <div className="my-80 sm:my-120">
        <h2 className="text-heading-3 sm:text-heading-2 font-semibold text-textColor font-montserrat">
          {headerTitle}
        </h2>
      </div>
      <div className="gap-y-6 sm:gap-y-0 flex flex-col-reverse sm:gap-x-80 lg:gap-x-120 sm:flex-row">
        <div className="grid grid-cols-2 gap-x-12 visible mt-16 sm:hidden">
          <Link href="/">
            <Button type="outline" label="Cancel" />
          </Link>
          <Button onClick={handleSubmit} type="action" label="Submit" />
        </div>
        <ImageUpload
          imageFile={movieData.imageUrl} // Current image file
          setImageFile={(data: string) => setMovieFieldValues(data, "imageUrl")} // Setting image file
          hasError={inputError["imageUrl"]} // Error state for image upload
        />
        <div>
          <div className="flex flex-col gap-y-12 sm:gap-y-24 sm:mb-64">
            <div className="lg:min-w-[362px] sm:max-w-[362px]">
              <InputField
                inputData={movieData.title} // Current title
                setInputData={
                  (data: string) => setMovieFieldValues(data, "title") // Setting title
                }
                placeholderText="Title" // Placeholder for title input
                hasError={inputError["title"]} // Error state for title input
              />
            </div>
            <div className="sm:max-w-[212px]">
              <InputField
                inputData={movieData.year} // Current year
                setInputData={
                  (data: string) => setMovieFieldValues(data, "year") // Setting year
                }
                placeholderText="Publishing year" // Placeholder for year input
                hasError={inputError["year"]} // Error state for year input
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 gap-x-12 hidden sm:visible">
            <Link href="/">
              <Button type="outline" label="Cancel" />
            </Link>
            <Button onClick={handleSubmit} type="action" label="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie; // Exporting the UpdateMovie component
