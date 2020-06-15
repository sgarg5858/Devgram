import {GET_POSTS,POST_ERROR} from '../actions/types';

const initialState={
    posts:[],
    post:null,
    isLoading:true,
    error:null,
    filteredPosts:[]
}

export default function(state=initialState,action)
{
    const{type,payload}=action;

    switch(type)
    {
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                isLoading:false,
                filteredPosts:payload
            }
        case POST_ERROR:
            return {
                ...state,
                isLoading:false,
                error:payload
            }   
        default:
        return state;
    }
}