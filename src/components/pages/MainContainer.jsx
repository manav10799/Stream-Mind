import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  if (!movies) return;
  const showTrailer = movies[0];
  console.log(showTrailer);
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
