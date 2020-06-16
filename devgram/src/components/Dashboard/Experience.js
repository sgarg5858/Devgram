import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {deleteExperience} from '../../store/actions/Profile'

const Experience = ({experience,deleteExperience}) => {

    const experiences =  experience.map((exp) => {
        return <tr key={exp._id} >
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td><Moment format="YYYY/MM//DD">{exp.from}</Moment>-{exp.to ===null ? 'Present':
            <Moment format="YYYY/MM//DD">{exp.to}</Moment>} </td>
            <td>
                <Button variant="outline-danger" type="button"
                onClick={()=> deleteExperience(exp._id) }
                >Delete</Button>
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
                        <th>Manage</th>
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
  experience:PropTypes.array.isRequired,
  deleteExperience:PropTypes.func.isRequired
}

export default connect(null,{deleteExperience})(Experience)
