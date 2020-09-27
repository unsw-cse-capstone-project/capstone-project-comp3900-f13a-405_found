import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";
import axios from "axios";

// User Account Creation
export const signup = ({ name, email, password }) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name, email, password });
    const res = await axios.post("api/authentication/signup", body, {
      withCredentials: true,
    });
    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.errors,
    });
  }
};
