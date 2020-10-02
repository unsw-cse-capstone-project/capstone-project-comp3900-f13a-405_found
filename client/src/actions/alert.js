import { DISPLAY_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from "./types";
import { v4 as uuid } from "uuid";

export const displayAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: DISPLAY_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};

export const removeAllAlerts = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_ALERTS,
  });
};
