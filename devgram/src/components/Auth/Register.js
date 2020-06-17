import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {Link,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {register,checkEmail} from '../../store/actions/Auth';

const Register = ({register,checkEmail,auth:{isAuthenticated,alreadyRegistered},history}) => {

    const[formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    });
    const[typing,setTyping]=useState(false);

    const[passwordsMatch,setPasswordsMatch]=useState(true);

    const{name,email,password,confirmpassword}=formData;

    const onChangeInput = (event) =>{
        
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
        
        if(event.target.name==='email')
        {
            setTyping(true);
        }
    };
    useEffect(() => {
      
            if(password==confirmpassword)
            {
                setPasswordsMatch(true)
                console.log("set true",password,confirmpassword);
            }
            else
            {
                console.log("set false",password,confirmpassword);
                setPasswordsMatch(false)
            }
    }, [confirmpassword])
    
   

   const call = ()=>{
    checkEmail({email});
    setTyping(false);
   }
    const onSubmit = (event) =>{
        event.preventDefault();
        register({name,email,password});
    }
    if(isAuthenticated)
    {
        return history.push('/feed');
        // return <Redirect to="/dashboard" />
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
                                    <Form.Control required name="name"  value={name} onChange={(event)=>onChangeInput(event)} style={{ backgroundColor:'whitesmoke' }} type="text" placeholder="Name" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control required name="email"  value={email} onChange={(event)=>{return onChangeInput(event)}} onBlur={call}   style={{ backgroundColor:'whitesmoke' }} type="email" placeholder="Email" />
                                    {alreadyRegistered && !typing ? <div style={{color:'red',textAlign:'left'}}>This email is already registered</div>:null}
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control required name="password"  value={password} onChange={(event)=>onChangeInput(event)}  style={{ backgroundColor:'whitesmoke' }} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Control required name="confirmpassword"  value={confirmpassword} onChange={(event)=>{ return onChangeInput(event)}} style={{ backgroundColor:'whitesmoke' }} type="password" placeholder="Confirm Password" />
                                    { passwordsMatch===false ? <div style={{color:'red',textAlign:'left'}}>Passwords do not match</div>:null}
                                </Form.Group>
                                
                                <Button variant="primary" disabled={passwordsMatch===false || password==='' || confirmpassword===''} type="button" block onClick={(event) => onSubmit(event)}>
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

export default connect(mapStateToProps,{register,checkEmail})(withRouter(Register));
 