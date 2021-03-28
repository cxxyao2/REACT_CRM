import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../actions/apiAction";
import moment from "moment";

// Reducer

const slice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // Actions => action handlers
    customerRequested: (customers, action) => {
      customers.loading = true;
    },
    customerReceived: (customers, action) => {
      customers.list = action.payload;
      customers.loading = false;
      customers.lastFetch = Date.now();
    },
    customerRequestFailed: (customers, action) => {
      customers.loading = false;
    },
    customerAdded: (customers, action) => {
      customers.list.push(action.payload);
    },
  },
});

export const {
  customerRequested,
  customerReceived,
  customerRequestFailed,
  customerAdded,
} = slice.actions;

export default slice.reducer;

// Action Creators
const url = "/customers";

// An action is a function, () => fn(dispatch, getState)
export const loadCustomers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.customers;
  if (lastFetch) {
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < 10) return;
  }

  return dispatch(
    apiCallBegan({
      url,
      onStart: customerRequested.type,
      onSuccess: customerReceived.type,
      onError: customerRequestFailed.type,
    })
  );
};

export const addCustomer = (customer) =>
  apiCallBegan({
    url,
    method: "post",
    data: {
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    onSuccess: customerAdded.type,
  });

export const updateCustomer = (customer) =>
  apiCallBegan({
    url: url.concat(`/{customer._id}`),
    method: "put",
    data: {
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    onSuccess: customerAdded.type,
  });

export const getAuthorizedCustomers = (userRegion) =>
  createSelector(
    (state) => state.entities.customers.list,
    (customers) =>
      customers.filter((customer) => customer.region === userRegion)
  );

export const getAllCustomers = () =>
  createSelector((state) => state.entities.customers.list);
