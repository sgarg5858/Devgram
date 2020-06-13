import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import DoneIcon from '@material-ui/icons/Done';

const ProfileAbout = ({profile:{bio,skills,user:{name}}}) => {

    const Skills=skills.map((skill)=>{
        return <Card bg="secondary" text="white" style={{marginLeft:'2vw',marginTop:'2vh'}} key={skill}>
          <Card.Text style={{margin:'1vw'}}> {skill}</Card.Text>
        </Card>
    })

    return (
        <Col lg={{span:12,offset:0}} md={{span:12,offset:0}} sm={{span:12,offset:0}} xs={{span:12,offset:0}}>
            <Card style={{ width: '100%' }} bg="dark" text="white">
            <Card.Body>
                    <Card.Title>
                         Skills 
                    </Card.Title>
                       <Row >
                        {Skills}
                       </Row>
                </Card.Body>
            </Card>
        </Col>  
                        )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
