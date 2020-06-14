import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../Layout/Spinner';
import {getAllProfiles,filterDevelopers} from '../../store/actions/Profile';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Alert from 'react-bootstrap/Alert'
import ProfileItem from './ProfileItem';

const Profiles = ({profile:{filteredProfiles,isLoading},getAllProfiles,filterDevelopers}) => {
    
    useEffect(() => {
        getAllProfiles();    
    },
     [getAllProfiles]
     )

    return (
        isLoading ? <Spinner />:
        <Container fluid>
            <Row style={{marginTop:'2vh'}}  >
            <Col lg={{span:4,offset:4}} md={{span:4,offset:4}} sm={{span:6,offset:3}} xs={{span:8,offset:2}}>
            <Form.Group controlId="search" >
                <Form.Control type="text" placeholder="Search by name, job title" style={{ backgroundColor:'black',color: `#007bff` }}  onChange={(event)=>filterDevelopers(event.target.value)}/>
               
            </Form.Group>
            </Col>
            </Row>
        <Row style={{marginTop:'2vh'}}>
                {
                filteredProfiles.map((profile)=>{
                    return <ProfileItem key={profile._id} profile ={profile} />
                })
                }
         </Row>
</Container>
    )
}

Profiles.propTypes = {
profile:PropTypes.object.isRequired,
getAllProfiles:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile
})

export default connect(mapStateToProps,{getAllProfiles,filterDevelopers})(Profiles)


// {profiles.length === 0 ? 
//     <Alert style={{textAlign:'center'}}  variant='info'>No Profiles Found</Alert>
//     :