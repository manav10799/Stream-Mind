import React from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router";

const Header = () => {
  const userInfo = useSelector((store) => store.userContextSlice);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <div className="h-20 bg-black fixed w-full z-20 top-0">
      <div className="z-10 p-4 opacity-99 flex items-center justify-between">
        <Link to={auth.currentUser ? "/browse" : ""}>
          <img className="w-50 ml-20 hidden sm:block" src="../../logo.png" />
          <img className="w-8 block sm:hidden" src="../../logo-sm.png" />
        </Link>
        <div className="sm:mr-20 cursor-pointer flex items-center gap-4">
          {userInfo && (
            <div className="flex items-center">
              <Link to="/search">
                <img
                  src="../../gemini.svg"
                  className="h-7 mr-6"
                  title="AI Movie Search"
                />
              </Link>
              <Link to="/favourites">
                <i
                  className="bi bi-collection-play-fill text-white text-2xl mr-4"
                  title="Favourites"
                ></i>
              </Link>
            </div>
          )}
          {userInfo?.photoURL ? (
            <img src={userInfo.photoURL} className="h-10 rounded-full" />
          ) : (
            userInfo && (
              <i className="bi bi-person-circle text-white text-2xl"></i>
            )
          )}

          {userInfo && (
            <p className="text-white cursor-pointer" onClick={handleSignOut}>
              Sign Out
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
