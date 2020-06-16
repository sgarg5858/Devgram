import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getPost} from '../../store/actions/post';
import Spinner from '../Layout/Spinner';
import PostItem from '../posts/PostItem';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CommentForm from './CommentForm';
const Post = ({getPost,post:{post,isLoading},match,auth:{user}}) => {

    useEffect(()=>{
        getPost(match.params.postid);
    },[getPost,match]);

    return (
        isLoading || user===null || post===null ? <Spinner/>:
        <Container fluid>
        <Row style={{marginTop:'2vh'}}>
            <PostItem post={post} />

        </Row>

</Container>
    )
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}
const mapStateToProps= state =>({
    post:state.post,
    auth:state.auth
})
export default connect(mapStateToProps,{getPost})(Post)
