import http from "./httpService";
import baseURL from "../../src/config";

export async function register(user) {
  console.log(baseURL);
  console.log(user);
  return  await http.post(baseURL + "/signup", user);
}
