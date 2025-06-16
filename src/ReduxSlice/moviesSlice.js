import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    upcomingMovies: null,
    popularMovies: null,
    favouriteMovies: null,
    videoTeaserKey: {},
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addFavouriteMovies: (state, action) => {
      state.favouriteMovies = action.payload;
    },
    addVideoTeaser: (state, action) => {
      const { movieId, video } = action.payload;
      state.videoTeaserKey[movieId] = video;
    },
  },
});

export default movieSlice.reducer;
export const {
  addNowPlayingMovies,
  addVideoTeaser,
  addUpcomingMovies,
  addFavouriteMovies,
  addPopularMovies,
} = movieSlice.actions;
