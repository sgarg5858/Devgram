import {GET_POSTS,POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST} from '../actions/types';

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
        case ADD_POST:
            return{
                ...state,
                posts:[payload,...state.posts],
                isLoading:false
            }
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                isLoading:false,
                filteredPosts:payload
            }
        case GET_POST:
            return {
                ...state,
                post:payload,
                isLoading:false
            }
        case UPDATE_LIKES:
            let updatedPost=null;
            if(state.post!==null)
            {
                updatedPost={...state.post,likes:payload.likes}
            }
            let updatedPosts=null;
            if(state.posts!==null)
            {
              updatedPosts = state.posts.map((post)=>{
                    return post._id===payload.postid ? {...post,likes:payload.likes} : post
                })
            }
            return{
                ...state,
                posts:updatedPosts ,
                post:updatedPost,
                isLoading:false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter((post)=>{
                    return post._id !==payload
                }),
                isLoading:false
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