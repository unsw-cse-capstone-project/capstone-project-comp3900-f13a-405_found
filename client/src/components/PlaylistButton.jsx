import React from "react";
import { addToPlaylist, deleteFromPlaylist } from "../actions/playlist";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const PlaylistButton = ({ id }) => {
    const dispatch = useDispatch();
    const playlistState = userSelector((state) => state.subscriptions);

    const handleLAddPlaylist = () => {
        dispatch(addToPlaylist(id));
    };

    const handleDeletePlaylsit = () => {
        dispatch(deleteFromPlaylist(id));
    };

    return playlistState.isLoaded && playlistState.playlist.indexOf(id) !== -1 ? (
        <Button
            size='large'
            onClick={ handleLAddPlaylist }
            variant='contained'
            type='submit'
        >
            Add to Playlist
        </Button>
    ) : (
        <Button 
            size='large'
            onClick={ handleDeletePlaylist }
            variant='contained'
            type='submit'
        >
            Delete From Playlist 
        </Button>
    );
};

export default PlaylistButton;