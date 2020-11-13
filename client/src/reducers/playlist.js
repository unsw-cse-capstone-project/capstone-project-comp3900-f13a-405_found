import {
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST_SUCCESS,
  DEL_FROM_PLAYLIST_SUCCESS,
  GET_PLAYLISTS,
} from "../actions/types";

const initial_state = {
  isLoaded: false,
  playlists: [],
};

export default function playlist(state = initial_state, action) {
  switch (action.type) {
    case CREATE_PLAYLIST:
      return {
        ...state,
        isLoaded: true,
        playlists: state.playlists.concat([action.payload]),
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        isLoaded: true,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        ),
      };
    case ADD_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        playlists: state.playlists.map((playlist) => {
          if (playlist._id === action.payload._id) {
            return action.payload;
          }
          return playlist;
        }),
      };
    case DEL_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        playlists: state.playlists.map((playlist) => {
          if (playlist._id === action.payload._id) {
            return action.payload;
          }
          return playlist;
        }),
      };
    case GET_PLAYLISTS:
      return {
        ...state,
        isLoaded: true,
        playlists: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
