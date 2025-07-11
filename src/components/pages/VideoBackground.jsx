import React from "react";
import { VIDEO_IMAGE_PREFIX } from "../../utils/constants";
import { useSelector } from "react-redux";
import useVideoPlaybackApi from "../../serviceHooks/useVideoPlaybackApi";

const VideoBackground = ({ background, movieId }) => {
  const selector = useSelector((store) => store?.trailer);
  useVideoPlaybackApi(movieId);
  const videoTeaserSelector = useSelector(
    (store) => store?.movies?.videoTeaserKey[movieId]
  );
  return (
    <div>
      {selector.showTrailer && selector.movieId === movieId ? (
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoTeaserSelector?.key}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      ) : (
        <img src={VIDEO_IMAGE_PREFIX + background} />
      )}
      <div></div>
    </div>
  );
};

export default VideoBackground;
