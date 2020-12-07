import axios from "axios";
/**
 * respose variable to be returned
 */
let response = null;

export const getHospitalProfile = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  response = await axios.get("/api/hospital/home", config);

  return response;
};

export const updateProfile = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  response = await axios.post("/api/hospital/update-profile", data, config);

  return response;
};
