import React, { useEffect } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../ReduxSlice/UserContext";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Body = () => {
  const dispatchUser = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatchUser(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatchUser(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <Header></Header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
