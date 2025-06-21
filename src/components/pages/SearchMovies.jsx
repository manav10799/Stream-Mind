import React, { useEffect, useRef, useState } from "react";
import {
  API_SEARCH_PREFIX,
  GEMINI_BACKEND_API,
  GET_OPTIONS,
  VIDEO_IMAGE_PREFIX,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../ReduxSlice/movieSearchSlice";
import Snackbar from "@mui/material/Snackbar";
import Skeleton from "@mui/material/Skeleton";
import MovieDetailsModal from "../common/MovieDetailsModal";
import Facts from "./Facts";
import useCanPerformActions from "../../serviceHooks/useCanPerformActions";
import useClearLocalStorage from "../../serviceHooks/useClearLocalStorage";

const SearchMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const searchText = useRef();
  const [currentValue, setCurrentValue] = useState("");
  const dispatch = useDispatch();
  const [movieId, setMovieId] = useState(null);
  const selector = useSelector((store) => store.movieSearch);
  const timeOutRef = useRef();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    result: "",
  });
  const { vertical, horizontal, open, result } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "#303151",
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
  const handleGptSearch = async () => {
    if (useCanPerformActions("MovieSearch")) {
      setIsLoading(true);
      if (isClicked) return;
      setIsClicked(true);
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
      timeOutRef.current = setTimeout(() => setIsClicked(false), 2000);
      const currentSearchQuery = searchText?.current?.value.trim();

      if (selector.searchResults[currentSearchQuery]) {
        handleClick({
          vertical: "top",
          horizontal: "right",
          result: "Results already fetched for " + currentSearchQuery,
        })();
        setIsLoading(false);
        setCurrentValue(currentSearchQuery);
        return;
      }

      if (!currentSearchQuery) {
        return;
      }

      try {
        const backendResponse = await fetch(
          GEMINI_BACKEND_API + "api/get-gemini-recommendations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchQuery: currentSearchQuery }),
          }
        );

        if (!backendResponse.ok) {
          const errorData = await backendResponse.json();
          throw new Error(
            errorData.error ||
              "Failed to get Gemini recommendations from backend."
          );
        }

        const backendData = await backendResponse.json();
        const movieArray = backendData.recommendedNames;

        const fetchedMoviePromises = movieArray.map((movieTitle) =>
          fetchMoviesFromTmbdb(movieTitle)
        );

        const fetchedResults = await Promise.all(fetchedMoviePromises);
        let filteredFetchedResults = [];
        for (let subArray of fetchedResults) {
          if (subArray.length >= 1) {
            filteredFetchedResults.push(subArray[0]);
          }
        }

        dispatch(
          addMovies({
            searchValue: {
              [currentSearchQuery]: movieArray,
            },
            searchResults: {
              [currentSearchQuery]: filteredFetchedResults,
            },
          })
        );
        useClearLocalStorage("tmlsm", movieArray);
      } catch (error) {}
      setCurrentValue(currentSearchQuery);
    } else {
      handleClick({
        horizontal: "right",
        vertical: "top",
        result: "You exhausted today's limit. Please wait for 24 hours.",
      })();
    }
  };

  useEffect(() => {
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center relative">
        <input
          type="search"
          ref={searchText}
          placeholder="Search Movies With AI 🤖"
          className="p-6 w-1/2 focus:outline-none bg-stone-900 rounded-xl text-gray-200 mt-10 input-search"
        />
        <i
          className="bi bi-arrow-down-circle-fill text-2xl absolute top-15 left-[72%] cursor-pointer"
          onClick={handleGptSearch}
        ></i>
      </div>
      <Facts />

      {!isLoading ? (
        <div className="text-white">
          <div className="w-full mt-10">
            <div className="flex gap-4 justify-center">
              {selector.searchResults[currentValue]?.map((movie, i) => (
                <div key={movie.id}>
                  {movie && (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setMovieId(movie.id);
                        setIsModelOpen(true);
                      }}
                    >
                      <p
                        className="font-bold text-sm w-[200px] mb-2 truncate"
                        title={selector.searchValue[currentValue][i]}
                      >
                        {i + 1}. {selector.searchValue[currentValue][i]}
                      </p>
                      <img
                        src={VIDEO_IMAGE_PREFIX + movie.poster_path}
                        className="w-[200px] h-[300px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10 gap-4">
          {[1, 2, 3, 4, 5].map((m) => (
            <div key={m}>
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                animation="wave"
                width={200}
                height={300}
              />
            </div>
          ))}
        </div>
      )}
      <MovieDetailsModal
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        movieId={movieId}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal, result }}
        open={open}
        onClose={handleClose}
        message={result}
        key={vertical + horizontal}
      />
    </div>
  );
};
export default SearchMovies;
