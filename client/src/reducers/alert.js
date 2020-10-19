import {
  DISPLAY_ALERT,
  REMOVE_ALERT,
  REMOVE_ALL_ALERTS,
} from "../actions/types";
import { message } from "antd";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    case REMOVE_ALL_ALERTS:
      state.map((alert) => message.destroy(alert.id));
      return [];
    default:
      return state;
  }
}
