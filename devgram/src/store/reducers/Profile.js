import {GET_PROFILE,GET_PROFILE_ERROR,GET_PROFILES,CLEAR_PROFILE,UPDATE_PROFILE} from '../actions/types';

const initialState={
    profile:null,
    profiles:[],
    isLoading:true,
    gitrepos:[],
    error:{}
}

export default function(state=initialState,action)
{
    const{type,payload}=action;
    switch(type)
    {
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return{
                ...state,
                profile:payload,
                isLoading:false
            };
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                isLoading:false
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                isLoading:false
            }
        case GET_PROFILE_ERROR:
            return{
                ...state,
                profile:null,
                isLoading:false,
                error:payload
            }
        default:
            return state;
    }
}