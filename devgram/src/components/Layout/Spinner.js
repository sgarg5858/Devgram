import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
const Spinner = () => {
    console.log("Spinner");
    return (
        <Container fluid>
            <Row style={{marginTop:'2vh',justifyContent:'center',marginTop:'40vh'}}  >

                    <div className="lds-ripple"><div></div><div></div></div>
            </Row>
        </Container>
           
    )
}

export default Spinner;
