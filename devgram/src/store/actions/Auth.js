import axios from 'axios';
import {
    REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_FAIL,LOGIN_SUCCESS, 
    USER_SUCCESS, USER_FAIL, LOGOUT,ALREADY_REGISTERED,NOT_REGISTERED, CLEAR_PROFILE
} from './types';
import {config} from '../../config';
import setAuthToken from '../../utils/setAuthToken';

//Register User
export const register = ({name,email,password}) => async dispatch =>{
    
    const body=JSON.stringify({name,email,password});

   try {
    console.log('Request is about to send');
    const res= await axios.post('http://localhost:4000/api/users/register',body,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    })
    dispatch(loadUser());
   } catch (error) {
       dispatch({
           type:REGISTER_FAIL
       })   
   }
}

//Login User
export const login=({email,password}) => async dispatch =>{

    const body= JSON.stringify({email,password});
    try{
        const res = await axios.post('http://localhost:4000/api/auth/login',body,config);
        console.log(res.data);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser());
    }catch(error)
    {
        console.log(error.response.data.error);
        dispatch({
            type: LOGIN_FAIL
        })   
    }
}
//Load User Data when user authenticates....
export const loadUser = () => async dispatch =>{
    if(localStorage.token)
    {
        setAuthToken(localStorage.token);
    }
    try {
      const res=  await axios.get('http://localhost:4000/api/auth/me');
        dispatch({
            type:USER_SUCCESS,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type: USER_FAIL
        })   
    }
}

//LOGOUT

export const logout = (history) => async dispatch =>{
    dispatch({
        type:LOGOUT
    })
    dispatch({
        type:CLEAR_PROFILE
    })
    history.push('/login');
}

//Check email

export const checkEmail = ({email}) => async dispatch =>{

    const body= JSON.stringify({email});
    try {
      const res= await axios.post('http://localhost:4000/api/users/checkemail',body,config);
      dispatch({
        type:NOT_REGISTERED
    })
    } catch (error) {
        dispatch({
            type:ALREADY_REGISTERED
        })
    }
}