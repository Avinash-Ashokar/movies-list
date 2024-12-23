"use client";

import MovieList from "@/components/movie-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { fetchAllMovies } from "@/utility/helper";
import { useUserStateContext } from "@/context/userStateContext";
import Header from "@/components/header";

const EmptyPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col min-h-[calc(100vh-111px)] p-24 gap-y-40">
      <h2 className="text-heading-3 font-semibold font-montserrat text-center">
        Your movie list is empty
      </h2>
      <div className="w-full" onClick={() => router.push("/add-movie")}>
        <Button label="Add a new movie" type="action" />
      </div>
    </div>
  );
};

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

  if (totalMovies === 0) return <EmptyPage />;

  return (
    <div className="flex-grow flex flex-col px-24 mb-80">
      <Header />
      <MovieList />
    </div>
  );
}
