import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Nav,Navbar} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom';
import {logout} from '../../store/actions/Auth';

const DevNavbar = ({isAuthenticated,logout,history}) => {

    return (
     isAuthenticated === true ?
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
              <Navbar.Brand style={{fontFamily:'Comic Sans MS', fontSize:'30px'}} >
                <Link to="/"  style={{color:'white'}}>Devgram</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link >Feed</Nav.Link>
                  <Nav.Link>Developers</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={()=>{logout(history)}} >Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>:null
    )
}

Navbar.propTypes = {

}
const mapStateToProps= state =>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(withRouter(DevNavbar))
