import React,{useState} from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import {connect} from 'react-redux'
import {createProfile} from '../../store/actions/Profile';
import {withRouter} from 'react-router-dom';


const CreateProfile = ({profile,createProfile,history}) => {


    
    const[formData,setFormData]= useState({
        company:'' , website:'' , location:'',
        status:'', skills:'', githubusername:'',
        bio:'', twitter:'', facebook:'',
        youtube:'', linkedin:'', instagram:''
    });


    const{company,website,location,status,skills,githubusername,bio,twitter,facebook,youtube,linkedin,instagram}=
    formData;

  const  onChange= (event) =>{
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    };

const onSubmit = (event) =>{
    event.preventDefault();
    console.log(formData);
    createProfile(formData,history);
}


    return (
        <Container fluid>
            <Row>
                <Col lg={{span:4,offset:4}} md={{span:6,offset:3}} sm={{span:8,offset:2}} xs={{span:10,offset:1}}>
                <div style={{marginTop:'5vh'}}>
                    {}
                <Card style={{ width: '100%',textAlign:'center' }}>
                    <Card.Body>
                        <Card.Title style={{fontFamily:'Comic Sans MS', fontSize:'30px'}}>Create Profile</Card.Title>
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
                                    name="website" 
                                    value={website}
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="Website" />
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
                                <Form.Group controlId="formBasicEmail3">
                                    <Form.Control 
                                    required 
                                    name="status" 
                                    value={status} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="** Your job title at your company" />
                                   
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail4">
                                    <Form.Control 
                                    required 
                                    name="skills" 
                                    value={skills} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    as="textarea" 
                                    placeholder=" ** Enter skills and separate them by comma" />
                                   
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail5">
                                    <Form.Control 
                                    required 
                                    name="bio" 
                                    value={bio} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="Bio" />
                                   
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail6">
                                    <Form.Control 
                                    required 
                                    name="githubusername" 
                                    value={githubusername} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="Github Username for Adding Repos" />
                                   
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail7">
                                    <Form.Control 
                                    required 
                                    name="linkedin" 
                                    value={linkedin} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="Add your linkedin profile link" />
                                   
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail8">
                                    <Form.Control 
                                    required 
                                    name="instagram" 
                                    value={instagram} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="Add your instagram profile link" />
                                   
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail9">
                                    <Form.Control 
                                    required 
                                    name="facebook" 
                                    value={facebook} 
                                    onChange={(event)=>onChange(event)} 
                                    style={{ backgroundColor:'whitesmoke' }} 
                                    type="text" 
                                    placeholder="Add your facebook profile link" />
                                   
                                </Form.Group>

                                <Button disabled={!status || !skills} onClick={(event)=>onSubmit(event)} variant="primary"  type="button" block>
                                    Update Profile
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

CreateProfile.propTypes = {

}

const mapStateToProps= state => ({
    profile:state.profile
})

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile))
