import React from "react";
import MovieDetails from "../pages/MovieDetails";
import { useDispatch } from "react-redux";
import { toggleShowTrailer } from "../../ReduxSlice/showTrailerSlice";
import { Box, Modal } from "@mui/material";

const MovieDetailsModal = ({ isModelOpen, movieId, setIsModelOpen }) => {
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#303151",
  };
  return (
    <div>
      <Modal
        open={isModelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => {
          dispatch(toggleShowTrailer({ movieId: null, showTrailer: null }));
          setIsModelOpen(false);
        }}
      >
        <Box sx={style} className="rounded-xl">
          <i
            className="bi bi-x-circle-fill absolute right-[20px] top-[10px] text-xl cursor-pointer"
            onClick={() => {
              dispatch(toggleShowTrailer({ movieId: null, showTrailer: null }));
              setIsModelOpen(false);
            }}
          ></i>
          <MovieDetails movieId={movieId} setIsModelOpen={setIsModelOpen} />
        </Box>
      </Modal>
    </div>
  );
};

export default MovieDetailsModal;
