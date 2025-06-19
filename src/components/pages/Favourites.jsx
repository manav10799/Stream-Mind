import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import MovieCardsList from "./MovieCardsList";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addFavouriteMovies } from "../../ReduxSlice/moviesSlice";

const Favourites = () => {
  const dispatch = useDispatch();
  const selector = useSelector((store) => store?.movies?.favourites);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(addFavouriteMovies([]));
        return;
      }

      const favRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(favRef);
      if (docSnap.exists()) {
        dispatch(addFavouriteMovies(docSnap.data().items || []));
      } else {
        dispatch(addFavouriteMovies([]));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="p-6">
      <div>
        <MovieCardsList
          listTitle="Favourites"
          moviesSelector={selector}
          isFromFav={true}
        />
      </div>
    </div>
  );
};

export default Favourites;
