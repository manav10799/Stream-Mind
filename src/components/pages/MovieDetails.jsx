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
import WatchTrailerButton from "../common/WatchTrailerButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowTrailer } from "../../ReduxSlice/showTrailerSlice";
import VideoBackground from "./VideoBackground";
import { useLocation } from "react-router";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  addMovieEmoji,
  removeFavouriteMovies,
} from "../../ReduxSlice/moviesSlice";
import useCanPerformActions from "../../serviceHooks/useCanPerformActions";

const MovieDetails = ({ movieId, setIsModelOpen, isRecommended }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selector = useSelector((store) => store?.trailer);
  const emojiSelector = useSelector((store) => store?.movies.movieNameEmoji);
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

  const handleConvert = async () => {
    if (!emojiSelector[movieDetails?.title]) {
      fetch("http://localhost:3001/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieTitle: movieDetails?.title }),
      })
        .then((res) => res.json())
        .then((data) => {
          const reply = data;
          dispatch(
            addMovieEmoji({ movieName: reply.movieTitle, emoji: reply.emoji })
          );
        });
    }
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

  const handleRemoveFavourites = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const favRef = doc(db, "favorites", user.uid);
    try {
      const docSnap = await getDoc(favRef);
      if (docSnap.exists()) {
        const existingItems = docSnap.data().items || [];
        const updatedItems = existingItems.filter(
          (item) => item.id !== movieId
        );

        if (updatedItems.length === existingItems.length) {
          return;
        }
        await updateDoc(favRef, {
          items: updatedItems,
        });
        setIsModelOpen();
        dispatch(removeFavouriteMovies(movieId));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleEmojiClick = () => {
    if (useCanPerformActions("handleConvertEmoji")) {
      handleConvert();
    } else {
      handleClick({
        vertical: "top",
        horizontal: "right",
        message: "You exhausted today's limit. Please wait for 24 hours.",
      })();
    }
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
            <div className="flex items-center text-container flex-wrap">
              <h1 className="text-3xl font-bold mr-2">
                {movieDetails?.original_title}
              </h1>
              <h1 className="text-3xl font-bold mr-2">
                {emojiSelector[movieDetails?.title] && (
                  <i className="bi bi-caret-right mr-3"></i>
                )}
                <span className="font-bold">
                  {emojiSelector[movieDetails?.title]}
                </span>
              </h1>
              <p className="text-gray-200">
                ({new Date(movieDetails?.release_date).getFullYear()})
              </p>
              <i
                title="Click To Make It Emojinal"
                className="ml-4 bi bi-magic text-4xl text-red-400 cursor-pointer"
                onClick={handleEmojiClick}
              ></i>
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
              <WatchTrailerButton
                onClick={handleShowTrailerButton}
                padding="px-10"
              />
              {!isRecommended &&
                (location.pathname !== "/favourites" ? (
                  <AddFavButton onClick={handleAddWishlist} />
                ) : (
                  <i
                    className="bi bi-trash cursor-pointer text-xl"
                    title="Remove from favourites"
                    onClick={handleRemoveFavourites}
                  ></i>
                ))}
            </div>
            <Snackbar
              anchorOrigin={{ vertical, horizontal, message }}
              open={open}
              onClose={handleClose}
              message={message}
              key={vertical + horizontal}
            />
          </div>
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
