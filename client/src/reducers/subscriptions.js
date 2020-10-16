import {
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  GET_SUBSCRIPTIONS,
  GET_SHOWS_BY_IDS,
} from "../actions/types";

const initialState = {
  isLoaded: false,
  subscriptions: [],
  detailedSubscriptions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscriptions: state.subscriptions.concat([action.payload]),
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
    case GET_SHOWS_BY_IDS:
      return {
        ...state,
        isLoaded: true,
        detailedSubscriptions: action.payload.shows,
      };
    default:
      return state;
  }
}
