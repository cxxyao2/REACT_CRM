import http from "./httpService";
import * as config from "../config/config.json";

export function getStockareas() {
  const apiEndPoint = "/stockareas";

  return http.get(apiEndPoint);
}

export function getCategories() {
  const apiEndPoint = "/categories";
  return http.get(apiEndPoint);
}

const service = {
  getStockareas,
  getCategories,
};

export default service;
