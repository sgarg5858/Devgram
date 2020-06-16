import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {deleteEducation} from '../../store/actions/Profile';

const Education = ({education,deleteEducation}) => {

    const educations =  education.map((exp) => {
        return <tr key={exp.id} >
            <td>{exp.school}</td>
            <td>{exp.degree}</td>
            <td><Moment format="YYYY/MM//DD">{exp.from}</Moment>-{exp.to ===null ? 'Present':
            <Moment format="YYYY/MM//DD">{exp.to}</Moment>} </td>
            <td>
                <Button variant="outline-danger" type="button"
                onClick={()=> deleteEducation(exp._id)}
                >Delete</Button>
            </td>
        </tr>
    })

    return (
       
            <Card bg="dark" text="white">
            <Card.Title style={{marginLeft:'2vw',marginTop:'2vh'}} as="h5">Education</Card.Title>
            <Card.Body style={{textAlign:"center"}}>
             <Table striped bordered hover variant="dark" responsive>
                 <thead>
                     <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th>Manage</th>
                     </tr>
                 </thead>
                 <tbody>
                     {educations}
                 </tbody>
             </Table>
            </Card.Body>
            </Card>
                  
    )
}

Education.propTypes = {
education:PropTypes.array.isRequired,
deleteEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteEducation})(Education)
