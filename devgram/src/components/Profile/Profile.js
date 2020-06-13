import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../Layout/Spinner';
import {getProfileById} from '../../store/actions/Profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const Profile = ({profile:{profile,isLoading},auth,getProfileById,match}) => {

    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById]);

    return (
        !profile || isLoading ? <Spinner /> : 
        <Container>
            <Row> <ProfileTop profile={profile} /> </Row>
            <Row style={{marginTop:'2vh'}}> <ProfileAbout profile={profile} /> </Row>
            <Row style={{marginTop:'2vh'}}> <ProfileExperience profile={profile} /> </Row>
             <Row style={{marginTop:'2vh'}}> <ProfileEducation profile={profile} /> </Row>
        </Container>
    )
}

Profile.propTypes = {
getProfileById:PropTypes.func.isRequired,
profile:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)
