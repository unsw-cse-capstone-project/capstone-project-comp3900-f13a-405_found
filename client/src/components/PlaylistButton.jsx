import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

const PlaylistButton = () => {
    const dispatch = useDispatch();

    const handleLPlaylist = () => {
        //dispatch(playlist());
    };

    return (
        <Button
            size='large'
            //onClick={handlePlaylist}
            variant='contained'
            type='submit'
        >
            Playlist
        </Button>
    );
};

export default PlaylistButton;