import { ACTION_GET_POSTS, ACTION_EDIT_POST, ACTION_ADD_POST, ACTION_DELETE_POST } from './actiontypes'


const init = {
    loaded: false,
    list: []
}

export const posts = (state = init, action) => {
    switch (action.type) {
        case ACTION_GET_POSTS:
            return {
                list: action.payload,
                loaded: true
            };
        case ACTION_EDIT_POST:
            return {
                 ...state,
                list: [...state.list.filter(p => p.id !== action.post.id), action.post]
            };
        case ACTION_ADD_POST:
            return {
                ...state,
                list: [...state.list, action.post]
            };
        case ACTION_DELETE_POST:
            return {
                ...state,
                list: state.list.filter(p => action.id !== p.id)
            };
        default:
            return state
    }
}