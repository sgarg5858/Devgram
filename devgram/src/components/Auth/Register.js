import React,{useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register,checkEmail} from '../../store/actions/Auth';

const Register = ({register,checkEmail,auth:{isAuthenticated,alreadyRegistered}}) => {

    const[formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    });
    const{name,email,password,confirmpassword}=formData;

    const onChange = (event) =>{
        if(event.target.name==='email')
        {
            setTyping(true);
        }
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    };
    const[typing,setTyping]=useState(false);

   const call = ()=>{
    checkEmail({email});
    setTyping(false);
   }
    const onSubmit = (event) =>{
        event.preventDefault();
        if(password !== confirmpassword)
        {
            console.log("Passwords do not Match");
        }else{
            console.log(formData);
            register({name,email,password});
        }
    }
    if(isAuthenticated)
    {
        return <Redirect to="/dashboard" />
    }

    return (
        <Container>
            <Row>
                <Col lg={{span:4,offset:4}} md={{span:6,offset:3}} sm={{span:8,offset:2}} xs={{span:10,offset:1}}>
                
                <Card style={{ width: '100%',marginTop:'12vh',textAlign:'center' }}>
                    <Card.Body>
                        <Card.Title style={{fontFamily:'Comic Sans MS', fontSize:'30px'}}>Devgram</Card.Title>
                        <Card.Text style={{marginTop:'2vh',marginBottom:'2vh'}}>
                            <div style={{ color:'grey',marginBottom:'2vh' }}>Sign up to explore Dev community</div>
                            <Form >
                                <Form.Group controlId="formBasicName">
                                    <Form.Control required name="name"  value={name} onChange={(event)=>onChange(event)} style={{ backgroundColor:'whitesmoke' }} type="text" placeholder="Name" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control required name="email"  value={email} onChange={(event)=>{return onChange(event)}} onBlur={call}   style={{ backgroundColor:'whitesmoke' }} type="email" placeholder="Email" />
                                    {alreadyRegistered && !typing ? <div style={{color:'red',textAlign:'left'}}>This email is already registered</div>:null}
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control required name="password"  value={password} onChange={(event)=>onChange(event)}  style={{ backgroundColor:'whitesmoke' }} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Control required name="confirmpassword"  value={confirmpassword} onChange={(event)=>onChange(event)} style={{ backgroundColor:'whitesmoke' }} type="password" placeholder="Confirm Password" />
                                </Form.Group>

                                <Button variant="primary"  type="button" block onClick={(event) => onSubmit(event)}>
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Text >
                        
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%',marginTop:'4vh',textAlign:'center' }}>
                    <Card.Body>
                        <Card.Text style={{marginTop:'1vh',marginBottom:'1vh'}}>
                         Have an account? <Link to="/login"><strong >Log in</strong></Link>
                        </Card.Text >
                        
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
       
    )
}

Register.propTypes = {
    register:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps= state =>({
    auth:state.auth
})

export default connect(mapStateToProps,{register,checkEmail})(Register);
 