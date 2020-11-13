import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EMAIL_VERIFIED,
  COOKIE_VALID,
  SAVE_FOR_RESENT_EMAIL_REGISTRATION,
} from "./types";
import axios from "axios";
import { displayAlert, removeAllAlerts } from "./alert";
import { message } from "antd";

// User Account Creation
export const signup = (
  { name, email, password, id, optInEmail },
  history = null
) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name, email, password, optInEmail });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post("/api/authentication/signup", body, config);
    dispatch({
      type: SAVE_FOR_RESENT_EMAIL_REGISTRATION,
      payload: { name, email, password, optInEmail },
    });
    if (history != null) {
      history.push("/please-click-email");
    }
    message.destroy(id);
    dispatch(removeAllAlerts());
  } catch (err) {
    console.log(err);
    const errorsList = err.response.data.errors;
    if (errorsList) {
      errorsList.forEach((error) => dispatch(displayAlert(error.msg)));
    }
  }
};

// User Account activation
export const activateEmail = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post(`/api/authentication/activate/${token}`, {}, config);
    dispatch({ type: EMAIL_VERIFIED, payload: true });
  } catch (err) {
    const errorsList = err.response.data.errors;
    if (errorsList) {
      errorsList.forEach((error) => dispatch(displayAlert(error.msg)));
    }
    dispatch({ type: EMAIL_VERIFIED, payload: false, verifyError: true });
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
    const res = await axios.post("/api/authentication/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
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
    const res = await axios.get("/api/secure/", config);
    dispatch({
      type: COOKIE_VALID,
      payload: res.data,
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
    await axios.get("/api/authentication/logout", config);
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
