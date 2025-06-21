import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    upcomingMovies: null,
    popularMovies: null,
    favourites: null,
    movieNameEmoji: {},
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
      state.favourites = action.payload;
    },
    removeFavouriteMovies: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload
      );
    },
    addVideoTeaser: (state, action) => {
      const { movieId, video } = action.payload;
      state.videoTeaserKey[movieId] = video;
    },
    addMovieEmoji: (state, action) => {
      const { movieName, emoji } = action.payload;
      state.movieNameEmoji[movieName] = emoji;
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
  removeFavouriteMovies,
  addMovieEmoji,
} = movieSlice.actions;
