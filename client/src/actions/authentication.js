import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";
import axios from "axios";
import { displayAlert, removeAllAlerts } from "./alert";

// User Account Creation
export const signup = ({ name, email, password }) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name, email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.post("api/authentication/signup", body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    const errorsList = err.response.data.errors;
    if (errorsList) {
      errorsList.forEach((error) =>
        dispatch(displayAlert(error.msg, "danger"))
      );
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};
