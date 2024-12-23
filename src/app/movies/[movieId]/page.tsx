"use client";

import UpdateMovie from "@/components/update-movie";
import { useUserStateContext } from "@/context/userStateContext";
import { Movie } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getMovieId(url: string) {
  const parts = url.split("/"); // Split the string by '/'
  return parts[2]; // Return the part after '/movie/'
}

export default function MoviePage() {
  const { user } = useUserStateContext();

  const pathUrl = usePathname();

  const movieId = getMovieId(pathUrl);

  const [movieData, setMovieData] = useState<Movie | null>();

  useEffect(() => {
    if (!user) return;

    async function fetchMovieData(uid: string, movieId: string) {
      try {
        const response = await fetch(`/api/movies/${movieId}`, {
          headers: {
            uid: uid,
          },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        setMovieData(data);
      } catch (error) {
        throw error;
      }
    }

    fetchMovieData(user.uid, movieId);
  }, [user, movieId]);

  if (!user) return;

  return <UpdateMovie headerTitle="Edit" selectedMovieData={movieData} />;
}
