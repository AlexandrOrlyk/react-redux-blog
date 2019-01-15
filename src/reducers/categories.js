import { ACTION_GET_CATEGORIES, ACTION_ADD_CATEGORY, ACTION_EDIT_CATEGORY,ACTION_DELETE_CATEGORY } from '../actiontypes'


const init = {
    loaded: false,
    list: [ ]
}

export const categories = (state = init, action) => {
    switch (action.type) {
        case ACTION_GET_CATEGORIES:
            return {
                
                list: action.payload,
                loaded: true
                
            };
            case ACTION_EDIT_CATEGORY:
            return {
                ...state,
                list: [...state.list.filter(c => c.id !== action.category.id), action.category]
            };
            case ACTION_ADD_CATEGORY:
            return {
                ...state,
                list: [...state.list, action.category]
            };
            case ACTION_DELETE_CATEGORY:
            return {
                ...state,
                list: state.list.filter(p => action.id !== p.id)
            };
        default:
            return state
    }
}