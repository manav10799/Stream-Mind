import { configureStore } from "@reduxjs/toolkit";
import UserContext from "../ReduxSlice/UserContext";

const AppStore = configureStore({
  reducer: {
    userContextSlice: UserContext,
  },
});

export default AppStore;
