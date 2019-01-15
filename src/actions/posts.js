import { ACTION_GET_POSTS, ACTION_ADD_POST, ACTION_DELETE_POST, ACTION_EDIT_POST } from '../actiontypes'
import axios from 'axios'
import moment from 'moment';
import { toast } from "react-toastify";


export const getPosts = () => {

    return (dispatch) => {

        axios.get('http://localhost:3000/posts')
            .then((response) => {
                let posts = response.data.map(p => ({
                    ...p,
                    date: moment(p.date)
                }))
                dispatch({ type: ACTION_GET_POSTS, payload: posts });
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

export const addPost = (post) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/posts', post)
            .then((response) => {
                let responsePost = {
                    ...response.data,
                    date: moment(response.data.date)}
                dispatch({ type: ACTION_ADD_POST, post: responsePost });
                toast.success("You added the post");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

export const editPost = (post) => {
    return (dispatch) => {
        axios.put('http://localhost:3000/posts/' + post.id, post)
            .then((response) => {
                let responsePost = {
                    ...response.data,
                    date: moment(response.data.date)}
                dispatch({ type: ACTION_EDIT_POST, post: responsePost });
                toast.success("You edited the post");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

export const deletePost = (id) => {
    return (dispatch) => {
        axios.delete('http://localhost:3000/posts/' + id)
            .then(response => {
                dispatch({ type: ACTION_DELETE_POST, id });
                toast.success("You deleted the post");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

