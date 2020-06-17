import {GET_PROFILE,GET_PROFILES,GET_PROFILE_ERROR,UPDATE_PROFILE, DELETE_ACCOUNT,CLEAR_PROFILE, GET_REPOS, FILTER_PROFILES}  from './types';
import axios from 'axios';
import { config } from '../../config';
import {setAlert} from './Alert';
//Check  i think there is no need to setAuthToken as by the time we call this
//User is already loaded which sets the token
export const getCurrentProfile = () => async dispatch =>{
    try {
       const res = await axios.get('http://localhost:4000/api/profile/currentUser');
       dispatch({
           type:GET_PROFILE,
           payload:res.data
       }) 
    } catch (error) {
        console.log(error);
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
};

export const getProfileById = (userId) => async dispatch =>{
    try {
       const res = await axios.get(`http://localhost:4000/api/profile/user/${userId}`);
       dispatch({
           type:GET_PROFILE,
           payload:res.data
       }) 
    } catch (error) {
        console.log(error);
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response.data.msg
        })
    }
};

export const getGithubRepos = (githubusername) => async dispatch =>{
    try {
       const res = await axios.get(`http://localhost:4000/api/profile/github/${githubusername}`);
       dispatch({
           type:GET_REPOS,
           payload:res.data
       }) 
    } catch (error) {
        console.log(error);
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
};

export const getAllProfiles = () => async dispatch =>{
    //Will prevent the flashing of current user logged in....
    dispatch({type:CLEAR_PROFILE});
    try {
       const res = await axios.get('http://localhost:4000/api/profile/all');
       dispatch({
           type:GET_PROFILES,
           payload:res.data
       }) 
    } catch (error) {
        console.log(error);
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
};


//Create or Update Profile
export const createProfile = (formData,history) => async dispatch =>{
    try {
        const res= await axios.post('http://localhost:4000/api/profile/create',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        }) ;
        dispatch(setAlert('Profile Updated','success'));
          history.push('/dashboard');
    } catch (error) {
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
};
//add Experience
export const addExperience = (formData,history) =>async dispatch =>{
    try {
        const res= await axios.put('http://localhost:4000/api/profile/addexperience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        }) ;
        dispatch(setAlert('Experience Added','success'));
          history.push('/dashboard');
    } catch (error) {
        dispatch(setAlert('Request Failed','danger'));
       
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
}

export const addEducation = (formData,history) =>async dispatch =>{
    try {
        const res= await axios.put('http://localhost:4000/api/profile/addEducation',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        }) ;
        dispatch(setAlert('Education Added','success'));
          history.push('/dashboard');
    } catch (error) {
        dispatch(setAlert('Request Failed','danger'));
       
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
}

export const deleteExperience = (expId) => async dispatch =>{
    try {
        const res= await axios.delete(`http://localhost:4000/api/profile/deleteExperience/${expId}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        }) ;
        dispatch(setAlert('Experience Removed','success'));

    } catch (error) {
        dispatch(setAlert('Request Failed','danger'));
       
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
}
export const deleteEducation = (expId) => async dispatch =>{
    try {
        const res= await axios.delete(`http://localhost:4000/api/profile/deleteEducation/${expId}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        }) ;
        dispatch(setAlert('Education Removed','success'));

    } catch (error) {
        dispatch(setAlert('Request Failed','danger'));
       
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
}

export const deleteAccount  = (expId) => async dispatch =>{
    try {
        const res= await axios.delete(`http://localhost:4000/api/profile/delete`);
        dispatch({
            type:CLEAR_PROFILE
        }) ;
       dispatch({
           type:DELETE_ACCOUNT
       })
       dispatch(setAlert('Your account has been permanently deleted','success'));
    } catch (error) {
        dispatch(setAlert('Request Failed','danger'));
       
        dispatch({
            type:GET_PROFILE_ERROR,
            payload:error.response
        })
    }
}
export const filterDevelopers=(name) => async dispatch =>{

    dispatch({
        type:FILTER_PROFILES,
        payload:name
    })
} 
