import React,{useState} from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../store/actions/Auth'

const Login = ({login,auth:{isAuthenticated}}) => {

    const[formData,setFormData]=useState({
        email:'',
        password:''
    });
    const{email,password}=formData;

   const onSubmit= (event) =>{
        event.preventDefault();
        console.log({email,password});
        login({email,password});
    }
  const  onChange= (event) =>{
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    };
    if(isAuthenticated)
    {
       return <Redirect to="/myprofile" />
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={{span:4,offset:4}} md={{span:6,offset:3}} sm={{span:8,offset:2}} xs={12}>
                
                <Card style={{ width: '100%',marginTop:'15vh',textAlign:'center' }}>
                    <Card.Body>
                        <Card.Title style={{fontFamily:'Comic Sans MS', fontSize:'30px'}}>Devgram</Card.Title>
                        <Card.Text style={{marginTop:'2vh',marginBottom:'2vh'}}>
                            <Form >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control name="email" value={email} onChange={(event)=>onChange(event)} style={{ backgroundColor:'whitesmoke' }} type="email" placeholder="Email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control name="password" value={password} onChange={(event)=>onChange(event)} style={{ backgroundColor:'whitesmoke' }} type="password" placeholder="Password" />
                                </Form.Group>

                                <Button onClick={(event)=>onSubmit(event)} variant="primary"  type="button" block>
                                    Login
                                </Button>
                            </Form>
                        </Card.Text >
                        
                    </Card.Body>
                </Card>

                <Card style={{ width: '100%',marginTop:'4vh',textAlign:'center' }}>
                    <Card.Body>
                        <Card.Text style={{marginTop:'1vh',marginBottom:'1vh'}}>
                        Don't have an account? <Link to="/register"><strong>Sign Up</strong></Link>
                        </Card.Text >
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
       
    )
}

Login.propTypes = {
    login:PropTypes.func.isRequired
}

const mapStateToProps= state =>({
    auth:state.auth
})

export default connect(mapStateToProps,{login})(Login);
 