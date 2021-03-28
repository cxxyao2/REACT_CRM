import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Reducer
const slice = createSlice({
  name: "clients",
  initialState: [],
  reducers: {
    // actions => action handlers
    // action is a object ={type, payload}
    clientAdded: (clients, action) => {
      clients.push(action.payload);
    },
    clientMoved: (clients, action) => {
      if (clients && clients.length >= 1) clients.splice(0, 1);
    },
  },
});

export const { clientAdded, clientMoved } = slice.actions;

export default slice.reducer;

export const getClients = createSelector(
  (state) => (state && state.entities.clients) || []
);
