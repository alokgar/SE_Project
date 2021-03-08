import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import {changeStatus }from '../../actions/status';
import { getUsers } from '../../actions/status';

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

      

      {users.map(function(user){

        var id=user.email;
        


      return (
        <div>
          
          {user.status}
           <button onClick={()=>{changeStatus({id})}}  >Approve</button>{" "} <button>Reject</button>
           </div>
       )


      })}

      
     
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