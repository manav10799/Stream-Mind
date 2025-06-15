import React from "react";
import useNowPlayingMovies from "../../serviceHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import MovieCardsContainer from "./MovieCardsContainer";
const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <MainContainer />
      <MovieCardsContainer />
      {/* <div>
        {nowPlayingMovies?.results?.map((movie) => (
          <p key={movie.id}>{movie.original_title}</p>
        ))}
      </div> */}
    </div>
  );
};

export default Browse;
