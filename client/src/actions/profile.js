import axios from "axios";
import { setAlert } from "./alert";
import {
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "./types";

// Get current user's profile
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

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  // Not necessary, but delete the profile from the store(not the backend), when checking more profiles
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${userId}`);
    // The profile of the requested user will go to profile state even if it is not our own profile
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get github repos
export const getGithubRepos = (githubUsername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${githubUsername}`);
    // The profile of the requested user will go to profile state even if it is not our own profile
    dispatch({
      type: GET_REPOS,
      // The repos
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/api/profile", formData, config);
    // To get the new version
    dispatch({
      type: GET_PROFILE,
      // new profile data
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Udated" : "Profile Created", "success"));
    // Redirect just if creating new profile
    if (!edit) {
      // Push a new page to navigation history to redirect
      history.push("/dashboard");
    }
  } catch (error) {
    // Display errors sent by the backend
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
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

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put("/api/profile/experience", formData, config);
    // To get the new version
    dispatch({
      type: UPDATE_PROFILE,
      // new profile data
      payload: res.data,
    });

    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (error) {
    // Display errors sent by the backend
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
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

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put("/api/profile/education", formData, config);
    // To get the new version
    dispatch({
      type: UPDATE_PROFILE,
      // new profile data
      payload: res.data,
    });

    dispatch(setAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (error) {
    // Display errors sent by the backend
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
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

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "success"));
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

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "success"));
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

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    try {
      await axios.delete("/api/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Your account has been permanantly deleted"));
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
  }
};
