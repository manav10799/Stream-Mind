import { useDispatch } from "react-redux";
import { addPopularMovies } from "../ReduxSlice/moviesSlice";
import { useEffect } from "react";
import { useGetMoviesQuery } from "../ReduxSlice/movieApiQuery";

const usePopularMovies = () => {
  const { data: popularMovies } = useGetMoviesQuery({
    movieParams: "popular",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addPopularMovies(popularMovies?.results));
  }, [popularMovies]);
  return popularMovies;
};

export default usePopularMovies;
