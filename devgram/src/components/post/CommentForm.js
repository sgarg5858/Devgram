import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../store/actions/post'
import Card from 'react-bootstrap/Card'
import { Button} from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
const CommentForm = ({addComment,postid}) => {

    const[text,setText]=useState('');

    return (
       
            <Card bg="dark" text="white">
                    <Card.Header style={{padding:'4px'}}>
                        <Form>
                        <Row>
                            <Col lg={8} md={8} sm={8} xs={8}>
                            <Form.Group controlId="text">
                            <Form.Control 
                            required 
                            name="text" 
                            value={text} 
                            onChange={(event)=>setText(event.target.value)} 
                            style={{ backgroundColor:'whitesmoke' }} 
                            as="textarea"  
                            placeholder="Leave a comment"
                            />
                        </Form.Group>
                            </Col>
                            <Col lg={3} md={3} sm={3} xs={3}>
                                <Button disabled={text===''} style={{backgroundColor:'#EBA40E',border:'#F9BE7C',marginTop:'2vh'}} onClick={(event)=>{
                                event.preventDefault();
                                addComment(postid,text);
                                setText('');
                                }} 
                                type="button">
                                        comment
                                </Button>
                            </Col>
                        </Row>
                        
                        </Form>
                    </Card.Header>
            </Card>

    )
}

CommentForm.propTypes = {
    addComment:PropTypes.func.isRequired
}

export default connect(null,{addComment})(CommentForm)
