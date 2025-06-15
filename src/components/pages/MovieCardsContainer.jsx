import React, { use } from "react";
import MovieCardsList from "./MovieCardsList";
import { useSelector } from "react-redux";

const MovieCardsContainer = () => {
  const nowPlayingMoviesSelector = useSelector(
    (store) => store?.movies?.nowPlayingMovies
  );
  const upcomingMoviesSelector = useSelector(
    (store) => store?.movies?.upcomingMovies
  );
  const popularMovies = useSelector((store) => store?.movies?.popularMovies);
  return (
    <div className="p-8 flex flex-col gap-4">
      <MovieCardsList
        listTitle="Now Playing Movies"
        titleSelector="nowPlayingMovies"
        moviesSelector={nowPlayingMoviesSelector}
      />
      <MovieCardsList
        listTitle="Upcoming Movies"
        titleSelector="upcomingMovies"
        moviesSelector={upcomingMoviesSelector}
      />
      <MovieCardsList
        listTitle="Popular Movies"
        titleSelector="popularMovies"
        moviesSelector={popularMovies}
      />
    </div>
  );
};

export default MovieCardsContainer;
