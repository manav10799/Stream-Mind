import React, { useEffect, useState } from "react";
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
    dispatch(addVideoTeaser(filteredVideo[0]));
  };
  useEffect(() => {
    fetchVideoTeaser();
  }, []);
};

export default useVideoPlaybackApi;
