import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getPlaylists, createPlaylist, deletePlaylist } from "../../actions/playlist";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';


const Playlist = () => {
    const [playlistName, setPlaylistName] = useState('');
    const playlistState = useSelector((state) => state.playlist);
    const { isLoaded, playlists } = playlistState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists());
    }, [dispatch]);

    const HandleCreatePlaylist = () => {
        dispatch(createPlaylist(playlistName));
        setPlaylistName('');
    }

    const HandleDeletePlaylist = (id) => {
        dispatch(deletePlaylist(id));
    }

    const HandleFormChange = (e) => {
        setPlaylistName(e.target.value);
    }
    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField onChange={HandleFormChange} id="standard-basic" label="Playlist Name" />
                <Button onClick={HandleCreatePlaylist} size='large' variant='contained'>Create New Playlist</Button>
                {
                    isLoaded ? 
                    playlists.map( (playlist,i) => {
                        return (
                        <div key={i}>
                            <h1>{playlist.playlistName}</h1>
                            <Button onClick={() => HandleDeletePlaylist(playlist._id)} size='small' variant='contained'>Delete</Button>
                            {
                                playlist.playlistEpisodes.map( (episode,i) => {
                                    return <p key={i}>{episode.name}</p>
                                })
                            }
                        </div>
                        )
                    })
                    : <p>loading</p>
                }
            </form>
            
        </div>
    )
    

};



export default Playlist;


