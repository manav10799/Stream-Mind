import { createSlice } from "@reduxjs/toolkit";

const userContext = createSlice({
  name: "userContextSlice",
  initialState: {},
  reducers: {
    addUser: (_, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      return Object.assign(state, action.payload);
    },
    removeUser: () => {
      return null;
    },
  },
});

export default userContext.reducer;
export const { addUser, removeUser, updateUser } = userContext.actions;
