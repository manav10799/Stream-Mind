import React, { useEffect, useState } from "react";
import {
  GET_OPTIONS,
  MOVIE_DETAILS_PREFIX,
  VIDEO_IMAGE_PREFIX,
} from "../../utils/constants";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddFavButton from "../common/AddFavButton";
import useAddFavorites from "../../serviceHooks/useAddFavorites";
import { Snackbar } from "@mui/material";
import WacthTrailerButton from "../common/WacthTrailerButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowTrailer } from "../../ReduxSlice/showTrailerSlice";
import VideoBackground from "./VideoBackground";
import { useLocation } from "react-router";

const MovieDetails = ({ movieId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selector = useSelector((store) => store?.trailer);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState();
  const handleAddWishlist = () => {
    useAddFavorites({ ...movieDetails }, handleClick);
  };

  const handleShowTrailerButton = () => {
    dispatch(toggleShowTrailer({ movieId: movieId, showTrailer: true }));
  };

  const fetchMovieDetails = async () => {
    const data = await fetch(
      `${MOVIE_DETAILS_PREFIX}${movieId}?language=en-US`,
      GET_OPTIONS
    );
    const result = await data.json();
    if (result) setIsLoading(false);
    setMovieDetails(result);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails();
  }, []);
  return !isLoading ? (
    <div>
      {!selector?.showTrailer ? (
        <div className="p-6 flex">
          <img
            className="w-[150px] h-[200px] rounded-xl min-w-[150px]"
            src={VIDEO_IMAGE_PREFIX + movieDetails?.poster_path}
          />
          <div className="ml-4">
            <div className="flex items-center text-container">
              <h1 className="text-3xl font-bold mr-2">
                {movieDetails?.original_title}
              </h1>
              <p className="text-gray-200">
                ({new Date(movieDetails?.release_date).getFullYear()})
              </p>
            </div>
            <div className="flex items-center mt-2 relative">
              <p className="border w-max py-0.5 px-1 text-sm text-white/60 before:content-['.'] before:absolute before:left-6 before:top-0 before:text-white mr-3">
                {movieDetails?.adult ? "A" : "U"}
              </p>
              {movieDetails?.genres.map((genres, i) => (
                <p key={genres?.id} className="text-[12px] text-gray-200">
                  {genres?.name}
                  {i !== movieDetails.genres.length - 1 && ","}
                </p>
              ))}
              <p className="text-[12px] text-gray-200 ml-2 ">
                {Math.floor(movieDetails?.runtime / 60)}h
                {movieDetails?.runtime % 60}m
              </p>
            </div>
            <p className="text-sm text-wrap mt-3 truncate text-gray-200">
              {movieDetails?.overview}
            </p>
            <div className="flex items-center mt-4">
              <WacthTrailerButton onClick={handleShowTrailerButton} />
              {location.pathname !== "/favourites" && (
                <AddFavButton onClick={handleAddWishlist} />
              )}
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal, message }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
          />
        </div>
      ) : (
        <div className="flex">
          <div className="absolute top-[20%] left-[6%]">
            <h1 className="text-3xl font-bold mr-2 opacity-80">
              {movieDetails?.original_title}
            </h1>
            <p className="text-sm text-wrap mt-3 truncate-2-custom w-1/2 text-gray-200 opacity-80 mb-2">
              {movieDetails?.overview}
            </p>
            <i
              className="bi bi-arrow-left-square-fill text-3xl cursor-pointer"
              onClick={() => {
                dispatch(toggleShowTrailer({ showTrailer: false }));
              }}
            ></i>
          </div>
          <div className="w-full">
            <VideoBackground movieId={movieId} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={isLoading}
      onClick={() => setIsLoading(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default MovieDetails;
