import axios from "axios";
import {
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  GET_SUBSCRIPTIONS,
  GET_SHOWS_BY_IDS,
  UPDATE_SUBSCRIBED_SHOWS_SUBS_COUNT,
} from "./types";
import { displayAlert, removeAllAlerts } from "./alert";

// Subscribe to a show by the id
export const subscribeToShow = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post(`api/subscription/subscribe/${id}`, {}, config);
    dispatch({
      type: SUBSCRIBE_SUCCESS,
      payload: id,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};

// Unsubscribe to a show by the id
export const unsubscribeFromShow = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post(`api/subscription/unsubscribe/${id}`, {}, config);
    dispatch({
      type: UNSUBSCRIBE_SUCCESS,
      payload: id,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};

// GET user's subscriptions
export const getSubscriptions = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    const res = await axios.get(`api/subscription/`, config);
    dispatch({
      type: GET_SUBSCRIPTIONS,
      payload: res.data,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};

// GET list of shows by list of ids
// comma seperated ids
export const getShowsDetailsByListOfIds = (ids) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`api/spotify/bulkshows/${ids}`, config);
    dispatch({
      type: GET_SHOWS_BY_IDS,
      payload: res.data,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};

// GET list of shows by list of ids
// comma seperated ids
export const getSubscribedShowsSubsCount = (ids) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`api/subscription/count/${ids}`, config);
    dispatch({
      type: UPDATE_SUBSCRIBED_SHOWS_SUBS_COUNT,
      payload: res.data,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};
