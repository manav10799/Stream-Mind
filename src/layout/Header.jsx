import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO_HEADER } from "../utils/constants";

const Header = () => {
  const userInfo = useSelector((store) => store.userContextSlice);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <div className="h-20 bg-stone-900 relative">
      <div className="z-10 p-4 opacity-99 flex items-center justify-between">
        <img className="w-16 ml-20" src={LOGO_HEADER} />
        <div className="pr-20 cursor-pointer flex items-center gap-4">
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
