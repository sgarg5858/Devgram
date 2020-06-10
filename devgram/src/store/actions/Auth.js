import axios from 'axios';
import {
    REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_FAIL,LOGIN_SUCCESS
} from './types';
import {config} from '../../config';

export const register = ({name,email,password}) => async dispatch =>{
    
    const body=JSON.stringify({name,email,password});

   try {
    console.log('Request is about to send');
    const res= await axios.post('http://localhost:4000/api/users/register',body,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    })

   } catch (error) {
       dispatch({
           type:REGISTER_FAIL
       })   
   }
}
export const login=({email,password}) => async dispatch =>{

    const body= JSON.stringify({email,password});
    try{
        const res = await axios.post('http://localhost:4000/api/auth/login',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    
    }catch(error)
    {
        dispatch({
            type: LOGIN_FAIL
        })   
    }
}