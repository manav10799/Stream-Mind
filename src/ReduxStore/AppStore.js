import { configureStore } from "@reduxjs/toolkit";
import UserContext from "../ReduxSlice/UserContext";
import { api } from "../ReduxSlice/movieApiQuery";
import moviesSlice from "../ReduxSlice/moviesSlice";
import showTrailer from "../ReduxSlice/showTrailerSlice";
import movieSearchSlice from "../ReduxSlice/movieSearchSlice";

const AppStore = configureStore({
  reducer: {
    userContextSlice: UserContext,
    movies: moviesSlice,
    trailer: showTrailer,
    movieSearch: movieSearchSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

export default AppStore;
