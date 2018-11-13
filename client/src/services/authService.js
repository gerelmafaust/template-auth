import jwtDecode from "jwt-decode";
import http from "./httpService";
import baseURL from "../../src/config";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  console.log(email);
  console.log(password);
  const { data: jwt } = await http.post(baseURL + "/login", {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function isLoggedIn() {
  return localStorage.getItem(tokenKey) != null;
}
export function getLoggedUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return "";
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export function getJsonItemValue(key) {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const data = jwtDecode(jwt);
    const item = data[key];
    return item;
  } catch (ex) {
    return "";
  }
}
export default {
  login,
  loginWithJwt,
  logout,
  getLoggedUser,
  getJwt,
  isLoggedIn,
  getJsonItemValue
};
