import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint =  "/orders";

export function getOrders() {
  return http.get(apiEndpoint);
}

export function deleteOrder(orderId) {
  return http.delete(apiEndpoint + "/" + orderId);
}

export function getOrder(orderId) {
  return http.get(apiEndpoint + "/" + orderId);
}

export function saveOrder(order) {
  return http.post(apiEndpoint, order);
}

export function upOrder(order) {
  return http.put(apiEndpoint, order);
}
