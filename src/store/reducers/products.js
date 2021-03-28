import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiAction";
import moment from "moment";
import { createSelector } from "reselect";

// Reducer
const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // Actions => action handlers
    productRequested: (products, action) => {
      products.loading = true;
    },
    productReceived: (products, action) => {
      products.list = action.payload;
      products.loading = false;
      products.lastFetch = Date.now();
    },
    productRequestFailed: (products, action) => {
      products.loading = false;
    },
  },
});

const {
  productRequested,
  productReceived,
  productRequestFailed,
} = slice.actions;

export const productActions = {
  productRequested,
  productReceived,
  productRequestFailed,
};
export default slice.reducer;

// Action Creators
const url = "/products";

// An action is a function, () => fn(dispatch, getState)
export const loadProducts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.products;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: productRequested.type,
      onSuccess: productReceived.type,
      onError: productRequestFailed.type,
    })
  );
};

export const getFilteredProducts = (filterKey) =>
  createSelector(
    (state) => state.entities.products,
    (products) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(filterKey.toLowerCase())
      )
  );
