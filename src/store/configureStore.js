import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers/reduces";
import logger from "./middlewares/logger";
import toast from "./middlewares/toast";
import api from "./middlewares/api";

const store = () => {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      toast,
      api,
    ],
  });
};
export default store;
