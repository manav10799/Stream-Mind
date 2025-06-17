import React, { useMemo, useRef, useState } from "react";
import {
  API_SEARCH_PREFIX,
  GEMINI_BACKEND_API,
  GET_OPTIONS,
  VIDEO_IMAGE_PREFIX,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../ReduxSlice/movieSearchSlice";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, ...args);
    }
  };
};

const SearchMovies = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const searchText = useRef();
  const [currentValue, setCurrentValue] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.movieSearch);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "black",
  };

  const fetchMoviesFromTmbdb = async (movie) => {
    const data = await fetch(
      API_SEARCH_PREFIX + movie + "&include_adult=false&language=en-US&page=1",
      GET_OPTIONS
    );
    const result = await data.json();
    return result.results;
  };
  const handleGptSearch = async () => {
    const currentSearchQuery = searchText?.current?.value.trim();

    // Check if the search results already exist in Redux state
    if (selector.searchResults[currentSearchQuery]) {
      console.log("Results already in cache for:", currentSearchQuery);
      setCurrentValue(currentSearchQuery);
      return; // Exit if already cached
    }

    // Guard clause for empty input
    if (!currentSearchQuery) {
      console.warn("Search input is empty.");
      return;
    }

    try {
      // 1. Call your Node.js backend for Gemini recommendations
      const backendResponse = await fetch(
        GEMINI_BACKEND_API + "api/get-gemini-recommendations",
        {
          // IMPORTANT: Change for production deployment
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

      console.log(movieArray);

      // 2. Use the movieArray to fetch details from TMDB (still in frontend)
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
    } catch (error) {
      console.error("Error during search process:", error);
    }
    setCurrentValue(currentSearchQuery);
  };

  const throttleClick = useMemo(() => throttle(handleGptSearch, 2000), []);

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
          onClick={throttleClick}
        ></i>
      </div>
      <div className="text-white">
        <div className="w-full mt-10">
          <div className="flex gap-4 justify-center">
            {selector.searchResults[currentValue]?.map((movie, i) => (
              <div
                key={movie.id}
                className="cursor-pointer"
                onClick={() => {
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
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={isModelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => {
          dispatch(toggleShowTrailer({ movieId: null, showTrailer: null }));
          setIsModelOpen(false);
        }}
      >
        <Box sx={style}>
          <i
            className="bi bi-x-circle-fill absolute right-[20px] top-[10px] text-xl cursor-pointer"
            onClick={() => setIsModelOpen(false)}
          ></i>
          <p>Hello World</p>
        </Box>
      </Modal>
    </div>
  );
};
export default SearchMovies;
