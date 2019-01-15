import axios from 'axios'
import {ACTION_GET_CATEGORIES, ACTION_ADD_CATEGORY, ACTION_DELETE_CATEGORY, ACTION_EDIT_CATEGORY} from '../actiontypes'
import { toast } from "react-toastify";

export const getCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/categories')
            .then((response) => {
                
                dispatch({ type: ACTION_GET_CATEGORIES, payload: response.data  });
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}


export const addCategory = (category) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/categories', category)
            .then((response) => {
                dispatch({ type: ACTION_ADD_CATEGORY, category: response.data });
                toast.success("You added the category");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}
export const deleteCategory = (id) => {
    return (dispatch) => {
        axios.delete('http://localhost:3000/categories/' +id)
            .then((response) => {
                dispatch({ type: ACTION_DELETE_CATEGORY, id});
                toast.success("You deleted the category");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

export const editCategory = (category) => {
    return (dispatch) => {
        axios.put('http://localhost:3000/categories/' + category.id, category)
            .then((response) => {
                dispatch({ type: ACTION_EDIT_CATEGORY, category: response.data });
                toast.success("You edited the category");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}