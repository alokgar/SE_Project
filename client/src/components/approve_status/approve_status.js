import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import {changeStatus }from '../../actions/status';
import { getUsers } from '../../actions/status';

import {Button ,Row,Col} from "react-bootstrap";
const Approve_status = ({
 
  getUsers,
  status:{users},
  changeStatus
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>

    Following are the list of USERS with there status
    <div style = {{height:"150px" , width:"500px" , overflow:"scroll",overflowX:"hidden",margin:"10px"}}>

    {users.map(function(user){

      var id=user.email;



      return (
         <div style = {{margin:"5px"}}>
           
        {user.status=="Pending" ?
        <Row>
        <Col>
        {user.first_name}{" "}{user.last_name}
        </Col>
        <Col>
        <Button variant="success" onClick={()=>{changeStatus({id})}}  >Approve for {user.type}</Button>

        </Col>
        </Row>
        :null}
        
         </div>
)


})}
    </div>
      

      
     
    </Fragment>
  );
};


Approve_status.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    status: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

const mapStateToProps = state => ({
  status: state.status
  });

export default connect(
    mapStateToProps,
 { changeStatus ,getUsers}
)(Approve_status);