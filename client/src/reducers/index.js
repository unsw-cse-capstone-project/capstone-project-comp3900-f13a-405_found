import { combineReducers } from "redux";
import authentication from "./authentication";
import alert from "./alert";
import player from "./player";
import subscriptions from "./subscriptions";
import playlist from "./playlist";
import notifications from "./notifications";

const appReducer = combineReducers({
  authentication,
  alert,
  subscriptions,
  player,
  playlist,
  notifications,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
