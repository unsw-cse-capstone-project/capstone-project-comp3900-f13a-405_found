import { combineReducers } from "redux";
import authentication from "./authentication";
import alert from "./alert";
import subscriptions from "./subscriptions";

const appReducer = combineReducers({ authentication, alert, subscriptions });

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
