import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Moment from 'react-moment'

const ProfileEducation = ({profile}) => {

    const education=profile.education.length === 0 ? <Card.Body>
        <Card.Text>No Education Credentials</Card.Text>
    </Card.Body>: profile.education.map((exp)=>{
        return <Card key={exp._id} bg="secondary" text="white" style={{ width: '100%',marginTop:'1vh' }}>
        <Card.Body>
            <Card.Title>{exp.school}</Card.Title>
            <Card.Text>
                {exp.degree}
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
                <Card.Title>Education</Card.Title>
                {education}
            </Card.Body>
        </Card>
        </Col>
    )
}

ProfileEducation.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileEducation
