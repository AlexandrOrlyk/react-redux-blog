import {ACTION_GET_POSTS} from '../index'

const init = {
    loaded:false
}

export default function posts(state = init, action) {
    switch (action.type) {
        case ACTION_GET_POSTS:
            return {
                list: action.payload,
                loaded: true
            };
        default:
            return state
    }
}