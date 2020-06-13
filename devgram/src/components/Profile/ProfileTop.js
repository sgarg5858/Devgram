import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';


const ProfileTop = ({profile:{status,company,bio,location,website,social,user:{name,avatar}}}) => {
    return (
        <Col lg={{span:12,offset:0}} md={{span:12,offset:0}} sm={{span:12,offset:0}} xs={{span:12,offset:0}}>
            <Card style={{ width: '100%' }} bg="dark" text="white">
                <Card.Body>
                    <Card.Title style={{ fontSize:'35px' }} >{name}</Card.Title>
                    <Card.Text style={{ fontSize:'20px',marginTop:'3vh' }}>
                        {status} {company ? `at ${company}`:null} <br/>
                        {location? location:null}<br/>
                        {website? website:null}<br/>
                        {social && social[0].linkedin ? 
                        <a href={social[0].linkedin}target="_blank" >
                            <LinkedInIcon fontSize='large'/>
                        </a>:null
                         }
                         {social && social[0].instagram ? 
                        <a href={social[0].instagram} target="_blank">
                            <InstagramIcon  fontSize='large'/>
                        </a>:null
                         }
                         {social && social[0].facebook ? 
                        <a href={social[0].facebook} target="_blank">
                            <FacebookIcon  fontSize='large'/>
                        </a>:null
                         }

                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileTop
