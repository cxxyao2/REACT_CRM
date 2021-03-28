import axios from "axios";
import * as actions from "../actions/apiAction";
import { apiUrl } from "../../config/config.json";

// store --next -action
const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL: process.env.REACT_APP_API_URL,
      url,
      method,
      data,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    console.log(JSON.stringify(error));
    dispatch(actions.apiCallFailed(JSON.stringify(error)));
    // Specific
    if (onError)
      dispatch({
        type: onError,
        payload:
          (error.response && error.response.data) || JSON.stringify(error),
      });
  }
};

export default api;
