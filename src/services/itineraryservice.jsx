import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = "/itineraries";

export function getItinerary(query) {
  let url = apiEndpoint + "/?" + query;

  return http.get(url);
}

export function deleteItinerary(itineraryId) {
  return http.delete(apiEndpoint + "/" + itineraryId);
}

export function getItineraryById(itineraryId) {
  return http.get(apiEndpoint + "/" + itineraryId);
}

export function saveItinerary(itinerary) {
  return http.post(apiEndpoint, itinerary);
}

export function getReport(query) {
  let url = apiEndpoint + "/report?" + query;

  return http.get(url);
}
