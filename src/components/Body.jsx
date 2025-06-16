import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../ReduxSlice/UserContext";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import useUpcomingMovies from "../serviceHooks/useUpcomingMovies";
import usePopularMovies from "../serviceHooks/useAddPopularMovies";
import useNowPlayingMovies from "../serviceHooks/useNowPlayingMovies";

const Body = () => {
  const dispatchUser = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useNowPlayingMovies();
  useUpcomingMovies();
  usePopularMovies();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatchUser(addUser({ uid, email, displayName, photoURL }));
        const currentPath = location.pathname;
        if (currentPath === "/") {
          navigate("/browse", { replace: true });
        }
      } else {
        dispatchUser(removeUser());
        navigate("/", { replace: true });
      }
    });
    return () => unsubscribe();
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
