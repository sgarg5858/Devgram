import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom'
import {addExperience} from '../../store/actions/Profile';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

const AddExperience = props => {

    const[formData,setFormData]=useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current:false,
        description: ''
    });

    const[toDateDisabled,toggleDisabled]=useState(false);

    const{company,title,location,from,to,current,description}=formData;

    const onChange = (event) =>{
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    }
    const onSubmit = (event) =>{
        event.preventDefault();
        props.addExperience(formData,props.history)
    }

    return (
        <Container fluid>
        <Row>
            <Col lg={{span:4,offset:4}} md={{span:6,offset:3}} sm={{span:8,offset:2}} xs={{span:10,offset:1}}>
            <div style={{marginTop:'5vh'}}>
                {}
            <Card style={{ width: '100%',textAlign:'center' }} border="dark">
                <Card.Body>
                    <Card.Title style={{fontFamily:'Comic Sans MS', fontSize:'30px'}}>Add Experience Details</Card.Title>
                    <Card.Text style={{marginTop:'2vh',marginBottom:'2vh'}}>
                        <Form >
                            <Form.Group controlId="formBasicEmail1">
                                <Form.Control 
                                required 
                                name="company" 
                                value={company} 
                                onChange={(event)=>onChange(event)} 
                                style={{ backgroundColor:'whitesmoke' }} 
                                type="text" 
                                placeholder="Company" />
                               
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control 
                                required 
                                name="title" 
                                value={title}
                                onChange={(event)=>onChange(event)} 
                                style={{ backgroundColor:'whitesmoke' }} 
                                type="text" 
                                placeholder="title" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail2">
                                <Form.Control 
                                required 
                                name="location" 
                                value={location} 
                                onChange={(event)=>onChange(event)} 
                                style={{ backgroundColor:'whitesmoke' }} 
                                type="text" 
                                placeholder="Location" />
                               
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail3" style={{textAlign:'left'}}>
                                <Form.Label >From Date:</Form.Label>
                                <Form.Control 
                                required 
                                name="from" 
                                value={from} 
                                onChange={(event)=>onChange(event)} 
                                style={{ backgroundColor:'whitesmoke' }} 
                                type="date" 
                                placeholder="From Date" />
                               
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail5">
                            <Form.Check 
                            style={{textAlign:'left'}}
                            name="current" 
                            value={current} 
                            checked={current} 
                            type="checkbox" 
                            label="Current Job" 
                            onChange={(event)=>{
                                setFormData({...formData,current:!current});
                                toggleDisabled(!toDateDisabled);
                            }}
                            />
                               
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail4" style={{textAlign:'left'}}>
                                <Form.Label >To Date:</Form.Label>
                                <Form.Control 
                                required 
                                name="to" 
                                value={to} 
                                onChange={(event)=>onChange(event)} 
                                style={{ backgroundColor:'whitesmoke' }} 
                                disabled={toDateDisabled? true:false}
                                type="date" 
                                placeholder=" To Date" />
                               
                            </Form.Group>
                          
                            <Form.Group controlId="formBasicEmail6">
                                <Form.Control 
                                required 
                                name="description" 
                                value={description} 
                                onChange={(event)=>onChange(event)} 
                                style={{ backgroundColor:'whitesmoke' }} 
                                type="text" 
                                placeholder="Job Description" />
                               
                            </Form.Group>
                            

                            <Button disabled={!company || !title || !from} onClick={(event)=>onSubmit(event)} variant="primary"  type="button" block>
                                Add Experience
                            </Button>
                            
                        </Form>
                    </Card.Text >
                    
                </Card.Body>
            </Card>
        </div>
            
            </Col>
        </Row>
    </Container>
    )
}

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired
}

export default connect(null,{addExperience})(withRouter(AddExperience))
