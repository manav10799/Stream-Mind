import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { VIDEO_IMAGE_PREFIX } from "../../utils/constants";
import MovieDetailsModal from "../common/MovieDetailsModal";

const MovieCardsList = ({ listTitle, moviesSelector }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [movieId, setShowMovieId] = useState();
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "black",
  };

  return (
    <div>
      <h3 className="text-2xl mb-2 font-semibold text-gray-200">{listTitle}</h3>
      <div className="w-full overflow-x-scroll hide-scrollbar">
        <div className="flex  gap-3 w-max">
          {moviesSelector?.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer"
              onClick={() => {
                setShowMovieId(movie.id);
                setIsModelOpen(true);
              }}
            >
              <img
                src={VIDEO_IMAGE_PREFIX + movie.poster_path}
                className="w-[250px] h-[350px]"
              />
            </div>
          ))}
        </div>
      </div>
      <MovieDetailsModal
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        movieId={movieId}
      />
    </div>
  );
};

export default MovieCardsList;
