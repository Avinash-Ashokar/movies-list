"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllMovies, fetchMoviesPage } from "@/utility/helper";
import { useUserStateContext } from "@/context/userStateContext";
import { MovieCard } from "./movie-card";
import PageNav from "../page-nav";
import { Movie } from "@/types";

export default function MovieList() {
  const [movieListData, setMovieListData] = useState<{ [key: string]: Movie }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const { user } = useUserStateContext();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);
  const [moviesPerPage] = useState(8);

  // Effect to handle window resize and update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to fetch movie data when user is available and current page changes
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

      // Update movie list data based on screen size
      if (window.innerWidth < 640) {
        setMovieListData((prevData) => ({ ...prevData, ...movieData }));
      } else {
        setMovieListData(movieData);
      }
    };

    fetchData();
  }, [currentPage]);

  // Effect to handle infinite scrolling for mobile devices
  useEffect(() => {
    if (window.innerWidth > 640) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.8
      ) {
        // Load more movies if available
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

  // Function to change the current page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Return nothing if movie data is not available
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
      {!isMobile && (
        <div className="mt-120">
          <PageNav
            totalMovies={totalMovies}
            moviesPerPage={moviesPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
