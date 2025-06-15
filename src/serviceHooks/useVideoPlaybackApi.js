import { useEffect } from "react";
import { GET_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addVideoTeaser } from "../ReduxSlice/moviesSlice";

const useVideoPlaybackApi = (movieId) => {
  const dispatch = useDispatch();
  const fetchVideoTeaser = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      GET_OPTIONS
    );
    const videos = await data.json();
    const filteredVideo = videos.results.filter(
      (video) => video.type === "Trailer" || video.type === "Teaser"
    );
    const isTrailer = filteredVideo.find((video) => video.type === "Trailer");
    const isTeaser = filteredVideo.find((video) => video.type === "Teaser");
    dispatch(
      addVideoTeaser({
        movieId,
        video: isTrailer || isTeaser,
      })
    );
  };
  useEffect(() => {
    fetchVideoTeaser();
  }, []);
};

export default useVideoPlaybackApi;
