import React from "react";
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
        moviesSelector={nowPlayingMoviesSelector}
      />
      <MovieCardsList
        listTitle="Upcoming Movies"
        moviesSelector={upcomingMoviesSelector}
      />
      <MovieCardsList
        listTitle="Popular Movies"
        moviesSelector={popularMovies}
      />
    </div>
  );
};

export default MovieCardsContainer;
