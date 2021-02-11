import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // token has user id, the token is set in App.js after checking local storage
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      // profile data
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        // http request status
        status: error.response.status,
      },
    });
  }
};
