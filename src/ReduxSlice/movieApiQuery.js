import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_ACCESS_TOKEN } from "../env/env";
import { API_PREFIX } from "../utils/constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_PREFIX, // Base URL without the page
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
