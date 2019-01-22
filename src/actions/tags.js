import axios from 'axios'
import {ACTION_GET_TAGS, ACTION_ADD_TAG, ACTION_DELETE_TAG, ACTION_EDIT_TAG} from '../actiontypes'
import { toast } from "react-toastify";

export const getTags = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/tags')
            .then((response) => {
                
                dispatch({ type: ACTION_GET_TAGS, payload: response.data  });
            })
            .catch((error) => {
                toast.error("ERROR, Don't get tags");
            });
    };
}


export const addTag = (Tag) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/tags', Tag)
            .then((response) => {
                dispatch({ type: ACTION_ADD_TAG, Tag: response.data });
                toast.success("You added the Tag");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}
export const deleteTag = (id) => {
    return (dispatch) => {
        axios.delete('http://localhost:3000/tags/' +id)
            .then((response) => {
                dispatch({ type: ACTION_DELETE_TAG, id});
                toast.success("You deleted the Tag");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

export const editTag = (Tag) => {
    return (dispatch) => {
        axios.put('http://localhost:3000/tags/' + Tag.id, Tag)
            .then((response) => {
                dispatch({ type: ACTION_EDIT_TAG, Tag: response.data });
                toast.success("You edited the Tag");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}