"use client";

import { FC, useEffect } from "react";
import InputField from "@/components/input-field";
import Button from "@/components/button";
import { useState } from "react";
import { UpdateMovieProps, Movie } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStateContext } from "@/context/userStateContext";
import ImageUpload from "../image-upload";

const UpdateMovie: FC<UpdateMovieProps> = ({
  headerTitle,
  selectedMovieData,
}) => {
  const { user } = useUserStateContext();
  const router = useRouter();

  if (!user) router.push("/signin");

  const [movieData, setMovieData] = useState<Movie>({
    title: selectedMovieData?.title || "",
    year: selectedMovieData?.year || "",
    imageUrl: selectedMovieData?.imageUrl || "",
    id: selectedMovieData?.id || "",
  });

  useEffect(() => {
    setMovieData({
      title: selectedMovieData?.title || "",
      year: selectedMovieData?.year || "",
      imageUrl: selectedMovieData?.imageUrl || "",
      id: selectedMovieData?.id || "",
    });
  }, [selectedMovieData]);

  async function addMovie(uid: string, movieData: Movie) {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: uid,
        },
        body: JSON.stringify(movieData),
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

  const handleSubmit = async () => {
    const { title, year, imageUrl } = movieData;
    if (!imageUrl || !title || !year) {
      alert("Please fill all the fields");
      return;
    }

    try {
      if (user) {
        await addMovie(user.uid, movieData);
        alert("Movie data stored successfully!");
      } else {
        alert("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error saving movie data:", error);
      alert("There was an error saving your data.");
    }

    router.push("/");
  };

  const setMovieFieldValues = (data: string, keyName: string) =>
    setMovieData((prevData) => ({
      ...prevData,
      [keyName]: data,
    }));

  return (
    <div className="p-6 flex-grow flex flex-col sm:p-[120px] sm:pb-0">
      <div>
        <h2 className="text-[32px] font-semibold leading-10 sm:text-5xl sm:font-semibold sm:leading-[56px] mb-20 sm:mb-0">
          {headerTitle}
        </h2>
      </div>
      <div className="sm:mt-[120px] gap-y-6 sm:gap-y-0 flex flex-col-reverse sm:gap-x-[127px]">
        <div className="flex gap-x-3 visible mt-4 sm:hidden">
          <Link href="/">
            <Button type="outline" label="Cancel" />
          </Link>
          <Button onClick={handleSubmit} type="action" label="Submit" />
        </div>
        <ImageUpload
          imageFile={movieData.imageUrl}
          setImageFile={(data: string) => setMovieFieldValues(data, "imageUrl")}
        />
        <div>
          <div className="flex flex-col gap-y-6 sm:mb-16">
            <InputField
              inputData={movieData.title}
              setInputData={(data: string) =>
                setMovieFieldValues(data, "title")
              }
              placeholderText="Title"
            />
            <InputField
              inputData={movieData.year}
              setInputData={(data: string) => setMovieFieldValues(data, "year")}
              placeholderText="Publishing Year"
            />
          </div>
          <div className="sm:flex gap-x-3 hidden sm:visible">
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

export default UpdateMovie;
