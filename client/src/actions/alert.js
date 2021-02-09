import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// We can do the dispatch because of the func middleware
export const setAlert = (msg, alertType) => (dispatch) => {
  // Randomly generate the id
  const id = uuid.v4();
  // Dispatch will reach the SET_ALERT case in the switch of alert.js of the reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
