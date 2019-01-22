import { ACTION_GET_TAGS, ACTION_EDIT_TAG, ACTION_ADD_TAG,ACTION_DELETE_TAG } from '../actiontypes'


const init = {
    loaded: false,
    list: [ ]
}

export const Tags = (state = init, action) => {
    switch (action.type) {
        case ACTION_GET_TAGS:
            return {
                
                list: action.payload,
                loaded: true
                
            };
            case ACTION_EDIT_TAG:
            return {
                ...state,
                list: [...state.list.filter(c => c.id !== action.Tag.id), action.Tag]
            };
            case ACTION_ADD_TAG:
            return {
                ...state,
                list: [...state.list, action.Tag]
            };
            case ACTION_DELETE_TAG:
            return {
                ...state,
                list: state.list.filter(p => action.id !== p.id)
            };
        default:
            return state
    }
}