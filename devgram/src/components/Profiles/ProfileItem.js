import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'

const ProfileItem = ({profile:{user:{_id,name,avatar},status,location,bio,company},history}) => {
    return (
        <Col lg={{span:4,offset:0}} md={{span:4,offset:0}} sm={{span:6}} xs={{span:12}}>
            <Card bg="dark" text="white" style={{ width: '100%',marginTop:'4vh' }}>
                {/* <Card.Img  variant="top" src={avatar} /> */}
                <Card.Body>
                    <Card.Title >{name}</Card.Title>
                    <Card.Text>
                        {status} { company ? `at ${company}`:null}
                        <br />
                        {location}
                    </Card.Text>
                    <Button variant="outline-primary" onClick={()=>{return history.push(`profile/${_id}`)}} >Show Profile</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

ProfileItem.propTypes = {
profile:PropTypes.object.isRequired
}

export default withRouter(ProfileItem)
