import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Button, ButtonGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Moment from 'react-moment';
import {connect} from 'react-redux'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
const PostItem = ({post:{_id,name,text,avatar,user,likes,comments,date},auth,history}) => {
    const divStyle = {
        color: 'red',
    };
    return (
        <Col lg={{span:6,offset:3}} md={{span:8,offset:2}} sm={{span:8,offset:2}} xs={{span:10,offset:1}} >
            <Card bg="dark" text="white" style={{width:'100%',marginTop:'4vh'}}>
                <Card.Header style={{color:'#F9BE7C'}}>{name}</Card.Header>
                <Card.Body>
                    <Card.Title style={{color:'#DDEEFF'}}>{text}</Card.Title>
                    <Card.Text style={{color:'#DDEEFF'}}>Posted on {<Moment format='YYYY/MM/DD'>{date}</Moment>}</Card.Text>
                </Card.Body>
                <Card.Footer>
                   <ButtonGroup>
                   <Button variant="dark">
                        <ThumbUpIcon style={{color:'#AFE5D0'}}/>
                        {likes.length>0?<span style={{marginLeft:'3px'}}>{likes.length}</span>:null}
                    </Button >
                    <Button variant="dark" style={{marginLeft:'2vw'}}>
                        <ThumbDownIcon style={{color:'#C2C5ED'}}/>
                    </Button>
                    <Button variant="dark" onClick={()=>{history.push(`/post/${_id}`)}} style={{marginLeft:'2vw'}}>
                        <CommentIcon style={{color:'#F7C1D9'}}/>
                     {comments.length >0 ?    <span style={{marginLeft:'3px'}}>{comments.length}</span>:null}
                    </Button>
                    { auth.user!==null && user === auth.user._id ? 
                    <Button variant="dark" style={{marginLeft:'2vw'}}>
                    <DeleteIcon ba style={{color:'red'}} />
                    </Button>:null
                    }
                   </ButtonGroup>
                </Card.Footer>
            </Card>
        </Col>
    )
}

PostItem.propTypes = {
post:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired
}
const mapStateToProps= state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{})(withRouter(PostItem));
