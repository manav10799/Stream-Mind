import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleShowTrailer } from "../../ReduxSlice/showTrailerSlice";

import Snackbar from "@mui/material/Snackbar";
import AddFavButton from "../common/AddFavButton";
import useAddFavorites from "../../serviceHooks/useAddFavorites";
import WatchTrailerButton from "../common/WatchTrailerButton";

const VideoTitle = ({ title, overView, movieId, isModal, showTrailer }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  const dispatch = useDispatch();
  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleShowTrailerButton = () => {
    dispatch(toggleShowTrailer({ movieId: movieId, showTrailer: true }));
  };

  const handleAddWishlist = () => {
    useAddFavorites({ ...showTrailer }, handleClick);
  };
  return (
    <div
      className={`absolute text-white left-5 md:left-20 top-25 ${
        isModal ? "top-30" : "lg:top-80"
      }`}
    >
      <div>
        <div>
          <h1 className="md:text-5xl font-bold text-2xl flex-wrap">{title}</h1>
        </div>
        <p
          title={overView}
          className={`text-gray-300 mt-4 mb-1" ${
            isModal
              ? "w-1/4 text-wrap truncate-2-custom"
              : "w-1/3 truncate-2-custom-main"
          }`}
        >
          {overView}
        </p>
        <div className="flex items-center mt-4">
          <WatchTrailerButton
            onClick={handleShowTrailerButton}
            padding="px-16"
          />
          <AddFavButton onClick={handleAddWishlist} />
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal, message }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default VideoTitle;
