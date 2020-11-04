import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import Duration from "./duration";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledWhiteIcon from "@material-ui/icons/PauseCircleFilled";
import {
  SET_URL,
  SET_PLAYING,
  SET_IMAGE,
  SET_ARTIST,
  SET_TITLE,
  SET_SEEKING,
  SET_PLAYED,
  SET_DURATION,
  SET_LOADED,
  SET_STATE_FROM_EPISODES,
} from "../../actions/types";
import { displayAlert } from "../../actions/alert";
import axios from "axios";

// Package reference:       https://www.npmjs.com/package/react-player
// Source code reference :  https://github.com/CookPete/react-player/blob/master/src/demo/App.js

const Player = ( {} ) => {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState({});
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);

  const ref = (player) => {
    setPlayer(player);
  };

  const playerState = useSelector((state) => state.player);

  const {
    playing,
    url,
    image,
    title,
    artist,
    playlist,
    episode_id,
  } = playerState;

  // play podcast from last 'seconds_plyed.' Defaults to 0.
  const handlePlay =  async () => {
    console.log("onPlay");
    dispatch({ type: SET_PLAYING, playing: true, isVisible: true });

    try {
      const config = {
        withCredentials: true,
      };
      
      const p_id = playerState.episode_id;

      const res = await axios.get(`/api/user-history/${p_id}`, config);
      
      const seconds_played = res.data.seconds; 

      if (seconds_played == 0) {
        dispatch({ type: SET_PLAYING, playing: true});
      } else {
        player.seekTo(seconds_played);
      }

    } catch (err) {
      displayAlert("An error occurred handlePlay()");
    }
  };

 // pause podcast and update DB with 'seconds_played'
  const handlePause =  async () => {
    console.log("onPause");
    dispatch({ type: SET_PLAYING, playing: false });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const p_id = playerState.episode_id;
      //const p_url = String(playerState.url);
      //const p_image = String(playerState.image);
      console.log("PAUSE image: " + playerState.image);
      console.log("PAUSE URL: " + playerState.url);
      console.log("PAUSE episode_id: " + playerState.episode_id);

      const res = await axios.post(
        `/api/user-history/${p_id}/${played}`, 
        { p_url: playerState.url,
          p_image: playerState.image },
        config
      ); 
      console.log("data in handlePause: " + res);

    } catch (err) {
      displayAlert("An Error Occurred handlePlay()");
    }
  };

  const handlePlayPause = () => {
    if (playing) {
      dispatch({ type: SET_PLAYING, playing: false });
    } else {
      dispatch({ type: SET_PLAYING, playing: true, isVisible: true });
    }
  };

  const handleStop = () => {
    //this.setState({ url: null, playing: false });
    dispatch({ type: SET_URL, url: null });
    dispatch({ type: SET_PLAYING, playing: false });
  };

  const handleSeekMouseDown = (e) => {
    // dispatch({ type: SET_SEEKING, seeking: true });
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    // dispatch({ type: SET_PLAYED, played: parseFloat(e.target.value) });
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    // dispatch({ type: SET_SEEKING, seeking: false });
    setSeeking(false);
    player.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    //console.log("onProgress", played, duration);
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      // dispatch({type: SET_PLAYED, played: state.played})
      // dispatch({type: SET_LOADED, loaded: state.loaded})
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    if (playlist.length > 0) {
      const current = playlist.map((episode) => episode.id).indexOf(episode_id);
      if (current == -1 || current == playlist.length - 1) {
        dispatch({ type: SET_PLAYING, playing: false });
        return;
      }
      dispatch({
        type: SET_STATE_FROM_EPISODES,
        payload: {
          url: playlist[current + 1].audio_preview_url,
          playing: true,
          episode_id: playlist[current + 1].id,
          title: playlist[current + 1].name,
          image: playlist[current + 1].image_url,
          artist: playlist[current + 1].podcast_artist,
          isVisible: true,
        },
      });
      return;
    }
    dispatch({ type: SET_PLAYING, playing: false });
    return;
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    // this.setState({ duration })
    // dispatch({ type: SET_DURATION, duration: duration });
    setDuration(duration);
  };

  // const handleVolumeChange = e => {
  //     this.setState({ volume: parseFloat(e.target.value) })
  // }

  // const handleToggleMuted = () => {
  //     this.setState({ muted: !this.state.muted })
  // }

  const load = (url) => {
    // this.setState({
    //   url,
    //   played: 0,
    //   loaded: 0,
    //   pip: false
    // })
    dispatch({ type: SET_URL, url: url });
    // dispatch({ type: SET_PLAYED, played: 0 });
    // dispatch({ type: SET_LOADED, loaded: 0 });
    setPlayed(0);
    setLoaded(0);
  };

  const iconStyle = {
    color: "white",
    cursor: "pointer",
    height: "50px",
    width: "50px",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "120px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#041a33",
        padding: "0",
        left: "0px",
        zIndex: "2",
        borderTop: "2px solid #ff8800",
      }}
    >
      <ReactPlayer
        ref={ref}
        className='react-player'
        width='100%'
        height='100%'
        url={url}
        pip={false}
        playing={playing}
        controls={false}
        light={false}
        loop={false}
        playbackRate={1.0}
        volume={0.8}
        muted={false}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onPlay={handlePlay}
        onEnablePIP={null}
        onDisablePIP={null}
        onPause={handlePause}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onEnded={handleEnded}
        onError={(e) => console.log("onError", e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ display: "none" }}
      />
      <div style={{ display: "flex", width: "500px" }}>
        {image ? (
          <img style={{ width: "auto", height: "100%" }} src={image} />
        ) : null}
        <div
          style={{
            margin: "18px 0 auto 0 ",
            color: "white",
            paddingLeft: "10px",
          }}
        >
          <div style={{ width: "295px", fontWeight: "bold", margin: "0" }}>
            {title}
          </div>
          <div style={{ margin: "0" }}>{artist}</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: " 50%",
          transform: "translateX(-50%) translateY(70px)",
          width: "60%",
          zIndex: "3",
        }}
      >
        <input
          type='range'
          min={0}
          max={0.999999}
          step='any'
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          style={{ width: "100%" }}
        />
        <div style={{ float: "left", color: "white" }}>
          <Duration seconds={duration * played} />
        </div>
        <div style={{ float: "right", color: "white" }}>
          <Duration seconds={duration} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: " 50%",
          transform: "translateY(12px)",
        }}
      >
        {playing ? (
          <PauseCircleFilledWhiteIcon
            onClick={handlePlayPause}
            style={iconStyle}
          />
        ) : (
          <PlayCircleFilledWhiteIcon
            onClick={handlePlayPause}
            style={iconStyle}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
