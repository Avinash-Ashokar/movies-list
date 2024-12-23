"use client";

import MovieList from "@/components/movie-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { fetchAllMovies } from "@/utility/helper";
import { useUserStateContext } from "@/context/userStateContext";
import Header from "@/components/header";

export default function HomePage() {
  const { user } = useUserStateContext();

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user, router]);

  const [totalMovies, setTotalMovies] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const res = await fetchAllMovies(user.uid);
      setTotalMovies(res.totalMovies);
    };

    fetchData();
  }, [user]);

  return (
    <div>
      {totalMovies === 0 ? (
        <div className="flex justify-center items-center flex-col min-h-[calc(100vh-128px)] sm:gap-y-[40px] sm:p-6">
          <h2 className="text-[32px] font-semibold leading-10 text-center sm:text-5xl sm:font-semibold sm:leading-[56px]">
            Your movie list is empty
          </h2>
          <div
            className="w-full sm:w-[202px]"
            onClick={() => router.push("/add-movie")}
          >
            <Button label="Add a new movie" type="action" />
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col px-6 sm:p-[120px]">
          <Header />
          <MovieList />
        </div>
      )}
    </div>
  );
}
