import { ACTION_GET_POSTS, ACTION_ADD_POST, ACTION_DELETE_POST, ACTION_EDIT_POST } from '../actiontypes'
import axios from 'axios'
import moment from 'moment';
import { toast } from "react-toastify";


export const getPosts = () => {

    return (dispatch) => {

        axios.get('https://hb-blog.azurewebsites.net/api/posts')
            .then((response) => {
                let posts = response.data.map(p => ({
                    ...p,
                    Date: moment(p.Date)
                }))
                dispatch({ type: ACTION_GET_POSTS, payload: posts });
            })
            .catch((error) => {
                toast.error("ERROR, Don't get post");
            });
    };
}

export const addPost = (post) => {
    return (dispatch) => {
        axios.post(' https://hb-blog.azurewebsites.net/api/createpost', post)
            .then((response) => {
                let responsePost = {
                    ...response.data,
                    Date: moment(response.data.Date)}
                dispatch({ type: ACTION_ADD_POST, post: responsePost });
                toast.success("You added the post");
            })
            .catch((error) => {
                toast.error("ERROR, You can`t add post");
            });
    };
}

export const editPost = (post) => {
    return (dispatch) => {
        axios.put('https://hb-blog.azurewebsites.net/api/EditPost/' + post.Id, post)
            .then((response) => {
                let responsePost = {
                    ...response.data,
                    Date: moment(response.data.Date)}
                dispatch({ type: ACTION_EDIT_POST, post: responsePost });
                toast.success("You edited the post");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

export const deletePost = (Id) => {
    return (dispatch) => {
        axios.delete('https://hb-blog.azurewebsites.net/api/deletepost?Id=' + Id)
            .then(response => {
                dispatch({ type: ACTION_DELETE_POST, Id });
                toast.success("You deleted the post");
            })
            .catch((error) => {
                toast.error("ERROR");
            });
    };
}

