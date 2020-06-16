import {
    GET_POSTS,POST_ERROR, UPDATE_LIKES, 
    DELETE_POST, ADD_POST, GET_POST, 
    ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT_LIKES
    } from './types';
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

export const addComment =(postid,text) => async dispatch =>{
    const body=JSON.stringify({text});
    try {
        const res = await axios.post(`http://localhost:4000/api/post/addComment/${postid}`,body,config); 
        dispatch({
            type:ADD_COMMENT,
            payload:{comments:res.data,postid}
        });
        dispatch(setAlert('Comment Added','success'));
    } catch (error) {
         dispatch(setAlert('Request Failed','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
}
}
export const deleteComment =(postid,commentid) => async dispatch =>{
    try {
        const res = await axios.delete(`http://localhost:4000/api/post/deleteComment/${postid}/${commentid}`); 
        dispatch({
            type:REMOVE_COMMENT,
            payload:{comments:res.data,postid}
        });
        dispatch(setAlert('Comment Deleted','success'));
    } catch (error) {
         dispatch(setAlert('Request Failed','danger'));
        dispatch({
            type:POST_ERROR,
            payload:error
        });
}
}
export const likeComment=(postid,commentid) => async dispatch =>{
    try {
        const res = await axios.put(`http://localhost:4000/api/post/likeComment/${postid}/${commentid}`); 
        dispatch({
            type:UPDATE_COMMENT_LIKES,
            payload:{post:res.data,postid,commentid}
        });
        dispatch(setAlert('Comment Liked','success'));
    } catch (error) {
        //  dispatch(setAlert('Request Failed','danger'));
        // dispatch({
        //     type:POST_ERROR,
        //     payload:error
        // });
}
}
export const dislikeComment=(postid,commentid) => async dispatch =>{
    try {
        const res = await axios.put(`http://localhost:4000/api/post/dislikeComment/${postid}/${commentid}`); 
        dispatch({
            type:UPDATE_COMMENT_LIKES,
            payload:{post:res.data,postid,commentid}
        });
        dispatch(setAlert('Comment unliked','success'));
    } catch (error) {
        //  dispatch(setAlert('Request Failed','danger'));
        // dispatch({
        //     type:POST_ERROR,
        //     payload:error
        // });
}
}