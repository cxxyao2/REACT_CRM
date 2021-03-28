import http from "../services/httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = "/users";

export function register(user) {
  // return http.post(apiEndpoint, {
  //   name: user.name,
  //   email: user.email,
  //   password: user.password
  // });

  return http.post(apiEndpoint, {
    name: user.username,
    email: user.email,
    password: user.password,
  });
}

export function deleteUser(UserId) {
  return http.delete(apiEndpoint + "/" + UserId);
}

export function getUser(UserId) {
  return http.get(apiEndpoint + "/" + UserId);
}

export function getAllUsers() {
  return http.get(apiEndpoint);
}

export function saveUser(User) {
  return http.post(apiEndpoint, User);
}

// /users?department=sales
export function getUsersByDepartment(department) {
  let url = apiEndpoint.concat("/?", "department=", department);
  return http.get(url);
}
