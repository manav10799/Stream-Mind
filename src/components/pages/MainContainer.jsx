import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = ({ defaultMovie, id }) => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;
  const showTrailer =
    defaultMovie === 0
      ? movies[defaultMovie]
      : movies.filter((movie) => movie.id === id)[0];
  return (
    <div>
      <div>
        <VideoTitle
          title={showTrailer?.original_title}
          overView={showTrailer?.overview}
          movieId={showTrailer?.id}
        />
        <VideoBackground
          background={showTrailer?.backdrop_path}
          movieId={showTrailer?.id}
        />
      </div>
    </div>
  );
};

export default MainContainer;
