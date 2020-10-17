export const SET_URL = "SET_URL";
export const SET_PLAYING = "SET_PLAYING";
export const SET_IMAGE = "SET_IMAGE";
export const SET_ARTIST = "SET_ARTIST";
export const SET_TITLE = "SET_TITLE";
export const SET_SEEKING = "SET_SEEKING";
export const SET_PLAYED = "SET_PLAYED";
export const SET_DURATION = "SET_DURATION";

export function setUrl(url) {
    return { type: SET_URL, url };
}

export function setPlaying(playing) {
    return { type: SET_PLAYING, playing };
}

export function setImage(image) {
    return { type: SET_IMAGE, image };
}

export function setArtist(artist) {
    return { type: SET_ARTIST, artist };
}

export function setTitle(title) {
    return { type: SET_TITLE, title };
}

export function setSeeking(seeking) {
    return { type: SET_SEEKING, seeking };
}

export function setPlayed(played) {
    return { type: SET_PLAYED, played };
}

export function setDuration(duration) {
    return { type: SET_DURATION, duration };
}