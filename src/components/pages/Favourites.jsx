import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import MovieCardsList from "./MovieCardsList";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const getFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const favRef = doc(db, "favorites", user.uid);
    const docSnap = await getDoc(favRef);
    docSnap.exists() && setFavorites(docSnap.data().items || []);

    if (docSnap.exists()) {
      return docSnap.data().items || [];
    } else {
      return [];
    }
  };
  useEffect(() => {
    getFavorites();
  }, []);
  return (
    <div className="p-6">
      <div>
        <MovieCardsList
          listTitle="Favourites"
          moviesSelector={favorites}
          titleSelector={favorites.titleSelector}
        />
      </div>
    </div>
  );
};

export default Favourites;
