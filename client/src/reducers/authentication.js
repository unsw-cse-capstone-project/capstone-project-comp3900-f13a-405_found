import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "../actions/types";

const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  user: null,
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoaded: true,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        isLoaded: true,
      };
    default:
      return state;
  }
}
