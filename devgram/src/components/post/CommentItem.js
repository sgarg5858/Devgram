import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {deleteComment,likeComment,dislikeComment} from '../../store/actions/post'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, ButtonGroup } from 'react-bootstrap';
import Spinner from '../Layout/Spinner';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const CommentItem = ({postid,comment:{_id,text,name,user,date,likes},history,deleteComment,likeComment,dislikeComment,auth}) => {
    return (
         auth===null || auth.user===null?<Spinner/>:
        <div style={{marginTop:'1vh'}}>
         
         <span 
         onClick={()=>history.push(`/profile/${user}`)} 
         style={{color:'#F9BE7C',cursor:'pointer'}}>{name}
         </span>
        
        <span style={{marginLeft:'1vw',color:'#DDEEFF'}}>{text}</span>

        <Button variant="dark" onClick={()=>likeComment(postid,_id)} style={{marginLeft:'1vw',cursor:'pointer'}} > 
            <ThumbUpIcon style={{color:'#AFE5D0'}}/>
            {likes && likes.length>0?<span style={{marginLeft:'3px'}}>{likes.length}</span>:null}
         </Button>

        <Button  variant="dark" onClick={()=>dislikeComment(postid,_id)} style={{marginLeft:'1vw',cursor:'pointer'}}>
            <ThumbDownIcon style={{color:'#C2C5ED'}}/>
            </Button>

         <span style={{marginLeft:'1vw'}}>{
            user===auth.user._id?
            <Button variant="dark" onClick={()=>deleteComment(postid,_id)}>
                <DeleteIcon  ba style={{color:'red'}}/>
            </Button>
            :null}
            </span>
        
        </div>
        
    )
}

CommentItem.propTypes = {
    deleteComment:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    comment:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps,{deleteComment,likeComment,dislikeComment})(withRouter(CommentItem))
