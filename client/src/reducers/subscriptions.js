import {
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  GET_SUBSCRIPTIONS,
} from "../actions/types";

const initialState = {
  isLoaded: false,
  subscriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscriptions: state.subscriptions.push(action.payload),
        isLoaded: true,
      };
    case UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        subscriptions: state.subscriptions.filter(
          (subs) => subs !== action.payload
        ),
      };
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        isLoaded: true,
        subscriptions: action.payload.map((result) => result.showId),
      };
    default:
      return state;
  }
}
