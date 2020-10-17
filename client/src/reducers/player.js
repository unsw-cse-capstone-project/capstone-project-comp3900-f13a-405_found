import { SET_URL, SET_PLAYING, SET_IMAGE, SET_ARTIST, SET_TITLE, SET_SEEKING, SET_PLAYED, SET_DURATION} from '../actions/player'

const initial_state = {
    url: 'https://www.youtube.com/watch?v=rI6igzB6cXE',
    playing: false,
    title: null,
    artist: null,
    image: null,
    played: 0,
    seeking: false,
    duration: 0,
}

export default function player(state = initial_state, action) {
    switch(action.type) {
        case SET_URL:
            return Object.assign({}, state, {url: action.url})
        case SET_PLAYING:
            return Object.assign({}, state, {playing: action.playing})
        case SET_IMAGE:
            return Object.assign({}, state, {image: action.image})
        case SET_ARTIST:
            return Object.assign({}, state, {artist: action.artist})
        case SET_TITLE:
            return Object.assign({}, state, {title: action.title})
        case SET_SEEKING: 
            return Object.assign({}, state, {seeking: action.seeking})
        case SET_PLAYED: 
            return Object.assign({}, state, {played: action.played})
        case SET_DURATION: 
            return Object.assign({}, state, {duration: action.duration})
        default:
            return state;
    }
}