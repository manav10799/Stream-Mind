import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import MovieCardsList from "./MovieCardsList";
import { onAuthStateChanged } from "firebase/auth";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFavorites([]);
        return;
      }

      const favRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(favRef);
      if (docSnap.exists()) {
        setFavorites(docSnap.data().items || []);
      } else {
        setFavorites([]);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="p-6">
      <div>
        <MovieCardsList listTitle="Favourites" moviesSelector={favorites} />
      </div>
    </div>
  );
};

export default Favourites;
