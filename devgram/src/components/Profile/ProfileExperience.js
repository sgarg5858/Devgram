import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Moment from 'react-moment'

const ProfileExperience = ({profile}) => {

    const experience=profile.experience.length === 0 ? <Card.Body>
        <Card.Text>No Experience Credentials</Card.Text>
    </Card.Body>: profile.experience.map((exp)=>{
        return <Card key={exp._id} bg="secondary" text="white" style={{ width: '100%',marginTop:'1vh' }}>
        <Card.Body>
            <Card.Title>{exp.company}</Card.Title>
            <Card.Text>
                {exp.title}
                <br></br>
                <Moment format='YYYY/MM//DD'>{exp.from}</Moment>-{exp.to ? <Moment format='YYYY/MM//DD'>{exp.to}</Moment>: 'Present'}
                <br></br>
            </Card.Text>
        </Card.Body>
    </Card>

    })
    return (
        <Col lg={{span:12,offset:0}} md={{span:12,offset:0}} sm={{span:12,offset:0}} xs={{span:12,offset:0}}>
        <Card style={{ width: '100%' }} bg="dark" text="white">
            <Card.Body>
                <Card.Title>Experience</Card.Title>
                {experience}
            </Card.Body>
        </Card>
        </Col>
    )
}

ProfileExperience.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileExperience
