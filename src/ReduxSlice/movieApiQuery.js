import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_ACCESS_TOKEN } from "../env/env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/movie", // Base URL without the page
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TMDB_ACCESS_TOKEN}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ movieParams }, page = 1) => ({
        url: `/${movieParams}`,
        params: { page },
      }),
    }),
  }),
});

export const { useGetMoviesQuery } = api;
