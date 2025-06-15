import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../ReduxSlice/moviesSlice";
import { useEffect } from "react";
import { useGetMoviesQuery } from "../ReduxSlice/movieApiQuery";

const useNowPlayingMovies = () => {
  const { data: nowPlayingMovies } = useGetMoviesQuery({
    movieParams: "now_playing",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addNowPlayingMovies(nowPlayingMovies?.results));
  }, [nowPlayingMovies]);
  return nowPlayingMovies;
};

export default useNowPlayingMovies;
