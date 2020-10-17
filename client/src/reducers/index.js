import { combineReducers } from "redux";
import authentication from "./authentication";
import alert from "./alert";
import subscriptions from "./subscriptions";

export default combineReducers({ authentication, alert, subscriptions });
