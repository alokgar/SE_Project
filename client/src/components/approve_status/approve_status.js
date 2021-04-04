import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import {changeStatus }from '../../actions/status';
import { getUsers } from '../../actions/status';

import Table from 'react-bootstrap/Table';
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
    <div  style={{width:'100%',overflow:'auto'}}>           
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
        {users.map(function(user){
            var id=user.email;
            return (
              user.status=="Pending" ?
              <tr>
                <td>{user.first_name}{" "}{user.last_name}</td>
                <td><Button variant="success" onClick={()=>{changeStatus({id})}}  >Approve for {user.type}</Button></td>
              </tr>
              :null
            )         
            })}
        </tbody>
      </Table>
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