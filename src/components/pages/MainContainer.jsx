import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = ({ id, titleSelector, isModal }) => {
  let movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (titleSelector) {
    movies = useSelector((store) => store?.movies?.[titleSelector]);
  }
  if (!movies) return;
  const showTrailer = !isModal
    ? movies[0]
    : movies.filter((movie) => movie.id === id)[0];
  return (
    <div>
      <div>
        <VideoTitle
          title={showTrailer?.original_title}
          overView={showTrailer?.overview}
          movieId={showTrailer?.id}
          isModal={isModal}
          showTrailer={showTrailer}
          titleSelector={titleSelector}
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
