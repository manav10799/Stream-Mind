import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import AppStore from "./ReduxStore/AppStore";
import { RouterProvider, createBrowserRouter } from "react-router";
import Login from "./login/login";
import Browse from "./components/pages/Browse";

function App() {
  return (
    <>
      <div className="w-auto h-screen">
        <Provider store={AppStore}>
          <RouterProvider router={browserRouter}></RouterProvider>
        </Provider>
      </div>
    </>
  );
}

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
  },
]);

export default App;
