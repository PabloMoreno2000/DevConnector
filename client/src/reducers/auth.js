import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

// Initial state for the whole auth reducer
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  // That we got the response of the backend already
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        // If it was loaded it was authenticated
        isAuthenticated: true,
        loading: false,
        // The payload in this case is the info of the user
        user: payload,
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        // Return a copy of the state
        ...state,
        // A copy of the payload
        ...payload,
        // Modify this attributes of the state
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case AUTH_ERROR:
      // No need to store an unvalid token
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
