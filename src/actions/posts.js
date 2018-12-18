import {ACTION_GET_POSTS} from '../index'
import axios from 'axios'

   
export const getPosts = () => {

    return (dispatch) => {
        
      
        axios.get('http://localhost:3000/posts')
            .then((response) => {
                dispatch({ type: ACTION_GET_POSTS, payload :response.data }); 
            })
            .catch((error) => {
                console.log(error);
            });
    };
}