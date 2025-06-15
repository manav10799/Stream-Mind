import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../ReduxSlice/moviesSlice";
import { useEffect } from "react";
import { useGetMoviesQuery } from "../ReduxSlice/movieApiQuery";

const useUpcomingMovies = () => {
  const { data: upcomingMovies } = useGetMoviesQuery({
    movieParams: "upcoming",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addUpcomingMovies(upcomingMovies?.results));
  }, [upcomingMovies]);
  return upcomingMovies;
};

export default useUpcomingMovies;
