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
  return (
    <div className="p-8 flex flex-col gap-4">
      <MovieCardsList
        listTitle="Now Playing Movies"
        moviesSelector={nowPlayingMoviesSelector}
      />
      <MovieCardsList
        listTitle="Upcoming movies"
        moviesSelector={upcomingMoviesSelector}
      />
    </div>
  );
};

export default MovieCardsContainer;
