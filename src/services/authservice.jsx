import http from "../services/httpService";
import { apiUrl } from "../config/config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint =  "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });

  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    console.log("get User error", "  ", JSON.stringify(error));
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function sendResetEmail(email) {
  let emailEndPoint = apiEndpoint.concat("/send-reset-email");
  return await http.post(emailEndPoint, { email });
}

export async function resetPassword(token, newPassword) {
  let emailEndPoint = apiEndpoint.concat(`/reset-password?token=${token}`);
  return await http.post(emailEndPoint, { newPassword });
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  sendResetEmail,
  resetPassword,
};
export default auth;
