import { combineReducers } from "redux";
import authentication from "./authentication";
import alert from "./alert";
import player from "./player"
export default combineReducers({ authentication, alert, player });
