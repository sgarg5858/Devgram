import React,{useState} from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {Link,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../store/actions/Auth'
import Alert from 'react-bootstrap/Alert'

const Login = ({login,auth:{isAuthenticated},history}) => {

    //Array Destructuring
    const[formData,setFormData]=useState({
        email:'',
        password:''
    });
    
    //Object Destructuring
    const{email,password}=formData;

    //Another state hook
    const[submitted,setSubmitted]=useState(false);

    var t;

   const onSubmit= (event) =>{
        event.preventDefault();

        // console.log({email,password});
        
        login({email,password});

        t=setTimeout(()=>{
            setSubmitted({
                submitted:true
            });
        },1500)
    }

    //State updation is immutable
  const  onChange= (event) =>{
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    };

    if(isAuthenticated)
    {
        clearTimeout(t);
        history.push('/feed')
    //    return <Redirect to="/feed" />
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={{span:4,offset:4}} md={{span:4,offset:4}} sm={{span:6,offset:3}} xs={{span:10,offset:1}}>
                <div style={{marginTop:'20vh'}}>
                { submitted && !isAuthenticated ? <Alert variant="danger" style={{textAlign:'center'}} onClose={()=>setSubmitted(false)} dismissible >Incorrect Username or Password</Alert> :null}
                <Card style={{ width: '100%',textAlign:'center' }}>
                    <Card.Body>
                        <Card.Title style={{fontFamily:'Comic Sans MS', fontSize:'30px'}}>Devgram</Card.Title>
                        <Card.Text style={{marginTop:'2vh',marginBottom:'2vh'}}>
                        <div style={{ color:'grey',marginBottom:'2vh' }}>Built for developers</div>
                            <Form >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control required name="email" value={email} onChange={(event)=>onChange(event)} style={{ backgroundColor:'whitesmoke' }} type="email" placeholder="Email" />
                                   
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control required name="password" value={password} onChange={(event)=>onChange(event)} style={{ backgroundColor:'whitesmoke' }} type="password" placeholder="Password" />
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
            </div>
                
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

export default connect(mapStateToProps,{login})(withRouter(Login));
 