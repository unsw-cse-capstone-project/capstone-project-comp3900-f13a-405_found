import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import Duration from "./duration";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledWhiteIcon from "@material-ui/icons/PauseCircleFilled";
import { SET_PLAYING, SET_STATE_FROM_EPISODES } from "../../actions/types";

// Package reference:       https://www.npmjs.com/package/react-player
// Source code reference :  https://github.com/CookPete/react-player/blob/master/src/demo/App.js

const Player = () => {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState({});
  const [played, setPlayed] = useState(0);
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

  const handlePlay = () => {
    dispatch({ type: SET_PLAYING, playing: true, isVisible: true });
  };

  const handlePause = () => {
    dispatch({ type: SET_PLAYING, playing: false });
  };

  const handlePlayPause = () => {
    if (playing) {
      dispatch({ type: SET_PLAYING, playing: false });
    } else {
      dispatch({ type: SET_PLAYING, playing: true, isVisible: true });
    }
  };

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    player.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleEnded = () => {
    if (playlist.length > 0) {
      const current = playlist.map((episode) => episode.id).indexOf(episode_id);
      if (current === -1 || current === playlist.length - 1) {
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
    setDuration(duration);
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
        onPlay={handlePlay}
        onEnablePIP={null}
        onDisablePIP={null}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={(e) => console.log("onError", e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ display: "none" }}
      />
      <div style={{ display: "flex", width: "500px" }}>
        {image ? (
          <img style={{ width: "auto", height: "100%" }} src={image} alt="hi Lina"/>
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
