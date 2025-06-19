import { auth, db } from "../utils/firebase";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

const useAddFavorites = async (item, handleClick) => {
  const user = auth.currentUser;
  if (!user) return;

  const favRef = doc(db, "favorites", user.uid);
  try {
    const docSnap = await getDoc(favRef);

    if (docSnap.exists()) {
      const exisitingItems = docSnap.data().items || [];

      const itemsExists = exisitingItems.some(
        (exisitingItem) => exisitingItem.id === item.id
      );
      if (itemsExists) {
        handleClick({
          vertical: "top",
          horizontal: "right",
          message: "Item already exists in favourites",
        })();
        return;
      } else {
        await updateDoc(favRef, {
          items: arrayUnion(item),
        });
        handleClick({
          vertical: "top",
          horizontal: "right",
          message: "Item added to favourites",
        })();
      }
    } else {
      await setDoc(
        favRef,
        {
          items: arrayUnion(item),
        },
        { merge: true }
      );
      handleClick({
        vertical: "top",
        horizontal: "right",
        message: "Item added to favourites",
      })();
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

export default useAddFavorites;
