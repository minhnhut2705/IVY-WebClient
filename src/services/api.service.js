import axios from "axios";

export default (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
  });
};

