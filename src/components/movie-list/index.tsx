"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllMovies, fetchMoviesPage } from "@/utility/helper";
import { useUserStateContext } from "@/context/userStateContext";
import { MovieCard } from "./movie-card";
import PageNav from "../page-nav";

export default function MovieList() {
  const [movieListData, setMovieListData] = useState<{ [key: string]: any }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [totalMovies, setTotalMovies] = useState(0);
  const { user } = useUserStateContext();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      const res = await fetchAllMovies(user.uid);
      setTotalMovies(res.totalMovies);

      const { movieData } = await fetchMoviesPage(
        user.uid,
        currentPage,
        moviesPerPage
      );

      if (window.innerWidth < 640) {
        setMovieListData((prevData) => ({ ...prevData, ...movieData }));
      } else {
        setMovieListData(movieData);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (window.innerWidth > 640) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.8
      ) {
        if (Object.keys(movieListData).length < totalMovies) {
          handlePageChange(currentPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [movieListData, totalMovies]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!movieListData) return;

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-20 gap-y-40 sm:grid-cols-3 lg:grid-cols-4">
        {Object.keys(movieListData).map((key) => (
          <Link href={`movies/${movieListData[key].id}`} key={key}>
            <MovieCard movieData={movieListData[key]} />
          </Link>
        ))}
      </div>
      <div>
        {!isMobile && (
          <PageNav
            totalMovies={totalMovies}
            moviesPerPage={moviesPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
