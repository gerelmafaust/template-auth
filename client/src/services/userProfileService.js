import http from "./httpService";
import baseURL from "../../src/config";

export async function getUserProfile() {
  return await http.get(baseURL + "/user-profile");
}

export async function updateUserInformation(data) {
  let formData = new FormData();
  console.log("DATA", data);
  formData.append("picture", data.file);
  formData.append("firstname", data.firstname);
  formData.append("surname", data.surname);
  formData.append("email", data.email);
  formData.append("street", data.street);
  formData.append("number", data.number);
  formData.append("postalcode", data.postalcode);
  formData.append("city", data.city);
  formData.append("district", data.district);

  return await http.patch(baseURL + "/user-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  /*  return service
    .patch("/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => res.data)
    .catch(errHandler); */
}
