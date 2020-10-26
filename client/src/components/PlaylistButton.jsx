import React from "react";
import { addToPlaylist, deleteFromPlaylist } from "../actions/playlist";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

const PlaylistButton = ({ id }) => {
    const dispatch = useDispatch();
  //  const playlistState = useSelector((state) => state.playlist); // is this right?

    const handleAddPlaylist = () => {
        dispatch(addToPlaylist(id));
    };

    const handleDeletePlaylist = () => {
        dispatch(deleteFromPlaylist(id));
    };

    //return playlistState.isLoaded && playlistState.playlist.indexOf(id) !== -1 ? (
    return (
        <Button
            size='large'
            onClick={handleAddPlaylist}
            variant='contained'
            type='submit'
        >
            Add-to-Playlist
        </Button>
    // ) ; (
    //     <Button 
    //         size='large'
    //         onClick={handleDeletePlaylist}
    //         variant='contained'
    //         type='submit'
    //     >
    //         Delete-From-Playlist 
    //     </Button>
    // );
    )
};

export default PlaylistButton;