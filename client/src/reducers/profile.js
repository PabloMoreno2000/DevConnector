import {
  CLEAR_PROFILE,
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_REPOS,
} from "../actions/types";

const initialState = {
  // Your profile, or a profile you are checking
  profile: null,
  // A list of developers
  profiles: [],
  repos: [],
  loading: true,
  // Any error in the request
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        // profile is sent if the request is successful when dispatching get_profile in any action file
        profile: payload,
        // Request is done
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
