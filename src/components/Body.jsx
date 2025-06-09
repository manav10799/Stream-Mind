import React from "react";
import Login from "../login/login";
import Browse from "./pages/Browse";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

const Body = () => {
  return <RouterProvider router={browserRouter}></RouterProvider>;
};

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);

export default Body;
