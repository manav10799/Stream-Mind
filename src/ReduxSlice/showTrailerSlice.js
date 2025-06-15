import { createSlice } from "@reduxjs/toolkit";

const showTrailer = createSlice({
  name: "trailer",
  initialState: {
    movieId: null,
    showTrailer: false,
  },
  reducers: {
    toggleShowTrailer: (state, action) => {
      (state.movieId = action.payload.movieId),
        (state.showTrailer = action.payload.showTrailer);
    },
  },
});

export default showTrailer.reducer;
export const { toggleShowTrailer } = showTrailer.actions;
