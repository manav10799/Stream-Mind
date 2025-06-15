import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    upcomingMovies: null,
    videoTeaserKey: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addVideoTeaser: (state, action) => {
      state.videoTeaserKey = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { addNowPlayingMovies, addVideoTeaser, addUpcomingMovies } =
  movieSlice.actions;
