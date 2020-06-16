import {GET_POSTS,POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST} from './types';
import axios from 'axios';
import {setAlert} from './Alert';
import {loadUser} from './Auth';
import {config} from '../../config';

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
            type:POST_ERROR,
            payload:error
        });
    }
};

export const getPost = (postid) => async dispatch =>{
    dispatch(loadUser);
    try {
        const res = await axios.get(`http://localhost:4000/api/post/getPostById/${postid}`); 
        dispatch({
            type:GET_POST,
            payload:res.data
        });
    } catch (error) {
        dispatch(setAlert('Could not Fetch Post','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
    }
};

export const addLike= (postid) => async dispatch =>{
    try {
        const res = await axios.put(`http://localhost:4000/api/post/like/${postid}`); 
        dispatch({
            type:UPDATE_LIKES,
            payload:{postid,likes:res.data}
        });
    } catch (error) {
        // dispatch(setAlert(' you already liked this post','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
    }
}
export const removeLike= (postid) => async dispatch =>{
    try {
        const res = await axios.put(`http://localhost:4000/api/post/unlike/${postid}`); 
        dispatch({
            type:UPDATE_LIKES,
            payload:{postid,likes:res.data}
        });
    } catch (error) {
        // dispatch(setAlert('you have to first like this post','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
    }
}
export const deletePost =(postid) => async dispatch =>{
    try {
         await axios.delete(`http://localhost:4000/api/post/getPostById/${postid}`); 
        dispatch({
            type:DELETE_POST,
            payload:postid
        });
        dispatch(setAlert('Post deleted','success'));
    } catch (error) {
         dispatch(setAlert('Request Failed','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
}
}
export const addPost =(text) => async dispatch =>{
    const body=JSON.stringify({text});
    try {
        const res = await axios.post(`http://localhost:4000/api/post/addPost`,body,config); 
        dispatch({
            type:ADD_POST,
            payload:res.data
        });
        dispatch(setAlert('Post Added','success'));
    } catch (error) {
         dispatch(setAlert('Request Failed','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
}
}