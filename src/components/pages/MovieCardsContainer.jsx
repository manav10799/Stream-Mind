import React from "react";
import { useDispatch } from "react-redux";
import { toggleShowTrailer } from "../../ReduxSlice/showTrailerSlice";

const MovieCardsContainer = () => {
  const dispatch = useDispatch();
  const handleShowTrailerButton = () => {
    dispatch(toggleShowTrailer({ movieId: 1212, showTrailer: true }));
  };
  return <div onClick={handleShowTrailerButton}>MovieCardsContainer</div>;
};

export default MovieCardsContainer;
