import {
  SET_URL,
  SET_PLAYING,
  SET_IMAGE,
  SET_ARTIST,
  SET_STATE_FROM_EPISODES,
  SET_TITLE,
  SET_EPISODE,
  SET_LOADED,
} from "../actions/types";

const initial_state = {
  url: null,
  playing: false,
  title: null,
  artist: null,
  image: null,
  episode_id: null,
  playlist: [],
  isVisible: false,
  loaded: 0,
};

export default function player(state = initial_state, action) {
  switch (action.type) {
    case SET_EPISODE:
      return {
        ...state,
        episode_id: action.episode_id,
      };
    case SET_URL:
      return {
        ...state,
        url: action.url,
      };
    case SET_PLAYING:
      return {
        ...state,
        playing: action.playing,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    case SET_ARTIST:
      return {
        ...state,
        artist: action.artist,
      };
    case SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case SET_LOADED:
      return {
        ...state, 
        loaded: action.loaded,
      };
    case SET_STATE_FROM_EPISODES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
