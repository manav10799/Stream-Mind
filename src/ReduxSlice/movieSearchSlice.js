import { createSlice } from "@reduxjs/toolkit";

const movieSearch = createSlice({
  name: "movieSearch",
  initialState: {
    searchValue: {},
    searchResults: {},
  },
  reducers: {
    addMovies: (state, action) => {
      const { searchValue, searchResults } = action.payload;
      state.searchResults = searchResults;
      state.searchValue = searchValue;
    },
  },
});

export default movieSearch.reducer;
export const { addMovies } = movieSearch.actions;
