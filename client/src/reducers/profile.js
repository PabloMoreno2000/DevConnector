import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

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
    case GET_PROFILE:
      return {
        ...state,
        // profile is sent if the request is successful when dispatching get_profile in profiles actions
        profile: payload,
        // Request is done
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: true,
      };
    default:
      return state;
  }
}
