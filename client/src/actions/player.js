export const SET_PLAYLIST = "SET_PLAYLIST";

export function setPlaylist(playlist) {
    return { type: SET_PLAYLIST, playlist };
}

// the state of my video player can be summed up as follows:
```
currently_playing_media: media_url
play_state: 
```