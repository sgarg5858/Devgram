import {
    REGISTER_SUCCESS,REGISTER_FAIL, LOGIN_FAIL,
    LOGIN_SUCCESS, USER_SUCCESS, USER_FAIL, LOGOUT, ALREADY_REGISTERED,NOT_REGISTERED
} from '../actions/types';

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:true,
    user:null,
    alreadyRegistered:false
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
                isLoading:false
            };
        case USER_SUCCESS:
            return{
                ...state,
                user:payload,
                isLoading:false,
                isAuthenticated:true
            }
        case ALREADY_REGISTERED:
            return{
                ...state,
                alreadyRegistered:true
            }
        case NOT_REGISTERED:
            return{
                ...state,
                alreadyRegistered:false
            }
        case LOGOUT:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case USER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                isLoading:false,
                isAuthenticated:false,
                user:null,
                token:null
            };
        default:
            return state;
    }

}