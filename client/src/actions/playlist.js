import axios from "axios";
import {
    ADD_TO_PLAYLIST_SUCCESS,
    DEL_FROM_PLAYLIST_SUCCESS,
    GET_PLAYLIST,
    GET_SUBSCRIPTIONS, 
} from "./types";

import { displayAlert, removeAllAlerts } from "./alert";

// Add episode to playlist by episode id
export const addToPlaylist = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        await axios.post(`/api/playlist/playlistAdd/${id}`, {}, config);
        dispatch({
            type: ADD_TO_PLAYLIST_SUCCESS,
            payload: id,
        });
        dispatch(removeAllAlerts());
    } catch (err) {
        displayAlert("An error occured trying to add episode to playlist");
    }
};

// Delete episode from playlist by id
export const deleteFromPlaylist = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        await axios.post(`/api/subscription/unsubscribe/${id}`, {}, config);
        dispatch ({
            type: DEL_FROM_PLAYLIST_SUCCESS,
            payload: id,
        });
        dispatch(removeAllAlerts());
    } catch (err) {
        displayAlert("An Error Occurred");
    }
};

// Get user's playlist
export const getPlaylist = () => async (dispatch) => {
    try {
        const config ={
            withCredentials: true,
        };
        const res = await axios.get(`/api/playlist/`, config);
        dispatch ({
            type: GET_PLAYLIST,
            payload: res.data,
        });
        dispatch(removeAllAlerts());
    } catch (err) {
        displayAlert("An error occured fetching playlist");
    }
};


