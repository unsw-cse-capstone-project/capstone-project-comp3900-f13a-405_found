import { DISPLAY_ALERT, REMOVE_ALL_ALERTS } from "./types";
import { v4 as uuid } from "uuid";

export const displayAlert = (msg) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: DISPLAY_ALERT,
    payload: {
      msg,
      id,
    },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALL_ALERTS,
      payload: id,
    });
  }, 5000);
};

export const removeAllAlerts = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_ALERTS,
  });
};
