import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiAction";
import { createSelector } from "reselect";
import {
  saveNotStarted,
  saveStarted,
  saveSucceed,
  saveFailed,
} from "../../config/config.json";

// Reducer
const slice = createSlice({
  name: "items",
  initialState: {
    list: [],
    saveStatus: saveNotStarted,
  },
  reducers: {
    // actions => action handlers
    // action is a object ={type, payload}
    itemAdded: (items, action) => {
      //items.push(action.payload);
      const { id, quantity } = action.payload;
      const index = items.list.findIndex((item) => item.id === id);

      if (index >= 0) {
        items.list[index].quantity = quantity;
      } else {
        items.list.push(action.payload);
      }
      items.saveStatus = saveNotStarted;
    },
    itemMoved: (items, action) => {
      const { id } = action.payload;
      const index = items.list.findIndex((item) => item.id === id);
      if (index >= 0) {
        items.list[index].quantity = 0;
      }
    },
    itemSaveStart: (items, action) => {
      items.saveStatus = saveStarted;
    },
    itemSaveSucceed: (items, action) => {
      items.saveStatus = saveSucceed;
      const { product: id } = action.payload;
      const index = items.list.findIndex((item) => item.id === id);
      if (index >= 0) {
        items.list[index].quantity = 0;
      }
    },
    itemSaveFailed: (items, action) => {
      items.saveStatus = saveFailed;
    },
  },
});

export const {
  itemAdded,
  itemMoved,
  itemUpdated,
  itemSaveStart,
  itemSaveSucceed,
  itemSaveFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
// the following action is a function
// () => fn(dispatch,getState)
const url = "/orders";

// save to db and clear the cart from store
export const addItem = (item) =>
  apiCallBegan({
    url,
    method: "post",
    data: {
      customerId: item.customerId,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
      coupon: item.coupon,
    },
    onStart: itemSaveStart.type,
    onSuccess: itemSaveSucceed.type,
    onError: itemSaveFailed.type,
  });

export const getItems = createSelector(
  (state) => state.entities.items,
  (items) => items.list.filter((item) => item.quantity > 0)
);

// export const getUnresolvedBugs = createSelector(
//   (state) => state.entities.bugs,
//   (state) => state.entities.projects,
//   (bugs, projects) => bugs.list.filter((bug) => !bug.resolved)
// );
