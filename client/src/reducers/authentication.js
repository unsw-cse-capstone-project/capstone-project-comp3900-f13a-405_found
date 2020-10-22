import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  EMAIL_VERIFIED,
  COOKIE_VALID,
} from "../actions/types";

const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  user: null,
  emailVerified: false,
  verifyError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COOKIE_VALID:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoaded: true,
        user: action.payload.user,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoaded: true,
      };
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isLoaded: true,
      };
    case EMAIL_VERIFIED:
      return {
        ...state,
        isAuthenticated: false,
        emailVerified: action.payload,
        verifyError: action.verifyError,
      };
    default:
      return state;
  }
}
