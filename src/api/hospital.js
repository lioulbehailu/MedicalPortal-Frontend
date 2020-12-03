import axios from "axios";
/**
 * respose variable to be returned
 */
let response = null;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getHospitalProfile = async () => {
  response = await axios.get("/api/hospital/home", config);

  return response;
};

export const updateProfile = async (data) => {
  response = await axios.post("/api/hospital/update-profile", data, config);

  return response;
};
