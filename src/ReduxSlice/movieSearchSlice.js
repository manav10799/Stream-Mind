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
      state.searchResults = Object.assign(state.searchResults, searchResults);
      state.searchValue = Object.assign(state.searchValue, searchValue);
    },
  },
});

export default movieSearch.reducer;
export const { addMovies } = movieSearch.actions;
