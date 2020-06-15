import {GET_POSTS,POST_ERROR} from './types';
import axios from 'axios';
import {setAlert} from './Alert';
import {loadUser} from './Auth';

export const getPosts = () => async dispatch =>{
    dispatch(loadUser);
    try {
        const res = await axios.get(`http://localhost:4000/api/post/getAllPosts`); 
        dispatch({
            type:GET_POSTS,
            payload:res.data
        });
    } catch (error) {
        dispatch(setAlert('Could not Fetch Posts','danger'));
        dispatch({
            type:GET_POSTS,
            payload:error
        });
    }
};

export const