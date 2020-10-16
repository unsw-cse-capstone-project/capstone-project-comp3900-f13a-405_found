import axios from "axios";
import {
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  GET_SUBSCRIPTIONS,
} from "./types";

// Subscribe to a show by the id
export const subscribeToShow = ({ id }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post(`subscription/subscribe/${id}`, {}, config);
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
export const unsubscribeFromShow = ({ id }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.post(`subscription/unsubscribe/${id}`, {}, config);
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
export const getSubscriptions = ({ id }) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    const res = await axios.get(`subscription/unsubscribe/${id}`, config);
    dispatch({
      type: GET_SUBSCRIPTIONS,
      payload: res.data,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};
