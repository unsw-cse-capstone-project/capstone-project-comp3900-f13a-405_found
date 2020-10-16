import { SET_PLAYLIST} from '../actions/player'

const initial_state = {
    playlist: null,
}

function player(state = initial_state, action) {
    switch(action.type) {
        case SET_PLAYLIST:
            return Object.assign({}, state, {playlist: action.playlist})
        default: 
            return state;
    }
}