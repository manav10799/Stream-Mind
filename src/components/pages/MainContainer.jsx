import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = ({ id }) => {
  let movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;
  const showTrailer = movies[Math.floor(Math.random() * movies?.length)];
  return (
    <div>
      <div>
        <VideoTitle
          title={showTrailer?.original_title}
          overView={showTrailer?.overview}
          movieId={showTrailer?.id}
          showTrailer={showTrailer}
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
