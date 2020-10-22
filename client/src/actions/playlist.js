import axios from "axios";
// import {
    // 
// }

import { displayAlert, removeAlert } from "./alert";

// Add episode to playlist by episode id
export const addToPlaylist = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        await axios.post(`/api/playlist/addPlaylist/${id}`, {}, config);
        dispatch({
            type: PLAYLIST_ADD_SUCCESS,
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
            type: PLAYLIST_DELETE_SUCCESS,
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
        const res = await axios.get(`/api/playlist`, config);
        dispatch ({
            type: GET_PLAYLIST,
            payload: res.data,
        });
    } catch (err) {
        displayAlert("An error occured fetching playlist");
    }
};








