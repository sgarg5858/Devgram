import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Experience = ({experience}) => {

    const experiences =  experience.map((exp) => {
        return <tr key={exp.id} >
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td><Moment format="YYYY/MM//DD">{exp.from}</Moment>-{exp.to ===null ? 'Present':
            <Moment format="YYYY/MM//DD">{exp.to}</Moment>} </td>
            <td>
                <Button variant="outline-danger" type="button">Delete</Button>
            </td>
        </tr>
    })

    return (
       
            <Card bg="dark" text="white">
            <Card.Title style={{marginLeft:'2vw',marginTop:'2vh'}} as="h5">Experience</Card.Title>
            <Card.Body style={{textAlign:"center"}}>
             <Table striped bordered hover variant="dark" responsive>
                 <thead>
                     <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th>Action</th>
                     </tr>
                 </thead>
                 <tbody>
                     {experiences}
                 </tbody>
             </Table>
            </Card.Body>
            </Card>
                  
    )
}

Experience.propTypes = {
  experience:PropTypes.array.isRequired
}

export default Experience
