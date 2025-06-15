import React from "react";
import useNowPlayingMovies from "../../serviceHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import MovieCardsContainer from "./MovieCardsContainer";
import useUpcomingMovies from "../../serviceHooks/useUpcomingMovies";
const Browse = () => {
  useNowPlayingMovies();
  useUpcomingMovies();
  return (
    <div>
      <MainContainer defaultMovie={0} />
      <MovieCardsContainer />
    </div>
  );
};

export default Browse;
