import axios from "axios";
/**
 * respose variable to be returned
 */
let response = null;

export const getDocProfile = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  response = await axios.get("/api/doctor/home", config);

  return response;
};

export const searchPatient = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  response = await axios.post("/api/doctor/searchpatient", data, config);

  return response;
};

export const updateProfile = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  response = await axios.post("/api/doctor/update-profile", data, config);

  return response;
};
