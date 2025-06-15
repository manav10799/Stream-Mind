import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowTrailer } from "../../ReduxSlice/showTrailerSlice";

const VideoTitle = ({ title, overView, movieId }) => {
  const dispatch = useDispatch();
  const handleShowTrailerButton = () => {
    dispatch(toggleShowTrailer({ movieId, showTrailer: true }));
  };
  const showTrailer = useSelector((store) => store?.trailer?.showTrailer);
  return (
    <div className="absolute text-white top-80 left-20">
      <div>
        <div>
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
        <p className="text-gray-300 w-1/3 mt-4">{overView}</p>
        <div className="flex items-center mt-4">
          <button
            className="mr-2 cursor-pointer px-20 py-3 rounded-xl bg-linear-65 from-purple-500 to-pink-500"
            onClick={handleShowTrailerButton}
          >
            <i className="bi bi-play-fill"></i> Watch Trailer
          </button>
          <i
            className="bi bi-file-plus-fill text-4xl text-gray-300 cursor-pointer"
            title="wishlist"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
