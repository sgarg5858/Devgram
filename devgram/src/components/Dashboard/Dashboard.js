import React,{useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../store/actions/Profile';
import {Redirect,Link,withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Experience from  './Experience';
import Education from  './Education';

const Dashboard = ({getCurrentProfile,profile:{profile,isLoading},auth:{user},history}) => {

    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile])

    return (isLoading && profile === null ? <Spinner/>:<Fragment>
       { profile ? 
        <Container fluid>
        <Row style={{marginTop:'2vh'}}>
                    <Col lg={{span:10,offset:1}} md={{span:10,offset:1}} sm={{span:10,offset:1}} xs={{span:12,offset:0}}>
                     <Card bg="dark" text="white">
                        <Card.Title style={{marginLeft:'2vw',marginTop:'2vh'}} as="h5">Hi {user && user.name ? user.name: 'Stranger'} ,</Card.Title>
                        <Card.Body style={{textAlign:"center"}}>
                            <ButtonGroup>
                            <Button variant="outline-info"  onClick={()=>{return history.push('/edit-profile') }}>Edit Profile</Button>
                            <Button variant="outline-info"  onClick={()=>{return history.push('/add-education') }}>Add Education</Button>
                            <Button  variant="outline-info" onClick={()=>{return history.push('/add-experience') }}>Add Experience</Button>
                            </ButtonGroup>
                        </Card.Body>
                        </Card>
                    </Col>
                 </Row>
                 <Row style={{marginTop:'2vh'}}>
                    <Col lg={{span:10,offset:1}} md={{span:10,offset:1}} sm={{span:10,offset:1}} xs={{span:12,offset:0}}>
                        <Experience experience={profile.experience}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'2vh'}}>
                    <Col lg={{span:10,offset:1}} md={{span:10,offset:1}} sm={{span:10,offset:1}} xs={{span:12,offset:0}}>
                        <Education education={profile.education}/>
                    </Col>
                </Row>
            </Container>
             :
            <Container fluid>
                <Row style={{marginTop:'10vh',height:'50vh'}}>
                    <Col lg={{span:8,offset:2}} md={{span:8,offset:4}} sm={{span:10,offset:1}} xs={{span:12,offset:0}}>
                        <Card bg="dark" text="white">
                            {/* <Card.Img variant="top" rounded="true"   src={user && user.avatar ? user.avatar:null} /> */}
                            <Card.Body>
                                <Card.Title>Hi {user && user.name ? user.name: 'Stranger'} ,</Card.Title>
                                <Card.Text>
                                Your profile looks incomplete. Click below link to set up your profile.
                                </Card.Text>
                                <Button variant="outline-info" onClick={()=>{return history.push('/create-profile') }}>Create Profile</Button>
                                {/* <Link style={{ color: 'grey' }} to="/create-profile">Create Profile</Link> */}
                            </Card.Body>
                        </Card>
                    </Col>
                 </Row>
        </Container>
    }
    </Fragment> )
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps= state =>({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getCurrentProfile})(withRouter(Dashboard));
