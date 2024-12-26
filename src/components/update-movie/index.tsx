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
import { notifyError, notifySuccess } from "@/utility/helper";
import useKeyPress from "@/hooks/useKeyPress";

const UpdateMovie: FC<UpdateMovieProps> = ({
  headerTitle,
  selectedMovieData,
}) => {
  const { user } = useUserStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user]);

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

  const [inputError, setInputError] = useState<{
    title: string;
    imageUrl: string;
    year: string;
  }>({
    title: "",
    imageUrl: "",
    year: "",
  });

  const handleSubmit = async () => {
    const { title, year, imageUrl } = movieData;
    setInputError({ title: "", imageUrl: "", year: "" });

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

      notifyError("All Fields are required");
      return;
    }

    try {
      if (user) {
        await addMovie(user.uid, movieData);
        notifySuccess("Movie data updated successfully!");
      } else {
        notifyError("User is not authenticated.");
      }
    } catch (error) {
      notifyError("There was an error saving your data.");
    }

    router.push("/");
  };

  const setMovieFieldValues = (data: string, keyName: string) =>
    setMovieData((prevData) => ({
      ...prevData,
      [keyName]: data,
    }));

  useKeyPress("Escape", () => {
    router.push("/");
  });

  useKeyPress("Enter", () => {
    handleSubmit();
  });

  return (
    <div className="px-24 sm:px-80 lg:px-120 flex-grow flex flex-col">
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
          imageFile={movieData.imageUrl}
          setImageFile={(data: string) => setMovieFieldValues(data, "imageUrl")}
          hasError={inputError["imageUrl"]}
        />
        <div>
          <div className="flex flex-col gap-y-12 sm:gap-y-24 sm:mb-64">
            <div className="lg:min-w-[362px] sm:max-w-[362px]">
              <InputField
                inputData={movieData.title}
                setInputData={(data: string) =>
                  setMovieFieldValues(data, "title")
                }
                placeholderText="Title"
                hasError={inputError["title"]}
              />
            </div>
            <div className="sm:max-w-[212px]">
              <InputField
                inputData={movieData.year}
                setInputData={(data: string) =>
                  setMovieFieldValues(data, "year")
                }
                placeholderText="Publishing year"
                hasError={inputError["year"]}
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

export default UpdateMovie;
