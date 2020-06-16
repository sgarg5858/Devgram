import {
    GET_POSTS,POST_ERROR, UPDATE_LIKES,
     DELETE_POST, ADD_POST, GET_POST,
     ADD_COMMENT,REMOVE_COMMENT,UPDATE_COMMENT_LIKES
    } from '../actions/types';

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
        case REMOVE_COMMENT:
        case ADD_COMMENT:
            let updatedPosts1=null;
            if(state.posts!==null)
            {
            const postIndex=state.posts.map((post)=>{return post._id}).indexOf(payload.postid);
            let selectedPost=state.posts[postIndex];
            selectedPost={...selectedPost,comments:payload.comments}
            updatedPosts1=state.posts.map((post)=>{return post._id===payload.postid? selectedPost:post });
            }
            return{
                ...state,
                post:{...state.post,comments:payload.comments},
                posts:updatedPosts1,
                isLoading:false
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
        case UPDATE_COMMENT_LIKES:
            let updatedPost1=state.post;
            let updatedPosts2=state.posts;
            if(state.post!==null)
            {
                if(state.post._id===payload.postid)
                {
                   updatedPost1=payload.post
                }
            }
                updatedPosts2=state.posts.map((post)=> post._id===payload.postid?payload.post:post)
            return{
                ...state,
                post:updatedPost1,
                posts:updatedPosts2,
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