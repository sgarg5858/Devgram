import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Button, ButtonGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Moment from 'react-moment';
import {connect} from 'react-redux'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import {addLike,removeLike,deletePost} from '../../store/actions/post';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
const PostItem = ({post:{_id,name,text,avatar,user,likes,comments,date},auth,history,addLike,removeLike,deletePost}) => {
    const divStyle = {
        color: 'red',
    };
  const [show, setShow] = useState(false);

  const handleClose1 = () => setShow(false);
  const handleClose2 = () =>{
    deletePost(_id);
    setShow(false);
   
  }
  const handleShow = () => setShow(true);
  if(show)
  {
      return (<Modal show={show} onHide={handleClose1} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose2}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            No
          </Button>
        </Modal.Footer>
      </Modal>)
  }
    return (
        <Col lg={{span:6,offset:3}} md={{span:8,offset:2}} sm={{span:8,offset:2}} xs={{span:10,offset:1}} >
            <Card bg="dark" text="white" style={{width:'100%',marginTop:'4vh'}}>
                <Card.Header onClick={()=>history.push(`/profile/${user}`)} style={{color:'#F9BE7C',cursor:'pointer',padding:'0px',paddingLeft:'10px'}}>{name}</Card.Header>
                <Card.Body style={{padding:'5px'}}>
                    <Card.Title style={{color:'#DDEEFF',padding:'0px',paddingLeft:'3px',margin:'3px'}}>{text}</Card.Title>
                    <Card.Text style={{color:'#DDEEFF',padding:'0px',paddingLeft:'6px'}}>Posted on {<Moment format='YYYY/MM/DD'>{date}</Moment>}</Card.Text>
                </Card.Body>
                <Card.Footer style={{padding:'4px'}}>
                   <ButtonGroup>
                   <Button variant="dark" onClick={()=> addLike(_id)}>
                        <ThumbUpIcon style={{color:'#AFE5D0'}}/>
                        {likes && likes.length>0?<span style={{marginLeft:'3px'}}>{likes.length}</span>:null}
                    </Button >
                    <Button variant="dark" onClick={()=>removeLike(_id)} style={{marginLeft:'2vw'}}>
                        <ThumbDownIcon style={{color:'#C2C5ED'}}/>
                    </Button>
                    <Button variant="dark" onClick={()=>{history.push(`/post/${_id}`)}} style={{marginLeft:'2vw'}}>
                        <CommentIcon style={{color:'#F7C1D9'}}/>
                     {comments.length >0 ?    <span style={{marginLeft:'3px'}}>{comments.length}</span>:null}
                    </Button>
                    { auth.user!==null && user === auth.user._id ? 
                    <Button variant="dark" style={{marginLeft:'2vw'}} onClick={()=>setShow(true)}>
                    <DeleteIcon ba style={{color:'red'}} />
                    </Button>:null
                    }
                   </ButtonGroup>
                     <br></br>
                       <CommentForm postid={_id}/>
                       <div>Comments</div>
                       {comments.map((comment)=>{
                           return <CommentItem key={comment._id} comment={comment} postid={_id} />
                       })}
                   
                </Card.Footer>
            </Card>
        </Col>
    )
}

PostItem.propTypes = {
post:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
addLike:PropTypes.func.isRequired,
removeLike:PropTypes.func.isRequired,
deletePost:PropTypes.func.isRequired
}
const mapStateToProps= state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{addLike,removeLike,deletePost})(withRouter(PostItem));
