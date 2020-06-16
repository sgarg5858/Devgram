import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../../store/actions/post';
import Card from 'react-bootstrap/Card'
import { Button} from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
const PostForm = ({addPost}) => {

    const[text,setText]=useState('');

    return (
        <Col lg={{span:6,offset:3}} md={{span:8,offset:2}} sm={{span:8,offset:2}} xs={{span:10,offset:1}} >
            <Card bg="dark" text="white">
                <Card.Body>
                    <Card.Title style={{color:'#F9BE7C'}}>
                        What's on your mind?
                    </Card.Title>
                    <Card.Text>
                        <Form>
                        <Form.Group controlId="text">
                            <Form.Control 
                            required 
                            name="text" 
                            value={text} 
                            onChange={(event)=>setText(event.target.value)} 
                            style={{ backgroundColor:'whitesmoke' }} 
                            as="textarea"  
                            />
                        </Form.Group>
                        <Button  style={{backgroundColor:'#EBA40E',border:'#F9BE7C'}} onClick={(event)=>{
                            event.preventDefault();
                            addPost(text);
                            setText('');
                            }} 
                              type="button">
                                    post
                                </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
       </Col>
    )
}

PostForm.propTypes = {
addPost:PropTypes.func.isRequired
}

export default connect(null,{addPost})(PostForm)
