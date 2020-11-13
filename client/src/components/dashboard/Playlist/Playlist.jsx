import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
} from "../../../actions/playlist";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledWhiteIcon from "@material-ui/icons/PauseCircleFilled";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { SET_STATE_FROM_EPISODES } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  playButton: {
    fontSize: "50px",
    display: "block",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Playlist = () => {
  const classes = useStyles();
  const [playlistName, setPlaylistName] = useState("");
  const playlistState = useSelector((state) => state.playlist);
  const { isLoaded, playlists } = playlistState;
  const dispatch = useDispatch();
  const playerState = useSelector((state) => state.player);

  useEffect(() => {
    dispatch(getPlaylists());
  });

  const HandleCreatePlaylist = () => {
    dispatch(createPlaylist(playlistName));
    setPlaylistName("");
  };

  const HandleDeletePlaylist = (id) => {
    dispatch(deletePlaylist(id));
  };

  const HandleFormChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handlePlay = (episode, playlist) => {
    dispatch({
      type: SET_STATE_FROM_EPISODES,
      payload: {
        url: episode.audio_preview_url,
        playing: true,
        episode_id: episode.id,
        title: episode.name,
        image: episode.image_url,
        artist: episode.podcast_artist,
        playlist: playlist.playlistEpisodes,
        isVisible: true,
      },
    });
  };

  const handlePause = () => {
    dispatch({
      type: SET_STATE_FROM_EPISODES,
      payload: {
        playing: false,
      },
    });
  };

  return (
    <div>
      <form noValidate autoComplete='off'>
        <TextField
          onChange={HandleFormChange}
          id='standard-basic'
          label='Playlist Name'
        />
        <Button onClick={HandleCreatePlaylist} size='large' variant='contained'>
          Create New Playlist
        </Button>
        {isLoaded ? (
          playlists.map((playlist, i) => {
            return (
              <div key={i}>
                <h1>{playlist.playlistName}</h1>
                <Button
                  onClick={() => HandleDeletePlaylist(playlist._id)}
                  size='small'
                  variant='contained'
                >
                  Delete
                </Button>
                {playlist.playlistEpisodes.map((episode, i) => {
                  return (
                    <div key={i}>
                      <Typography component={"div"}>{episode.name}</Typography>
                      <Typography>
                        {!playerState.playing ? (
                          <PlayCircleFilledWhiteIcon
                            onClick={() => {
                              handlePlay(episode, playlist);
                            }}
                            className={classes.playButton}
                          />
                        ) : playerState.episode_id === episode.id ? (
                          <PauseCircleFilledWhiteIcon
                            onClick={handlePause}
                            className={classes.playButton}
                          />
                        ) : (
                          <PlayCircleFilledWhiteIcon
                            onClick={() => {
                              handlePlay(episode, playlist);
                            }}
                            className={classes.playButton}
                          />
                        )}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div>loading</div>
        )}
      </form>
    </div>
  );
};

export default Playlist;
