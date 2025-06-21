import React from "react";

const WatchTrailerButton = ({ onClick, padding }) => {
  return (
    <div>
      <button
        className={`mr-2 cursor-pointer ${padding} py-3 rounded-xl bg-linear-65 from-purple-500 to-pink-500`}
        onClick={onClick}
      >
        <i className="bi bi-play-fill"></i> Watch Trailer
      </button>
    </div>
  );
};

export default WatchTrailerButton;
