// Function that puts the auth token if it exists, a global header
import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    // Add it to the global header
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // Delete it from the global header
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
