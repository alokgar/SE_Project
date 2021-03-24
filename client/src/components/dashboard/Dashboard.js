import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Approve_status from '../approve_status/approve_status'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import {Container} from 'react-bootstrap';


const Dashboard = ({
  getCurrentProfile,

  deleteAccount,
  auth: { user },

  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();

  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    
    <Fragment>
       
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.first_name}
      </p>
      <Link to="/products">link1</Link>
      <Link to="/customers">Customers</Link>
      <br/>
      <Link to="/raw_materials"> Raw-Materials Page </Link>
      <br/>
      <Link to="/suppliers"> Suppliers Page </Link>
      {profile !== null ? (
        <Fragment>
          {/* <DashboardActions /> */}
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment >
        
          <div >
          
          <Container > <Approve_status /></Container>
         
          </div>
  
          
        </Fragment>
      )}
      
          
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,

  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
 
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile

});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);