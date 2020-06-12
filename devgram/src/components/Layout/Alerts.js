import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
const Alerts = (props) => {

     let alertMessages=null;

    if(props.alerts != null && props.alerts.length > 0)
    {
      alertMessages=  props.alerts.map((alert)=>{
          if(alert.alertType==='danger')
          {
            return( <Alert key={alert.id} variant={'danger'} style={{textAlign:'center'}}  >{alert.msg}</Alert> );
          }
           return( <Alert key={alert.id} variant={'success'} style={{textAlign:'center'}} >{alert.msg}</Alert> );
        })
    }

    return (
        <Row style={{marginTop:'3vh'}}>
          <Col  lg={{span:4,offset:4}} md={{span:6,offset:3}} sm={{span:8,offset:2}} xs={{span:10,offset:1}}>
          {alertMessages}
          </Col>
        </Row>
    )
}

Alerts.propTypes = {
    alerts:PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})
//whenever there is change in state to which we are subscribing  we will get notified and component re-renders
export default connect(mapStateToProps,{})(Alerts);
