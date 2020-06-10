import {REGISTER_SUCCESS,REGISTER_FAIL, LOGIN_FAIL,LOGIN_SUCCESS} from '../actions/types';

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:true,
    user:null
}

export default function(state=initialState,action)
{
    const{type,payload}=action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                isLoading:false,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                isLoading:false,
                isAuthenticated:false,
                token:null
            };
        default:
            return state;
    }

}