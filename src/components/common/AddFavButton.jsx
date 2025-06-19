import React from "react";

const AddFavButton = ({ onClick }) => {
  return (
    <div>
      <i
        className="bi bi-plus-square-dotted text-4xl text-gray-300 cursor-pointer"
        title="Favourites"
        onClick={onClick}
      ></i>
    </div>
  );
};

export default AddFavButton;
