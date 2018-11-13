import http from "./httpService";
import baseURL from "../../src/config";

export function register(user) {
  console.log(baseURL);
  console.log(user);
  return http.post(baseURL + "/signup", user);
}
export function getUser(id) {
  console.log(baseURL);
  console.log(user);
  return http.get(baseURL + "/signup", user);
}
