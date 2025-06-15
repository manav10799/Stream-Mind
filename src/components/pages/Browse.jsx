import React from "react";
import useNowPlayingMovies from "../../serviceHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import MovieCardsContainer from "./MovieCardsContainer";
import useUpcomingMovies from "../../serviceHooks/useUpcomingMovies";
import usePopularMovies from "../../serviceHooks/useAddPopularMovies";
const Browse = () => {
  useNowPlayingMovies();
  useUpcomingMovies();
  usePopularMovies();
  return (
    <div>
      <MainContainer />
      <MovieCardsContainer />
    </div>
  );
};

export default Browse;
