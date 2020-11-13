import { SET_NOTIFICATIONS } from "../actions/types";

const initial_state = {
  notifications: null,
};

export default function notifications(state = initial_state, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.notifications,
      };
    }
    default:
      return state;
  }
}
