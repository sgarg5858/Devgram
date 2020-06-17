import {GET_PROFILE,GET_PROFILE_ERROR,GET_PROFILES,CLEAR_PROFILE,UPDATE_PROFILE, GET_REPOS, FILTER_PROFILES} from '../actions/types';

const initialState={
    profile:null,
    profiles:[],
    isLoading:true,
    repos:[],
    error:null,
    filteredProfiles:[]
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
                isLoading:false,
                error:{}
            };
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                isLoading:false,
                filteredProfiles:payload,
                error:{}
            };
        case FILTER_PROFILES:
            const filteredDevelopers=state.profiles.filter((profile)=>{
                return (
                (profile.user.name.toLowerCase()).includes(payload.toLowerCase())||
                (profile.status.toLowerCase()).includes(payload.toLowerCase()) 
                ) ;
            });
            return{
                ...state,
                filteredProfiles:filteredDevelopers,
                error:{}
            }
        case GET_REPOS:
            return{
                ...state,
                repos:payload,
                isLoading:false,
                error:{}
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                isLoading:false,
                error:{}
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