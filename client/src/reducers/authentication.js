import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  EMAIL_VERIFIED,
  COOKIE_VALID,
  SAVE_FOR_RESENT_EMAIL_REGISTRATION,
} from "../actions/types";

const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  user: null,
  emailVerified: false,
  verifyError: false,
  userResentEmail: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_FOR_RESENT_EMAIL_REGISTRATION:
      return {
        ...state,
        userResentEmail: action.payload,
      };
    case COOKIE_VALID:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoaded: true,
        user: action.payload.user,
        userResentEmail: null,
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
