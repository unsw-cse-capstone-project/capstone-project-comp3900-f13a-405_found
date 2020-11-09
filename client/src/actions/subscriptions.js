import axios from "axios";
import {
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  GET_SUBSCRIPTIONS,
  GET_SHOWS_BY_IDS,
  UPDATE_SUBSCRIBED_SHOWS_SUBS_COUNT,
  GET_TRENDING_SHOWS,
  GET_SHOWS_BY_IDS_FOR_TRENDING,
  GET_SUBSCRIBED_EPISODES_BY_IDS,
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
    await axios.post(`/api/subscription/subscribe/${id}`, {}, config);
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
    await axios.post(`/api/subscription/unsubscribe/${id}`, {}, config);
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
    const res = await axios.get(`/api/subscription/`, config);
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
export const getShowsDetailsByListOfIds = (
  ids,
  forWhichComponent = "Sidebar"
) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`/api/spotify/bulkshows/${ids}`, config);
    if (forWhichComponent === "Trending") {
      dispatch({
        type: GET_SHOWS_BY_IDS_FOR_TRENDING,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SHOWS_BY_IDS,
        payload: res.data,
      });
    }

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

    const res = await axios.get(`/api/subscription/count/${ids}`, config);
    dispatch({
      type: UPDATE_SUBSCRIBED_SHOWS_SUBS_COUNT,
      payload: res.data,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};

// GET Trending Shows
export const getTrendingShows = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`/api/subscription/trending`, config);
    dispatch({
      type: GET_TRENDING_SHOWS,
      payload: res.data,
    });
    dispatch(removeAllAlerts());
  } catch (err) {
    displayAlert("An Error occurred :(");
  }
};

// GET list of all new episodes
export const getSubscribedShowsNewEpisodes = (ids) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };
    const date = new Date();
    const today = date.getDate();
    const thisMonth = date.getMonth() + 1;
    const daysInWeek = 7;
    const daysInMonth = 31;
    const episodeList = [];
    for (const id of ids) {
      const res = await axios.get(`/api/spotify/shows/${id}/episodes`, config);
      const filtered = res.data.filter((episode) => {
        const releaseDate = episode.release_date.split("-");
        const day = releaseDate[2];
        const month = releaseDate[1];

        if (today >= day && parseInt(month) === thisMonth) {
          return today - parseInt(day) <= daysInWeek;
        } else if (today < day && parseInt(month) === thisMonth - 1) {
          return parseInt(day) + daysInMonth - today <= daysInWeek;
        } else {
          return false;
        }
      });
      episodeList.push({ id: id, episodes: filtered });
    }
    dispatch({ type: GET_SUBSCRIBED_EPISODES_BY_IDS, payload: episodeList });
  } catch (err) {
    console.log(err);
    displayAlert(
      "An Error occurred when grabbing subscribed shows new episodes:("
    );
  }
};
