import React, { useEffect, useRef, useState } from "react";
import {
  API_SEARCH_PREFIX,
  GEMINI_BACKEND_API,
  GET_OPTIONS,
  VIDEO_IMAGE_PREFIX,
} from "../../utils/constants";
import MovieDetailsModal from "../common/MovieDetailsModal";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import useCanPerformActions from "../../serviceHooks/useCanPerformActions";

const MovieCardsList = ({ listTitle, moviesSelector, isFromFav }) => {
  const [isRecommended, setIsRecommended] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [movieId, setShowMovieId] = useState();
  const favSelector = useSelector((store) => store?.movies?.favourites);
  const timer = useRef();
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
  const fetchRecommendedMovie = async (movieList) => {
    const res = await fetch(GEMINI_BACKEND_API + "api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        watched: movieList,
      }),
    });
    const movie = await res.json();
    return movie.recommendation;
  };

  const fetchMoviesFromTmbdb = async (movie) => {
    const data = await fetch(
      API_SEARCH_PREFIX + movie + "&include_adult=false&language=en-US&page=1",
      GET_OPTIONS
    );
    const result = await data.json();
    if (result) setIsLoading(false);
    return result.results;
  };

  const handleSurpriseMe = async () => {
    if (isClicked) return;
    setIsClicked(true);
    if (useCanPerformActions("SurpriseMeButton")) {
      const favMoviesName = favSelector?.map((fav) => fav.title);
      const localStoredMovies =
        JSON.parse(localStorage.getItem("Searched Movies")) || [];
      const finalMovieList = favMoviesName.concat(localStoredMovies);

      const maxRetry = 3;
      let retryCount = 0;
      let recommendMovie = [];
      if (finalMovieList.length) {
        while (retryCount < maxRetry) {
          const recommendedTitle = await fetchRecommendedMovie(
            finalMovieList.join(",")
          );

          if (!recommendedTitle) {
            retryCount++;
            continue;
          }

          const movieDetails = await fetchMoviesFromTmbdb(recommendedTitle);
          recommendMovie = await Promise.resolve(movieDetails);

          if (recommendMovie?.length) {
            break;
          }

          retryCount++;
        }
        setIsRecommended(true);

        if (recommendMovie.length) {
          setShowMovieId(recommendMovie[0].id);
          setIsModelOpen(true);
        } else {
          setShowMovieId(finalMovieList[0].id);
          setIsModelOpen(true);
        }
      } else {
        handleClick({
          vertical: "top",
          horizontal: "right",
          message:
            "Please search for some movies or add them to your favorites so we can generate personalized recommendations for you",
        })();
      }
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    } else {
      handleClick({
        vertical: "top",
        horizontal: "right",
        message: "You exhausted today's limit. Please wait for 24 hours.",
      })();
    }
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl mb-2 font-semibold text-gray-200">
          {listTitle}
        </h3>
        {isFromFav && (
          <button
            className="button cursor-pointer"
            onClick={handleSurpriseMe}
            aria-label="Surprise Me  🤯"
          ></button>
        )}
      </div>
      <div
        className={`w-full ${
          isFromFav ? "" : "overflow-x-scroll hide-scrollbar"
        }`}
      >
        {moviesSelector?.length ? (
          <div
            className={`flex gap-3 ${
              isFromFav ? "flex-wrap md:justify-start justify-center" : "w-max"
            }`}
          >
            {moviesSelector?.map((movie) => (
              <div
                key={movie.id}
                className={`cursor-pointer ${isFromFav ? "relative" : ""}`}
                onClick={() => {
                  setShowMovieId(movie.id);
                  setIsModelOpen(true);
                }}
              >
                <img
                  src={VIDEO_IMAGE_PREFIX + movie.poster_path}
                  className="w-[250px] h-[350px]"
                />
              </div>
            ))}
          </div>
        ) : (
          isFromFav && (
            <div className="w-full flex justify-center opacity-50">
              <img src="../../image.png" />
            </div>
          )
        )}
      </div>
      <MovieDetailsModal
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        movieId={movieId}
        isRecommended={isRecommended}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal, message }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default MovieCardsList;
