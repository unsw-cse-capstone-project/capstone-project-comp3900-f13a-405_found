import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";
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
    await axios.post("api/authentication/signup", body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    const errorsList = err.response.data.errors;
    if (errorsList) {
      errorsList.forEach((error) => dispatch(displayAlert(error.msg)));
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

// User Login
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const body = JSON.stringify({ email, password });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post("api/authentication/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    const errorsList = err.response.data.errors;
    if (errorsList) {
      errorsList.forEach((error) => dispatch(displayAlert(error.msg)));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Check if the user's cookie is still valid
export const checkUserStillVerified = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    await axios.get("api/secure/", config);
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout the user
export const logout = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    await axios.get("api/authentication/logout", config);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
