import axios from "axios";
import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  DEL_FROM_PLAYLIST_SUCCESS,
  GET_PLAYLISTS,
} from "./types";
import { displayAlert } from "./alert";

// Create a new playlist
export const createPlaylist = (name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.post(`/api/playlist/${name}`, config);
    dispatch({
      type: CREATE_PLAYLIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    displayAlert("Error occurred during playlist creation");
  }
};

// Delete a playlist
export const deletePlaylist = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    await axios.delete(`/api/playlist/${id}`, config);
    dispatch({
      type: DELETE_PLAYLIST,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    displayAlert("Error occurred during playlist deletion");
  }
};

export const getPlaylists = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.get(`/api/playlist/`, config);
    dispatch({
      type: GET_PLAYLISTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    displayAlert("Error occurred while fetching playlists");
  }
};

export const addToPlaylist = (playlistId, episodeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.post(
      `/api/playlist/${playlistId}/${episodeId}`,
      config
    );
    dispatch({
      type: ADD_TO_PLAYLIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    displayAlert("Error occurred while fetching playlists");
  }
};

export const removeFromPlaylist = (playlistId, episodeId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const res = await axios.delete(
      `/api/playlist/${playlistId}/${episodeId}`,
      config
    );
    dispatch({
      type: DEL_FROM_PLAYLIST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    displayAlert("Error occurred while fetching playlists");
  }
};
