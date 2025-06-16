import React, { useRef, useState } from "react";
import { ai } from "../../utils/gemini";
import { API_SEARCH_PREFIX, GET_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../../ReduxSlice/movieSearchSlice";

const SearchMovies = () => {
  const searchText = useRef();
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.movieSearch);
  const [currentSearchValues, setCurrentSearchValues] = useState();
  const fetchMoviesFromTmbdb = async (movie) => {
    const data = await fetch(
      API_SEARCH_PREFIX + movie + "&include_adult=false&language=en-US&page=1",
      GET_OPTIONS
    );
    const result = await data.json();
    return result.results;
  };

  const handleGptSearch = async () => {
    if (!selector.searchResults[searchText.current.value]) {
      const query =
        "Act as a movie recommendation system. Suggest five movie names based on this query, ensuring the recommendations are fresh each time:" +
        searchText.current.value +
        ". Only give the names of the five movies Example Format:['Tumbbad', 'Stree', 'Pari', 'Bhoot: Part One - The Haunted Ship', '13B']. PS: I don't need description or anything else just names";
      const response = ai?.getGenerativeModel({
        model: "gemini-2.0-flash",
      });
      const result = await response.generateContent(query);
      const data = result.response;
      const responseText = data.text();
      const movieArray = JSON.parse(
        responseText.match(/\[.*\]/)[0].replace(/'/g, '"')
      );
      const fetchedMovies = movieArray.map((movie) =>
        fetchMoviesFromTmbdb(movie)
      );
      const fetchedResults = await Promise.all(fetchedMovies);
      dispatch(
        addMovies({
          searchValue: {
            [searchText.current.value]: movieArray,
          },
          searchResults: {
            [searchText.current.value]: fetchedResults,
          },
        })
      );
    }
    setCurrentSearchValues(selector.searchValue[searchText.current.value]);
    searchText.current.value = "";
  };
  return (
    <div>
      <div className="flex justify-center relative">
        <input
          type="search"
          ref={searchText}
          placeholder="Search Movies With AI 🤖"
          className="p-6 w-1/2 focus:outline-0 bg-stone-900 rounded-xl text-gray-200 mt-10"
        />
        <i
          className="bi bi-arrow-down-circle-fill text-2xl absolute top-15 left-[72%] cursor-pointer"
          onClick={handleGptSearch}
        ></i>
      </div>
      <p className="text-white">{currentSearchValues}</p>
    </div>
  );
};
export default SearchMovies;
