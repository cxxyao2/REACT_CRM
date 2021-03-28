import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Reducer
const slice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    // actions => action handlers
    // action is a object ={type, payload}
    userLogin: (user, action) => {
      user.push(action.payload);
    },
    userLogout: (user, action) => {
      user.splice(0, 1);
    },
  },
});

export const { userLogin, userLogout } = slice.actions;

export default slice.reducer;

export const getUser = createSelector(
  (state) => (state && state.entities.user) || []
);
