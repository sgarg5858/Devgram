import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPosts} from '../../store/actions/post';
import Spinner from '../Layout/Spinner';
import PostItem from './PostItem';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Posts = ({getPosts,post:{posts,isLoading},auth:{user}}) => {

    useEffect(()=>{
        getPosts();
    },[getPosts]);

    return (
       isLoading && user!==null ?<Spinner/>:
           <Container fluid>
                {/* PostForm Component */}
                {/* <Row style={{marginTop:'2vh'}}  >
                <Col lg={{span:4,offset:4}} md={{span:4,offset:4}} sm={{span:6,offset:3}} xs={{span:8,offset:2}}>
                <Form.Group controlId="search" >
                    <Form.Control type="text" placeholder="Search by name, job title" style={{ backgroundColor:'black',color: `#007bff` }}  onChange={(event)=>filterDevelopers(event.target.value)}/>
                </Form.Group>
                </Col>
                </Row> */}
            <Row style={{marginTop:'2vh'}}>
                    {
                        posts.map((post)=>{
                        return <PostItem key={post._id} post={post} />
                        })
                    }
            </Row>
        </Container>
          
    )
}

Posts.propTypes = {
post:PropTypes.object.isRequired,
getPosts:PropTypes.func.isRequired
}
const mapStateToProps = state  =>({
    post:state.post,
    auth:state.auth
}) 

export default connect(mapStateToProps,{getPosts})(Posts)
